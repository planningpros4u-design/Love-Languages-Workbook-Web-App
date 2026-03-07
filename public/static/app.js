/* ================================================================
   THE LOVE LANGUAGES WORKBOOK - app.js  (complete rewrite)
   ================================================================ */

// ── QUIZ DATA ─────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  { a: "I feel loved when my partner tells me specifically what they appreciate about me.", b: "I feel loved when my partner sits with me and gives me their complete attention." },
  { a: "A small, thoughtful surprise means more to me than an expensive grand gesture.", b: "When my partner does something helpful without being asked, I feel deeply cared for." },
  { a: "Physical closeness, like my partner reaching for my hand, makes me feel connected.", b: "I feel most loved when my partner looks me in the eye and really listens to me." },
  { a: "Words of encouragement from my partner genuinely lift me up.", b: "I feel loved when my partner takes care of something stressful so I don't have to." },
  { a: "A hug at the right moment means everything to me.", b: "Receiving a small gift that shows my partner was thinking about me makes me feel special." },
  { a: "I feel cherished when my partner chooses to spend free time with me.", b: "My partner saying \"I love you\" out loud still matters every single time." },
  { a: "When my partner handles a task I've been dreading, I feel genuinely loved.", b: "Being touched affectionately, even casually, helps me feel close and secure." },
  { a: "A heartfelt compliment from my partner stays with me all day.", b: "A little gift that says \"I thought of you\" moves me more than words can." },
  { a: "I feel loved when we do something together, even something small like cooking dinner.", b: "When my partner touches my face, holds my hand, or puts their arm around me, I feel safe." },
  { a: "My partner picking up something I mentioned wanting once, without me asking again, means a lot.", b: "My partner writing me a note or a message that says something real makes me emotional." },
  { a: "I feel most loved when my partner follows through on something they said they'd do.", b: "Undivided, phone-free time together feels like a real gift to me." },
  { a: "A long hug when I come home matters more to me than almost anything.", b: "When my partner quietly handles something hard for me, I feel genuinely taken care of." },
  { a: "Hearing my partner say they're proud of me or believe in me fills something in me.", b: "A meaningful gift, even something small and inexpensive, tells me I was on their mind." },
  { a: "My partner choosing to spend time with me over other options makes me feel chosen.", b: "Physical touch, even casual, everyday contact, keeps me feeling connected." },
  { a: "When my partner does something kind and practical for me, it speaks louder than words.", b: "My partner telling me what they love about me specifically is deeply meaningful." },
  { a: "A small, thoughtful gift I didn't ask for moves me emotionally.", b: "Quality time together, really together and not just in the same room, is what I need most." },
  { a: "Physical affection, cuddling, holding hands, sitting close, is how I feel most at home.", b: "Hearing sincere, specific words of love or appreciation from my partner means the world." },
  { a: "My partner helping with something difficult, without making it a big deal, shows real love.", b: "A small token or memento, something that shows they remembered, touches me deeply." },
  { a: "I feel deeply loved when my partner makes time for me, just us with no distractions.", b: "Physical closeness and affectionate touch are how I know I'm loved." },
  { a: "My partner expressing gratitude or admiration out loud and sincerely fills my love tank.", b: "My partner doing something thoughtful and practical for me without being asked is how I feel truly loved." }
];

// Scoring key: for each language, which (question index 1-based, choice A or B) maps to it
const SCORING_KEY = {
  words:   [{q:1,c:'A'},{q:6,c:'B'},{q:8,c:'A'},{q:10,c:'B'},{q:13,c:'A'},{q:15,c:'B'},{q:17,c:'B'},{q:20,c:'A'}],
  time:    [{q:1,c:'B'},{q:6,c:'A'},{q:9,c:'A'},{q:11,c:'B'},{q:14,c:'A'},{q:16,c:'B'},{q:19,c:'A'}],
  touch:   [{q:3,c:'A'},{q:5,c:'A'},{q:7,c:'B'},{q:9,c:'B'},{q:12,c:'A'},{q:14,c:'B'},{q:17,c:'A'},{q:19,c:'B'}],
  service: [{q:2,c:'B'},{q:4,c:'B'},{q:7,c:'A'},{q:11,c:'A'},{q:15,c:'A'},{q:18,c:'A'},{q:20,c:'B'}],
  gifts:   [{q:2,c:'A'},{q:5,c:'B'},{q:8,c:'B'},{q:10,c:'A'},{q:13,c:'B'},{q:16,c:'A'},{q:18,c:'B'}]
};

const LL = {
  words:   { label: "Words of Affirmation", icon: "💬", cls: "words",   color: "#A0607A", max: 8 },
  time:    { label: "Quality Time",         icon: "⏱",  cls: "time",    color: "#7A9E84", max: 7 },
  touch:   { label: "Physical Touch",       icon: "🤝", cls: "touch",   color: "#8B6BA8", max: 8 },
  service: { label: "Acts of Service",      icon: "🛠",  cls: "service", color: "#C89A4A", max: 7 },
  gifts:   { label: "Receiving Gifts",      icon: "🎁", cls: "gifts",   color: "#5B8FB8", max: 7 }
};

const LL_DESC = {
  words: {
    full: "At its core, this language is about verbal acknowledgment -- the need to have your worth, your effort, and your presence in someone's life spoken out loud. For people whose primary language is words, silence is loud and specific praise is felt in the chest.",
    needs: "Specific, genuine praise; hearing \"I love you\" regularly and sincerely; and to have their efforts and contributions named out loud.",
    hurt: "Harsh words, criticism delivered carelessly, or long stretches without affirmation, even if everything is technically fine.",
    quote: "\"I just need to hear that you notice me.\""
  },
  time: {
    full: "This language is about prioritized, intentional presence. Not just proximity but actual connection. People who speak this language feel most loved when their partner chooses them, clears the noise, and shows up fully.",
    needs: "Focused attention without competing distractions, shared experiences that feel intentional, and eye contact and genuine conversation that says: you are my priority right now.",
    hurt: "Cancelled plans, distracted presence, or feeling like they are always competing with a phone, a project, or other people's needs.",
    quote: "\"I don't need much. I just need you to actually be here.\""
  },
  touch: {
    full: "This language lives in the body. For people whose primary language is physical touch, affectionate contact is a constant, quiet reassurance that all is well between you. It's not about any single big gesture. It's about the steady, small ones.",
    needs: "Regular, casual physical affection (not just during intimate moments), to be reached for, held, touched, and kept close, and to feel their partner's physical presence as a baseline of security.",
    hurt: "Physical withdrawal, being withheld from during conflict, or long periods without affectionate contact, which can feel to them like emotional distance.",
    quote: "\"When you stop touching me, I think something is wrong with us.\""
  },
  service: {
    full: "For people who speak this language, love is demonstrated through action, specifically through the kind of quiet, practical help that makes someone's life easier. The most romantic thing you can do for this person is notice what they need and handle it.",
    needs: "A partner who follows through and does what they say they'll do, to have their effort recognized and reciprocated, and to feel that the weight of life is carried together.",
    hurt: "Broken promises, leaving tasks undone that you said you'd handle, or a partner who is warm in words but absent in action.",
    quote: "\"If you loved me, you would just do it. I shouldn't have to ask.\""
  },
  gifts: {
    full: "This is the most misread love language, and it deserves a proper defense. This is not about materialism. It is about the symbol. A gift is physical proof that someone crossed your mind and acted on it. The price is irrelevant. The thought is everything.",
    needs: "To receive tokens of thoughtfulness regularly (frequency matters more than size), to feel remembered in small, tangible ways, and to see evidence that they exist in their partner's mind even when they're not in the room.",
    hurt: "Forgotten occasions, receiving clearly thoughtless or obligatory gifts, or a partner who dismisses the importance of the gesture entirely.",
    quote: "\"I just want to know that you think about me when I'm not in the room.\""
  }
};

const TRANSLATION_GUIDE = {
  words: {
    dos: [
      "Say \"I love you\" regularly and mean it, not just on special occasions",
      "Tell them specifically what you admire, appreciate, or find beautiful",
      "Send a message out of nowhere that says you were thinking of them",
      "Acknowledge their effort out loud, especially when they've been working hard",
      "Praise them in front of others, because being seen positively is deeply affirming"
    ],
    donts: [
      "Go long stretches without verbal affirmation, even if everything is fine",
      "Criticize carelessly in the heat of a moment, because those words stay long",
      "Assume they know how you feel without you saying it"
    ]
  },
  time: {
    dos: [
      "Put your phone down and actually be present -- truly present",
      "Plan something intentional, even if simple: a walk, a meal, a drive",
      "Ask real questions and listen all the way to the end of their answer",
      "Choose them and make it clear that being with them is something you want",
      "Create recurring rituals, however small, that belong to just the two of you"
    ],
    donts: [
      "Cancel or repeatedly postpone time you had planned together",
      "Be distracted during what was supposed to be their time",
      "Fill every shared moment with screens or other people"
    ]
  },
  touch: {
    dos: [
      "Reach for them casually throughout the day: a hand on the back, a quick squeeze",
      "Greet them and leave them with real physical warmth, a proper hug",
      "Stay physically close during hard conversations rather than creating distance",
      "Initiate affection for no reason, not just when you want something",
      "Sit close enough to touch when you're watching something or resting together"
    ],
    donts: [
      "Withdraw physically during conflict or stress",
      "Go long stretches without casual, non-transactional touch",
      "Pull away in public or in front of others"
    ]
  },
  service: {
    dos: [
      "Handle something difficult before they have to ask, by anticipating and acting",
      "Follow through on what you say you'll do, every time, without being reminded",
      "Step in during busy seasons and carry more of the weight",
      "Do the small, unglamorous tasks that nobody notices but keep life running",
      "Complete things fully, not halfway done and abandoned"
    ],
    donts: [
      "Make promises and don't keep them",
      "Leave tasks undone that you said you'd handle",
      "Only help when asked, because they need you to pay attention without prompting"
    ]
  },
  gifts: {
    dos: [
      "Pick up something small that reminded you of them, even a candy bar or a flower",
      "Remember things they mentioned wanting and act on it, unprompted",
      "Mark meaningful occasions thoughtfully, because the thought matters more than the price",
      "Give them something that says \"I paid attention,\" like a book they mentioned",
      "Create a memento from a shared experience: a photo printed, a ticket saved"
    ],
    donts: [
      "Forget occasions that matter to them",
      "Give clearly generic or obligatory gifts",
      "Dismiss the importance of small gestures"
    ]
  }
};

