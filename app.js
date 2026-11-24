"use strict";
/* English Buddy – Prospect 2 (Grade 8) */
const $ = s => document.querySelector(s);
const app = $('#app');

/* ---------- state ---------- */
const DEF = { xp: 0, stars: {}, streak: 0, last: "", dlg: {}, ph: {} };
let S = (function () {
  try { return Object.assign({}, DEF, JSON.parse(localStorage.getItem('eb') || '{}')); }
  catch (e) { return Object.assign({}, DEF); }
})();
function save() { try { localStorage.setItem('eb', JSON.stringify(S)); } catch (e) {} }
(function touchDay() {
  const d = new Date(), today = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  if (S.last === today) return;
  const y = new Date(Date.now() - 864e5);
  const yd = y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate();
  S.streak = (S.last === yd) ? S.streak + 1 : 1;
  S.last = today; save();
})();

/* ---------- helpers ---------- */
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const level = () => Math.floor(S.xp / 100) + 1;
const TITLES = [[1, "تازه‌کار 🐣"], [3, "کاوشگر 🧭"], [5, "ستاره 🌟"], [8, "قهرمان 🏆"], [12, "استاد 👑"]];
const levelTitle = () => TITLES.filter(t => level() >= t[0]).pop()[1];
const MEGA = { id: 0, title: "Mega Challenge", fa: "چالش بزرگ همه درس‌ها", emoji: "🚀", color: "#3949ab" };
const lessonOf = id => id === 0 ? MEGA : LESSONS.find(l => l.id === id);

function wordsOf(id) {
  if (id !== 0) return lessonOf(id).words;
  const seen = {}, out = [];
  LESSONS.forEach(l => l.words.forEach(w => { if (!seen[w[0]]) { seen[w[0]] = 1; out.push(w); } }));
  return out;
}
function sentsOf(id) {
  return id !== 0 ? lessonOf(id).sents : LESSONS.reduce((a, l) => a.concat(l.sents), []);
}

function speak(t, q) {
  try {
    if (window.Android && window.Android.speak) { window.Android.speak(t, !!q); return; }
    if (window.speechSynthesis) {
      if (!q) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .85; speechSynthesis.speak(u);
    }
  } catch (e) {}
}
let actx;
function beep(notes) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    let t = actx.currentTime;
    notes.forEach(n => {
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle'; o.frequency.value = n; o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(.18, t); g.gain.exponentialRampToValueAtTime(.001, t + .16);
      o.start(t); o.stop(t + .17); t += .13;
    });
  } catch (e) {}
}
const sndOk = () => beep([660, 880]);
const sndNo = () => beep([220, 180]);
const sndWin = () => beep([523, 659, 784, 1046]);
function confetti(n) {
  const fx = $('#fx'), em = ['🎉', '⭐', '✨', '🎈', '🌟'];
  for (let i = 0; i < (n || 24); i++) {
    const s = document.createElement('span'); s.className = 'conf'; s.textContent = em[i % em.length];
    s.style.left = Math.random() * 100 + '%'; s.style.animationDelay = Math.random() * .6 + 's';
    fx.appendChild(s); setTimeout(() => s.remove(), 2800);
  }
}
function pop(e) {
  const p = document.createElement('div'); p.className = 'pop'; p.textContent = e;
  document.body.appendChild(p); setTimeout(() => p.remove(), 800);
}
const starStr = n => '⭐'.repeat(n) + '☆'.repeat(3 - n);
const en = t => `<span class="en">${t}</span>`;
function addXP(n) { S.xp += n; save(); }
function bestStars(lid, key) { return S.stars[lid + ':' + key] || 0; }
function setStars(lid, key, n) { if (n > bestStars(lid, key)) { S.stars[lid + ':' + key] = n; save(); } }
function lessonStars(lid) { return GAMES.reduce((a, g) => a + bestStars(lid, g.k), 0); }

