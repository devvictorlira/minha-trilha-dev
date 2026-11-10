/* ---------- EVOLUÇÃO (HISTÓRICO) ---------- */
const WEEK = 7 * DAY;
const fmtShort = t => { const d = new Date(t); return p2(d.getDate()) + "/" + p2(d.getMonth() + 1); };
const weekStart = t => { const d = new Date(t); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };
const r1 = v => Math.round(v * 10) / 10;
const evoBox = document.getElementById("evo");
function showPop(target) {
    const wrap = target.closest(".chart-inner"); if (!wrap) return;
    const pop = wrap.querySelector(".pop"); pop.textContent = target.dataset.tip; pop.style.display = "block";
    const wr = wrap.getBoundingClientRect(), tr = target.getBoundingClientRect();
    let left = tr.left - wr.left + tr.width / 2 - pop.offsetWidth / 2; left = Math.max(0, Math.min(left, wr.width - pop.offsetWidth));
    let top = tr.top - wr.top - pop.offsetHeight - 8; if (top < 0) top = tr.bottom - wr.top + 8;
    pop.style.left = left + "px"; pop.style.top = top + "px";
}
const hidePop = () => evoBox.querySelectorAll(".pop").forEach(p => { p.style.display = "none"; });
["mouseover", "focusin"].forEach(ev => evoBox.addEventListener(ev, e => { const t = e.target.closest && e.target.closest("[data-tip]"); if (t) showPop(t); }));
["mouseout", "focusout"].forEach(ev => evoBox.addEventListener(ev, e => { if (e.target.closest && e.target.closest("[data-tip]")) hidePop(); }));
evoBox.addEventListener("click", e => { const t = e.target.closest("[data-go]"); if (t) openSkill(t.dataset.go); });

