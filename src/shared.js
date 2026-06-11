// shared.js — Extracted from index.html
// Contains: EMBEDDED_DHYANA, prosody, iastProsody, dataLayer, renderer, animator
// Used by both operator.html and projector.html
'use strict';

// ============================================================
// Embedded Data — Gita Dhyana Shlokas (Chapter 00)
// ============================================================
const EMBEDDED_DHYANA = {
  "name": "गीता  ध्यान  श्लोकाः",
  "chapterNum": "00",
  "defaultBpm": 280,
  "shloka": [
    {
      "shlokaNum": "",
      "entry": [
        {"startTime":"1.12327","endTime":"7.71510","swhtsp":"l","shlNbr":"00","sty":"fh","text":"ओं  श्री  परमात्मने नमः","iast":"ōṃ  śrī  paramātmanē namaḥ"},
        {"startTime":"8.22857","endTime":"13.4098","swhtsp":"","shlNbr":"00","sty":"th","text":"अथ गीता  ध्यान  श्लोकाः","iast":"atha gītā  dhyāna  ślōkāḥ"}
      ]
    },
    {
      "shlokaNum": "1",
      "entry": [
        {"startTime":"14.2367","endTime":"27.7249","swhtsp":"p","shlNbr":"00","sty":"","text":"ओं  पार्थाय  प्रतिबोधितां   भगवता  नारायणेन  स्वयं","iast":"ōṃ  pārthāya  pratibōdhitāṃ   bhagavatā  nārāyaṇēna  svayaṃ"},
        {"startTime":"28.2384","endTime":"39.5845","swhtsp":"l","shlNbr":"00","sty":"","text":"व्यासेन  ग्रथितां  पुराणमुनिना   मध्ये  महाभारतम् |","iast":"vyāsēna  grathitāṃ  purāṇamuninā   madhyē  mahābhāratam |"},
        {"startTime":"40.2547","endTime":"51.9404","swhtsp":"p","shlNbr":"00","sty":"","text":"अद्वैतामृतवर्षिणीं  भगवतीम्   अष्टादशाध्यायिनीं","iast":"advaitāmṛtavarṣiṇīṃ  bhagavatīm   aṣṭādaśādhyāyinīṃ"},
        {"startTime":"52.5845","endTime":"63.9045","swhtsp":"","shlNbr":"00","sty":"","text":"अम्ब  त्वाम्  अनुसन्दधामि   भगवद्गीते  भवद्वेषिणीम् ||","iast":"amba  tvām  anusandadhāmi   bhagavadgītē  bhavadvēṣiṇīm ||"}
      ]
    },
    {
      "shlokaNum": "2",
      "entry": [
        {"startTime":"64.4702","endTime":"77.0441","swhtsp":"l","shlNbr":"00","sty":"","text":"नमोऽस्तुते  व्यास  विशालबुद्धे   फुल्लारविन्दायतपत्रनेत्र |","iast":"namō'stutē  vyāsa  viśālabuddhē   phullāravindāyatapatranētra |"},
        {"startTime":"77.6098","endTime":"89.9486","swhtsp":"","shlNbr":"00","sty":"","text":"येन त्वया भारत तैलपूर्णः  प्रज्वालितो ज्ञानमयः  प्रदीपः||","iast":"yēna tvayā bhārata tailapūrṇaḥ  prajvālitō jñānamayaḥ  pradīpaḥ||"}
      ]
    },
    {
      "shlokaNum": "3",
      "entry": [
        {"startTime":"90.6188","endTime":"99.5878","swhtsp":"l","shlNbr":"00","sty":"","text":"प्रपन्नपारिजाताय   तोत्रवेत्रैकपाणये |","iast":"prapannapārijātāya   tōtravētraikapāṇayē |"},
        {"startTime":"100.075","endTime":"109.802","swhtsp":"","shlNbr":"00","sty":"","text":"ज्ञानमुद्राय  कृष्णाय   गीतामृतदुहे  नमः ||","iast":"jñānamudrāya  kṛṣṇāya   gītāmṛtaduhē  namaḥ ||"}
      ]
    },
    {
      "shlokaNum": "4",
      "entry": [
        {"startTime":"110.629","endTime":"119.519","swhtsp":"l","shlNbr":"00","sty":"","text":"वसुदेवसुतं  देवं   कंसचाणूरमर्दनम् |","iast":"vasudēvasutaṃ  dēvaṃ   kaṃsacāṇūramardanam |"},
        {"startTime":"120.033","endTime":"130.203","swhtsp":"","shlNbr":"00","sty":"","text":"देवकीपरमानन्दं   कृष्णं  वन्दे  जगद्गुरुम् ||","iast":"dēvakīparamānandaṃ   kṛṣṇaṃ  vandē  jagadgurum ||"}
      ]
    },
    {
      "shlokaNum": "5",
      "entry": [
        {"startTime":"130.926","endTime":"142.037","swhtsp":"p","shlNbr":"00","sty":"","text":"भीष्मद्रोणतटा  जयद्रथजला   गान्धारनीलोत्पला","iast":"bhīṣmadrōṇataṭā  jayadrathajalā   gāndhāranīlōtpalā"},
        {"startTime":"142.55","endTime":"153.217","swhtsp":"l","shlNbr":"00","sty":"","text":"शल्यग्राहवती  कृपेण  वहनी   कर्णेन  वेलाकुला |","iast":"śalyagrāhavatī  kṛpēṇa  vahanī   karṇēna  vēlākulā |"},
        {"startTime":"153.731","endTime":"163.536","swhtsp":"p","shlNbr":"00","sty":"","text":"अश्वत्थामविकर्णघोरमकरा   दुर्योधनावर्तिनी","iast":"aśvatthāmavikarṇaghōramakarā   duryōdhanāvartinī"},
        {"startTime":"164.153","endTime":"175.108","swhtsp":"","shlNbr":"00","sty":"","text":"सोत्तीर्णा  खलु  पाण्डवै   रणनदी  कैवर्तकः  केशवः ||","iast":"sōttīrṇā  khalu  pāṇḍavai   raṇanadī  kaivartakaḥ  kēśavaḥ ||"}
      ]
    },
    {
      "shlokaNum": "6",
      "entry": [
        {"startTime":"175.595","endTime":"185.635","swhtsp":"p","shlNbr":"00","sty":"","text":"पाराशर्यवचः  सरोजममलं   गीतार्थगन्धोत्कटं","iast":"pārāśaryavacaḥ  sarōjamamalaṃ   gītārthagandhōtkaṭaṃ"},
        {"startTime":"186.488","endTime":"196.946","swhtsp":"l","shlNbr":"00","sty":"","text":"नानाख्यानककेसरं  हरिकथा   सम्बोधनाबोधितम् |","iast":"nānākhyānakakēsaraṃ  harikathā   sambōdhanābōdhitam |"},
        {"startTime":"197.564","endTime":"207.735","swhtsp":"p","shlNbr":"00","sty":"","text":"लोके  सज्जनषट्पदैरहरहः   पेपीयमानं  मुदा","iast":"lōkē  sajjanaṣaṭpadairaharahaḥ   pēpīyamānaṃ  mudā"},
        {"startTime":"208.248","endTime":"218.001","swhtsp":"","shlNbr":"00","sty":"","text":"भूयाद्भारतपङ्कजं  कलिमल   प्रध्वंसिनः   श्रेयसे ||","iast":"bhūyādbhāratapaṅkajaṃ  kalimala   pradhvaṃsinaḥ   śrēyasē ||"}
      ]
    },
    {
      "shlokaNum": "7",
      "entry": [
        {"startTime":"218.723","endTime":"226.700","swhtsp":"l","shlNbr":"00","sty":"","text":"मूकं  करोति  वाचालं  पङ्गुं  लङ्घयते  गिरिम् |","iast":"mūkaṃ  karōti  vācālaṃ  paṅguṃ  laṅghayatē  girim |"},
        {"startTime":"227.082","endTime":"235.529","swhtsp":"","shlNbr":"00","sty":"","text":"यत्कृपा  तमहं  वन्दे  परमानन्दमाधवम् ||","iast":"yatkṛpā  tamahaṃ  vandē  paramānandamādhavam ||"}
      ]
    },
    {
      "shlokaNum": "8",
      "entry": [
        {"startTime":"236.251","endTime":"244.280","swhtsp":"p","shlNbr":"00","sty":"","text":"शान्ताकारं  भुजगशयनं   पद्मनाभं  सुरेशं","iast":"śāntākāraṃ  bhujagaśayanaṃ   padmanābhaṃ  surēśaṃ"},
        {"startTime":"244.689","endTime":"252.509","swhtsp":"l","shlNbr":"00","sty":"","text":"विश्वाधारं  गगनसदृशं   मेघवर्णं  शुभाङ्गम् |","iast":"viśvādhāraṃ  gaganasadṛśaṃ   mēghavarṇaṃ  śubhāṅgam |"},
        {"startTime":"253.022","endTime":"260.868","swhtsp":"p","shlNbr":"00","sty":"","text":"लक्ष्मीकान्तं   कमलनयनं  योगिहृद्ध्यानगम्यं","iast":"lakṣmīkāntaṃ   kamalanayanaṃ  yōgihṛddhyānagamyaṃ"},
        {"startTime":"261.329","endTime":"268.678","swhtsp":"","shlNbr":"00","sty":"","text":"वन्दे  विष्णुं  भवभयहरं   सर्व लोकैकनाथम् ||","iast":"vandē  viṣṇuṃ  bhavabhayaharaṃ   sarva lōkaikanātham ||"}
      ]
    },
    {
      "shlokaNum": "9",
      "entry": [
        {"startTime":"269.322","endTime":"279.284","swhtsp":"p","shlNbr":"00","sty":"","text":"यं  ब्रह्मावरुणेन्द्ररुद्रमरुतः  स्तुन्वन्ति  दिव्यैः  स्तवैः","iast":"yaṃ  brahmāvaruṇēndrarudramarutaḥ  stunvanti  divyaiḥ  stavaiḥ"},
        {"startTime":"279.719","endTime":"289.994","swhtsp":"l","shlNbr":"00","sty":"","text":"वेदैः  साङ्गपदक्रमोपनिषदैः  गायन्ति   यं  सामगाः |","iast":"vēdaiḥ  sāṅgapadakramōpaniṣadaiḥ  gāyanti   yaṃ  sāmagāḥ |"},
        {"startTime":"290.482","endTime":"300.025","swhtsp":"p","shlNbr":"00","sty":"","text":"ध्यानावस्थित  तद्गतेन  मनसा  पश्यन्ति  यं  योगिनः","iast":"dhyānāvasthita  tadgatēna  manasā  paśyanti  yaṃ  yōginaḥ"},
        {"startTime":"300.434","endTime":"310.814","swhtsp":"","shlNbr":"00","sty":"","text":"यस्यान्तं  न  विदुस्सुरासुरगणाः  देवाय  तस्मै  नमः ||","iast":"yasyāntaṃ  na  vidussurāsuragaṇāḥ  dēvāya  tasmai  namaḥ ||"}
      ]
    },
    {
      "shlokaNum": "10",
      "entry": [
        {"startTime":"311.38","endTime":"319.042","swhtsp":"l","shlNbr":"00","sty":"","text":"नारायणं  नमस्कृत्य  नरञ्चैव  नरोत्तमम् |","iast":"nārāyaṇaṃ  namaskṛtya  narañcaiva  narōttamam |"},
        {"startTime":"319.478","endTime":"328.264","swhtsp":"","shlNbr":"00","sty":"","text":"देवीं  सरस्वतीं  व्यासं   ततो  जयमुदीरयेत् ||","iast":"dēvīṃ  sarasvatīṃ  vyāsaṃ   tatō  jayamudīrayēt ||"}
      ]
    },
    {
      "shlokaNum": "11",
      "entry": [
        {"startTime":"328.829","endTime":"337.798","swhtsp":"l","shlNbr":"00","sty":"","text":"सच्चिदानन्दरूपाय    कृष्णायाक्लिष्टकारिणे |","iast":"saccidānandarūpāya    kṛṣṇāyākliṣṭakāriṇē |"},
        {"startTime":"338.26","endTime":"347.072","swhtsp":"","shlNbr":"00","sty":"","text":"नमो  वेदान्तवेद्याय    गुरवे  बुद्धिसाक्षिणे||","iast":"namō  vēdāntavēdyāya    guravē  buddhisākṣiṇē||"}
      ]
    },
    {
      "shlokaNum": "12",
      "entry": [
        {"startTime":"347.664","endTime":"357.129","swhtsp":"l","shlNbr":"00","sty":"","text":"सर्वोपनिषदो  गावः       दोग्धा  गोपालनन्दनः |","iast":"sarvōpaniṣadō  gāvaḥ       dōgdhā  gōpālanandanaḥ |"},
        {"startTime":"357.695","endTime":"367.578","swhtsp":"","shlNbr":"00","sty":"","text":"पार्थो  वत्सः  सुधीर्भोक्ता     दुग्धं  गीतामृतं  महत् ||","iast":"pārthō  vatsaḥ  sudhīrbhōktā     dugdhaṃ  gītāmṛtaṃ  mahat ||"}
      ]
    },
    {
      "shlokaNum": "13",
      "entry": [
        {"startTime":"368.353","endTime":"377.635","swhtsp":"l","shlNbr":"00","sty":"","text":"गीताशास्त्रमिदं  पुण्यं      यः  पठेत्   प्रयतः  पुमान् |","iast":"gītāśāstramidaṃ  puṇyaṃ      yaḥ  paṭhēt   prayataḥ  pumān |"},
        {"startTime":"378.018","endTime":"386.856","swhtsp":"","shlNbr":"00","sty":"","text":"विष्णोः   पदमवाप्नोति      भयशोकादि  वर्जितः  ||","iast":"viṣṇōḥ   padamavāpnōti      bhayaśōkādi  varjitaḥ  ||"}
      ]
    },
    {
      "shlokaNum": "14",
      "entry": [
        {"startTime":"387.5","endTime":"399.405","swhtsp":"l","shlNbr":"00","sty":"","text":"एकं  शास्त्रं  देवकीपुत्रगीतं     एको  देवो  देवकीपुत्र  एव |","iast":"ēkaṃ  śāstraṃ  dēvakīputragītaṃ     ēkō  dēvō  dēvakīputra  ēva |"},
        {"startTime":"399.909","endTime":"410.706","swhtsp":"","shlNbr":"00","sty":"","text":"एको  मन्त्रस्तस्य  नामानि  यानि      कर्माप्येकं  तस्य  देवस्य  सेवा ||","iast":"ēkō  mantrastasya  nāmāni  yāni      karmāpyēkaṃ  tasya  dēvasya  sēvā ||"}
      ]
    },
    {
      "shlokaNum": "15",
      "entry": [
        {"startTime":"411.22","endTime":"417.992","swhtsp":"l","shlNbr":"00","sty":"uh","text":"|| ओं   श्री कृष्णाय   परमात्मने  नमः ||","iast":"|| ōṃ   śrī kṛṣṇāya   paramātmanē  namaḥ ||"}
      ]
    }
  ]
};