/* ---------- navigation ---------- */
let nav = { s: 'home', lid: null };
window.hwBack = function () {
  if (nav.s === 'game') { try { speechSynthesis.cancel(); } catch (e) {} lessonMenu(nav.lid); return true; }
  if (nav.s === 'lesson') { home(); return true; }
  return false;
};

const GAMES = [
  { k: 'learn', n: 'کارت‌های واژه', d: 'کلمه‌ها را ببین، بشنو و یاد بگیر', i: '🃏', c: '#ff7043', mega: false },
  { k: 'phrases', n: 'جمله‌های کلیدی', d: 'سؤال و جواب‌های درس', i: '💬', c: '#ffa000', mega: false },
  { k: 'dialog', n: 'مکالمه', d: 'گفتگوی کتاب را گوش بده', i: '🎧', c: '#43a047', mega: false },
  { k: 'quiz', n: 'معنی کلمه', d: 'انگلیسی ↔ فارسی', i: '🧠', c: '#1e88e5', mega: true },
  { k: 'listen', n: 'گوش کن و پیدا کن', d: 'بشنو و کلمه درست را بزن', i: '👂', c: '#8e24aa', mega: true },
  { k: 'spell', n: 'املا', d: 'حرف‌ها را مرتب کن', i: '🔤', c: '#e53935', mega: true },
  { k: 'match', n: 'بازی حافظه', d: 'جفت‌ها را پیدا کن', i: '🎴', c: '#00acc1', mega: true },
  { k: 'build', n: 'جمله‌سازی', d: 'کلمه‌ها را به ترتیب بچین', i: '🧱', c: '#6d4c41', mega: true },
  { k: 'qa', n: 'سؤال و جواب', d: 'جواب درست را انتخاب کن', i: '🗣️', c: '#d81b60', mega: true }
];

function header(back, mid) {
  return `<div class="top"><button class="back" id="bk">→ برگشت</button>${mid || ''}<div class="chip">⭐ ${S.xp}</div></div>`;
}

/* ---------- home ---------- */
function home() {
  nav = { s: 'home' };
  const pct = S.xp % 100;
  let h = `<div class="brand top"><img src="logo.png" alt="logo"><div>تولید شده در شرکت <b>نسل جدید اتوماسیون صنعتی</b></div></div><div class="hero"><div class="mascot">🦉</div><div style="flex:1">
    <h1>English Buddy</h1><p>Prospect 2 · پایه هشتم</p>
    <p>${levelTitle()} · سطح ${level()} · 🔥 ${S.streak} روز پشت‌سرهم</p>
    <div class="bar"><i style="width:${pct}%"></i></div></div></div>
    <h2>درس را انتخاب کن 👇</h2><div class="grid">`;
  LESSONS.forEach(l => {
    h += `<button class="lcard" data-l="${l.id}" style="background:${l.color}"><span class="e">${l.emoji}</span>
      <b>Lesson ${l.id}</b><b class="en">${l.title}</b><small>${l.fa}</small>
      <small class="stars">⭐ ${lessonStars(l.id)}/${GAMES.length * 3}</small></button>`;
  });
  h += `<button class="lcard wide" data-l="0" style="background:${MEGA.color}"><span class="e">🚀</span>
      <b>${MEGA.fa}</b><small class="stars">⭐ ${lessonStars(0)}/${GAMES.filter(g => g.mega).length * 3}</small></button></div>
    <div class="tip">💡 هر بازی تا ۳ ستاره دارد. هر جواب درست ۱۰ امتیاز می‌دهد. هر ۱۰۰ امتیاز یک سطح بالا می‌روی!</div>
    <div class="brand"><img src="logo.png" alt="logo"><div>تولید شده در شرکت<br><b>نسل جدید اتوماسیون صنعتی</b></div></div>`;
  app.innerHTML = h;
  app.querySelectorAll('[data-l]').forEach(b => b.onclick = () => lessonMenu(+b.dataset.l));
  window.scrollTo(0, 0);
}