const ACTION_POOL = {
  words: [
    "Send a voice note that says something specific you love about them -- not a text but a voice note",
    "Leave a handwritten sticky note somewhere they'll find it after you're gone",
    "Say \"I'm proud of you\" out loud, unprompted, and mean it",
    "Text them in the middle of a random Tuesday just to say you were thinking of them",
    "Tell them one thing they do that you would genuinely miss if they stopped",
    "Thank them for something specific they did this week and name it clearly",
    "Say out loud what you find beautiful about them, not just physically",
    "Share a memory of a moment with them that made you think \"I'm so glad I have this person\"",
    "Read something they wrote, made, or shared and tell them what it meant to you",
    "Before you fall asleep tonight, say one true thing you love about who they are"
  ],
  time: [
    "Have a phone-free dinner with phones in another room and just the two of you",
    "Take a 20-minute walk together with nowhere to go and no agenda",
    "Ask one question and actually listen: \"What's something you haven't told anyone lately?\"",
    "Cook a meal together with music on and no rushing",
    "Establish a tiny ritual that's just yours: morning coffee, evening walk, Sunday breakfast",
    "Watch something they've been wanting to watch, without your phone in your hand",
    "Drive somewhere together with no destination, just drive and talk",
    "Sit outside together after dark, say nothing, and just be there",
    "Revisit somewhere meaningful to your relationship: a first date spot, a favorite place",
    "Plan a no-phone hour and sit together, make something, play something, or just be present"
  ],
  touch: [
    "Give a real hug -- not a pat, but a proper hug that you hold",
    "Reach for their hand during a movie or while you're sitting together",
    "Put a hand on their back when you walk past them in the kitchen",
    "Greet them when they come home and actually stop what you're doing",
    "Sit close enough to be touching when you're resting or watching something",
    "Give an unprompted shoulder rub, not as a lead-up to anything but just because",
    "Touch their face gently, just once, and mean it",
    "Hold hands when you walk somewhere, even just from the car to the door",
    "Stay physically close during a hard conversation instead of pulling away",
    "Fall asleep touching, because even just feet touching under the covers counts"
  ],
  service: [
    "Handle one task they've been putting off and do it quietly without announcement",
    "Fill their gas tank before they realize it needs it",
    "Make their coffee (or tea, or breakfast) exactly how they like it before they ask",
    "Take the task they dread most this week and just do it",
    "Book the thing, make the call, handle the appointment they've been meaning to schedule",
    "Clean or organize one space in your home they find stressful",
    "Handle bedtime, dinner, or another recurring task solo and tell them to rest",
    "Send them a text: \"Is there anything I can take off your plate today?\"",
    "Grocery shop for what they need specifically, not just what you want",
    "Follow through on something you said you'd do, all the way, without being reminded"
  ],
  gifts: [
    "Pick up their favorite snack or drink when you're out and don't wait for a reason",
    "Bring home flowers on a completely ordinary day",
    "Save a ticket stub, a receipt, or a small memento from something you did together",
    "Order something small you heard them mention once, as proof that you listen",
    "Leave a little package somewhere they'll find it with no occasion needed",
    "Send them a book, article, or song that made you think of them",
    "Get them something themed around an inside joke or shared memory",
    "Write their name on something small: a card, a box, or a personalized gesture",
    "Put together a playlist of songs that remind you of them and send it with a note",
    "The next time you travel anywhere, even briefly, bring something back"
  ]
};

const DATE_IDEAS = [
  { ll: "Words",   i1: "A 'love letter dinner': you each write a real letter and read them aloud over a meal", i2: "A memory jar date: write your 5 favorite memories on slips and pull them together" },
  { ll: "Time",    i1: "A full tech-free evening: cook together, eat together, play a game, talk", i2: "A 'yes night': one partner plans the entire evening around what the other person loves most" },
  { ll: "Touch",   i1: "A slow evening at home with a long bath, a real massage, music, and no agenda", i2: "A stargazing night: lay outside, stay close, and talk about nothing and everything" },
  { ll: "Service", i1: "Each partner secretly handles three things the other has been putting off, then reveal at dinner", i2: "A 'take care of you' date: one partner plans everything, the other just receives" },
  { ll: "Gifts",   i1: "A scavenger hunt where each clue comes with a small meaningful gift", i2: "A 'box of us' date: each bring 5 things that represent something about your relationship" }
];

// ── STATE ─────────────────────────────────────────────────────
const STATE_KEY = 'llw_v2';
let S;

function defaultState() {
  return {
    nameA: '', nameB: '',
    currentPage: 'cover',
    showGuidedBanner: true,
    // Quiz -- fully independent objects
    quizA: { answers: {}, done: false, scores: {} },
    quizB: { answers: {}, done: false, scores: {} },
    // Which partner tab is active in quiz view
    activeQuizPartner: 'A',
    quizCurrentQA: 1,
    quizCurrentQB: 1,
    // Warm-up
    warmupA: '', warmupB: '',
    // Profile
    profileA: { primary:'', secondary:'', feels:'', secNotice:'', partnerDoes:'', wishUnderstood:'', showsThrough:'' },
    profileB: { primary:'', secondary:'', feels:'', secNotice:'', partnerDoes:'', wishUnderstood:'', showsThrough:'' },
    // Comparison map
    compMap: { overlap:'', difference:'', misunderstood:'', opportunity:'', alreadyWell:'' },
    translationNote: '',
    // Request cards
    requestA: { ll:'', r1:'', r2:'', r3:'', mostMeans:'', sign:'' },
    requestB: { ll:'', r1:'', r2:'', r3:'', mostMeans:'', sign:'' },
    // Date night
    dateNightA: { partnerLL:'', idea:'', feelSeen:'', wantToFeel:'', date:'' },
    dateNightB: { partnerLL:'', idea:'', feelSeen:'', wantToFeel:'', date:'' },
    // Barriers
    barriersA: { difficult:'', family:'', naturally:'', belief:'', stretch:'' },
    barriersB: { difficult:'', family:'', naturally:'', belief:'', stretch:'' },
    // Commitments
    commitA: { doRegularly:'', whenTired:'', remindMe:'', sign:'' },
    commitB: { doRegularly:'', whenTired:'', remindMe:'', sign:'' },
    // 30-day challenge -- two separate trackers
    challengeA: { checked:{}, notes:{}, intention:'', startDate:'' }, // A does actions for B
    challengeB: { checked:{}, notes:{}, intention:'', startDate:'' }, // B does actions for A
    // Reflection
    reflectionA: { dayMeant:'', noticed:'', surprised:'', understand:'' },
    reflectionB: { dayMeant:'', noticed:'', surprised:'', understand:'' },
    reflectionTogether: { commitment:'', signA:'', signB:'' },
    // Misc
    weeklyFocusA: '', weeklyFocusB: ''
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const loaded = JSON.parse(raw);
      // Deep merge with defaults to handle new keys
      return deepMerge(defaultState(), loaded);
    }
  } catch(e) {}
  return defaultState();
}

function deepMerge(target, source) {
  const out = Object.assign({}, target);
  for (const key of Object.keys(source)) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

function persist() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(S)); } catch(e) {}
  flashSaved();
}

let savedFlashTimer;
function flashSaved() {
  const el = document.getElementById('auto-save-banner');
  if (!el) return;
  el.style.opacity = '1';
  clearTimeout(savedFlashTimer);
  savedFlashTimer = setTimeout(() => { el.style.opacity = '0'; }, 2000);
}

// ── HELPERS ───────────────────────────────────────────────────
const nA = () => S.nameA || 'Partner A';
const nB = () => S.nameB || 'Partner B';
const esc = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function computeScores(answers) {
  const scores = { words:0, time:0, touch:0, service:0, gifts:0 };
  for (const [lang, keys] of Object.entries(SCORING_KEY)) {
    keys.forEach(({ q, c }) => {
      if (answers[q] && answers[q].toUpperCase() === c) scores[lang]++;
    });
  }
  return scores;
}

function getRanked(scores) {
  return Object.entries(scores)
    .sort((a,b) => b[1]-a[1])
    .map(([k,v]) => ({ key:k, score:v, ...LL[k] }));
}

function bind(id, obj, key, savedId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = obj[key] || '';
  const save = () => { obj[key] = el.value; persist(); if (savedId) showSaved(savedId); };
  el.addEventListener('input', save);
  el.addEventListener('change', save);
}

function showSaved(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2000);
}

// ── GENERATE PERSONALIZED 30-DAY PLAN ────────────────────────
// Builds 30 actions for partner P to do, weighted by the TARGET partner's scores
function buildPersonalizedPlan(targetScores) {
  if (!targetScores || !Object.keys(targetScores).length) {
    // Fallback: cycle through all languages evenly
    const plan = [];
    const keys = ['words','time','touch','service','gifts'];
    for (let d = 1; d <= 30; d++) {
      const k = keys[(d-1) % keys.length];
      plan.push({ day: d, ll: k, action: ACTION_POOL[k][(d-1) % ACTION_POOL[k].length] });
    }
    return plan;
  }

  const total = Object.values(targetScores).reduce((a,b)=>a+b, 0) || 1;
  // Calculate how many of the 30 days each language gets
  const alloc = {};
  let assigned = 0;
  const keys = Object.keys(targetScores).sort((a,b) => targetScores[b] - targetScores[a]);

  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      alloc[k] = 30 - assigned;
    } else {
      alloc[k] = Math.max(1, Math.round((targetScores[k] / total) * 30));
      assigned += alloc[k];
    }
  });

  // Build ordered list: days sorted by language, then shuffle within a fixed seed
  const days = [];
  for (const k of keys) {
    const count = alloc[k];
    const pool = ACTION_POOL[k];
    for (let i = 0; i < count; i++) {
      days.push({ ll: k, action: pool[i % pool.length] });
    }
  }

  // Interleave: distribute different languages throughout the 30 days
  // Simple approach: sort by language so each language's days are spaced out
  const interleaved = [];
  const buckets = {};
  for (const k of keys) buckets[k] = days.filter(d => d.ll === k);
  const maxBucket = Math.max(...Object.values(buckets).map(b => b.length));
  for (let i = 0; i < maxBucket; i++) {
    for (const k of keys) {
      if (buckets[k][i]) interleaved.push(buckets[k][i]);
    }
  }

  return interleaved.slice(0, 30).map((d, i) => ({ day: i+1, ll: d.ll, action: d.action }));
}

function getChallengeProgress(checker) {
  return Object.values(checker.checked || {}).filter(Boolean).length;
}

