/* =====================================================
   EDIT HERE — everything on the About page comes from ABOUT
   ===================================================== */
const ABOUT = {
  logo:    "[ ANUJ_TARADE ]",
  version: "V. 001",
  title:   "ABOUT",

  // One string per paragraph
  bio: [
    "Hi, I’m Anuj Tarade, a passionate web developer and designer. I love creating beautiful and functional websites that provide great user experiences.",
    "With a keen eye for detail and a strong understanding of web technologies, I strive to bring innovative ideas to life through my work."
  ],

  // [label, value] rows
  facts: [
    ["NAME", "Anuj Tarade"],
    ["ROLE", "Web developer & designer"]
  ],

  // Add more, e.g. { title: "Email", type: "MAIL", url: "mailto:you@example.com" }
  links: [
    { title: "GitHub", type: "SOCIAL", url: "https://github.com/anujtarade8" },
    { title: "Home",   type: "BACK",   url: "index.html" }
  ]
};

/* ---------- render ---------- */
const $ = id => document.getElementById(id);
const year = new Date().getFullYear();
$("logo").textContent = ABOUT.logo;
$("updated").textContent = "LAST UPDATED " + year + " · " + ABOUT.version;
$("title").textContent = ABOUT.title;
$("footer").innerHTML = "<span>" + ABOUT.logo + "</span><span>" + ABOUT.version + "</span><span>© " + year + "</span>";

ABOUT.bio.forEach(t => { const p = document.createElement("p"); p.textContent = t; $("bio").appendChild(p); });

ABOUT.facts.forEach(([k, v]) => {
  const dt = document.createElement("dt"), dd = document.createElement("dd");
  dt.textContent = "[ " + k + " ]"; dd.textContent = v;
  $("facts").append(dt, dd);
});

ABOUT.links.forEach(l => {
  const a = document.createElement("a");
  a.className = "row"; a.href = l.url;
  const h = document.createElement("h2"); h.textContent = l.title;
  const m = document.createElement("div"); m.className = "meta";
  const s = document.createElement("span"); s.textContent = "↗ " + (l.type || "");
  m.appendChild(s); a.append(h, m);
  $("links").appendChild(a);
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
  root.dataset.theme = getComputedStyle(root).colorScheme === "dark" ? "light" : "dark";
});