/* ---------- lesson menu ---------- */
function lessonMenu(lid) {
  nav = { s: 'lesson', lid };
  const l = lessonOf(lid);
  let h = header() + `<div class="hero" style="background:${l.color}"><div class="mascot">${l.emoji}</div><div>
    <h1 class="en">${lid ? 'Lesson ' + lid + ': ' : ''}${l.title}</h1><p>${l.fa}</p></div></div>
    <h2>یک بازی انتخاب کن</h2><div class="games">`;
  GAMES.filter(g => lid !== 0 || g.mega).forEach(g => {
    h += `<button class="game" data-g="${g.k}"><div class="gi" style="background:${g.c}">${g.i}</div>
      <div class="gt"><b>${g.n}</b><small>${g.d}</small></div><div class="stars">${starStr(bestStars(lid, g.k))}</div></button>`;
  });
  h += '</div>';
  app.innerHTML = h;
  $('#bk').onclick = home;
  app.querySelectorAll('[data-g]').forEach(b => b.onclick = () => startGame(lid, b.dataset.g));
  window.scrollTo(0, 0);
}

function startGame(lid, key) {
  nav = { s: 'game', lid, key };
  window.scrollTo(0, 0);
  ({ learn, phrases, dialog, quiz: quizGame, listen: listenGame, spell: spellGame, match: matchGame, build: buildGame, qa: qaGame })[key](lid);
}

/* ---------- result ---------- */
function finish(lid, key, score, total, force) {
  const acc = total ? score / total : 1;
  let st = acc >= .9 ? 3 : acc >= .7 ? 2 : acc >= .4 ? 1 : 0;
  if (force) st = force;
  const gain = score * 10 + (st === 3 ? 20 : 0);
  const before = level();
  addXP(gain); setStars(lid, key, st);
  const up = level() > before;
  if (st >= 2) { sndWin(); confetti(34); } else sndNo();
  const msg = st === 3 ? 'عالی بود! 🎉' : st === 2 ? 'آفرین! خیلی خوب بود 👏' : st === 1 ? 'خوب بود، دوباره امتحان کن 💪' : 'اشکال نداره، یه بار دیگه! 🌱';
  app.innerHTML = header() + `<div class="result"><div class="big">${st === 3 ? '🏆' : st === 2 ? '🥳' : '🙂'}</div>
    <h1>${msg}</h1><div class="stars">${starStr(st)}</div>
    <p>${score} از ${total} درست · +${gain} امتیاز</p>${up ? `<p><b>🎊 رفتی سطح ${level()}! ${levelTitle()}</b></p>` : ''}
    <div class="row" style="margin-top:18px"><button class="btn" id="again">🔁 دوباره</button><button class="btn g" id="menu">📋 منو</button></div></div>`;
  $('#bk').onclick = () => lessonMenu(lid);
  $('#again').onclick = () => startGame(lid, key);
  $('#menu').onclick = () => lessonMenu(lid);
}

/* ---------- generic choice engine ---------- */
function choiceGame(lid, key, title, rounds) {
  let i = 0, score = 0;
  function show() {
    const r = rounds[i];
    app.innerHTML = header() + `<div class="row" style="align-items:center;margin-bottom:6px"><div class="progress"><i style="width:${i / rounds.length * 100}%"></i></div>
      <span class="chip">${i + 1}/${rounds.length}</span></div>
      <div class="qbox">${r.top}</div>
      <div class="opts ${r.two ? 'two' : ''}">${r.opts.map((o, k) => `<button class="opt" data-k="${k}">${o.h}</button>`).join('')}</div>
      <div class="fb" id="fb"></div>`;
    $('#bk').onclick = () => lessonMenu(lid);
    const sp = app.querySelector('[data-say]');
    if (sp) sp.onclick = () => speak(r.say);
    if (r.say && r.auto) setTimeout(() => speak(r.say), 250);
    let locked = false;
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (locked) return; locked = true;
      const o = r.opts[+b.dataset.k], fb = $('#fb');
      if (o.ok) {
        b.classList.add('ok'); score++; sndOk(); pop('✅'); fb.className = 'fb ok'; fb.textContent = 'آفرین! 🌟';
        if (r.ok) speak(r.ok);
      } else {
        b.classList.add('no'); sndNo(); fb.className = 'fb no'; fb.textContent = 'نه، این نبود 🙈';
        const k = r.opts.findIndex(x => x.ok); app.querySelectorAll('.opt')[k].classList.add('ok');
        if (r.ok) speak(r.ok);
      }
      setTimeout(() => { i++; i < rounds.length ? show() : finish(lid, key, score, rounds.length); }, o.ok ? 1000 : 1800);
    });
  }
  show();
}

