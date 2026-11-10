/* ---------- DATAS E REVALIDAÇÃO ---------- */
const DAY = 864e5;
const REVAL_DAYS = 45;
const p2 = n => String(n).padStart(2, "0");
const daysSince = t => Math.max(0, Math.floor((Date.now() - t) / DAY));
const fmtDate = t => t ? new Date(t).toLocaleDateString("pt-BR") : "—";
const toInput = t => { const d = new Date(t); return d.getFullYear() + "-" + p2(d.getMonth() + 1) + "-" + p2(d.getDate()); };
const needsReval = s => { if (!isDone(s)) return false; const v = get(s).v; return v > 0 && daysSince(v) >= REVAL_DAYS; };
const dueList = () => skills.filter(needsReval);
let rv = [];