// ============================================================
// Task 2: Sanskrit Prosody Engine
// ============================================================
const prosody = (function() {
  'use strict';

  // --- Unicode helpers for Devanagari ---
  function isConsonant(ch) {
    const c = ch.charCodeAt(0);
    return (c >= 0x0915 && c <= 0x0939) ||
           c === 0x0933 ||
           (c >= 0x0958 && c <= 0x095F);
  }

  function isVowel(ch) {
    const c = ch.charCodeAt(0);
    return (c >= 0x0904 && c <= 0x0914);
  }

  function isVowelSign(ch) {
    const c = ch.charCodeAt(0);
    return (c >= 0x093E && c <= 0x094C) ||
           (c >= 0x0962 && c <= 0x0963);
  }

  function isVirama(ch) {
    return ch === '\u094D';
  }

  function isAnusvara(ch) {
    return ch === '\u0902';
  }

  function isVisarga(ch) {
    return ch === '\u0903';
  }

  function isChandrabindu(ch) {
    return ch === '\u0901';
  }

  // Long vowels and their dependent (matra) forms
  const LONG_VOWELS = new Set(['आ', 'ई', 'ऊ', 'ॠ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ']);
  const LONG_VOWEL_SIGNS = new Set([
    '\u093E', // aa
    '\u0940', // ii
    '\u0942', // uu
    '\u0944', // RR
    '\u0963', // LL
    '\u0947', // e
    '\u0948', // ai
    '\u094B', // o
    '\u094C', // au
  ]);

  /**
   * splitSyllables(word) — Split a Devanagari word into syllable strings.
   *
   * Consonant: consume virama+consonant conjuncts, then vowel sign (or implicit 'a'),
   * then anusvara/visarga/chandrabindu = one syllable.
   * Standalone vowel: consume + anusvara/visarga = one syllable.
   * Skip non-Devanagari characters.
   */
  function splitSyllables(word) {
    const syllables = [];
    const chars = Array.from(word); // handle multi-code-unit chars properly
    let i = 0;

    while (i < chars.length) {
      const ch = chars[i];

      if (isConsonant(ch)) {
        // Start of a consonant-based syllable
        let syl = ch;
        i++;

        // Consume virama + consonant conjuncts
        while (i < chars.length && isVirama(chars[i])) {
          syl += chars[i]; // virama
          i++;
          if (i < chars.length && isConsonant(chars[i])) {
            syl += chars[i]; // next consonant in conjunct
            i++;
          }
        }

        // Consume vowel sign (matra) if present, otherwise implicit 'a'
        if (i < chars.length && isVowelSign(chars[i])) {
          syl += chars[i];
          i++;
        }

        // Consume anusvara, visarga, chandrabindu
        while (i < chars.length && (isAnusvara(chars[i]) || isVisarga(chars[i]) || isChandrabindu(chars[i]))) {
          syl += chars[i];
          i++;
        }

        syllables.push(syl);

      } else if (isVowel(ch)) {
        // Standalone vowel syllable
        let syl = ch;
        i++;

        // Consume anusvara, visarga, chandrabindu
        while (i < chars.length && (isAnusvara(chars[i]) || isVisarga(chars[i]) || isChandrabindu(chars[i]))) {
          syl += chars[i];
          i++;
        }

        syllables.push(syl);

      } else {
        // Skip non-Devanagari (spaces, punctuation, nukta, etc.)
        i++;
      }
    }

    return syllables;
  }

  /**
   * isGuru(syllable, nextSyllable) — Determine if a syllable is guru (heavy).
   *
   * Guru if:
   * - Contains a long vowel or long vowel sign
   * - Contains anusvara or visarga
   * - Next syllable starts with 2+ consonants (positional weight from conjunct)
   */
  function isGuru(syllable, nextSyllable) {
    const sylChars = Array.from(syllable);

    // Check for long vowel (independent form)
    for (const ch of sylChars) {
      if (LONG_VOWELS.has(ch)) return true;
    }

    // Check for long vowel sign (dependent matra)
    for (const ch of sylChars) {
      if (LONG_VOWEL_SIGNS.has(ch)) return true;
    }

    // Check for anusvara or visarga
    for (const ch of sylChars) {
      if (isAnusvara(ch) || isVisarga(ch)) return true;
    }

    // Check positional weight: next syllable starts with 2+ consonants
    if (nextSyllable) {
      const nextChars = Array.from(nextSyllable);
      let consonantCount = 0;
      for (const ch of nextChars) {
        if (isConsonant(ch)) {
          consonantCount++;
        } else if (isVirama(ch)) {
          // virama between consonants in conjunct — continue counting
          continue;
        } else {
          break;
        }
      }
      if (consonantCount >= 2) return true;
    }

    return false;
  }

  /**
   * analyzeLine(text) — Analyze a full line of Sanskrit text.
   *
   * Returns array of token objects:
   * { text, beats, isMarker, isGuru, wordEnd }
   *
   * Words "|" or "||" become markers with 2 or 4 beats.
   * Other words are split into syllables and classified.
   */
  function analyzeLine(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const tokens = [];

    for (let wi = 0; wi < words.length; wi++) {
      const word = words[wi];

      // Check for verse markers
      if (word === '|' || word === '||') {
        tokens.push({
          text: word,
          beats: word === '||' ? 4 : 2,
          isMarker: true,
          isGuru: false,
          wordEnd: true
        });
        continue;
      }

      const syllables = splitSyllables(word);

      for (let si = 0; si < syllables.length; si++) {
        const syl = syllables[si];
        // Next syllable: within same word or first syllable of next non-marker word
        let nextSyl = null;
        if (si + 1 < syllables.length) {
          nextSyl = syllables[si + 1];
        } else {
          // Look at the next word's first syllable
          for (let nw = wi + 1; nw < words.length; nw++) {
            if (words[nw] !== '|' && words[nw] !== '||') {
              const nextWordSyls = splitSyllables(words[nw]);
              if (nextWordSyls.length > 0) {
                nextSyl = nextWordSyls[0];
              }
              break;
            }
          }
        }

        const guru = isGuru(syl, nextSyl);
        tokens.push({
          text: syl,
          beats: guru ? 2 : 1,
          isMarker: false,
          isGuru: guru,
          wordEnd: si === syllables.length - 1
        });
      }
    }

    // Pāda-end guru rule: syllable immediately before a marker is always guru
    for (let ti = 1; ti < tokens.length; ti++) {
      if (tokens[ti].isMarker && !tokens[ti - 1].isMarker) {
        tokens[ti - 1].isGuru = true;
        tokens[ti - 1].beats = 2;
      }
    }

    return tokens;
  }

  return { splitSyllables, isGuru, analyzeLine };
})();