/* ---------- quiz ---------- */
function quizGame(lid) {
  const all = wordsOf(lid);
  const rounds = shuffle(all).slice(0, 10).map((w, i) => {
    const d = shuffle(all.filter(x => x[0] !== w[0] && x[1] !== w[1])).slice(0, 3);
    const opts = shuffle([w].concat(d));
    if (i % 2 === 0) return {
      top: `<div class="big">${w[2]}</div><div class="qtext">${en(w[0])}</div><button class="spk" data-say>🔊</button><div class="hint">معنی این کلمه چیست؟</div>`,
      say: w[0], ok: w[0], opts: opts.map(x => ({ h: x[1], ok: x === w }))
    };
    return {
      top: `<div class="big">${w[2]}</div><div class="qtext">${w[1]}</div><div class="hint">انگلیسی‌اش کدام است؟</div>`,
      ok: w[0], opts: opts.map(x => ({ h: en(x[0]), ok: x === w }))
    };
  });
  choiceGame(lid, 'quiz', 'quiz', rounds);
}

/* ---------- listen ---------- */
function listenGame(lid) {
  const all = wordsOf(lid);
  const rounds = shuffle(all).slice(0, 10).map(w => {
    const d = shuffle(all.filter(x => x[0] !== w[0])).slice(0, 3);
    return {
      top: `<button class="spk" data-say>🔊</button><div class="hint">گوش کن! چه کلمه‌ای شنیدی؟</div>`,
      say: w[0], auto: true, ok: null,
      opts: shuffle([w].concat(d)).map(x => ({ h: en(x[0]) + `<br><small>${x[2]}</small>`, ok: x === w }))
    };
  });
  choiceGame(lid, 'listen', 'listen', rounds);
}

/* ---------- Q & A ---------- */
function qaGame(lid) {
  const mine = sentsOf(lid), pool = LESSONS.reduce((a, l) => a.concat(l.sents), []);
  const key = q => q.split(' ')[0].toLowerCase();
  const yn = a => /^(yes|no)\b/i.test(a);
  const rounds = shuffle(mine).slice(0, 8).map(p => {
    const d = shuffle(pool.filter(x => x[1] !== p[1] && key(x[0]) !== key(p[0]) && yn(x[1]) === yn(p[1]))).filter((x, i, a) => a.findIndex(y => y[1] === x[1]) === i).slice(0, 2);
    return {
      top: `<div class="hint">جواب مناسب را انتخاب کن</div><div class="qtext">${en(p[0])}</div><button class="spk" data-say>🔊</button>`,
      say: p[0], ok: p[1], opts: shuffle([p].concat(d)).map(x => ({ h: en(x[1]), ok: x === p }))
    };
  });
  choiceGame(lid, 'qa', 'qa', rounds);
}

