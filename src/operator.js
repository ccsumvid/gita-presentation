// operator.js — Operator window controller
// Runs animator, handles controls, sends state to projector via IPC
'use strict';

(function() {
  var currentPage = 0;
  var currentDisplayMode = 'asterisk';
  var projectorOpen = false;
  var chapterSelect = document.getElementById('chapter-select');
  var shlokaSelect = document.getElementById('shloka-select');

  // --- IPC helpers ---
  function sendToProjector(channel, data) {
    window.electronAPI.send(channel, data);
  }

  function syncProjectorPage() {
    sendToProjector('render-page', {
      chapter: dataLayer.getCurrentChapterId(),
      pageIndex: currentPage,
      displayMode: currentDisplayMode
    });
  }

  // --- Instruction data ---
  var INSTRUCTION_DATA = {
    folded_hands:      { image: '../img/instructions/folded-hands.png' },
    pranam:            { text: 'Pran\u0101m', image: '../img/instructions/image7.gif' },
    sit_straight:      { text: 'Sit Straight', image: '../img/instructions/image3.gif' },
    increase_sruti:    { image: '../img/instructions/shruti-increase.png' },
    listen_sync:       { text: 'Listen and Sync\nwith Pace Helpers' },
    good_job:          { image: '../img/instructions/image6.gif' },
    decrease_sruti:    { image: '../img/instructions/image4.jpeg', image2: '../img/instructions/image5.gif', arrow: 'down' },
    stop:              { text: 'STOP', color: '#ff4444' },
    starting_soon:     { text: 'Sampoorna Bhagavad Gita\nParayana Starting Soon' },
    sitting_placement: { text: 'Sit directly in your square\nLabel should be in front of you' }
  };

  // --- Position display ---
  function updatePositionBar() {
    var chapterId = dataLayer.getCurrentChapterId();
    var chapterName = chapterSelect.options[chapterSelect.selectedIndex].textContent;
    document.getElementById('chapter-name').textContent = chapterName;

    var page = dataLayer.getPage(currentPage);
    var total = dataLayer.getPageCount();
    var shlokaText;
    if (page && page.shlokaNum) {
      shlokaText = 'Shloka ' + page.shlokaNum;
    } else if (page && page.isHeader) {
      shlokaText = 'Header';
    } else {
      shlokaText = 'Verse ' + (currentPage + 1);
    }
    document.getElementById('shloka-info').textContent = shlokaText + '  ·  ' + (currentPage + 1) + ' of ' + total;
  }

  // --- Shloka dropdown ---
  function populateShlokaDropdown() {
    while (shlokaSelect.firstChild) shlokaSelect.removeChild(shlokaSelect.firstChild);
    var pageCount = dataLayer.getPageCount();
    for (var i = 0; i < pageCount; i++) {
      var page = dataLayer.getPage(i);
      var opt = document.createElement('option');
      opt.value = i;
      if (page.isHeader) {
        opt.textContent = page.shlokaNum ? 'Header (Shloka ' + page.shlokaNum + ')' : 'Header';
      } else {
        opt.textContent = page.shlokaNum ? 'Shloka ' + page.shlokaNum : 'Page ' + (i + 1);
      }
      shlokaSelect.appendChild(opt);
    }
  }

  // --- Chapter loading ---
  async function loadChapter(chapterId) {
    try {
      renderer.invalidatePrefetch();
      await dataLayer.fetchChapter(chapterId);
      populateShlokaDropdown();
      currentPage = 0;
      showPage(0);
      chapterSelect.value = String(chapterId);
    } catch (err) {
      console.error('Load failed:', err);
    }
  }

  // --- Page display ---
  function showPage(index) {
    animator.reset();
    sendToProjector('animation-reset');

    var chId = dataLayer.getCurrentChapterId();
    if (!renderer.swapPrefetched(index, chId)) {
      var page = dataLayer.getPage(index);
      if (!page) return;
      renderer.renderPage(page);
    }

    currentPage = index;
    updatePositionBar();
    shlokaSelect.value = currentPage;
    syncProjectorPage();

    // Pre-render next page
    var nextIdx = currentPage + 1;
    if (nextIdx < dataLayer.getPageCount()) {
      renderer.prefetchPage(nextIdx, chId);
    }
  }

  // --- Navigation ---
  async function nextPage() {
    if (currentPage < dataLayer.getPageCount() - 1) {
      showPage(currentPage + 1);
    } else {
      var nextId = dataLayer.getNextChapterId();
      if (nextId) {
        await loadChapter(nextId);
      }
    }
  }

  // --- Restart Chapter ---
  function restartChapter() {
    showPage(0);
  }

  // --- Countdown ---
  var countdownActive = false;

  function startCountdown(callback) {
    if (countdownActive) return;
    countdownActive = true;
    var count = 5;
    sendToProjector('countdown', { number: count });
    var interval = setInterval(function() {
      count--;
      if (count <= 0) {
        clearInterval(interval);
        countdownActive = false;
        sendToProjector('countdown', { number: 0 });
        if (callback) callback();
      } else {
        sendToProjector('countdown', { number: count });
      }
    }, 1000);
  }

  function playWithCountdown() {
    if (currentPage === 0 && animator.getState().currentIndex < 0) {
      startCountdown(function() { animator.play(); });
    } else {
      animator.play();
    }
  }

  // --- SPM display ---
  var spmInput = document.getElementById('spm-input');

  function updateSpmDisplay() {
    spmInput.value = Math.round(animator.getState().bpm / 4);
  }

  spmInput.addEventListener('change', function() {
    var val = parseInt(spmInput.value, 10);
    if (!isNaN(val) && val > 0) {
      animator.setBpm(val * 4);
    }
    updateSpmDisplay();
  });

  spmInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      spmInput.blur();
    }
    e.stopPropagation(); // prevent keyboard shortcuts while editing
  });

  // --- Hook into animator to send syllable updates to projector ---
  animator.setOnSyllableChange(function(index, state) {
    var beatMs = Math.round(60000 / animator.getState().bpm);
    var elems = renderer.getSyllableElements();
    var el = elems[index];
    var beats = el ? (parseInt(el.dataset.beats, 10) || 1) : 1;
    sendToProjector('syllable-update', { index: index, state: state, beatMs: beatMs, durationMs: beats * beatMs });
  });

  // --- Auto-advance: when animator reaches end of page, go to next and resume ---
  animator.setOnAutoAdvance(async function() {
    await nextPage();

    // Pause briefly on header pages — show folded hands, then auto-advance
    var newPage = dataLayer.getPage(currentPage);
    if (newPage && newPage.isHeader) {
      sendToProjector('show-instruction', INSTRUCTION_DATA['folded_hands']);
      instructionShowing = true;
      setTimeout(function() {
        sendToProjector('dismiss-instruction');
        instructionShowing = false;
        document.getElementById('instruction-select').value = '';
        animator.play();
      }, 3000);
      return;
    }

    animator.play();
  });

  // --- Pace indicators ---
  function setPace(mode) {
    var btnSpeedup = document.getElementById('btn-speedup');
    var btnSlowdown = document.getElementById('btn-slowdown');
    btnSpeedup.classList.remove('active');
    btnSlowdown.classList.remove('active');

    if (mode === 'speedup') {
      btnSpeedup.classList.add('active');
      sendToProjector('spm-change', { indicator: '\u26A1' });
    } else if (mode === 'slowdown') {
      btnSlowdown.classList.add('active');
      sendToProjector('spm-change', { indicator: '\u270B' });
    } else {
      sendToProjector('spm-change', { indicator: null });
    }
  }

  // --- Bind controls ---
  document.getElementById('btn-play').addEventListener('click', function() { playWithCountdown(); });
  document.getElementById('btn-pause').addEventListener('click', function() { animator.pause(); });
  document.getElementById('btn-reset').addEventListener('click', function() {
    animator.reset();
    sendToProjector('animation-reset');
  });
  document.getElementById('btn-restart-chapter').addEventListener('click', function() { restartChapter(); });
  document.getElementById('btn-next').addEventListener('click', function() { nextPage(); });

  chapterSelect.addEventListener('change', function() { loadChapter(chapterSelect.value); });
  shlokaSelect.addEventListener('change', function() {
    var pageIndex = parseInt(shlokaSelect.value, 10);
    if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < dataLayer.getPageCount()) {
      showPage(pageIndex);
    }
  });

  // SPM controls
  document.getElementById('bpm-up').addEventListener('click', function() {
    animator.setBpm(animator.getState().bpm + 20);
    updateSpmDisplay();
  });
  document.getElementById('bpm-down').addEventListener('click', function() {
    animator.setBpm(animator.getState().bpm - 20);
    updateSpmDisplay();
  });

  // Display mode
  document.querySelectorAll('.mode-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mode-btn').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      currentDisplayMode = btn.dataset.mode;
      var state = animator.getState();
      renderer.setMode(currentDisplayMode);
      animator.restore(state);
      sendToProjector('display-mode', { mode: currentDisplayMode });
      // Re-announce the active syllable so the projector pointer snaps to the right position
      var restoredState = animator.getState();
      if (restoredState.currentIndex >= 0) {
        var reBeatMs = Math.round(60000 / restoredState.bpm);
        var reElems = renderer.getSyllableElements();
        var reEl = reElems[restoredState.currentIndex];
        var reBeats = reEl ? (parseInt(reEl.dataset.beats, 10) || 1) : 1;
        sendToProjector('syllable-update', { index: restoredState.currentIndex, state: 'active', beatMs: reBeatMs, durationMs: reBeats * reBeatMs });
      }
    });
  });

  // Pace indicator buttons
  var btnSpeedup = document.getElementById('btn-speedup');
  var btnSlowdown = document.getElementById('btn-slowdown');
  btnSpeedup.addEventListener('click', function() {
    setPace(btnSpeedup.classList.contains('active') ? 'none' : 'speedup');
  });
  btnSlowdown.addEventListener('click', function() {
    setPace(btnSlowdown.classList.contains('active') ? 'none' : 'slowdown');
  });
  document.getElementById('btn-clear-pace').addEventListener('click', function() { setPace('none'); });

  // Instruction dropdown
  var instructionShowing = false;

  function dismissInstruction() {
    sendToProjector('dismiss-instruction');
    instructionShowing = false;
    document.getElementById('instruction-select').value = '';
  }

  document.getElementById('instruction-select').addEventListener('change', function() {
    var key = this.value;
    if (!key) return;
    var data = INSTRUCTION_DATA[key];
    if (data) {
      sendToProjector('show-instruction', data);
      instructionShowing = true;
    }
  });

  document.getElementById('btn-dismiss-instruction').addEventListener('click', function() {
    dismissInstruction();
  });

  // Projector button
  var projectorBtn = document.getElementById('btn-projector');
  projectorBtn.addEventListener('click', function() {
    if (projectorOpen) {
      window.electronAPI.send('close-projector');
    } else {
      window.electronAPI.send('open-projector');
    }
  });

  window.electronAPI.on('projector-status', function(data) {
    projectorOpen = data.open;
    projectorBtn.textContent = projectorOpen ? '\uD83D\uDCFA Close Projector' : '\uD83D\uDCFA Open Projector';
    if (projectorOpen) {
      // Sync current state to newly opened projector
      syncProjectorPage();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Don't intercept if user is typing in an input/select
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      var state = animator.getState();
      if (state.isPlaying) {
        animator.pause();
      } else {
        playWithCountdown();
      }
    } else if (e.code === 'ArrowRight') {
      nextPage();
    } else if (e.code === 'ArrowLeft') {
      restartChapter();
    } else if (e.code === 'KeyR') {
      animator.reset();
      sendToProjector('animation-reset');
    } else if (e.key === '+' || e.key === '=') {
      animator.setBpm(animator.getState().bpm + 20);
      updateSpmDisplay();
    } else if (e.key === '-' || e.key === '_') {
      animator.setBpm(animator.getState().bpm - 20);
      updateSpmDisplay();
    } else if (e.code === 'Escape') {
      if (instructionShowing) {
        dismissInstruction();
      }
    }
  });

  // --- Init ---
  loadChapter('datta_stavam');
})();
