'use strict';

(function() {
  // render-page: load chapter and render a specific page
  window.electronAPI.on('render-page', function(data) {
    dataLayer.fetchChapter(data.chapter).then(function() {
      if (data.displayMode) {
        renderer.setMode(data.displayMode);
      }
      var page = dataLayer.getPage(data.pageIndex);
      if (page) {
        renderer.renderPage(page);
      }
    });
  });

  // syllable-update: highlight individual syllables
  window.electronAPI.on('syllable-update', function(data) {
    var elems = renderer.getSyllableElements();
    if (data.index >= 0 && data.index < elems.length) {
      if (data.state === 'active') {
        elems[data.index].classList.add('active');
      } else if (data.state === 'done') {
        elems[data.index].classList.remove('active');
        elems[data.index].classList.add('done');
      }
    }
  });

  // animation-reset: clear all highlights
  window.electronAPI.on('animation-reset', function() {
    var elems = renderer.getSyllableElements();
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove('active');
      elems[i].classList.remove('done');
    }
  });

  // countdown: show/hide countdown overlay
  window.electronAPI.on('countdown', function(data) {
    var overlay = document.getElementById('countdown-overlay');
    var numberEl = overlay.querySelector('.countdown-number');
    if (data.number > 0) {
      numberEl.textContent = data.number;
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';
    }
  });

  // display-mode: switch asterisk/english
  window.electronAPI.on('display-mode', function(data) {
    renderer.setMode(data.mode);
  });

  // spm-change: pace indicator watermark
  window.electronAPI.on('spm-change', function(data) {
    var el = document.getElementById('pace-indicator');
    if (data.indicator) {
      el.textContent = data.indicator;
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });

  // show-instruction: display instruction overlay
  window.electronAPI.on('show-instruction', function(data) {
    var overlay = document.getElementById('instruction-overlay');
    var content = overlay.querySelector('.instruction-content');
    while (content.firstChild) content.removeChild(content.firstChild);

    if (data.image) {
      var img = document.createElement('img');
      img.className = 'instruction-image';
      img.src = data.image;
      img.alt = data.text || '';
      content.appendChild(img);
    }
    if (data.text) {
      var div = document.createElement('div');
      div.className = 'instruction-text';
      if (data.color) div.style.color = data.color;
      div.textContent = data.text;
      content.appendChild(div);
    }
    overlay.style.display = 'flex';
  });

  // dismiss-instruction: hide overlay
  window.electronAPI.on('dismiss-instruction', function() {
    document.getElementById('instruction-overlay').style.display = 'none';
  });
})();