/* ---------- spelling ---------- */
function spellGame(lid) {
  const pool = shuffle(wordsOf(lid).filter(w => w[0].replace(/ /g, '').length <= 12)).slice(0, 8);
  let i = 0, score = 0;
  function show() {
    const w = pool[i], word = w[0], letters = word.split('').filter(c => c !== ' ');
    let tiles = shuffle(letters.map((c, k) => ({ c, k, u: false })));
    let ans = [], tries = 0, busy = false;
    function draw() {
      let n = 0;
      const slots = word.split('').map(c => c === ' ' ? '<div class="slot gap"></div>' : `<div class="slot">${ans[n++] ? ans[n - 1].c : ''}</div>`).join('');
      $('#slots').innerHTML = slots;
      $('#tiles').innerHTML = tiles.map((t, k) => `<button class="tile ${t.u ? 'used' : ''}" data-k="${k}">${t.c}</button>`).join('');
      app.querySelectorAll('.tile').forEach(b => b.onclick = () => {
        if (busy) return; const t = tiles[+b.dataset.k]; if (t.u) return;
        t.u = true; ans.push(t); draw(); if (ans.length === letters.length) check();
      });
    }
    function check() {
      busy = true; const fb = $('#fb');
      if (ans.map(t => t.c).join('') === letters.join('')) {
        sndOk(); pop('✅'); fb.className = 'fb ok'; fb.textContent = 'درسته! 🌟'; speak(word);
        if (tries === 0) score++;
        setTimeout(next, 1100);
      } else {
        sndNo(); tries++; fb.className = 'fb no';
        if (tries >= 2) {
          fb.innerHTML = 'جواب درست: ' + en(word); speak(word);
          setTimeout(next, 2200);
        } else {
          fb.textContent = 'یه بار دیگه امتحان کن 💪';
          setTimeout(() => { tiles.forEach(t => t.u = false); ans = []; busy = false; fb.textContent = ''; draw(); }, 800);
        }
      }
    }
    function next() { i++; i < pool.length ? show() : finish(lid, 'spell', score, pool.length); }
    app.innerHTML = header() + `<div class="row" style="align-items:center"><div class="progress"><i style="width:${i / pool.length * 100}%"></i></div><span class="chip">${i + 1}/${pool.length}</span></div>
      <div class="qbox"><div class="big">${w[2]}</div><div class="qtext">${w[1]}</div>
      <button class="spk" id="sp">🔊</button><div class="hint">حرف‌ها را به ترتیب بزن</div></div>
      <div class="slots" id="slots"></div><div class="tiles" id="tiles"></div>
      <div class="row"><button class="btn w" id="del">⌫ پاک کن</button></div><div class="fb" id="fb"></div>`;
    $('#bk').onclick = () => lessonMenu(lid);
    $('#sp').onclick = () => speak(word);
    $('#del').onclick = () => { if (busy || !ans.length) return; ans.pop().u = false; draw(); };
    draw();
  }
  show();
}

/* ---------- memory match ---------- */
function matchGame(lid) {
  const ws = shuffle(wordsOf(lid).filter((w, i, a) => a.findIndex(x => x[1] === w[1]) === i)).slice(0, 6);
  const cards = shuffle(ws.reduce((a, w, k) => a.concat([{ p: k, t: 'en', w }, { p: k, t: 'fa', w }]), []));
  let first = null, lock = false, moves = 0, found = 0;
  app.innerHTML = header() + `<div class="qbox" style="margin:6px 0"><div class="qtext">🎴 جفت‌ها را پیدا کن</div><div class="hint">کلمه انگلیسی + معنی فارسی</div></div>
    <div class="mem">${cards.map((c, k) => `<button class="mc" data-k="${k}">?</button>`).join('')}</div>
    <div class="fb" id="fb">حرکت‌ها: 0</div>`;
  $('#bk').onclick = () => lessonMenu(lid);
  const els = app.querySelectorAll('.mc');
  function open(k) {
    const c = cards[k], e = els[k]; e.classList.add('open');
    e.innerHTML = c.t === 'en' ? en(c.w[0]) : `<span><span class="emj">${c.w[2]}</span>${c.w[1]}</span>`;
    if (c.t === 'en') speak(c.w[0]);
  }
  function close(k) { els[k].classList.remove('open'); els[k].textContent = '?'; }
  els.forEach((e, k) => e.onclick = () => {
    if (lock || e.classList.contains('open') || e.classList.contains('done')) return;
    open(k);
    if (first === null) { first = k; return; }
    moves++; $('#fb').textContent = 'حرکت‌ها: ' + moves;
    const a = first; first = null;
    if (cards[a].p === cards[k].p) {
      sndOk(); els[a].classList.add('done'); els[k].classList.add('done'); found++;
      if (found === ws.length) setTimeout(() => {
        const st = moves <= 9 ? 3 : moves <= 14 ? 2 : 1;
        finish(lid, 'match', ws.length, ws.length, st);
      }, 900);
    } else {
      sndNo(); lock = true;
      setTimeout(() => { close(a); close(k); lock = false; }, 900);
    }
  });
}