// ============================================================
// IAST/ISO 15919 Prosody Engine (for chapters without Devanagari)
// ============================================================
const iastProsody = (function() {
  'use strict';

  // Regex patterns for IAST character classification (case-insensitive matching)
  const VOWEL_RE = /^(ai|au|ā|ī|ū|ṝ|ḹ|ē|ō|a|i|u|ṛ|ḷ|e|o)/i;
  const CONSONANT_RE = /^(kh|gh|ch|jh|ṭh|ḍh|th|dh|ph|bh|k|g|ṅ|c|j|ñ|ṭ|ḍ|ṇ|t|d|n|p|b|m|y|r|l|v|ś|ṣ|s|h)/i;
  const ANUSVARA_RE = /^[ṁṃ]/;
  const VISARGA_RE = /^ḥ/;
  const LONG_VOWELS = new Set(['ā', 'ī', 'ū', 'ṝ', 'ḹ', 'ē', 'ō', 'ai', 'au', 'e', 'o']);

  function splitSyllables(word) {
    const syllables = [];
    let i = 0;
    const lower = word.toLowerCase();

    while (i < lower.length) {
      let m = lower.slice(i).match(CONSONANT_RE);
      if (m) {
        let syl = '';
        let sylLen = 0;
        // Consume consonant cluster
        while (i + sylLen < lower.length) {
          m = lower.slice(i + sylLen).match(CONSONANT_RE);
          if (!m) break;
          syl += word.slice(i + sylLen, i + sylLen + m[0].length);
          sylLen += m[0].length;
        }
        // Consume vowel
        m = lower.slice(i + sylLen).match(VOWEL_RE);
        if (m) {
          syl += word.slice(i + sylLen, i + sylLen + m[0].length);
          sylLen += m[0].length;
        }
        // Consume anusvara/visarga
        m = lower.slice(i + sylLen).match(ANUSVARA_RE) || lower.slice(i + sylLen).match(VISARGA_RE);
        if (m) {
          syl += word.slice(i + sylLen, i + sylLen + m[0].length);
          sylLen += m[0].length;
        }
        if (syl) syllables.push(syl);
        i += sylLen;
      } else {
        m = lower.slice(i).match(VOWEL_RE);
        if (m) {
          let syl = word.slice(i, i + m[0].length);
          let sylLen = m[0].length;
          let m2 = lower.slice(i + sylLen).match(ANUSVARA_RE) || lower.slice(i + sylLen).match(VISARGA_RE);
          if (m2) {
            syl += word.slice(i + sylLen, i + sylLen + m2[0].length);
            sylLen += m2[0].length;
          }
          syllables.push(syl);
          i += sylLen;
        } else {
          i++; // skip non-IAST character
        }
      }
    }
    return syllables;
  }

  function isGuru(syllable, nextSyllable) {
    const lower = syllable.toLowerCase();
    // Check for long vowel
    for (const v of LONG_VOWELS) {
      if (lower.includes(v)) return true;
    }
    // Check anusvara/visarga
    if (/[ṁṃḥ]/.test(lower)) return true;
    // Positional: next syllable starts with 2+ consonants
    if (nextSyllable) {
      const nextLower = nextSyllable.toLowerCase();
      let count = 0, j = 0;
      while (j < nextLower.length) {
        const cm = nextLower.slice(j).match(CONSONANT_RE);
        if (cm) { count++; j += cm[0].length; }
        else break;
      }
      if (count >= 2) return true;
    }
    return false;
  }

  function analyzeLine(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const tokens = [];

    for (let wi = 0; wi < words.length; wi++) {
      const word = words[wi];
      // Verse markers: |, ||, ||1||, etc.
      if (/^\|+$/.test(word) || /^\|\|\d+\|\|$/.test(word)) {
        tokens.push({ text: word, beats: word.includes('||') ? 4 : 2, isMarker: true, isGuru: false, wordEnd: true });
        continue;
      }
      const syllables = splitSyllables(word);
      for (let si = 0; si < syllables.length; si++) {
        let nextSyl = null;
        if (si + 1 < syllables.length) {
          nextSyl = syllables[si + 1];
        } else {
          for (let nw = wi + 1; nw < words.length; nw++) {
            if (!/^\|/.test(words[nw])) {
              const ns = splitSyllables(words[nw]);
              if (ns.length > 0) nextSyl = ns[0];
              break;
            }
          }
        }
        const guru = isGuru(syllables[si], nextSyl);
        tokens.push({ text: syllables[si], beats: guru ? 2 : 1, isMarker: false, isGuru: guru, wordEnd: si === syllables.length - 1 });
      }
    }
    // Pāda-end guru rule
    for (let ti = 1; ti < tokens.length; ti++) {
      if (tokens[ti].isMarker && !tokens[ti - 1].isMarker) {
        tokens[ti - 1].isGuru = true;
        tokens[ti - 1].beats = 2;
      }
    }
    return tokens;
  }

  return { splitSyllables, isGuru, analyzeLine };
})();

