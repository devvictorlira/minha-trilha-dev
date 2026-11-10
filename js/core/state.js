/* ---------- ESTADO ---------- */
const KEY = "trilhadev:v2";
const BKEY = "trilhadev:v2:lastBackup";
const URL_RE = /^https?:\/\/[^\s<>"']+$/i;
const blank = () => ({ m: [], c: [], r: [], l: "", d: 0, v: 0 });
/* Aceita só dados no formato esperado (vale para o que está salvo e para arquivos importados) */
function sanitize(raw) {
    const out = {};
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
    const ints = (a, max) => Array.isArray(a) ? [...new Set(a.filter(i => Number.isInteger(i) && i >= 0 && i < max))] : [];
    skills.forEach(s => {
        const x = raw[s.name]; if (!x || typeof x !== "object") return;
        const l = typeof x.l === "string" && URL_RE.test(x.l.trim()) ? x.l.trim().slice(0, 500) : "";
        const ts = n => Number.isFinite(n) && n > 9.46e11 ? Math.min(Math.floor(n), Date.now()) : 0;
        const o = { m: ints(x.m, s.material.length), c: ints(x.c, s.criteria.length), r: ints(x.r, s.ch.r.length), l, d: ts(x.d), v: ts(x.v) };
        /* datas só existem para habilidades concluídas; sem data (dados antigos), o relógio começa agora */
        if (o.c.length >= s.criteria.length && o.r.length >= s.ch.r.length) { if (!o.d) o.d = Date.now(); if (o.v < o.d) o.v = o.d; } else { o.d = 0; o.v = 0; }
        if (o.m.length || o.c.length || o.r.length || o.l) out[s.name] = o;
    });
    return out;
}
let state = {};
try { state = sanitize(JSON.parse(localStorage.getItem(KEY) || "{}")) } catch (e) { state = {} }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch (e) { } };
save();
const get = s => state[s.name] || blank();
const ensure = s => state[s.name] || (state[s.name] = blank());
const isDone = s => { const x = get(s); return x.c.length >= s.criteria.length && x.r.length >= s.ch.r.length };
const unlocked = s => s.pre.every(n => isDone(byName[n]));
const statusOf = s => { if (isDone(s)) return "done"; if (!unlocked(s)) return "locked"; const x = get(s); return (x.m.length + x.c.length + x.r.length) > 0 ? "prog" : "avail" };
const pctOf = s => { const x = get(s); const t = s.material.length + s.criteria.length + s.ch.r.length; return Math.round((x.m.length + x.c.length + x.r.length) / t * 100) };
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const goalPct = g => Math.round(g.skills.filter(n => isDone(byName[n])).length / g.skills.length * 100);