/* ---------- sentence builder ---------- */
function buildGame(lid) {
  const pool = shuffle(sentsOf(lid).reduce((a, p) => a.concat(p), []).filter((s, i, a) => a.indexOf(s) === i && s.split(' ').length >= 3 && s.split(' ').length <= 9)).slice(0, 8);
  let i = 0, score = 0;
  function show() {
    const sent = pool[i], toks = sent.split(' ');
    let bank = shuffle(toks.map((t, k) => ({ t, k, u: false }))), ans = [], tries = 0, busy = false;
    function draw() {
      $('#ans').innerHTML = ans.map((t, k) => `<button class="tile tok" data-a="${k}">${t.t}</button>`).join('');
      $('#bank').innerHTML = bank.map((t, k) => `<button class="tile tok ${t.u ? 'used' : ''}" data-b="${k}">${t.t}</button>`).join('');
      app.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { if (busy) return; const t = bank[+b.dataset.b]; if (t.u) return; t.u = true; ans.push(t); draw(); });
      app.querySelectorAll('[data-a]').forEach(b => b.onclick = () => { if (busy) return; const t = ans.splice(+b.dataset.a, 1)[0]; t.u = false; draw(); });
      $('#chk').disabled = ans.length !== toks.length;
    }
    function next() { i++; i < pool.length ? show() : finish(lid, 'build', score, pool.length); }
    app.innerHTML = header() + `<div class="row" style="align-items:center"><div class="progress"><i style="width:${i / pool.length * 100}%"></i></div><span class="chip">${i + 1}/${pool.length}</span></div>
      <div class="qbox"><div class="qtext">🧱 جمله را بساز</div><button class="spk" id="sp">🔊</button><div class="hint">گوش کن و کلمه‌ها را به ترتیب بچین</div></div>
      <div class="slots sent" id="ans"></div><div class="tiles" id="bank"></div>
      <div class="row"><button class="btn g" id="chk">✔ بررسی</button></div><div class="fb" id="fb"></div>`;
    $('#bk').onclick = () => lessonMenu(lid);
    $('#sp').onclick = () => speak(sent);
    $('#chk').onclick = () => {
      if (busy) return; busy = true; const fb = $('#fb');
      if (ans.map(t => t.t).join(' ') === sent) {
        sndOk(); pop('✅'); fb.className = 'fb ok'; fb.textContent = 'عالی! 🌟'; speak(sent);
        if (tries === 0) score++; setTimeout(next, 1400);
      } else {
        sndNo(); tries++; fb.className = 'fb no';
        if (tries >= 2) { fb.innerHTML = 'جمله درست:<br>' + en(sent); speak(sent); setTimeout(next, 2800); }
        else { fb.textContent = 'ترتیبش درست نیست، دوباره 💪'; setTimeout(() => { busy = false; fb.textContent = ''; }, 900); }
      }
    };
    draw();
  }
  show();
}

