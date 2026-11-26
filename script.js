/* =====================================================
   EDIT HERE — everything on the page comes from CONFIG
   ===================================================== */
const CONFIG = {
  name:      ["ANUJ", "TARADE"],          // two big words in the hero
  logo:      "[ ANUJ_TARADE ]",           // top-left label
  version:   "V. 001",                    // little version stamp
  tagline:   "“Y’all ain’t stopping me”", // bottom-left of hero
  intro:     "I’m Anuj, I’m Sinosuicidal",// top-right of hero (hidden on small phones)
  about:     "Making things for the web, one weird page at a time.",
  aboutLink: "https://anujtarade8.github.io/html-portfolio/public/about.html",

  // Add, remove or reorder items. "img" is optional.
  work: [
    { title: "Happie Birtday",       type: "PAGE", url: "https://anujtarade8.github.io/html-portfolio/public/birthday.html",
      img: "https://anujtarade8.github.io/html-portfolio/assets/images/image (2).png" },
    { title: "Top 5 Shoes Websites", type: "LIST", url: "https://anujtarade8.github.io/html-portfolio/public/Top 5 Websites.html",
      img: "https://anujtarade8.github.io/html-portfolio/assets/images/image (3).png" },
    { title: "About Me",             type: "PAGE", url: "https://anujtarade8.github.io/html-portfolio/public/about.html" },
    { title: "Don’t Contact Me",     type: "PAGE", url: "https://anujtarade8.github.io/html-portfolio/public/contact.html" }
  ],

  // ASCII face settings
  face: {
    cols: 51, rows: 26,
    edge: "#",          // outline character
    pupil: "@@",        // pupil (2 chars wide looks best)
    skin: ".",          // sparse texture inside the face
    mouth: "'.______.'",
    square: 5,          // head shape: 2 = oval, 4 = rounded square, 8 = almost a box
    follow: 8           // how far the whole head leans toward the cursor (px)
  }
};

/* ---------- page content ---------- */
const $ = id => document.getElementById(id);
$("logo").textContent = CONFIG.logo;
$("updated").textContent = "LAST UPDATED " + new Date().getFullYear() + " · " + CONFIG.version;
$("word1").textContent = CONFIG.name[0];
$("word2").textContent = CONFIG.name[1];
$("tagline").textContent = CONFIG.tagline;
$("intro").textContent = CONFIG.intro;
$("about").textContent = CONFIG.about;
$("about-link").href = CONFIG.aboutLink;
$("count").textContent = "[ " + String(CONFIG.work.length).padStart(2, "0") + " ITEMS ]";
$("footer").innerHTML = "<span>" + CONFIG.logo + "</span><span>" + CONFIG.version + "</span><span>© " + new Date().getFullYear() + "</span>";

CONFIG.work.forEach(w => {
  const a = document.createElement("a");
  a.className = "row"; a.href = w.url;
  const h = document.createElement("h2"); h.textContent = w.title;
  const m = document.createElement("div"); m.className = "meta";
  const s = document.createElement("span"); s.textContent = "↗ " + (w.type || "");
  m.appendChild(s);
  if (w.img) {
    const i = document.createElement("img");
    i.src = w.img; i.alt = ""; i.loading = "lazy";
    i.onerror = () => i.remove();
    m.appendChild(i);
  }
  a.append(h, m);
  $("index").appendChild(a);
});

/* ---------- clock ---------- */
function tick() {
  const d = new Date(), p = n => String(n).padStart(2, "0");
  $("clock").textContent = p(d.getHours()) + ":" + p(d.getMinutes()) + " " +
    p(d.getDate()) + "/" + p(d.getMonth() + 1) + "/" + String(d.getFullYear()).slice(2);
}
tick(); setInterval(tick, 10000);

/* ---------- theme toggle ---------- */
$("theme").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = getComputedStyle(root).colorScheme === "dark";
  root.dataset.theme = dark ? "light" : "dark";
});

/* ---------- ASCII face ---------- */
const F = CONFIG.face, W = F.cols, H = F.rows;
const EYE_W = 9, EYE_H = 5, INNER_W = EYE_W - 2, INNER_H = EYE_H - 2;
const PW = F.pupil.length;
const MAXX = INNER_W - PW, MAXY = INNER_H - 1;
const EYES = [Math.round(W * 0.16), Math.round(W * 0.84) - EYE_W]; // left x of each eye
const EYE_Y = Math.round(H * 0.28);

function drawFace(px, py) {
  const g = Array.from({ length: H }, () => Array(W).fill(" "));
  const cx = (W - 1) / 2, cy = (H - 1) / 2, rx = W / 2 - 1, ry = H / 2 - 0.5;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const d = Math.abs((x - cx) / rx) ** F.square + Math.abs((y - cy) / ry) ** F.square;
    if (d <= 1) g[y][x] = d > 0.7 ? F.edge : ((x * 7 + y * 13) % 11 === 0 ? F.skin : " ");
  }
  const put = (x, y, s) => { for (let i = 0; i < s.length; i++) g[y][x + i] = s[i]; };

  EYES.forEach(ex => {
    put(ex, EYE_Y - 2, "-".repeat(EYE_W));                 // brow
    put(ex, EYE_Y, " ." + "-".repeat(EYE_W - 4) + ". ");     // lid
    for (let r = 1; r <= INNER_H; r++) put(ex, EYE_Y + r, "|" + " ".repeat(INNER_W) + "|");
    put(ex, EYE_Y + EYE_H - 1 + 0, " '" + "-".repeat(EYE_W - 4) + "' ");
    put(ex + 1 + px, EYE_Y + 1 + py, F.pupil);
  });

  const nx = Math.floor(cx), ny = Math.round(H * 0.5);
  for (let i = 0; i < 3; i++) g[ny + i][nx] = "|";
  put(nx - 1, ny + 3, "(_)");
  put(Math.round(cx - F.mouth.length / 2), Math.round(H * 0.78), F.mouth);

  return g.map(r => r.join("")).join("\n");
}

const face = $("face");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let mx = null, my = null, last = 0, tx = 0, ty = 0, cx = 0, cy = 0, shown = "";

addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; last = performance.now(); }, { passive: true });
addEventListener("pointerleave", () => { last = 0; });

function frame(t) {
  const r = face.getBoundingClientRect();
  if (mx !== null && t - last < 3000) {
    // direction from the face centre to the cursor, normalised to -1..1
    tx = Math.max(-1, Math.min(1, (mx - (r.left + r.width / 2)) / (innerWidth / 2)));
    ty = Math.max(-1, Math.min(1, (my - (r.top + r.height / 2)) / (innerHeight / 2)));
  } else if (!still) {
    tx = Math.sin(t / 1400); ty = Math.cos(t / 2100) * 0.6;   // idle wander
  }
  cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
  const px = Math.round((cx + 1) / 2 * MAXX), py = Math.round((cy + 1) / 2 * MAXY);
  const s = drawFace(px, py);
  if (s !== shown) { face.textContent = s; shown = s; }
  if (!still) face.style.transform = "translate(" + (cx * F.follow).toFixed(1) + "px," + (cy * F.follow * 0.6).toFixed(1) + "px)";
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