function lineChartSvg(list, now) {
    const W = 640, H = 260, L = 40, R = 14, T = 14, B = 30;
    let t0 = list[0].x.d; if (now - t0 < 7 * DAY) t0 = now - 7 * DAY;
    const n = list.length, ymax = Math.max(5, Math.ceil(n / 5) * 5);
    const X = t => r1(L + (t - t0) / (now - t0) * (W - L - R)), Y = v => r1(T + (1 - v / ymax) * (H - T - B));
    let g = "";
    for (let i = 0; i <= 5; i++) { const v = ymax / 5 * i; g += `<line class="grid" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${L - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`; }
    for (let i = 0; i <= 4; i++) { const t = t0 + (now - t0) * i / 4; g += `<text class="ax" x="${X(t)}" y="${H - 8}" text-anchor="${i === 0 ? "start" : i === 4 ? "end" : "middle"}">${fmtShort(t)}</text>`; }
    let d = `M${X(t0)} ${Y(0)}`; list.forEach((e, i) => { d += ` H${X(e.x.d)} V${Y(i + 1)}`; }); d += ` H${X(now)}`;
    let dots = "", hits = "";
    list.forEach((e, i) => {
        const cx = X(e.x.d), cy = Y(i + 1); const tip = esc(`${i + 1}ª concluída: ${e.s.name}\n${fmtDate(e.x.d)}`);
        dots += `<circle class="dot" cx="${cx}" cy="${cy}" r="4"/>`;
        hits += `<circle class="hit" cx="${cx}" cy="${cy}" r="12" tabindex="0" data-tip="${tip}" aria-label="${tip.replace(/\n/g, " – ")}"/>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de linha: ${n} habilidades concluídas acumuladas ao longo do tempo">${g}<path class="line" d="${d}"/>${dots}${hits}</svg>`;
}
function weekData(list, now) {
    const N = 12, s0 = new Date(weekStart(now)), starts = [];
    for (let i = 0; i < N; i++) { const d = new Date(s0); d.setDate(d.getDate() - 7 * (N - 1 - i)); starts.push(d.getTime()); }
    const idx = new Map(starts.map((t, i) => [t, i])), items = starts.map(() => []);
    list.forEach(e => { const i = idx.get(weekStart(e.x.d)); if (i !== undefined) items[i].push(e.s.name); });
    return { starts, items, counts: items.map(a => a.length) };
}
function barChartSvg(wd) {
    const W = 640, H = 240, L = 40, R = 14, T = 22, B = 30, N = 12, { starts, items, counts } = wd;
    const mx = Math.max(3, ...counts), step = Math.ceil(mx / 4), ymax = step * 4;
    const bw = (W - L - R) / N, barw = Math.min(36, bw * .62), Y = v => r1(T + (1 - v / ymax) * (H - T - B)), base = Y(0);
    let g = "", bars = "", hits = "", labels = "";
    for (let i = 0; i <= 4; i++) { const v = step * i; g += `<line class="grid" x1="${L}" x2="${W - R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ax" x="${L - 6}" y="${Y(v) + 4}" text-anchor="end">${v}</text>`; }
    const peak = counts.indexOf(Math.max(...counts));
    counts.forEach((c, i) => {
        const x = r1(L + i * bw + (bw - barw) / 2), cx = r1(L + i * bw + bw / 2);
        if (c > 0) { const y = Y(c), h = base - y, r = r1(Math.min(4, h / 2, barw / 2)); bars += `<path class="bar" d="M${x} ${base}V${r1(y + r)}Q${x} ${y} ${r1(x + r)} ${y}H${r1(x + barw - r)}Q${r1(x + barw)} ${y} ${r1(x + barw)} ${r1(y + r)}V${base}Z"/>`; }
        if (i === peak && c > 0) labels += `<text class="axv" x="${cx}" y="${Y(c) - 6}" text-anchor="middle">${c}</text>`;
        g += `<text class="ax" x="${cx}" y="${H - 8}" text-anchor="middle">${fmtShort(starts[i])}</text>`;
        const nm = items[i]; const tip = esc(`Semana de ${fmtShort(starts[i])}: ${c} ${c === 1 ? "conclusão" : "conclusões"}` + (nm.length ? "\n" + nm.slice(0, 5).join("\n") + (nm.length > 5 ? "\n+" + (nm.length - 5) + " outras" : "") : ""));
        hits += `<rect class="hit" x="${r1(L + i * bw)}" y="${T}" width="${r1(bw)}" height="${H - T - B}" tabindex="0" data-tip="${tip}" aria-label="${tip.replace(/\n/g, " – ")}"/>`;
    });
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfico de barras: habilidades concluídas por semana nas últimas 12 semanas">${g}${bars}${labels}${hits}</svg>`;
}
function renderEvo() {
    const now = Date.now();
    const list = skills.filter(isDone).map(s => ({ s, x: get(s) })).sort((a, b) => a.x.d - b.x.d);
    const prog = skills.filter(s => statusOf(s) === "prog").length;
    const last28 = list.filter(e => now - e.x.d <= 28 * DAY).length;
    const first = list[0], due = dueList().length;
    const firstTxt = first ? (daysSince(first.x.d) === 0 ? "hoje" : daysSince(first.x.d) + " dias") : "—";
    let h = `<div class="stats">
 <div class="stat"><b>${list.length}<small> / ${skills.length}</small></b><span>habilidades concluídas</span></div>
 <div class="stat"><b>${prog}</b><span>em andamento</span></div>
 <div class="stat"><b>${last28}</b><span>concluídas nos últimos 28 dias (${(last28 / 4).toFixed(1).replace(".", ",")} por semana)</span></div>
 <div class="stat"><b>${firstTxt}</b><span>${first ? "desde a primeira conclusão (" + fmtDate(first.x.d) + ")" : "conclua a primeira habilidade para iniciar o histórico"}</span></div>
 <div class="stat"><b>${due}</b><span>para revalidar (${REVAL_DAYS}+ dias)</span></div></div>`;
    if (!list.length) {
        h += `<div class="msg">Nenhuma habilidade concluída ainda. Quando você concluir a primeira (todos os critérios e entregas do desafio), ela aparece aqui com a data, e os gráficos de ritmo começam a ser desenhados.</div>`;
        evoBox.innerHTML = h; return;
    }
    const wd = weekData(list, now);
    h += `<div class="chart-card"><h3>Habilidades concluídas ao longo do tempo</h3><div class="hint">Cada ponto é uma habilidade concluída. Passe o mouse (ou use Tab) para ver qual.</div><div class="swipe">Deslize para o lado para ver o gráfico inteiro.</div><div class="chart-wrap"><div class="chart-inner">${lineChartSvg(list, now)}<div class="pop"></div></div></div></div>`;
    h += `<div class="chart-card"><h3>Conclusões por semana (últimas 12 semanas)</h3><div class="hint">Mostra a constância: poucas por semana, mas toda semana, vale mais que uma explosão e depois pausa.</div><div class="swipe">Deslize para o lado para ver o gráfico inteiro.</div><div class="chart-wrap"><div class="chart-inner">${barChartSvg(wd)}<div class="pop"></div></div></div>
 <details class="tbl"><summary>Ver dados em tabela</summary><table><thead><tr><th>Semana de</th><th>Concluídas</th></tr></thead><tbody>${wd.starts.map((t, i) => `<tr><td>${fmtShort(t)}</td><td>${wd.counts[i]}</td></tr>`).join("")}</tbody></table></details></div>`;
    h += `<div class="chart-card"><h3>Linha do tempo</h3><div class="hint">Da conclusão mais recente para a mais antiga. Clique para abrir a habilidade.</div><div class="tl">${[...list].reverse().map(e => `<button type="button" class="tl-row" data-go="${esc(e.s.name)}"><span class="tl-date">${fmtDate(e.x.d)}</span><span style="flex:1"><b>${esc(e.s.name)}</b><br><small>${esc(e.s.cat)} · ${needsReval(e.s) ? "⟳ revalidação pendente" : "validada em " + fmtDate(e.x.v)}</small></span>${e.x.l ? "<span title=\"Tem link de prova\">🔗</span>" : ""}</button>`).join("")}</div></div>`;
    evoBox.innerHTML = h;
    evoBox.querySelectorAll(".chart-wrap").forEach(w => { w.scrollLeft = w.scrollWidth; });
}
document.getElementById("revalFilterBtn").addEventListener("click", () => { document.getElementById("statusFilter").value = "reval"; render(); });