function getProgressMsg(done) {
  if (done === 30) return "You did it. 30 days. Both of you. On purpose.";
  if (done >= 28) return "Almost there. The last few days are the ones that will stay with you.";
  if (done >= 15) return "Halfway there. Whatever this month is bringing up, keep going.";
  if (done >= 1)  return "You're just getting started. Keep going.";
  return "Begin your first day when you're ready.";
}

// ── COMPATIBILITY INSIGHT ────────────────────────────────────
function getCompatInsight() {
  if (!S.quizA.done || !S.quizB.done) return '';
  const rA = getRanked(S.quizA.scores)[0].key;
  const rB = getRanked(S.quizB.scores)[0].key;
  if (rA === rB) {
    const names = { words:'Words of Affirmation', time:'Quality Time', touch:'Physical Touch', service:'Acts of Service', gifts:'Receiving Gifts' };
    return `You both speak the same primary language: ${names[rA]}. That's a real strength. You likely already feel connected in the ways that matter most to each of you. The opportunity here is to keep speaking it intentionally, especially on the hard days.`;
  }
  const pairs = {
    'words-time':    `${esc(nA())} needs to hear it. ${esc(nB())} needs to experience it together. The bridge? Conversations with full presence -- put the phone down and say the thing out loud.`,
    'words-touch':   `${esc(nA())} lives for the right word. ${esc(nB())} lives for the right touch. Small pairings work beautifully here: hold their hand while you tell them what you love about them.`,
    'words-service': `${esc(nA())} needs affirmation. ${esc(nB())} needs action. The good news: they complement beautifully. Saying "I did this for you because I love you" speaks both languages at once.`,
    'words-gifts':   `${esc(nA())} needs to hear the love. ${esc(nB())} needs to see a symbol of it. A handwritten note tucked into a small gift speaks fluently in both directions.`,
    'time-touch':    `You're both speaking languages of physical and emotional presence. The gap is smaller than you think. Shared time that includes physical closeness -- a walk, a slow dinner, an evening on the couch -- speaks to both.`,
    'time-service':  `${esc(nA())} feels loved when you show up. ${esc(nB())} feels loved when you step in. You may have been loving each other perfectly -- just in different rooms. Try being together while you handle something for them.`,
    'time-gifts':    `${esc(nA())} treasures presence. ${esc(nB())} treasures thoughtfulness. These are actually deeply related. A small token brought back from an experience you shared together speaks both languages beautifully.`,
    'touch-service': `${esc(nA())} needs to feel your closeness physically. ${esc(nB())} needs to feel your love through action. These languages require intention to learn -- but once you do, you'll both feel deeply seen.`,
    'touch-gifts':   `${esc(nA())} feels love in the body. ${esc(nB())} feels love in the gesture. These two languages are both about being thought of. A physical gift you bring specifically for them, delivered with a real hug, covers both.`,
    'service-gifts': `You both speak languages of thoughtful action. ${esc(nA())} values effort. ${esc(nB())} values the symbol of effort. The gap here is small. Handling something for them and bringing home a small token both say the same thing: I was thinking about you.`
  };
  const key = [rA, rB].sort().join('-');
  return pairs[key] || `You speak different primary languages, and that's a growth opportunity. Learning to give what the other person needs most is where the real magic happens.`;
}

// ── NAVIGATION ───────────────────────────────────────────────
function navTo(page) {
  S.currentPage = page;
  persist();

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pg = document.getElementById('page-' + page);
  if (pg) { pg.classList.add('active'); }
  const nb = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (nb) { nb.classList.add('active'); }

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-bind fields for this page
  setTimeout(() => bindPageFields(page), 50);
}

function bindPageFields(page) {
  if (page === 'howto') bindHowToFields();
  if (page === 'quiz') { renderQuizBody('A'); renderQuizBody('B'); }
  if (page === 'results') { bindProfileFields(); drawChart(); }
  if (page === 'understand') { bindUnderstandFields(); drawCompareChart(); }
  if (page === 'daily') bindDailyFields();
  if (page === 'challenge') bindChallengeFields();
  if (page === 'reflections') bindReflectionFields();
}

// ── RENDER NAV ────────────────────────────────────────────────
function renderNav() {
  const pages = [
    { id:'cover',       icon:'🌸', label:'Home' },
    { id:'howto',       icon:'📖', label:'How To Use' },
    { id:'quiz',        icon:'✏️',  label:'Our Quizzes' },
    { id:'results',     icon:'💡', label:'Results' },
    { id:'understand',  icon:'🗺️', label:'Understand Each Other' },
    { id:'daily',       icon:'🌿', label:'Apply Daily' },
    { id:'challenge',   icon:'🌟', label:'30-Day Challenge' },
    { id:'reflections', icon:'📝', label:'Reflections' },
  ];
  return `
<nav class="app-nav" id="main-nav">
  <span class="nav-logo">Love Languages<small>Workbook by The Clarity Desk</small></span>
  <div class="nav-sep"></div>
  ${pages.map(p => `<button class="nav-btn${S.currentPage===p.id?' active':''}" data-page="${p.id}" onclick="navTo('${p.id}')"><span class="ni">${p.icon}</span>${p.label}</button>`).join('')}
  <div class="nav-actions">
    <button class="nav-print-btn" onclick="printWorkbook()">🖨️ Print Workbook</button>
  </div>
</nav>
<div class="print-banner no-print" style="display:none;" id="print-banner-top">
  <p>Ready to print your workbook as a PDF? Click below to open the print dialog.</p>
  <button class="btn-print" onclick="printWorkbook()">🖨️ Print / Save as PDF</button>
</div>
<div class="auto-save-banner" id="auto-save-banner" style="opacity:0;transition:opacity 0.4s;">
  ✓ Progress saved
</div>`;
}

// ── COVER PAGE ────────────────────────────────────────────────
function renderCover() {
  const hasNames = S.nameA && S.nameB;
  return `
<div class="page${S.currentPage==='cover'?' active':''}" id="page-cover">
  <div class="cover-page">
    <p class="cover-badge">The Clarity Desk</p>
    <h1 class="cover-title">The Love Languages<em>Workbook</em></h1>
    <p class="cover-sub">Discover how you give and receive love and transform your relationship.</p>
    <div class="cover-pills">
      <span class="cpill cpill-words">💬 Words</span>
      <span class="cpill cpill-time">⏱ Time</span>
      <span class="cpill cpill-touch">🤝 Touch</span>
      <span class="cpill cpill-service">🛠 Service</span>
      <span class="cpill cpill-gifts">🎁 Gifts</span>
    </div>
    <div class="name-card">
      <h2 class="name-card-title">Make it personal</h2>
      <p class="name-card-sub">Enter both names so this workbook speaks directly to you.</p>
      <div class="name-row">
        <div class="name-field">
          <label for="inp-nameA">Your name</label>
          <input id="inp-nameA" type="text" placeholder="e.g. Jamie" value="${esc(S.nameA)}" />
        </div>
        <div class="name-field">
          <label for="inp-nameB">Your partner's name</label>
          <input id="inp-nameB" type="text" placeholder="e.g. Alex" value="${esc(S.nameB)}" />
        </div>
      </div>
      <button class="btn btn-primary btn-full btn-lg" onclick="handleBegin()">
        Begin Our Journey ✦
      </button>
      ${hasNames ? `<p class="welcome-back">Welcome back, ${esc(nA())} &amp; ${esc(nB())}. Your progress is saved.</p>` : ''}
    </div>
    <div class="settings-row mt-4" style="max-width:480px;width:100%;position:relative;z-index:1;">
      <p>Want to start fresh? This will erase all saved progress.</p>
      <button class="btn btn-ghost btn-sm" onclick="startOver()">Start Over</button>
    </div>
  </div>
</div>`;
}

function handleBegin() {
  const a = (document.getElementById('inp-nameA')||{}).value?.trim();
  const b = (document.getElementById('inp-nameB')||{}).value?.trim();
  if (!a || !b) { alert('Please enter both names to begin.'); return; }
  S.nameA = a; S.nameB = b;
  S.showGuidedBanner = true;
  persist();
  renderApp();
  navTo('howto');
}

function startOver() {
  if (!confirm('Are you sure you want to start over? All names, quiz answers, challenge progress, and reflections will be erased permanently.')) return;
  localStorage.removeItem(STATE_KEY);
  S = defaultState();
  renderApp();
  navTo('cover');
}

// ── HOW TO USE ────────────────────────────────────────────────
function renderHowTo() {
  return `
<div class="page${S.currentPage==='howto'?' active':''}" id="page-howto">
  <div class="section-wrap">
    ${S.showGuidedBanner ? `
    <div class="guided-banner" id="guided-banner">
      <span class="gb-icon">🧭</span>
      <div class="gb-text">
        <strong>Where to start</strong>
        <p>Start here: read the guidelines, then each take your quiz separately on the next page. Then explore your results together.</p>
      </div>
      <button class="gb-close" onclick="dismissBanner()" title="Dismiss">✕</button>
    </div>` : ''}

    <div class="section-header mb-3">
      <span class="sec-tag">Getting Started</span>
      <h1 class="sec-title">How to Use This <em>Workbook</em></h1>
      <p class="sec-desc">Four guidelines to get the most from this experience.</p>
    </div>

    <ul class="guideline-list">
      <li class="guideline-item"><div class="g-num">1</div><div><strong>Complete your quiz independently before comparing answers.</strong><p>Resist the urge to peek at each other's responses. The quiz works best when your answers come from your own honest experience, not from anticipating what your partner might say.</p></div></li>
      <li class="guideline-item"><div class="g-num">2</div><div><strong>There are no right or wrong love languages.</strong><p>All five are valid, meaningful, and beautiful. The goal isn't to rank your language above your partner's. It is to understand that both of your needs are real, legitimate, and worth meeting.</p></div></li>
      <li class="guideline-item"><div class="g-num">3</div><div><strong>Revisit this workbook once a year.</strong><p>Your primary love language can shift over time, during major life changes, seasons of stress, or new chapters in your relationship.</p></div></li>
      <li class="guideline-item"><div class="g-num">4</div><div><strong>Use this as a starting point for conversation, not a final verdict.</strong><p>Your quiz result is a compass, not a cage. Use it to open doors, not close them.</p></div></li>
    </ul>

    <div class="card card-warm mb-3">
      <h3>A Note on Primary &amp; Secondary Languages</h3>
      <p class="mt-1" style="font-size:0.92rem;">Most people have one dominant love language. But almost everyone also has a secondary language. Pay attention to both. Your primary language is what you need most consistently. Your secondary language often becomes more important during specific seasons, including stress, transition, and grief.</p>
    </div>

    <div class="card mb-3">
      <h2>Warm-Up Prompt</h2>
      <p class="italic mb-3" style="font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--plum);">"Right now, the way I most feel loved is..."</p>
      <div class="two-col">
        <div class="field-group">
          <label class="field-label" for="warmup-a">${esc(nA())}'s answer</label>
          <textarea id="warmup-a" rows="3" placeholder="Write freely here..."></textarea>
        </div>
        <div class="field-group">
          <label class="field-label" for="warmup-b">${esc(nB())}'s answer</label>
          <textarea id="warmup-b" rows="3" placeholder="Write freely here..."></textarea>
        </div>
      </div>
      <span class="saved-ind" id="si-warmup">✓ Saved</span>
    </div>

    <div class="card mb-3">
      <h2 class="mb-3">The Five Love Languages</h2>
      <div class="ll-guide-grid">
        ${Object.entries(LL).map(([k,ll])=>`
        <div class="ll-guide-card ${ll.cls}">
          <div class="llh"><span class="lli">${ll.icon}</span><span class="lln">${ll.label}</span></div>
          <p>${LL_DESC[k].full.substring(0,160)}...</p>
          <p style="font-size:0.82rem;font-style:italic;color:var(--plum-mid);">${esc(LL_DESC[k].quote)}</p>
        </div>`).join('')}
      </div>
    </div>

    <div class="flex-end">
      <button class="btn btn-primary" onclick="navTo('quiz')">Take the Quiz &rarr;</button>
    </div>
  </div>
</div>`;
}

