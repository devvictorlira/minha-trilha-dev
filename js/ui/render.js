let selectedCategory = "Todas";
let current = null;
const columns = document.getElementById("columns");

/* ---------- RENDER PRINCIPAL ---------- */
function render() {
    const SECTION = { Metas: "goalsSection", Evolucao: "evoSection", Mapa: "mapSection", Vagas: "jobsSection" }[selectedCategory] || "skillsSection";
    ["skillsSection", "goalsSection", "evoSection", "mapSection", "jobsSection"].forEach(id => { document.getElementById(id).style.display = id === SECTION ? "" : "none"; });
    const due = dueList().length, rb = document.getElementById("revalBanner");
    rb.hidden = !due; if (due) rb.querySelector("span").textContent = `⟳ ${due} ${due === 1 ? "habilidade precisa" : "habilidades precisam"} de revalidação (${REVAL_DAYS}+ dias sem conferência).`;
    if (SECTION === "goalsSection") renderGoals(); else if (SECTION === "evoSection") renderEvo(); else if (SECTION === "mapSection") renderMap(); else if (SECTION === "jobsSection") renderJobResult(); else renderSkills();
    const done = skills.filter(isDone).length;
    const pct = skills.length ? Math.round(done / skills.length * 100) : 0;
    document.getElementById("progressTitle").textContent = `${done} de ${skills.length} habilidades concluídas`;
    document.getElementById("barfill").style.width = pct + "%"; document.getElementById("percent").textContent = pct + "%";
    const next = goals.find(g => goalPct(g) < 100);
    const nt = document.getElementById("nextGoalText");
    if (next) { const gp = goalPct(next); const falta = next.skills.filter(n => !isDone(byName[n])).length; nt.innerHTML = `<b style="color:var(--text)">Próxima meta: ${esc(next.title)}</b><br>${gp}% · faltam ${falta} habilidades. Toque para ver.`; }
    else nt.innerHTML = `<b style="color:var(--text)">Todas as metas completas.</b><br>Agora construa e publique projetos.`;
}

function renderSkills() {
    const q = document.getElementById("search").value.trim().toLocaleLowerCase("pt-BR");
    const status = document.getElementById("statusFilter").value;
    columns.innerHTML = "";
    let visibleCount = 0;
    const filteredGroups = groups.filter(g => selectedCategory === "Todas" || g.category === selectedCategory);
    const layout = [[], [], [], []];
    filteredGroups.forEach((g, idx) => layout[idx % 4].push(g));
    layout.forEach(colGroups => {
        if (!colGroups.length) return; const col = document.createElement("div"); col.className = "col";
        colGroups.forEach(g => {
            const matches = g.items.filter(s => {
                const st = statusOf(s);
                const okText = !q || s.name.toLocaleLowerCase("pt-BR").includes(q) || (st !== "locked" && s.material.some(m => m.toLocaleLowerCase("pt-BR").includes(q)));
                const okStatus = status === "all" || (status === "done" && st === "done") || (status === "todo" && st !== "done") || (status === "locked" && st === "locked") || (status === "avail" && (st === "avail" || st === "prog")) || (status === "reval" && needsReval(s));
                return okText && okStatus;
            });
            if (!matches.length) return; visibleCount += matches.length;
            const completed = g.items.filter(isDone).length;
            const card = document.createElement("div"); card.className = "skill-card";
            card.innerHTML = `<div class="card-head"><span class="icon">${g.icon}</span><span>${esc(g.category)}</span><span class="count">${completed}/${g.items.length}</span></div><div class="items"></div>`;
            const itemsEl = card.querySelector(".items");
            matches.forEach(s => {
                const st = statusOf(s); const x = get(s);
                const row = document.createElement("button"); row.type = "button"; const rvl = st === "done" && needsReval(s); row.className = "skill " + st + (rvl ? " reval" : ""); row.dataset.name = s.name;
                const ic = document.createElement("span"); ic.className = "st " + (rvl ? "reval" : st); ic.textContent = rvl ? "⟳" : st === "done" ? "✓" : st === "locked" ? "🔒" : "";
                const main = document.createElement("span"); main.className = "skill-main";
                const nm = document.createElement("span"); nm.className = "skill-name"; nm.textContent = s.name;
                const sub = document.createElement("span"); sub.className = "skill-sub";
                if (st === "locked") { const falta = s.pre.filter(n => !isDone(byName[n])); sub.textContent = "Requer: " + falta.join(", "); }
                else if (st === "done") sub.textContent = rvl ? `⟳ Revalidar · validada há ${daysSince(x.v)} dias` : `Concluída em ${fmtDate(x.d)}${x.l ? " · 🔗" : ""}`;
                else sub.textContent = `📚 ${x.m.length}/${s.material.length} · ✓ ${x.c.length}/${s.criteria.length} · 🎯 ${x.r.length}/${s.ch.r.length}${x.l ? " · 🔗" : ""}`;
                main.append(nm, sub);
                const badge = document.createElement("span"); badge.className = "level" + (s.prio === "Média" ? " media" : s.prio === "Baixa" ? " low" : ""); badge.textContent = s.prio; badge.title = "Prioridade";
                row.append(ic, main, badge);
                row.addEventListener("click", () => openSkill(s.name));
                itemsEl.append(row);
            });
            col.append(card);
        });
        if (col.children.length) columns.append(col);
    });
    document.getElementById("empty").style.display = visibleCount ? "none" : "block";
}

function renderGoals() {
    const box = document.getElementById("goals"); box.innerHTML = "";
    goals.forEach(g => {
        const list = g.skills.map(n => byName[n]);
        const done = list.filter(isDone); const pct = Math.round(done.length / list.length * 100);
        const idx = pct === 100 ? 3 : pct >= 70 ? 2 : pct >= 35 ? 1 : 0;
        const pend = list.filter(s => !isDone(s));
        const shown = pend.slice(0, 10);
        const el = document.createElement("div"); el.className = "goal";
        el.innerHTML = `<div class="goal-top"><div class="goal-ico">${g.icon}</div><div><h2>${esc(g.title)}</h2><div class="sub">${esc(g.sub)}</div></div></div>
  <div><div class="barline" style="margin-top:0"><div class="bar"><div class="barfill" style="width:${pct}%"></div></div><div class="percent">${pct}%</div></div><div class="note">${done.length} de ${list.length} habilidades concluídas</div></div>
  <div class="msg ${idx === 3 ? "ready" : ""}">${esc(g.msgs[idx])}</div>
  ${pend.length ? `<div><div class="small-title">O que falta${pend.length > shown.length ? ` (mostrando ${shown.length} de ${pend.length})` : ""}</div><div class="chips">${shown.map(s => `<button type="button" class="chip ${statusOf(s) === "locked" ? "lock" : ""}" data-go="${esc(s.name)}">${statusOf(s) === "locked" ? "🔒 " : ""}${esc(s.name)}</button>`).join("")}</div></div>` : ""}
  ${done.length ? `<div><div class="small-title">Já concluídas</div><div class="chips">${done.slice(0, 12).map(s => `<button type="button" class="chip ok" data-go="${esc(s.name)}">✓ ${esc(s.name)}</button>`).join("")}${done.length > 12 ? `<span class="note">+${done.length - 12}</span>` : ""}</div></div>` : ""}
  <div><div class="small-title">Projetos de portfólio para essa meta</div><ul>${g.projects.map(p => `<li>${esc(p)}</li>`).join("")}</ul></div>
  <div class="note">${esc(g.obs)}</div>`;
        box.append(el);
    });
}
