/* ---------- MAPA DE DEPENDÊNCIAS ---------- */
let mapSel = null;
const mapBox = document.getElementById("mapSvgBox"), mapInfo = document.getElementById("mapInfo");
function renderMap() {
    const W = 214, H = 30, RH = 40, CW = 290, PAD = 14, TOP = 26;
    const cols = []; skills.forEach(s => { const d = depth(s); (cols[d] = cols[d] || []).push(s); });
    const catIdx = {}; groups.forEach((g, i) => { catIdx[g.category] = i; });
    cols.forEach(c => c.sort((a, b) => catIdx[a.cat] - catIdx[b.cat] || skills.indexOf(a) - skills.indexOf(b)));
    const maxLen = Math.max(...cols.map(c => c.length)), yOf = {};
    const place = () => cols.forEach(c => { const off = (maxLen - c.length) * RH / 2; c.forEach((s, i) => { yOf[s.name] = off + i * RH; }); });
    place();
    const avg = a => a.reduce((t, n) => t + yOf[n], 0) / a.length;
    for (let it = 0; it < 4; it++) {
        for (let d = 1; d < cols.length; d++) { const k = {}; cols[d].forEach(s => { k[s.name] = s.pre.length ? avg(s.pre) : yOf[s.name]; }); cols[d].sort((a, b) => k[a.name] - k[b.name]); place(); }
        for (let d = cols.length - 2; d >= 0; d--) { const k = {}; cols[d].forEach(s => { const ds = dependentsOf[s.name]; k[s.name] = ds && ds.length ? avg(ds) : yOf[s.name]; }); cols[d].sort((a, b) => k[a.name] - k[b.name]); place(); }
    }
    const anc = new Set(), desc = new Set();
    if (mapSel) {
        const up = n => byName[n].pre.forEach(p => { if (!anc.has(p)) { anc.add(p); up(p); } }); up(mapSel);
        const dn = n => (dependentsOf[n] || []).forEach(c => { if (!desc.has(c)) { desc.add(c); dn(c); } }); dn(mapSel);
    }
    const A = new Set([...anc, mapSel]), D = new Set([...desc, mapSel]);
    const inChain = n => n === mapSel || anc.has(n) || desc.has(n);
    const px = n => PAD + depth(byName[n]) * CW, py = n => TOP + PAD + yOf[n];
    const width = PAD * 2 + (cols.length - 1) * CW + W, height = TOP + PAD * 2 + maxLen * RH;
    let edges = "", nodes = "", heads = "";
    cols.forEach((c, d) => { heads += `<text class="mcol" x="${PAD + d * CW}" y="${TOP - 8}">${d === 0 ? "NÍVEL 0 · BASE" : "NÍVEL " + d}</text>`; });
    skills.forEach(s => s.pre.forEach(p => {
        const x1 = px(p) + W, y1 = py(p) + H / 2, x2 = px(s.name), y2 = py(s.name) + H / 2, dx = Math.max(30, (x2 - x1) / 2);
        const hl = mapSel && ((A.has(p) && A.has(s.name)) || (D.has(p) && D.has(s.name)));
        edges += `<path class="medge${hl ? " hl" : mapSel ? " dim" : ""}" d="M${x1} ${y1}C${r1(x1 + dx)} ${y1} ${r1(x2 - dx)} ${y2} ${x2} ${y2}" data-from="${esc(p)}" data-to="${esc(s.name)}"/>`;
    }));
    skills.forEach(s => {
        const st = statusOf(s), rvl = st === "done" && needsReval(s);
        const label = s.name.length > 29 ? s.name.slice(0, 28) + "…" : s.name;
        nodes += `<g class="mnode ${st}${rvl ? " reval" : ""}${s.name === mapSel ? " sel" : ""}${mapSel && !inChain(s.name) ? " dim" : ""}" data-name="${esc(s.name)}" transform="translate(${px(s.name)} ${py(s.name)})" tabindex="0" role="button" aria-pressed="${s.name === mapSel}" aria-label="${esc(s.name)}: ${statusText(s)}"><title>${esc(s.name)} · ${statusText(s)}</title><rect width="${W}" height="${H}" rx="8"/><text x="10" y="19">${statusIcon(s)} ${esc(label)}</text></g>`;
    });
    mapBox.innerHTML = `<svg class="map" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="group" aria-label="Mapa de dependências entre as habilidades">${heads}${edges}${nodes}</svg>`;
    if (!mapSel) { mapInfo.innerHTML = `<div class="hint" style="margin:0">Clique numa habilidade para ver o que ela exige (à esquerda) e o que ela libera (à direita). A rolagem horizontal mostra os níveis seguintes.</div>`; return; }
    const s = byName[mapSel];
    const need = s.pre.map(n => chipFor(byName[n])).join("") || `<span class="muted">Nada: pode começar já.</span>`;
    const frees = (dependentsOf[s.name] || []).map(n => chipFor(byName[n])).join("") || `<span class="muted">Nenhuma habilidade depende desta.</span>`;
    mapInfo.innerHTML = `<h3>${statusIcon(s)} ${esc(s.name)} <span class="n" style="margin-left:8px">${esc(s.cat)} · ${statusText(s)}</span></h3><div class="small-title" style="margin-top:10px">Exige</div><div class="chips">${need}</div><div class="small-title" style="margin-top:10px">Libera</div><div class="chips">${frees}</div><div class="btnrow"><button type="button" class="btn primary" data-open>Abrir habilidade</button><button type="button" class="btn" data-clear>Limpar seleção</button></div>`;
}
mapBox.addEventListener("click", e => {
    const g = e.target.closest(".mnode");
    if (!g) { if (mapSel) { mapSel = null; renderMap(); } return; }
    mapSel = mapSel === g.dataset.name ? null : g.dataset.name; renderMap();
});
mapBox.addEventListener("dblclick", e => { const g = e.target.closest(".mnode"); if (g) openSkill(g.dataset.name); });
mapBox.addEventListener("keydown", e => {
    const g = e.target.closest && e.target.closest(".mnode"); if (!g) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); const n = g.dataset.name; mapSel = mapSel === n ? null : n; renderMap(); const again = [...mapBox.querySelectorAll(".mnode")].find(x => x.dataset.name === n); if (again) again.focus(); }
});
mapInfo.addEventListener("click", e => {
    const t = e.target.closest("[data-go],[data-open],[data-clear]"); if (!t) return;
    if (t.dataset.go) openSkill(t.dataset.go); else if (t.hasAttribute("data-open") && mapSel) openSkill(mapSel); else if (t.hasAttribute("data-clear")) { mapSel = null; renderMap(); }
});