function bindHowToFields() {
  bind('warmup-a', S, 'warmupA', 'si-warmup');
  bind('warmup-b', S, 'warmupB', 'si-warmup');
}

function dismissBanner() {
  S.showGuidedBanner = false; persist();
  const el = document.getElementById('guided-banner');
  if (el) el.remove();
}

// ── QUIZ PAGE ─────────────────────────────────────────────────
function renderQuizPage() {
  return `
<div class="page${S.currentPage==='quiz'?' active':''}" id="page-quiz">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Section One</span>
      <h1 class="sec-title">Our <em>Quizzes</em></h1>
      <p class="sec-desc">Take the quiz independently. 20 questions each. No right or wrong answers.</p>
    </div>

    <div class="partner-switcher" id="partner-switcher">
      <button class="psw-btn${S.activeQuizPartner==='A'?' active':''}" id="psw-A" onclick="switchQuizTab('A')">
        ${esc(nA())} ${S.quizA.done?'✓':''}
      </button>
      <button class="psw-btn${S.activeQuizPartner==='B'?' active':''}" id="psw-B" onclick="switchQuizTab('B')">
        ${esc(nB())} ${S.quizB.done?'✓':''}
      </button>
    </div>

    <div id="quiz-panel-A" style="display:${S.activeQuizPartner==='A'?'block':'none'};">
      <div id="quiz-body-A"></div>
    </div>
    <div id="quiz-panel-B" style="display:${S.activeQuizPartner==='B'?'block':'none'};">
      <div id="quiz-body-B"></div>
    </div>
  </div>
</div>`;
}