// ============================================================
// Task 3: Data Layer (lazy-load current + prefetch next)
// ============================================================
const dataLayer = (function() {
  'use strict';

  // Ordered list of all chapter IDs
  const CHAPTER_ORDER = [
    'datta_stavam', 'invocation_prayers', '0',
    '1','2','3','4','5','6','7','8','9',
    '10','11','12','13','14','15','16','17','18',
    'gita_mahatmyam', 'kshama_prarthana', 'gita_saram', 'gita_arati', 'sadguru_stavam'
  ];

  let pages = [];
  let chapterName = '';
  let currentChapterId = null;
  const cache = {}; // chapterId -> parsed JSON data

  function groupIntoPages(shlokas) {
    const result = [];

    for (const shloka of shlokas) {
      const headerEntries = shloka.entry.filter(e => e.sty === 'fh' || e.sty === 'sh' || e.sty === 'th' || e.sty === 'uh');
      const regularEntries = shloka.entry.filter(e => e.sty !== 'fh' && e.sty !== 'sh' && e.sty !== 'th' && e.sty !== 'uh');

      for (const hdr of headerEntries) {
        result.push({
          shlokaNum: shloka.shlokaNum,
          lines: [{ text: hdr.text, iast: hdr.iast || '', swhtsp: hdr.swhtsp, sty: hdr.sty }],
          isHeader: true
        });
      }

      if (regularEntries.length > 0) {
        const page = {
          shlokaNum: shloka.shlokaNum,
          lines: regularEntries.map(e => ({ text: e.text, iast: e.iast || '', swhtsp: e.swhtsp, sty: e.sty })),
          isHeader: false
        };
        // Colophon ("|| ōṃ tatsaditi ...") — leading || distinguishes it from
        // verse 17.23, which also begins with "ōṃ tatsaditi".
        const first = (page.lines[0].iast || page.lines[0].text || '');
        page.isCloser = /^\s*\|\|.*tatsaditi/.test(first) || /^\s*\|\|.*तत्सदिति/.test(first);
        result.push(page);
      }
    }

    return result;
  }

  function chapterUrl(id) {
    const num = parseInt(id, 10);
    if (!isNaN(num) && num >= 1 && num <= 18) {
      return '../data/chapter_' + String(num).padStart(2, '0') + '.json';
    }
    // Named chapters: datta_stavam, sadguru_stavam, gita_mahatmyam, kshama_prarthana
    return '../data/' + id + '.json';
  }

  async function loadChapterData(id) {
    if (cache[id]) return cache[id];

    if (id === '0' || id === 0) {
      cache['0'] = EMBEDDED_DHYANA;
      return EMBEDDED_DHYANA;
    }

    const url = chapterUrl(id);
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('HTTP ' + resp.status + ' loading ' + url);
    const data = await resp.json();
    cache[id] = data;
    return data;
  }

  function prefetch(id) {
    if (!cache[id]) {
      loadChapterData(id).catch(function() {});
    }
  }

  async function fetchChapter(id) {
    id = String(id);
    const data = await loadChapterData(id);
    currentChapterId = id;
    chapterName = data.name || '';
    pages = groupIntoPages(data.shloka || []);

    // Prefetch next chapter in background
    var idx = CHAPTER_ORDER.indexOf(id);
    if (idx >= 0 && idx < CHAPTER_ORDER.length - 1) {
      prefetch(CHAPTER_ORDER[idx + 1]);
    }

    return { name: chapterName, pageCount: pages.length, defaultBpm: data.defaultBpm || null };
  }

  function getPage(index) {
    if (index < 0 || index >= pages.length) return null;
    return pages[index];
  }

  function getPageCount() {
    return pages.length;
  }

  function getChapterName() {
    return chapterName;
  }

  function getCurrentChapterId() {
    return currentChapterId;
  }

  function getNextChapterId() {
    var idx = CHAPTER_ORDER.indexOf(currentChapterId);
    if (idx >= 0 && idx < CHAPTER_ORDER.length - 1) return CHAPTER_ORDER[idx + 1];
    return null;
  }

  function getPrevChapterId() {
    var idx = CHAPTER_ORDER.indexOf(currentChapterId);
    if (idx > 0) return CHAPTER_ORDER[idx - 1];
    return null;
  }

  return { fetchChapter, getPage, getPageCount, getChapterName, getCurrentChapterId, getNextChapterId, getPrevChapterId, CHAPTER_ORDER };
})();