/* ---------- flashcards ---------- */
function learn(lid) {
  const ws = wordsOf(lid); let i = 0, seen = {};
  function show() {
    const w = ws[i]; seen[i] = 1;
    app.innerHTML = header() + `<div class="row" style="align-items:center"><div class="progress"><i style="width:${(i + 1) / ws.length * 100}%"></i></div><span class="chip">${i + 1}/${ws.length}</span></div>
      <div class="flash" id="fl"><div class="in">
        <div class="face"><div class="big">${w[2]}</div><div class="qtext">${en(w[0])}</div><div class="hint">برای دیدن معنی بزن 👆</div></div>
        <div class="face back"><div class="qtext">${w[1]}</div><div class="big" style="font-size:40px">${w[2]}</div></div></div></div>
      <div class="row"><button class="btn w" id="pv">▶ قبلی</button><button class="spk s" id="sp">🔊</button><button class="btn" id="nx">بعدی ◀</button></div>`;
    $('#bk').onclick = () => lessonMenu(lid);
    $('#fl').onclick = () => $('#fl').classList.toggle('flip');
    $('#sp').onclick = () => speak(w[0]);
    $('#pv').onclick = () => { if (i > 0) { i--; show(); } };
    $('#nx').onclick = () => {
      if (i < ws.length - 1) { i++; show(); }
      else { finish(lid, 'learn', 1, 1, 3); }
    };
    setTimeout(() => speak(w[0]), 200);
  }
  show();
}

/* ---------- key phrases ---------- */
function phrases(lid) {
  const l = lessonOf(lid);
  app.innerHTML = header() + `<div class="qbox"><div class="qtext">💬 جمله‌های کلیدی</div><div class="hint">روی 🔊 بزن و تکرار کن</div></div>` +
    l.sents.map(p => `<div class="pat"><div class="t"><div>${en('❓ ' + p[0])}</div><div style="margin-top:4px">${en('💡 ' + p[1])}</div></div>
      <button class="spk s" data-s="${(p[0] + ' ' + p[1]).replace(/"/g, '&quot;')}">🔊</button></div>`).join('') +
    `<div class="row" style="margin-top:14px"><button class="btn g" id="dn">✔ تمام شد</button></div>`;
  $('#bk').onclick = () => lessonMenu(lid);
  app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
    const t = b.dataset.s, p = l.sents.find(x => x[0] + ' ' + x[1] === t);
    speak(p[0]); speak(p[1], true);
  });
  $('#dn').onclick = () => {
    if (!S.ph[lid]) { S.ph[lid] = 1; addXP(15); }
    setStars(lid, 'phrases', 3); save(); sndWin(); confetti(18); lessonMenu(lid);
  };
}

/* ---------- dialogue ---------- */
function dialog(lid) {
  const l = lessonOf(lid), faces = {};
  const icons = ['🧒', '👧', '👩‍🏫', '👦', '🧑‍🎓'];
  let n = 0;
  l.dialog.forEach(d => { if (!faces[d[0]]) faces[d[0]] = icons[n++ % icons.length]; });
  app.innerHTML = header() + `<div class="qbox"><div class="qtext">🎧 Conversation</div>
    <button class="btn" id="all">▶ پخش همه</button></div>` +
    l.dialog.map((d, k) => `<div class="bub ${k % 2 ? 'alt' : ''}" data-k="${k}"><div class="who">${faces[d[0]]}</div>
      <div class="tx"><b>${en(d[0])}</b>${en(d[1])}</div></div>`).join('') +
    `<div class="tip">روی هر جمله بزن تا گوش بدهی. بعد با دوستت نقش‌ها را بخوانید! 🎭</div>`;
  $('#bk').onclick = () => lessonMenu(lid);
  const done = () => {
    if (!S.dlg[lid]) { S.dlg[lid] = 1; addXP(20); setStars(lid, 'dialog', 3); sndWin(); confetti(14); }
  };
  app.querySelectorAll('.bub').forEach(b => b.onclick = () => {
    const d = l.dialog[+b.dataset.k]; speak(d[1]); done();
    app.querySelectorAll('.bub').forEach(x => x.classList.remove('playing')); b.classList.add('playing');
  });
  $('#all').onclick = () => {
    l.dialog.forEach((d, k) => speak(d[1], k > 0)); done();
  };
}

home();