function switchQuizTab(p) {
  S.activeQuizPartner = p; persist();
  document.querySelectorAll('.psw-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('psw-' + p);
  if (btn) btn.classList.add('active');
  ['A','B'].forEach(q => {
    const panel = document.getElementById('quiz-panel-' + q);
    if (panel) panel.style.display = q === p ? 'block' : 'none';
  });
}

function renderQuizBody(p) {
  const container = document.getElementById('quiz-body-' + p);
  if (!container) return;

  const quiz   = p === 'A' ? S.quizA : S.quizB;
  const pName  = p === 'A' ? nA() : nB();
  const curQ   = p === 'A' ? S.quizCurrentQA : S.quizCurrentQB;

  if (quiz.done) {
    const ranked = getRanked(quiz.scores);
    container.innerHTML = `
    <div class="quiz-done-card">
      <div class="quiz-done-icon">🎉</div>
      <h2>Done, ${esc(pName)}!</h2>
      <p>Your primary love language is <strong>${ranked[0].icon} ${ranked[0].label}</strong>.</p>
      <div class="score-bars mb-3" style="text-align:left;max-width:400px;margin:1rem auto;">
        ${ranked.map(r=>`
        <div class="sbar-row">
          <span class="sbar-label">${r.icon} ${r.label}</span>
          <div class="sbar-track"><div class="sbar-fill" style="width:${Math.round(r.score/r.max*100)}%;background:${r.color};"></div></div>
          <span class="sbar-num">${r.score}</span>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;">
        <button class="btn btn-ghost btn-sm" onclick="retakeQuiz('${p}')">Retake Quiz</button>
        <button class="btn btn-primary" onclick="navTo('results')">See Full Results &rarr;</button>
      </div>
    </div>`;
    return;
  }

  const answered = Object.keys(quiz.answers).length;
  const pct = Math.round(answered / 20 * 100);
  const q = QUIZ_QUESTIONS[curQ - 1];

  container.innerHTML = `
  <div class="quiz-progress-wrap">
    <div class="quiz-progress-label">${esc(pName)} &bull; Question ${curQ} of 20</div>
    <div class="quiz-pbar"><div class="quiz-pbar-fill" style="width:${pct}%"></div></div>
  </div>
  <div class="quiz-q-card">
    <div class="quiz-q-label">${esc(pName)} &bull; Q${curQ} of 20 &bull; ${answered} answered</div>
    <div class="quiz-options">
      <div class="quiz-opt${quiz.answers[curQ]==='A'?' selected':''}" onclick="selectAnswer('${p}','A')">
        <div class="quiz-opt-letter">A</div>
        <div class="quiz-opt-text">${esc(q.a)}</div>
      </div>
      <div class="quiz-opt${quiz.answers[curQ]==='B'?' selected':''}" onclick="selectAnswer('${p}','B')">
        <div class="quiz-opt-letter">B</div>
        <div class="quiz-opt-text">${esc(q.b)}</div>
      </div>
    </div>
  </div>
  <div class="quiz-nav">
    <button class="btn btn-ghost btn-sm" onclick="quizPrev('${p}')" ${curQ===1?'disabled':''}>&larr; Previous</button>
    <span class="quiz-counter">${answered} / 20 answered</span>
    ${curQ < 20
      ? `<button class="btn btn-primary btn-sm" onclick="quizNext('${p}')">Next &rarr;</button>`
      : `<button class="btn btn-primary btn-sm" onclick="quizSubmit('${p}')" ${answered<20?'disabled':''}>Submit Quiz ✓</button>`
    }
  </div>`;
}

function selectAnswer(p, choice) {
  const quiz = p === 'A' ? S.quizA : S.quizB;
  const curQ = p === 'A' ? S.quizCurrentQA : S.quizCurrentQB;
  quiz.answers[curQ] = choice;
  persist();
  renderQuizBody(p);
  // Auto-advance
  if (curQ < 20) {
    setTimeout(() => {
      if (p === 'A') S.quizCurrentQA = curQ + 1;
      else           S.quizCurrentQB = curQ + 1;
      renderQuizBody(p);
    }, 320);
  }
}

function quizNext(p) {
  if (p === 'A' && S.quizCurrentQA < 20) { S.quizCurrentQA++; persist(); renderQuizBody('A'); }
  if (p === 'B' && S.quizCurrentQB < 20) { S.quizCurrentQB++; persist(); renderQuizBody('B'); }
}

function quizPrev(p) {
  if (p === 'A' && S.quizCurrentQA > 1) { S.quizCurrentQA--; persist(); renderQuizBody('A'); }
  if (p === 'B' && S.quizCurrentQB > 1) { S.quizCurrentQB--; persist(); renderQuizBody('B'); }
}

function quizSubmit(p) {
  const quiz = p === 'A' ? S.quizA : S.quizB;
  if (Object.keys(quiz.answers).length < 20) { alert('Please answer all 20 questions before submitting.'); return; }
  quiz.scores = computeScores(quiz.answers);
  quiz.done   = true;
  persist();
  renderQuizBody(p);
  // Update switcher buttons
  const btn = document.getElementById('psw-' + p);
  if (btn) {
    const pName = p === 'A' ? nA() : nB();
    btn.textContent = esc(pName) + ' ✓';
  }
}

function retakeQuiz(p) {
  const pName = p === 'A' ? nA() : nB();
  if (!confirm(`Retake the quiz for ${pName}? Your previous answers will be cleared.`)) return;
  if (p === 'A') { S.quizA = { answers:{}, done:false, scores:{} }; S.quizCurrentQA = 1; }
  else           { S.quizB = { answers:{}, done:false, scores:{} }; S.quizCurrentQB = 1; }
  persist();
  renderQuizBody(p);
  const btn = document.getElementById('psw-' + p);
  if (btn) btn.textContent = (p==='A'?nA():nB());
}

// ── RESULTS PAGE ─────────────────────────────────────────────
function renderResults() {
  const neitherDone = !S.quizA.done && !S.quizB.done;
  return `
<div class="page${S.currentPage==='results'?' active':''}" id="page-results">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Section One</span>
      <h1 class="sec-title">Your <em>Results</em></h1>
      <p class="sec-desc">What your love language says about how you love and how you need to be loved.</p>
    </div>

    ${neitherDone ? `
    <div class="card card-warm text-center">
      <p style="font-size:1.1rem;font-family:'Cormorant Garamond',serif;color:var(--plum);margin-bottom:1rem;">No quiz results yet.</p>
      <p class="text-muted mb-3">Complete the quiz first to see your results here.</p>
      <button class="btn btn-primary" onclick="navTo('quiz')">Take the Quiz &rarr;</button>
    </div>` : `

    <div class="results-hero">
      ${renderPartnerResultCard('A')}
      ${renderPartnerResultCard('B')}
    </div>

    ${S.quizA.done && S.quizB.done ? `
    <div class="compat-card">
      <h2>Compatibility Snapshot</h2>
      <p class="compat-insight">${getCompatInsight()}</p>
    </div>

    <div class="chart-wrap">
      <h3 class="mb-2">Score Comparison</h3>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--mauve)"></div>${esc(nA())}</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--sage)"></div>${esc(nB())}</div>
      </div>
      <canvas id="results-chart" height="220"></canvas>
    </div>

    <div class="how-to-love-grid">
      ${renderHowToLoveCard('A')}
      ${renderHowToLoveCard('B')}
    </div>

    <div class="card mb-3">
      <div class="flex-between mb-2">
        <h2>Email Your Results</h2>
      </div>
      <p class="text-muted mb-3">Open your email with a pre-written summary of both love languages.</p>
      <button class="btn btn-secondary" onclick="emailResults()">✉️ Email Our Results</button>
    </div>

    <div class="card mb-3">
      <h2 class="mb-2">Shareable Results Card</h2>
      <div class="share-card" id="share-card">
        <div style="font-size:2rem;margin-bottom:0.5rem;">💞</div>
        <div class="share-names">${esc(nA())} &amp; ${esc(nB())}</div>
        <div class="share-langs">
          ${S.quizA.done ? `<div class="share-lang-line">${esc(nA())} speaks <strong>${getRanked(S.quizA.scores)[0].icon} ${getRanked(S.quizA.scores)[0].label}</strong></div>` : ''}
          ${S.quizB.done ? `<div class="share-lang-line">${esc(nB())} speaks <strong>${getRanked(S.quizB.scores)[0].icon} ${getRanked(S.quizB.scores)[0].label}</strong></div>` : ''}
        </div>
        <p style="font-size:0.78rem;color:var(--plum-mid);font-style:italic;">Discovered with The Clarity Desk</p>
      </div>
      <div class="text-center">
        <button class="btn btn-secondary btn-sm" onclick="copyShareCard()">📋 Copy Results Text</button>
      </div>
    </div>
    ` : ''}

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.5rem;color:var(--plum);margin-bottom:0.5rem;">My Love Language Profile</h2>
    <p class="text-muted mb-3">Complete this individually after reviewing your quiz results.</p>
    <div class="two-col">
      ${renderProfileCard('A')}
      ${renderProfileCard('B')}
    </div>

    <div class="flex-end">
      <button class="btn btn-primary" onclick="navTo('understand')">Understand Each Other &rarr;</button>
    </div>
    `}
  </div>
</div>`;
}

function renderPartnerResultCard(p) {
  const quiz  = p === 'A' ? S.quizA : S.quizB;
  const pName = p === 'A' ? nA() : nB();
  const cls   = p === 'A' ? 'card-a' : 'card-b';
  const badge = p === 'A' ? 'p-badge-a' : 'p-badge-b';

  if (!quiz.done) return `
  <div class="result-partner-card ${cls}">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <p class="text-muted">Quiz not completed yet.</p>
    <button class="btn btn-primary btn-sm mt-2" onclick="navTo('quiz');switchQuizTab('${p}')">Take Quiz</button>
  </div>`;

  const ranked = getRanked(quiz.scores);
  return `
  <div class="result-partner-card ${cls}">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <span class="result-lang-badge">Primary Language</span>
    <div class="result-primary-lang">
      <span class="result-lang-icon">${ranked[0].icon}</span>
      <span class="result-lang-name">${ranked[0].label}</span>
    </div>
    <p style="font-size:0.83rem;font-style:italic;font-family:'Cormorant Garamond',serif;color:var(--plum-mid);margin-bottom:1rem;">${esc(LL_DESC[ranked[0].key].quote)}</p>
    <div class="score-bars">
      ${ranked.map(r=>`
      <div class="sbar-row">
        <span class="sbar-label">${r.icon} ${r.label}</span>
        <div class="sbar-track"><div class="sbar-fill" style="width:${Math.round(r.score/r.max*100)}%;background:${r.color};"></div></div>
        <span class="sbar-num">${r.score}</span>
      </div>`).join('')}
    </div>
  </div>`;
}

function renderHowToLoveCard(p) {
  // p = which partner we're showing tips FOR (the one being loved)
  // The other partner reads this
  const quiz   = p === 'A' ? S.quizA : S.quizB;
  const pName  = p === 'A' ? nA() : nB();
  const reader = p === 'A' ? nB() : nA(); // who should read this
  const cls    = p === 'A' ? '' : 'sage-border';
  if (!quiz.done) return `<div class="htl-card ${cls}"><p class="text-muted">Complete ${esc(pName)}'s quiz to see personalized tips.</p></div>`;

  const ranked  = getRanked(quiz.scores);
  const primary = ranked[0].key;
  const guide   = TRANSLATION_GUIDE[primary];
  const ll      = LL[primary];

  return `
  <div class="htl-card ${cls}">
    <p class="text-muted mb-1" style="font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">For ${esc(reader)} to read</p>
    <h3 class="htl-title">${ll.icon} How to Love ${esc(pName)}</h3>
    <p style="font-size:0.87rem;color:var(--plum-mid);margin-bottom:0.8rem;">Their primary language is <strong>${ll.label}</strong>.</p>
    <div class="dos-donts">
      <div>
        <div class="list-head">They feel loved when you</div>
        <ul class="dos-list">${guide.dos.slice(0,4).map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
      </div>
      <div>
        <div class="list-head">They may feel overlooked when you</div>
        <ul class="donts-list">${guide.donts.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
      </div>
    </div>
  </div>`;
}

function renderProfileCard(p) {
  const profile = p === 'A' ? S.profileA : S.profileB;
  const pName   = p === 'A' ? nA() : nB();
  const badge   = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid     = 'si-profile-' + p;
  return `
  <div class="card">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <div class="field-group">
      <label class="field-label">My primary love language is</label>
      <input id="prof-${p}-primary" class="text-input" value="${esc(profile.primary)}" placeholder="e.g. Quality Time" />
    </div>
    <div class="field-group">
      <label class="field-label">I feel most loved after...</label>
      <textarea id="prof-${p}-feels" rows="2" placeholder="Describe a moment...">${esc(profile.feels)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">My secondary language is</label>
      <input id="prof-${p}-secondary" class="text-input" value="${esc(profile.secondary)}" placeholder="e.g. Words of Affirmation" />
    </div>
    <div class="field-group">
      <label class="field-label">I notice it when...</label>
      <textarea id="prof-${p}-secNotice" rows="2" placeholder="...">${esc(profile.secNotice)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">Something my partner does that perfectly speaks my language is...</label>
      <textarea id="prof-${p}-partnerDoes" rows="2" placeholder="...">${esc(profile.partnerDoes)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">Something I wish my partner understood about how I need to feel loved is...</label>
      <textarea id="prof-${p}-wishUnderstood" rows="2" placeholder="...">${esc(profile.wishUnderstood)}</textarea>
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function bindProfileFields() {
  ['A','B'].forEach(p => {
    const profile = p === 'A' ? S.profileA : S.profileB;
    const sid = 'si-profile-' + p;
    ['primary','secondary','feels','secNotice','partnerDoes','wishUnderstood'].forEach(k => {
      const el = document.getElementById(`prof-${p}-${k}`);
      if (!el) return;
      el.value = profile[k] || '';
      const save = () => { profile[k] = el.value; persist(); showSaved(sid); };
      el.addEventListener('input', save);
    });
  });
}

function drawChart() {
  const canvas = document.getElementById('results-chart');
  if (!canvas || !S.quizA.done || !S.quizB.done) return;
  if (canvas._chart) canvas._chart.destroy();
  const labels = Object.values(LL).map(l => l.label);
  const dA = Object.keys(LL).map(k => S.quizA.scores[k] || 0);
  const dB = Object.keys(LL).map(k => S.quizB.scores[k] || 0);
  canvas._chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: nA(), data: dA, backgroundColor: 'rgba(160,96,122,0.7)', borderColor: '#A0607A', borderWidth: 2, borderRadius: 6 },
        { label: nB(), data: dB, backgroundColor: 'rgba(122,158,132,0.7)', borderColor: '#7A9E84', borderWidth: 2, borderRadius: 6 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 }, color: '#6B3560' } } },
      scales: {
        y: { beginAtZero: true, max: 8, ticks: { stepSize: 1 }, grid: { color: '#F3E6DA' } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

function emailResults() {
  const rA = S.quizA.done ? getRanked(S.quizA.scores)[0] : null;
  const rB = S.quizB.done ? getRanked(S.quizB.scores)[0] : null;
  const subject = `Our Love Languages - ${nA()} & ${nB()}`;
  const body = `Our Love Language Results\n\n${nA()}'s primary love language: ${rA ? rA.label : 'Not completed'}\n${nB()}'s primary love language: ${rB ? rB.label : 'Not completed'}\n\nDiscovered using The Love Languages Workbook by The Clarity Desk.\n\nTo explore your full results, visit the app and continue your journey together.`;
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyShareCard() {
  const rA = S.quizA.done ? getRanked(S.quizA.scores)[0] : null;
  const rB = S.quizB.done ? getRanked(S.quizB.scores)[0] : null;
  const text = `${nA()} & ${nB()}\n${rA ? `${nA()} speaks ${rA.label}` : ''}\n${rB ? `${nB()} speaks ${rB.label}` : ''}\nDiscovered with The Love Languages Workbook by The Clarity Desk.`;
  navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!')).catch(() => alert('Copy failed -- please copy the text manually.'));
}

// ── UNDERSTAND EACH OTHER ────────────────────────────────────
function renderUnderstand() {
  const cp = S.compMap;
  return `
<div class="page${S.currentPage==='understand'?' active':''}" id="page-understand">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Section Two</span>
      <h1 class="sec-title">Understand Each <em>Other</em></h1>
      <p class="sec-desc">Complete this section together, after both quizzes are done.</p>
    </div>

    ${(S.quizA.done && S.quizB.done) ? `
    <div class="chart-wrap mb-3">
      <h2 class="mb-2">Comparison Map</h2>
      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot" style="background:var(--mauve)"></div>${esc(nA())}</div>
        <div class="legend-item"><div class="legend-dot" style="background:var(--sage)"></div>${esc(nB())}</div>
      </div>
      <canvas id="compare-chart" height="240"></canvas>
    </div>` : `
    <div class="card card-warm text-center mb-3">
      <p class="text-muted">Complete both quizzes to unlock the comparison map.</p>
      <button class="btn btn-primary btn-sm mt-2" onclick="navTo('quiz')">Go to Quiz</button>
    </div>`}

    <div class="card mb-3">
      <h2 class="mb-3">What Does Your Map Tell You?</h2>
      <div class="field-group">
        <label class="field-label">Our love languages overlap on...</label>
        <textarea id="cm-overlap" rows="2" placeholder="...">${esc(cp.overlap)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Our biggest difference is that ${esc(nA())} needs ___ but ${esc(nB())} most naturally gives...</label>
        <textarea id="cm-difference" rows="2" placeholder="...">${esc(cp.difference)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">This explains why we've sometimes misunderstood each other when...</label>
        <textarea id="cm-misunderstood" rows="2" placeholder="...">${esc(cp.misunderstood)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Our biggest opportunity to grow closer is...</label>
        <textarea id="cm-opportunity" rows="2" placeholder="...">${esc(cp.opportunity)}</textarea>
      </div>
      <div class="field-group">
        <label class="field-label">Something this map confirms we already do well is...</label>
        <textarea id="cm-alreadyWell" rows="2" placeholder="...">${esc(cp.alreadyWell)}</textarea>
      </div>
      <span class="saved-ind" id="si-compmap">✓ Saved</span>
    </div>

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.5rem;color:var(--plum);margin-bottom:0.5rem;">Full Translation Guide</h2>
    <p class="text-muted mb-3">The "translation gap" is what happens when you love your partner in your language instead of theirs.</p>
    <div class="mb-3">
      ${Object.entries(LL).map(([k,ll])=>`
      <div class="trans-card ${ll.cls}" id="trans-${k}">
        <div class="trans-header" onclick="toggleTrans('${k}')">
          <span style="font-size:1.3rem;">${ll.icon}</span>
          <h3>${ll.label}</h3>
          <span class="trans-chevron">▼</span>
        </div>
        <div class="trans-body">
          <p style="font-size:0.87rem;color:var(--plum-mid);margin-bottom:0.8rem;">If your partner's language is <strong>${ll.label}</strong>, they feel loved when you...</p>
          <div class="dos-donts">
            <div>
              <div class="list-head">They feel loved when you</div>
              <ul class="dos-list">${TRANSLATION_GUIDE[k].dos.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
            </div>
            <div>
              <div class="list-head">They may feel overlooked when you</div>
              <ul class="donts-list">${TRANSLATION_GUIDE[k].donts.map(d=>`<li>${esc(d)}</li>`).join('')}</ul>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>

    <div class="card mb-3">
      <div class="field-group">
        <label class="field-label">The most important thing I learned about how to love my partner better is...</label>
        <textarea id="translation-note" rows="3" placeholder="...">${esc(S.translationNote)}</textarea>
      </div>
      <span class="saved-ind" id="si-tnote">✓ Saved</span>
    </div>

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.5rem;color:var(--plum);margin-bottom:0.5rem;">Speak My Language</h2>
    <p class="text-muted mb-3">Fill out your request card independently, then share them with each other.</p>
    <div class="request-grid">
      ${renderRequestCard('A')}
      ${renderRequestCard('B')}
    </div>

    <div id="view-cards-area">
      ${(S.requestA.r1 || S.requestA.mostMeans) && (S.requestB.r1 || S.requestB.mostMeans) ? renderViewCards() : `
      <div class="text-center mt-3">
        <p class="text-muted mb-2">Fill in both cards above, then view them side by side.</p>
        <button class="btn btn-primary" onclick="checkAndShowCards()">View Each Other's Cards ✦</button>
      </div>`}
    </div>

    <div class="flex-end">
      <button class="btn btn-primary" onclick="navTo('daily')">Apply It Daily &rarr;</button>
    </div>
  </div>
</div>`;
}

function renderRequestCard(p) {
  const pName = p === 'A' ? nA() : nB();
  const req   = p === 'A' ? S.requestA : S.requestB;
  const quiz  = p === 'A' ? S.quizA : S.quizB;
  const autoLL = quiz.done ? getRanked(quiz.scores)[0].label : '';
  const badge = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid   = 'si-req-' + p;
  return `
  <div class="req-card">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <h3 style="font-size:1.1rem;color:var(--plum);margin-bottom:1rem;">A Request Card from ${esc(pName)}</h3>
    <div class="field-group">
      <label class="field-label">My love language is</label>
      <input id="req-${p}-ll" class="text-input" value="${esc(req.ll || autoLL)}" placeholder="Your primary language" />
    </div>
    <p style="font-size:0.85rem;color:var(--plum-mid);margin-bottom:0.7rem;">This week, you could speak my language by:</p>
    ${[1,2,3].map(n=>`
    <div class="req-item">
      <div class="req-num">${n}</div>
      <input id="req-${p}-r${n}" class="text-input" value="${esc(req['r'+n])}" placeholder="One specific thing..." />
    </div>`).join('')}
    <div class="field-group mt-2">
      <label class="field-label">The one thing that would mean the most to me right now is...</label>
      <textarea id="req-${p}-mostMeans" rows="2" placeholder="...">${esc(req.mostMeans)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">Signed with love</label>
      <input id="req-${p}-sign" class="text-input" value="${esc(req.sign || pName)}" placeholder="${esc(pName)}" />
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function renderViewCards() {
  return `
  <div class="view-cards-panel">
    <h2>Your Request Cards</h2>
    <div class="view-cards-grid">
      ${['A','B'].map(p => {
        const req   = p === 'A' ? S.requestA : S.requestB;
        const pName = p === 'A' ? nA() : nB();
        const cls   = p === 'A' ? '' : 'sage-top';
        return `
        <div class="view-card ${cls}">
          <div class="p-badge ${p==='A'?'p-badge-a':'p-badge-b'}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
          <div class="view-card-ll">${esc(req.ll || 'Love language not specified')}</div>
          <p style="font-size:0.83rem;color:var(--plum-mid);margin-bottom:0.5rem;">This week, you could speak my language by:</p>
          <ol>
            ${[1,2,3].filter(n=>req['r'+n]).map(n=>`<li>${esc(req['r'+n])}</li>`).join('')}
          </ol>
          ${req.mostMeans ? `<div class="view-card-highlight">"${esc(req.mostMeans)}"</div>` : ''}
          ${req.sign ? `<div class="view-card-sig">Signed with love, ${esc(req.sign)}</div>` : ''}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function checkAndShowCards() {
  document.getElementById('view-cards-area').innerHTML = renderViewCards();
}

function toggleTrans(k) {
  document.getElementById('trans-' + k).classList.toggle('open');
}

function bindUnderstandFields() {
  const cp = S.compMap;
  ['overlap','difference','misunderstood','opportunity','alreadyWell'].forEach(k => bind('cm-'+k, cp, k, 'si-compmap'));
  bind('translation-note', S, 'translationNote', 'si-tnote');
  ['A','B'].forEach(p => {
    const req = p === 'A' ? S.requestA : S.requestB;
    const quiz = p === 'A' ? S.quizA : S.quizB;
    const autoLL = quiz.done ? getRanked(quiz.scores)[0].label : '';
    const sid = 'si-req-' + p;
    ['ll','r1','r2','r3','mostMeans','sign'].forEach(k => {
      const el = document.getElementById(`req-${p}-${k}`);
      if (!el) return;
      el.value = req[k] || (k==='ll' ? autoLL : '') || '';
      const save = () => { req[k] = el.value; persist(); showSaved(sid); };
      el.addEventListener('input', save);
    });
  });
  if (S.quizA.done && S.quizB.done) setTimeout(drawCompareChart, 80);
}

function drawCompareChart() {
  const canvas = document.getElementById('compare-chart');
  if (!canvas || !S.quizA.done || !S.quizB.done) return;
  if (canvas._chart) canvas._chart.destroy();
  const labels = Object.values(LL).map(l => l.label);
  const dA = Object.keys(LL).map(k => S.quizA.scores[k] || 0);
  const dB = Object.keys(LL).map(k => S.quizB.scores[k] || 0);
  canvas._chart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: nA(), data: dA, backgroundColor: 'rgba(160,96,122,0.7)', borderColor: '#A0607A', borderWidth: 2, borderRadius: 6 },
        { label: nB(), data: dB, backgroundColor: 'rgba(122,158,132,0.7)', borderColor: '#7A9E84', borderWidth: 2, borderRadius: 6 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { font: { family: 'DM Sans', size: 12 }, color: '#6B3560' } } },
      scales: {
        y: { beginAtZero: true, max: 8, ticks: { stepSize: 1 }, grid: { color: '#F3E6DA' } },
        x: { grid: { display: false }, ticks: { font: { size: 11 } } }
      }
    }
  });
}

// ── APPLY DAILY ───────────────────────────────────────────────
let actionFilter = 'all';

function renderDaily() {
  return `
<div class="page${S.currentPage==='daily'?' active':''}" id="page-daily">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Section Three</span>
      <h1 class="sec-title">Apply It <em>Daily</em></h1>
      <p class="sec-desc">From insight to action. Choose one thing today.</p>
    </div>

    <h2 style="font-size:1.4rem;color:var(--plum);margin-bottom:0.5rem;">Love Language Action Menu</h2>
    <p class="text-muted mb-3">Fifty small acts. All five languages. Choose one today.</p>
    <div class="filter-row" id="filter-row">
      <button class="filter-btn f-all${actionFilter==='all'?' active':''}" onclick="setFilter('all')">All</button>
      <button class="filter-btn f-words${actionFilter==='words'?' active':''}" onclick="setFilter('words')">💬 Words</button>
      <button class="filter-btn f-time${actionFilter==='time'?' active':''}" onclick="setFilter('time')">⏱ Time</button>
      <button class="filter-btn f-touch${actionFilter==='touch'?' active':''}" onclick="setFilter('touch')">🤝 Touch</button>
      <button class="filter-btn f-service${actionFilter==='service'?' active':''}" onclick="setFilter('service')">🛠 Service</button>
      <button class="filter-btn f-gifts${actionFilter==='gifts'?' active':''}" onclick="setFilter('gifts')">🎁 Gifts</button>
    </div>
    <div class="action-grid" id="action-grid">${renderActionItems()}</div>

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.4rem;color:var(--plum);margin-bottom:0.5rem;">Date Night Planner</h2>
    <p class="text-muted mb-3" style="font-style:italic;">"The most meaningful dates aren't the most expensive. They're the ones that speak directly to your partner's heart."</p>
    <div class="two-col mb-3">
      ${renderDateNightCard('A')}
      ${renderDateNightCard('B')}
    </div>
    <div class="card mb-3">
      <h3 class="mb-2">Date Night Idea Generator</h3>
      <div style="overflow-x:auto;">
        <table class="date-table">
          <thead><tr><th>Language</th><th>Idea One</th><th>Idea Two</th></tr></thead>
          <tbody>${DATE_IDEAS.map(d=>`<tr><td><strong>${d.ll}</strong></td><td>${esc(d.i1)}</td><td>${esc(d.i2)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </div>

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.4rem;color:var(--plum);margin-bottom:0.5rem;">Love Language Barriers</h2>
    <p class="text-muted mb-3">Knowing your partner's love language is only half the journey.</p>
    <div class="two-col mb-3">
      ${renderBarriersCard('A')}
      ${renderBarriersCard('B')}
    </div>

    <div class="ornament">✦ ✦ ✦</div>
    <h2 style="font-size:1.4rem;color:var(--plum);margin-bottom:0.5rem;">Our Love Language Commitments</h2>
    <p class="text-muted mb-3">Written to each other. Signed by both of you. Kept as a record.</p>
    <div class="two-col mb-3">
      ${renderCommitCard('A')}
      ${renderCommitCard('B')}
    </div>
    <div class="commitment-together">
      <blockquote>"We will learn each other's language, not perfectly, but persistently. We will choose to love each other on purpose, even on the days it doesn't come easily. And when we miss the mark, we will try again."</blockquote>
      <div class="two-col">
        <div class="field-group">
          <label class="field-label">${esc(nA())}'s signature</label>
          <input id="commit-signA" class="text-input" value="${esc(S.commitA.sign)}" placeholder="${esc(nA())}" />
        </div>
        <div class="field-group">
          <label class="field-label">${esc(nB())}'s signature</label>
          <input id="commit-signB" class="text-input" value="${esc(S.commitB.sign)}" placeholder="${esc(nB())}" />
        </div>
      </div>
      <span class="saved-ind" id="si-commit-sig">✓ Signed</span>
    </div>

    <div class="flex-end">
      <button class="btn btn-primary" onclick="navTo('challenge')">Start 30-Day Challenge &rarr;</button>
    </div>
  </div>
</div>`;
}

function renderActionItems() {
  let html = '';
  for (const [k, actions] of Object.entries(ACTION_POOL)) {
    if (actionFilter !== 'all' && actionFilter !== k) continue;
    actions.forEach(a => {
      html += `<div class="action-item ${k}">
        <span class="ai-tag" style="color:${LL[k].color}">${LL[k].icon} ${LL[k].label}</span>
        <span class="ai-text">${esc(a)}</span>
      </div>`;
    });
  }
  return html;
}

function setFilter(f) {
  actionFilter = f;
  document.getElementById('action-grid').innerHTML = renderActionItems();
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
    const classes = b.className.split(' ');
    const fClass = classes.find(c => c.startsWith('f-'));
    if (fClass && fClass === 'f-' + f) b.classList.add('active');
  });
}

function renderDateNightCard(p) {
  const pName  = p === 'A' ? nA() : nB();
  const pOther = p === 'A' ? nB() : nA();
  const dn     = p === 'A' ? S.dateNightA : S.dateNightB;
  const quiz   = p === 'B' ? S.quizB : S.quizA; // target partner's quiz
  // p=A plans for B, so targetQuiz is B's
  const targetQuiz = p === 'A' ? S.quizB : S.quizA;
  const autoLL = targetQuiz.done ? getRanked(targetQuiz.scores)[0].label : '';
  const badge  = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid    = 'si-dn-' + p;
  return `
  <div class="card">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)} plans for ${esc(pOther)}</div>
    <div class="field-group">
      <label class="field-label">${esc(pOther)}'s primary love language</label>
      <input id="dn-${p}-partnerLL" class="text-input" value="${esc(dn.partnerLL || autoLL)}" placeholder="e.g. Quality Time" />
    </div>
    <div class="field-group">
      <label class="field-label">A date idea that speaks their language</label>
      <textarea id="dn-${p}-idea" rows="2" placeholder="Describe your idea...">${esc(dn.idea)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">What I'll do to make them feel seen</label>
      <textarea id="dn-${p}-feelSeen" rows="2" placeholder="...">${esc(dn.feelSeen)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">What I want them to feel by the end</label>
      <input id="dn-${p}-wantToFeel" class="text-input" value="${esc(dn.wantToFeel)}" placeholder="e.g. Cherished and seen" />
    </div>
    <div class="field-group">
      <label class="field-label">Planning for</label>
      <input id="dn-${p}-date" type="date" class="text-input" value="${esc(dn.date)}" />
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function renderBarriersCard(p) {
  const pName = p === 'A' ? nA() : nB();
  const bar   = p === 'A' ? S.barriersA : S.barriersB;
  const badge = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid   = 'si-bar-' + p;
  return `
  <div class="card">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <div class="field-group">
      <label class="field-label">Speaking my partner's love language sometimes feels difficult because...</label>
      <textarea id="bar-${p}-difficult" rows="2" placeholder="Be honest with yourself...">${esc(bar.difficult)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">Growing up, love in my family was mostly shown through...</label>
      <input id="bar-${p}-family" class="text-input" value="${esc(bar.family)}" placeholder="e.g. acts of service, words..." />
    </div>
    <div class="field-group">
      <label class="field-label">...which means I naturally default to showing love by...</label>
      <textarea id="bar-${p}-naturally" rows="2" placeholder="...">${esc(bar.naturally)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">A belief that makes it hard to show love my partner's way is...</label>
      <textarea id="bar-${p}-belief" rows="2" placeholder="...">${esc(bar.belief)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">One small thing I can do this week to stretch outside my comfort zone is...</label>
      <textarea id="bar-${p}-stretch" rows="2" placeholder="...">${esc(bar.stretch)}</textarea>
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function renderCommitCard(p) {
  const pName  = p === 'A' ? nA() : nB();
  const pOther = p === 'A' ? nB() : nA();
  const com    = p === 'A' ? S.commitA : S.commitB;
  const badge  = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid    = 'si-com-' + p;
  return `
  <div class="card card-accent">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)} writes to ${esc(pOther)}</div>
    <div class="field-group">
      <label class="field-label">I commit to speaking your love language by regularly doing...</label>
      <textarea id="com-${p}-doRegularly" rows="3" placeholder="Be specific and sincere...">${esc(com.doRegularly)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">When I'm tired, stressed, or busy, I will still try to...</label>
      <textarea id="com-${p}-whenTired" rows="2" placeholder="...">${esc(com.whenTired)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">If I'm falling short, please gently remind me by...</label>
      <textarea id="com-${p}-remindMe" rows="2" placeholder="...">${esc(com.remindMe)}</textarea>
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function bindDailyFields() {
  ['A','B'].forEach(p => {
    const dn  = p === 'A' ? S.dateNightA : S.dateNightB;
    const bar = p === 'A' ? S.barriersA  : S.barriersB;
    const com = p === 'A' ? S.commitA    : S.commitB;
    ['partnerLL','idea','feelSeen','wantToFeel','date'].forEach(k => bind(`dn-${p}-${k}`, dn, k, 'si-dn-'+p));
    ['difficult','family','naturally','belief','stretch'].forEach(k => bind(`bar-${p}-${k}`, bar, k, 'si-bar-'+p));
    ['doRegularly','whenTired','remindMe'].forEach(k => bind(`com-${p}-${k}`, com, k, 'si-com-'+p));
  });
  const csA = document.getElementById('commit-signA');
  const csB = document.getElementById('commit-signB');
  if (csA) { csA.value = S.commitA.sign||''; csA.addEventListener('input', () => { S.commitA.sign=csA.value; persist(); showSaved('si-commit-sig'); }); }
  if (csB) { csB.value = S.commitB.sign||''; csB.addEventListener('input', () => { S.commitB.sign=csB.value; persist(); showSaved('si-commit-sig'); }); }
}

// ── 30-DAY CHALLENGE ──────────────────────────────────────────
let activeChallengeTab = 'A';

function renderChallengePage() {
  // Build plans based on partner scores
  const planA = buildPersonalizedPlan(S.quizB.scores); // A does actions FOR B (based on B's scores)
  const planB = buildPersonalizedPlan(S.quizA.scores); // B does actions FOR A (based on A's scores)

  return `
<div class="page${S.currentPage==='challenge'?' active':''}" id="page-challenge">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Section Four</span>
      <h1 class="sec-title">The 30-Day Connection <em>Challenge</em></h1>
      <p class="sec-desc">"The most powerful thing you can do after discovering your love languages isn't to memorize them. It's to practice them."</p>
    </div>

    <div class="card card-warm mb-3">
      <h3 class="mb-2">Starting Intentions</h3>
      <p class="text-muted mb-3" style="font-style:italic;">"The one thing I most hope this challenge does for our relationship is..."</p>
      <div class="two-col">
        <div class="field-group">
          <label class="field-label">${esc(nA())}</label>
          <textarea id="intent-A" rows="2" placeholder="...">${esc(S.challengeA.intention)}</textarea>
        </div>
        <div class="field-group">
          <label class="field-label">${esc(nB())}</label>
          <textarea id="intent-B" rows="2" placeholder="...">${esc(S.challengeB.intention)}</textarea>
        </div>
      </div>
      <span class="saved-ind" id="si-intent">✓ Saved</span>
    </div>

    <div class="challenge-tabs">
      <button class="ch-tab${activeChallengeTab==='A'?' active':''}" onclick="switchChallengeTab('A')">
        ${esc(nA())}'s Plan
      </button>
      <button class="ch-tab${activeChallengeTab==='B'?' active':''}" onclick="switchChallengeTab('B')">
        ${esc(nB())}'s Plan
      </button>
    </div>

    <div class="ch-panel${activeChallengeTab==='A'?' active':''}" id="ch-panel-A">
      ${renderChallengePanel('A', planA)}
    </div>
    <div class="ch-panel${activeChallengeTab==='B'?' active':''}" id="ch-panel-B">
      ${renderChallengePanel('B', planB)}
    </div>

    <div class="ornament">✦ ✦ ✦</div>
    <div class="weekly-gen-card">
      <h2 style="font-size:1.4rem;color:var(--plum);margin-bottom:0.5rem;">This Week's Love Language Focus</h2>
      <p class="text-muted mb-3">Click to get a random action from your partner's primary love language.</p>
      <div class="two-col mb-3">
        <div>
          <p style="font-size:0.8rem;font-weight:600;color:var(--mauve);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:0.5rem;">${esc(nA())}'s focus for ${esc(nB())}</p>
          <div class="weekly-action-box" id="weekly-box-A">${esc(S.weeklyFocusA) || 'Click the button to get a focus for this week.'}</div>
          <button class="btn btn-secondary btn-sm" onclick="generateWeeklyFocus('A')">Generate Focus</button>
        </div>
        <div>
          <p style="font-size:0.8rem;font-weight:600;color:var(--sage);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:0.5rem;">${esc(nB())}'s focus for ${esc(nA())}</p>
          <div class="weekly-action-box" id="weekly-box-B">${esc(S.weeklyFocusB) || 'Click the button to get a focus for this week.'}</div>
          <button class="btn btn-secondary btn-sm" onclick="generateWeeklyFocus('B')">Generate Focus</button>
        </div>
      </div>
    </div>

    <div class="flex-end">
      <button class="btn btn-primary" onclick="navTo('reflections')">Reflections &rarr;</button>
    </div>
  </div>
</div>`;
}

function renderChallengePanel(p, plan) {
  // p = 'A' means this is A's plan (A does actions FOR B)
  const challenger  = p === 'A' ? nA() : nB();
  const forPartner  = p === 'A' ? nB() : nA();
  const checker     = p === 'A' ? S.challengeA : S.challengeB;
  const done        = getChallengeProgress(checker);
  const pct         = Math.round(done / 30 * 100);
  const msg         = getProgressMsg(done);

  return `
  <div class="challenge-progress">
    <div>
      <div class="ch-prog-num">${done}</div>
      <div class="ch-prog-label" style="color:var(--plum-mid);">of 30 days</div>
    </div>
    <div class="ch-prog-meta">
      <div class="ch-prog-label">${esc(challenger)}'s 30 Days of Love for ${esc(forPartner)}</div>
      <div class="ch-prog-bar"><div class="ch-prog-fill" style="width:${pct}%"></div></div>
      <div class="ch-prog-msg">${esc(msg)}</div>
    </div>
    ${done === 30 ? '<span style="font-size:2rem;">🎉</span>' : ''}
  </div>

  <div class="challenge-list">
    ${plan.map(d => {
      const checked = !!(checker.checked && checker.checked[d.day]);
      const noteVal = (checker.notes && checker.notes[d.day]) ? checker.notes[d.day] : '';
      const ll = LL[d.ll] || { label:'Together', icon:'🌟', cls:'together', color: '#C89A4A' };
      return `
      <div class="ch-day${checked?' done':''}" id="chday-${p}-${d.day}">
        <div class="ch-day-header">
          <div class="ch-day-num">Day ${d.day}</div>
          <div class="ch-action">${esc(d.action)}</div>
          <span class="ch-lang-chip chip-${d.ll||'together'}">${ll.icon} ${ll.label}</span>
          <button class="ch-check${checked?' checked':''}" onclick="toggleChallengeDay('${p}',${d.day})" title="${checked?'Mark incomplete':'Mark complete'}">
            ${checked ? '✓' : ''}
          </button>
        </div>
        <div class="ch-day-note">
          <input type="text" class="ch-note-input" id="chnote-${p}-${d.day}" value="${esc(noteVal)}" placeholder="Add a note for Day ${d.day}..." oninput="saveChallengeNote('${p}',${d.day},this.value)" />
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function switchChallengeTab(p) {
  activeChallengeTab = p;
  document.querySelectorAll('.ch-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.ch-panel').forEach(pn => pn.classList.remove('active'));
  const tabs = document.querySelectorAll('.ch-tab');
  tabs[p === 'A' ? 0 : 1]?.classList.add('active');
  document.getElementById('ch-panel-' + p)?.classList.add('active');
}

function toggleChallengeDay(p, day) {
  const checker = p === 'A' ? S.challengeA : S.challengeB;
  if (!checker.checked) checker.checked = {};
  checker.checked[day] = !checker.checked[day];
  persist();

  // Update just the day row and progress bar
  const dayEl = document.getElementById(`chday-${p}-${day}`);
  if (dayEl) {
    const checked = checker.checked[day];
    dayEl.classList.toggle('done', checked);
    const btn = dayEl.querySelector('.ch-check');
    if (btn) { btn.classList.toggle('checked', checked); btn.textContent = checked ? '✓' : ''; }
  }

  // Update progress section
  const done = getChallengeProgress(checker);
  const pct  = Math.round(done / 30 * 100);
  const panel = document.getElementById('ch-panel-' + p);
  if (panel) {
    const numEl = panel.querySelector('.ch-prog-num');
    const fillEl = panel.querySelector('.ch-prog-fill');
    const msgEl  = panel.querySelector('.ch-prog-msg');
    if (numEl)  numEl.textContent = done;
    if (fillEl) fillEl.style.width = pct + '%';
    if (msgEl)  msgEl.textContent = getProgressMsg(done);
  }
}

function saveChallengeNote(p, day, val) {
  const checker = p === 'A' ? S.challengeA : S.challengeB;
  if (!checker.notes) checker.notes = {};
  checker.notes[day] = val;
  persist();
}

function generateWeeklyFocus(p) {
  // p = 'A' means A's focus for B, so based on B's scores
  const targetQuiz = p === 'A' ? S.quizB : S.quizA;
  let pool = [];
  if (targetQuiz.done) {
    const ranked = getRanked(targetQuiz.scores);
    const primary = ranked[0].key;
    pool = ACTION_POOL[primary];
  } else {
    // pick from all pools
    pool = Object.values(ACTION_POOL).flat();
  }
  const action = pool[Math.floor(Math.random() * pool.length)];
  if (p === 'A') { S.weeklyFocusA = action; } else { S.weeklyFocusB = action; }
  persist();
  const box = document.getElementById('weekly-box-' + p);
  if (box) box.textContent = action;
}

function bindChallengeFields() {
  bind('intent-A', S.challengeA, 'intention', 'si-intent');
  bind('intent-B', S.challengeB, 'intention', 'si-intent');
}

// ── REFLECTIONS PAGE ─────────────────────────────────────────
function renderReflections() {
  const rA = S.reflectionA;
  const rB = S.reflectionB;
  const rt = S.reflectionTogether;
  return `
<div class="page${S.currentPage==='reflections'?' active':''}" id="page-reflections">
  <div class="section-wrap">
    <div class="section-header mb-3">
      <span class="sec-tag">Reflection</span>
      <h1 class="sec-title">30-Day Challenge <em>Reflection</em></h1>
      <p class="sec-desc">Complete this page together on or after Day 30. You showed up for each other. Not perfectly, but persistently.</p>
    </div>

    <div class="reflection-grid mb-3">
      ${renderReflectionCard('A', rA)}
      ${renderReflectionCard('B', rB)}
    </div>

    <div class="card mb-3">
      <h3 class="mb-3">Together</h3>
      <div class="field-group">
        <label class="field-label">One commitment we're making to carry forward from this challenge is...</label>
        <textarea id="ref-together-commit" rows="3" placeholder="...">${esc(rt.commitment)}</textarea>
      </div>
      <div class="two-col">
        <div class="field-group">
          <label class="field-label">${esc(nA())} signs</label>
          <input id="ref-signA" class="text-input" value="${esc(rt.signA)}" placeholder="${esc(nA())}" />
        </div>
        <div class="field-group">
          <label class="field-label">${esc(nB())} signs</label>
          <input id="ref-signB" class="text-input" value="${esc(rt.signB)}" placeholder="${esc(nB())}" />
        </div>
      </div>
      <span class="saved-ind" id="si-reflection">✓ Saved</span>
    </div>

    <div class="closing-hero">
      <div style="font-size:2.5rem;margin-bottom:1rem;">💞</div>
      <h1>Thank You for Doing This Work Together</h1>
      <p>Not everyone chooses to understand their partner more deeply. The fact that you picked up this workbook and actually used it says something real about both of you. Love doesn't ask for perfection. It asks for effort. You gave it.</p>
      <p style="color:var(--blush);font-size:0.85rem;margin-top:1rem;">With warmth, The Clarity Desk</p>
    </div>

    <div class="mt-4 text-center">
      <button class="btn-print btn-lg" onclick="printWorkbook()">🖨️ Print Your Workbook as PDF</button>
    </div>
  </div>
</div>`;
}

function renderReflectionCard(p, r) {
  const pName  = p === 'A' ? nA() : nB();
  const pOther = p === 'A' ? nB() : nA();
  const badge  = p === 'A' ? 'p-badge-a' : 'p-badge-b';
  const sid    = 'si-ref-' + p;
  return `
  <div class="ref-card">
    <div class="p-badge ${badge}">${p==='A'?'🌸':'🌿'} ${esc(pName)}</div>
    <div class="field-group">
      <label class="field-label">The day that meant the most to me was Day ___ because...</label>
      <input id="ref-${p}-dayMeant" class="text-input" value="${esc(r.dayMeant)}" placeholder="Day and reason..." />
    </div>
    <div class="field-group">
      <label class="field-label">Something I noticed shift between us this month was...</label>
      <textarea id="ref-${p}-noticed" rows="2" placeholder="...">${esc(r.noticed)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">The action that surprised me most was...</label>
      <textarea id="ref-${p}-surprised" rows="2" placeholder="...">${esc(r.surprised)}</textarea>
    </div>
    <div class="field-group">
      <label class="field-label">What I now understand about how ${esc(pOther)} needs to be loved is...</label>
      <textarea id="ref-${p}-understand" rows="2" placeholder="...">${esc(r.understand)}</textarea>
    </div>
    <span class="saved-ind" id="${sid}">✓ Saved</span>
  </div>`;
}

function bindReflectionFields() {
  const rt = S.reflectionTogether;
  const rA = S.reflectionA;
  const rB = S.reflectionB;
  bind('ref-together-commit', rt, 'commitment', 'si-reflection');
  bind('ref-signA', rt, 'signA', 'si-reflection');
  bind('ref-signB', rt, 'signB', 'si-reflection');
  ['dayMeant','noticed','surprised','understand'].forEach(k => {
    bind('ref-A-'+k, rA, k, 'si-ref-A');
    bind('ref-B-'+k, rB, k, 'si-ref-B');
  });
}

// ── PRINT ─────────────────────────────────────────────────────
function printWorkbook() { window.print(); }

// ── MAIN RENDER ───────────────────────────────────────────────
function renderApp() {
  const app = document.getElementById('app');
  app.innerHTML =
    renderNav() +
    renderCover() +
    renderHowTo() +
    renderQuizPage() +
    renderResults() +
    renderUnderstand() +
    renderDaily() +
    renderChallengePage() +
    renderReflections();

  // Activate current page
  const pg = S.currentPage || 'cover';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const pgEl = document.getElementById('page-' + pg);
  if (pgEl) pgEl.classList.add('active');
  const nbEl = document.querySelector(`.nav-btn[data-page="${pg}"]`);
  if (nbEl) nbEl.classList.add('active');

  // Bind fields for current page
  setTimeout(() => {
    bindPageFields(pg);
    // Always bind quiz bodies since they have their own containers
    renderQuizBody('A');
    renderQuizBody('B');
  }, 30);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  S = loadState();
  renderApp();
});