// ============================================================
// Task 4: UI Renderer
// ============================================================
const renderer = (function() {
  'use strict';

  let currentMode = 'asterisk';
  let currentPageData = null;
  let syllableElements = [];

  // Double-buffer: render next page into the hidden buffer, swap on advance
  const buffers = [
    document.getElementById('verse-container-a'),
    document.getElementById('verse-container-b')
  ];
  let activeBuffer = 0; // index into buffers[]
  let backBuffer = null; // { index, chapterNum, elements } or null

  /**
   * renderInto(target, pageData) — Render a page into a specific buffer element.
   * Returns the syllable elements array.
   */
  function renderInto(target, pageData) {
    target.textContent = '';
    const elements = [];

    for (const line of pageData.lines) {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'verse-line';

      if (pageData.isHeader) {
        if (line.sty === 'fh') {
          lineDiv.style.color = '#FFD700';
          lineDiv.style.fontSize = '3vw';
        } else if (line.sty === 'sh') {
          lineDiv.style.color = '#fff';
          lineDiv.style.fontSize = '2.5vw';
        }

        const hHasDevanagari = /[\u0900-\u097F]/.test(line.text);
        const hAnalyzeText = hHasDevanagari ? line.text : (line.iast || line.text);
        const hAnalyzer = hHasDevanagari ? prosody : iastProsody;
        const hTokens = hAnalyzer.analyzeLine(hAnalyzeText);
        const hLineStart = elements.length;

        if (currentMode !== 'asterisk') {
          // English mode: one animated span per header line, sweeps left→right
          const displayText = line.iast || line.text;
          const totalBeats = hTokens.reduce((sum, t) => sum + t.beats, 0);
          const span = document.createElement('span');
          span.className = 'syllable';
          span.dataset.index = elements.length;
          span.dataset.beats = Math.max(1, totalBeats);
          span.textContent = displayText;
          elements.push(span);
          lineDiv.appendChild(span);
        } else {
          // Asterisk mode: one ✱ per syllable, all animated
          for (let ti = 0; ti < hTokens.length; ti++) {
            const token = hTokens[ti];
            const span = document.createElement('span');
            span.dataset.beats = token.beats;
            if (token.isMarker) {
              span.className = 'verse-marker';
              span.textContent = token.text;
              elements.push(span);
            } else {
              span.className = 'syllable';
              span.dataset.index = elements.length;
              span.textContent = '✱';
              elements.push(span);
            }
            lineDiv.appendChild(span);
            if (token.wordEnd) {
              lineDiv.appendChild(document.createTextNode(' '));
            }
          }
        }

        // Header lines use splitEnd (no inter-line pause) — the page itself ends naturally
        for (let i = elements.length - 1; i >= hLineStart; i--) {
          if (!elements[i].classList.contains('verse-marker')) {
            elements[i].dataset.splitEnd = '1';
            break;
          }
        }

        target.appendChild(lineDiv);
        continue;
      }
      const lineStartIndex = elements.length;

      // Determine which prosody engine to use
      // If text is Devanagari (has Unicode 0900+ chars), use Devanagari prosody; otherwise IAST
      const hasDevanagari = /[\u0900-\u097F]/.test(line.text);
      const analyzeText = hasDevanagari ? line.text : (line.iast || line.text);
      const analyzer = hasDevanagari ? prosody : iastProsody;

      if (currentMode === 'english') {
        // English mode: show IAST text, one span per line with total beats
        const displayText = line.iast || line.text;
        const tokens = analyzer.analyzeLine(analyzeText);
        const totalBeats = tokens.reduce((sum, t) => sum + t.beats, 0);

        // Split long-chandas padas only for chapters that use the 8-line book layout
        // (Dhyana Shlokas and Invocation Prayers). Gita chapters 1-18 use 4-line layout.
        const syllableCount = tokens.filter(t => !t.isMarker).length;
        const chId = dataLayer.getCurrentChapterId();
        const allowLongChandasSplit = (chId === '0' || chId === 'invocation_prayers');
        if (syllableCount > 9 && allowLongChandasSplit) {
          // Split at word boundary closest to half syllables.
          // On a tie, prefer the boundary AT OR AFTER the midpoint so the longer
          // group comes first (natural for Trishtubh 6+5 or 5+6 patterns).
          const half = Math.ceil(syllableCount / 2);
          const wordBdry = []; // {syl, wordIdx} for each word boundary
          let cumSyl = 0, wIdx = 0;
          for (const t of tokens) {
            if (!t.isMarker) cumSyl++;
            if (t.wordEnd) wordBdry.push({ syl: cumSyl, wordIdx: ++wIdx });
          }
          let splitAfterSyl = half, splitWord = Math.max(1, Math.floor(wordBdry.length / 2)), bestDist = Infinity;
          for (const wb of wordBdry) {
            const dist = Math.abs(wb.syl - half);
            if (dist < bestDist || (dist === bestDist && wb.syl >= half)) {
              bestDist = dist; splitAfterSyl = wb.syl; splitWord = wb.wordIdx;
            }
          }

          const dispWords = displayText.split(/\s+/).filter(Boolean);
          const firstHalf = dispWords.slice(0, splitWord).join(' ');
          const secondHalf = dispWords.slice(splitWord).join(' ');
          const firstBeats = Math.max(1, Math.round(totalBeats * splitAfterSyl / syllableCount));
          const secondBeats = Math.max(1, totalBeats - firstBeats);

          // First half — splitEnd (not lineEnd) so no extra pause between the two halves
          const span1 = document.createElement('span');
          span1.className = 'syllable';
          span1.dataset.index = elements.length;
          span1.dataset.beats = firstBeats;
          span1.dataset.splitEnd = '1';
          span1.textContent = firstHalf;
          elements.push(span1);
          lineDiv.appendChild(span1);
          target.appendChild(lineDiv);

          // Second half — tighter top margin shows it belongs to the same pada
          const lineDiv2 = document.createElement('div');
          lineDiv2.className = 'verse-line verse-line-continuation';
          const span2 = document.createElement('span');
          span2.className = 'syllable';
          span2.dataset.index = elements.length;
          span2.dataset.beats = secondBeats;
          span2.dataset.lineEnd = '1';
          span2.textContent = secondHalf;
          elements.push(span2);
          lineDiv2.appendChild(span2);
          target.appendChild(lineDiv2);
          continue;
        } else {
          const span = document.createElement('span');
          span.className = 'syllable';
          span.dataset.index = elements.length;
          span.dataset.beats = totalBeats;
          span.textContent = displayText;
          elements.push(span);
          lineDiv.appendChild(span);
        }
      } else {
        // Asterisk mode: show \u2731 per syllable using appropriate prosody engine
        const tokens = analyzer.analyzeLine(analyzeText);
        const syllableCount = tokens.filter(t => !t.isMarker).length;

        const chIdAst = dataLayer.getCurrentChapterId();
        const allowSplitAst = (chIdAst === '0' || chIdAst === 'invocation_prayers');
        if (syllableCount > 9 && allowSplitAst) {
          // Long-chandas: split into two lines at the word boundary closest to half syllables
          const half = Math.ceil(syllableCount / 2);
          // Asterisk mode: split at the exact syllable midpoint for even display.
          // Word boundaries are respected for post-split only (markers stay on line 2).
          const splitAtSyl = Math.floor(syllableCount / 2);

          const lineDiv2 = document.createElement('div');
          lineDiv2.className = 'verse-line verse-line-continuation';
          let currentDiv = lineDiv;
          let syllIdx = 0, switched = false;

          for (let ti = 0; ti < tokens.length; ti++) {
            const token = tokens[ti];

            // Switch to line 2 at the exact midpoint syllable
            if (!switched && !token.isMarker && syllIdx === splitAtSyl) {
              for (let i = elements.length - 1; i >= lineStartIndex; i--) {
                if (!elements[i].classList.contains('verse-marker')) {
                  elements[i].dataset.splitEnd = '1'; break; // no extra pause between halves
                }
              }
              target.appendChild(lineDiv);
              currentDiv = lineDiv2;
              switched = true;
            }

            const span = document.createElement('span');
            span.dataset.beats = token.beats;

            if (token.isMarker) {
              span.className = 'verse-marker';
              span.textContent = token.text;
              elements.push(span);
            } else {
              span.className = 'syllable';
              span.dataset.index = elements.length;
              span.textContent = '\u2731';
              elements.push(span);
              syllIdx++;
            }
            currentDiv.appendChild(span);

            if (token.wordEnd) {
              currentDiv.appendChild(document.createTextNode(' '));
            }
          }

          // Mark lineEnd on last syllable of second half
          for (let i = elements.length - 1; i >= lineStartIndex; i--) {
            if (!elements[i].classList.contains('verse-marker')) {
              elements[i].dataset.lineEnd = '1'; break;
            }
          }
          target.appendChild(currentDiv);
          continue;
        }

        // Anushtubh (8 syllables): normal single-line rendering
        for (let ti = 0; ti < tokens.length; ti++) {
          const token = tokens[ti];
          const span = document.createElement('span');
          span.dataset.beats = token.beats;

          if (token.isMarker) {
            span.className = 'verse-marker';
            span.textContent = token.text;
            elements.push(span);
          } else {
            span.className = 'syllable';
            span.dataset.index = elements.length;
            span.textContent = '\u2731';
            elements.push(span);
          }

          lineDiv.appendChild(span);

          if (token.wordEnd) {
            lineDiv.appendChild(document.createTextNode('\u2003'));
          }
        }
      }

      for (let i = elements.length - 1; i >= lineStartIndex; i--) {
        if (!elements[i].classList.contains('verse-marker')) {
          elements[i].dataset.lineEnd = '1';
          break;
        }
      }

      target.appendChild(lineDiv);
    }

    return elements;
  }

  /** Render page into the active (visible) buffer. */
  function renderPage(pageData) {
    currentPageData = pageData;
    syllableElements = renderInto(buffers[activeBuffer], pageData);
    backBuffer = null;
  }

  /** Pre-render the next page into the hidden buffer. */
  function prefetchPage(pageIndex, chapterNum) {
    const pageData = dataLayer.getPage(pageIndex);
    if (!pageData) { backBuffer = null; return; }
    const hiddenIdx = 1 - activeBuffer;
    const elements = renderInto(buffers[hiddenIdx], pageData);
    backBuffer = { index: pageIndex, chapterNum: chapterNum, elements: elements, pageData: pageData };
  }

  /** Swap hidden buffer to visible. Returns true if the prefetched page matched. */
  function swapPrefetched(pageIndex, chapterNum) {
    if (!backBuffer) return false;
    if (backBuffer.index !== pageIndex || backBuffer.chapterNum !== chapterNum) return false;

    // Hide current, show prefetched — no DOM rebuild
    buffers[activeBuffer].style.display = 'none';
    activeBuffer = 1 - activeBuffer;
    buffers[activeBuffer].style.display = '';

    currentPageData = backBuffer.pageData;
    syllableElements = backBuffer.elements;
    backBuffer = null;
    return true;
  }

  /** Invalidate back buffer (e.g. on chapter change or mode switch). */
  function invalidatePrefetch() {
    backBuffer = null;
    buffers[1 - activeBuffer].textContent = '';
  }

  function setMode(mode) {
    currentMode = mode;

    // Update button states
    const buttons = document.querySelectorAll('.mode-btn');
    buttons.forEach(function(btn) {
      if (btn.dataset.mode === mode) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    // Re-render if we have page data
    invalidatePrefetch();
    if (currentPageData) {
      renderPage(currentPageData);
    }
  }

  function getSyllableElements() {
    return syllableElements;
  }

  return {
    renderPage: renderPage,
    prefetchPage: prefetchPage,
    swapPrefetched: swapPrefetched,
    invalidatePrefetch: invalidatePrefetch,
    setMode: setMode,
    getSyllableElements: getSyllableElements,
    getMode: function() { return currentMode; }
  };
})();

// ============================================================
// Task 5: Animation Engine
// ============================================================
const animator = (function() {
  'use strict';

  let isPlaying = false;
  let currentIndex = -1;
  let timeoutId = null;
  let bpm = 380; // internal beats; displayed as whole notes (bpm/4), default 95
  let onSyllableChange = null; // callback: function(index, state) where state is 'active' or 'done'
  let onAutoAdvance = null; // callback: called when animation reaches end of page

  const pointer = document.getElementById('pointer');
  const btnPlay = document.getElementById('btn-play');
  const btnPause = document.getElementById('btn-pause');

  function getBeatMs() {
    return 60000 / bpm;
  }

  function setBpm(newBpm) {
    bpm = Math.max(40, Math.min(600, newBpm));
  }

  function play() {
    isPlaying = true;
    if (btnPlay) btnPlay.disabled = true;
    if (btnPause) btnPause.disabled = false;
    advance();
  }

  function pause() {
    isPlaying = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (btnPlay) btnPlay.disabled = false;
    if (btnPause) btnPause.disabled = true;
  }

  function reset() {
    pause();
    const elems = renderer.getSyllableElements();
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove('active');
      elems[i].classList.remove('done');
    }
    currentIndex = -1;
    hidePointer();
  }

  function advance() {
    if (!isPlaying) return;

    const elems = renderer.getSyllableElements();

    // Mark previous element as done
    if (currentIndex >= 0 && currentIndex < elems.length) {
      elems[currentIndex].classList.remove('active');
      elems[currentIndex].classList.add('done');
      if (onSyllableChange) onSyllableChange(currentIndex, 'done');
    }

    currentIndex++;

    // Past end — auto-advance to next page if available, otherwise stop
    if (currentIndex >= elems.length) {
      isPlaying = false;
      if (btnPlay) btnPlay.disabled = false;
      if (btnPause) btnPause.disabled = true;
      hidePointer();
      // Auto-advance to next page — notify via callback
      if (onAutoAdvance) {
        timeoutId = setTimeout(function() {
          onAutoAdvance();
        }, 0);
      }
      return;
    }

    // Skip verse markers (danda / double danda) — they are not pronounced
    // but add a natural pause between lines
    const el = elems[currentIndex];
    if (el.classList.contains('verse-marker')) {
      el.classList.add('done');
      currentIndex++;
      // No extra pause — the preceding syllable's line-end pause covers it
      return advance();
    }

    // Activate current element
    el.classList.add('active');
    if (onSyllableChange) onSyllableChange(currentIndex, 'active');

    const beats = parseInt(el.dataset.beats, 10) || 1;
    const durationMs = beats * getBeatMs();

    // Find the next non-marker syllable
    var nextIdx = currentIndex + 1;
    while (nextIdx < elems.length && elems[nextIdx].classList.contains('verse-marker')) {
      nextIdx++;
    }

    if (el.dataset.splitEnd) {
      // Mid-pada split: transition to continuation line with NO extra pause
      // The two halves of the same pada flow continuously
      positionPointerInstant(el);
      requestAnimationFrame(function() {
        var r = el.getBoundingClientRect();
        pointer.style.transition = 'left ' + (durationMs / 1000) + 's linear';
        pointer.style.left = (r.right - 18) + 'px';
      });
      timeoutId = setTimeout(function() {
        el.classList.remove('active');
        el.classList.add('done');
        if (onSyllableChange) onSyllableChange(currentIndex, 'done');
        currentIndex = nextIdx - 1;
        if (nextIdx < elems.length) {
          positionPointerInstant(elems[nextIdx]);
        }
        // No extra pause — immediately continue into the second half of the pada
        advance();
      }, durationMs);
    } else if (el.dataset.lineEnd) {
      // Line end (between padas): glide to right edge, honour marker beats, then pause 1 laghu
      positionPointerInstant(el);
      requestAnimationFrame(function() {
        var r = el.getBoundingClientRect();
        pointer.style.transition = 'left ' + (durationMs / 1000) + 's linear';
        pointer.style.left = (r.right - 18) + 'px';
      });
      timeoutId = setTimeout(function() {
        el.classList.remove('active');
        el.classList.add('done');
        if (onSyllableChange) onSyllableChange(currentIndex, 'done');
        // Mark skipped dandas as done and collect their beats (| = 2 beats, || = 4 beats)
        var markerBeats = 0;
        for (var i = currentIndex + 1; i < nextIdx; i++) {
          markerBeats += (parseInt(elems[i].dataset.beats, 10) || 0);
          elems[i].classList.add('done');
          if (onSyllableChange) onSyllableChange(i, 'done');
        }
        currentIndex = nextIdx - 1;
        if (nextIdx < elems.length) {
          positionPointerInstant(elems[nextIdx]);
        }
        // Pause for marker beats + 1 laghu before continuing
        timeoutId = setTimeout(advance, (markerBeats + 1) * getBeatMs());
      }, durationMs);
    } else if (nextIdx < elems.length) {
      // Glide pointer from current toward next syllable over the duration
      positionPointerInstant(el);
      requestAnimationFrame(function() {
        positionPointer(elems[nextIdx], durationMs);
      });
      timeoutId = setTimeout(advance, durationMs);
    } else {
      // Last syllable on the page
      positionPointerInstant(el);
      timeoutId = setTimeout(advance, durationMs);
    }
  }

  function positionPointer(el, transitionMs) {
    const rect = el.getBoundingClientRect();
    if (transitionMs !== undefined) {
      pointer.style.transition = 'left ' + (transitionMs / 1000) + 's linear, top 0.15s ease-out';
    }
    pointer.style.display = 'block';
    pointer.style.left = (rect.left + rect.width / 2 - 18) + 'px';
    pointer.style.top = (rect.top - 40) + 'px';
  }

  function positionPointerInstant(el) {
    pointer.style.transition = 'none';
    const rect = el.getBoundingClientRect();
    pointer.style.display = 'block';
    pointer.style.left = (rect.left + rect.width / 2 - 18) + 'px';
    pointer.style.top = (rect.top - 40) + 'px';
    // Force reflow so 'none' takes effect before we re-enable transitions
    pointer.offsetWidth;
  }

  function hidePointer() {
    pointer.style.display = 'none';
  }

  function getState() {
    return { isPlaying: isPlaying, currentIndex: currentIndex, bpm: bpm };
  }

  function restore(state) {
    // Stop any running animation
    if (timeoutId) clearTimeout(timeoutId);
    isPlaying = false;

    const elems = renderer.getSyllableElements();
    currentIndex = Math.min(state.currentIndex, elems.length - 1);

    // Re-apply active/done classes to match previous state
    for (let i = 0; i < elems.length; i++) {
      if (i < currentIndex) {
        elems[i].classList.add('done');
      } else if (i === currentIndex && currentIndex >= 0) {
        elems[i].classList.add('active');
        positionPointerInstant(elems[i]);
      }
    }

    // Resume playing if it was playing
    if (state.isPlaying && currentIndex >= 0) {
      isPlaying = true;
      if (btnPlay) btnPlay.disabled = true;
      if (btnPause) btnPause.disabled = false;
      const beats = parseInt(elems[currentIndex].dataset.beats, 10) || 1;
      const lineEndPause = elems[currentIndex].dataset.lineEnd ? 1 : 0;
      timeoutId = setTimeout(advance, (beats + lineEndPause) * getBeatMs());
    } else if (currentIndex < 0) {
      hidePointer();
    }
  }

  return {
    play: play,
    pause: pause,
    reset: reset,
    setBpm: setBpm,
    getState: getState,
    restore: restore,
    getBeatMs: getBeatMs,
    setOnSyllableChange: function(cb) { onSyllableChange = cb; },
    setOnAutoAdvance: function(cb) { onAutoAdvance = cb; }
  };
})();
