/* ---------- DRAWER ---------- */
const ov = document.getElementById("overlay"), drawer = document.getElementById("drawer");
function openSkill(name) { current = name; rv = []; drawer.scrollTop = 0; renderDrawer(); ov.classList.add("open"); ov.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
function closeDrawer() { current = null; ov.classList.remove("open"); ov.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
function chkList(s, k, items, x) { return items.map((t, i) => { const on = x[k].includes(i); return `<label class="chk ${on ? "on" : ""}"><input type="checkbox" data-k="${k}" data-i="${i}" ${on ? "checked" : ""}><span>${esc(t)}</span></label>` }).join(""); }
let linkErr = "", linkDraft = null;
function proofHtml(x) {
    const err = linkErr, val = linkDraft !== null ? linkDraft : (x.l || ""); linkErr = ""; linkDraft = null;
    return `<div class="proof"><label for="proofInput">🔗 Link de prova</label><div class="hint">Cole o link do que você entregou (repositório no GitHub, deploy ou vídeo). Opcional, mas é o que transforma o desafio em portfólio.</div><div class="proof-row"><input id="proofInput" class="proof-input" type="url" inputmode="url" placeholder="https://github.com/seu-usuario/projeto" value="${esc(val)}" data-link maxlength="500" autocomplete="off">${x.l ? `<a class="proof-open" href="${esc(x.l)}" target="_blank" rel="noopener noreferrer">Abrir ↗</a>` : ""}</div>${err ? `<div class="proof-err">${esc(err)}</div>` : ""}</div>`;
}
function revalHtml(s) {
    const x = get(s); const all = rv.length === s.criteria.length;
    return `<div class="blk revblk"><h3>⟳ Revalidação pendente</h3><div class="hint">Faz ${daysSince(x.v)} dias desde a última validação. Sem consultar nada, confirme que você ainda consegue:</div>${s.criteria.map((t, i) => { const on = rv.includes(i); return `<label class="chk ${on ? "on" : ""}"><input type="checkbox" data-rv data-i="${i}" ${on ? "checked" : ""}><span>${esc(t)}</span></label>` }).join("")}<div class="btnrow"><button type="button" class="btn primary" data-revok ${all ? "" : "disabled"}>Confirmar revalidação</button><button type="button" class="btn" data-revfail>Não consegui tudo: voltar a estudar</button></div></div>`;
}
function datesHtml(s, x) {
    const nxt = REVAL_DAYS - daysSince(x.v);
    return `<div class="blk"><h3>📅 Datas</h3><div class="date-row"><label for="doneDate">Concluída em</label><input id="doneDate" type="date" class="date-input" data-date value="${toInput(x.d)}" max="${toInput(Date.now())}"></div><div class="hint" style="margin:8px 0 0">Validada em ${fmtDate(x.v)} · ${nxt > 0 ? `próxima revalidação em ${nxt} ${nxt === 1 ? "dia" : "dias"}` : "revalidação pendente"}. Ajuste a data de conclusão se você concluiu esta habilidade antes de começar a usar a trilha.</div></div>`;
}
function renderDrawer() {
    if (!current) return;
    const s = byName[current]; const x = get(s); const st = statusOf(s); const prev = drawer.scrollTop;
    const dependents = skills.filter(k => k.pre.includes(s.name));
    const stLabel = { done: "Concluída", locked: "Bloqueada", prog: "Em andamento", avail: "Disponível" }[st];
    let h = `<div class="dr-head"><button class="dr-close" data-close aria-label="Fechar">✕</button><div class="dr-cat">${esc(s.icon)} ${esc(s.cat)}</div><div class="dr-title"><h2>${esc(s.name)}</h2><span class="level ${s.prio === "Média" ? "media" : s.prio === "Baixa" ? "low" : ""}">Prioridade ${esc(s.prio)}</span><span class="pill">${stLabel}</span></div>`;
    if (st !== "locked") h += `<div class="mini"><div style="width:${pctOf(s)}%"></div></div>`;
    h += `</div><div class="dr-body">`;
    if (st === "locked") {
        h += `<div class="blk lockbox"><div class="big">🔒</div><h3>Material bloqueado</h3><p>Conclua primeiro os pré-requisitos abaixo (critérios e desafio prático de cada um) para liberar o material, os critérios e o desafio de ${esc(s.name)}.</p><div class="chips" style="justify-content:center">${s.pre.map(n => { const p = byName[n]; const d = isDone(p); return `<button type="button" class="chip ${d ? "ok" : "lock"}" data-go="${esc(n)}">${d ? "✓" : "🔒"} ${esc(n)}</button>` }).join("")}</div></div>
  <div class="blk"><h3>O que você vai desbloquear</h3><div class="hint">📚 ${s.material.length} tópicos de material · ✓ ${s.criteria.length} critérios de domínio · 🎯 1 desafio prático com ${s.ch.r.length} entregas</div></div>`;
    } else {
        if (st === "done") h += `<div class="banner ok"><b>Habilidade concluída.</b> Você passou nos critérios e entregou o desafio.${x.l ? ` <a class="proof-open" href="${esc(x.l)}" target="_blank" rel="noopener noreferrer">Ver prova ↗</a>` : " Dica: cole o link de prova no desafio para usar no portfólio."}${dependents.length ? ` Isso abre caminho para:` : ""}${dependents.length ? `<div class="chips" style="margin-top:6px">${dependents.map(d => `<button type="button" class="chip ${statusOf(d) === "locked" ? "lock" : "ok"}" data-go="${esc(d.name)}">${statusOf(d) === "locked" ? "🔒" : "▶"} ${esc(d.name)}</button>`).join("")}</div>` : ""}</div>`;
        if (st === "done" && needsReval(s)) h += revalHtml(s);
        if (st === "done") h += datesHtml(s, x);
        h += `<div class="blk obs"><h3>⚠ Teste da verdade</h3><p>${esc(s.obs)}</p></div>`;
        h += `<div class="blk"><h3>📚 Material de estudo <span class="n">${x.m.length}/${s.material.length}</span></h3><div class="hint">Marque cada tópico que você já estudou e praticou.</div>${chkList(s, "m", s.material, x)}</div>`;
        h += `<div class="blk"><h3>✓ Critérios de domínio <span class="n">${x.c.length}/${s.criteria.length}</span></h3><div class="hint">Marque só o que você faz sem consultar. Seja honesto: isso é para você.</div>${chkList(s, "c", s.criteria, x)}</div>`;
        h += `<div class="blk"><h3>🎯 Desafio prático <span class="n">${x.r.length}/${s.ch.r.length}</span></h3><div class="challenge-t">${esc(s.ch.t)}</div><p class="challenge-d">${esc(s.ch.d)}</p>${chkList(s, "r", s.ch.r, x)}${proofHtml(x)}<div class="rule">Regra: faça primeiro sem consultar nada. Só depois consulte para melhorar. A habilidade só conclui com todos os critérios e entregas marcados.</div></div>`;
        if (st !== "done" && dependents.length) h += `<div class="blk"><h3>▶ Ao concluir, libera</h3><div class="chips">${dependents.map(d => `<button type="button" class="chip lock" data-go="${esc(d.name)}">${esc(d.name)}</button>`).join("")}</div></div>`;
        h += `<button type="button" class="reset" data-reset>Zerar progresso desta habilidade</button>`;
    }
    h += `</div>`;
    drawer.innerHTML = h; drawer.scrollTop = prev;
}
drawer.addEventListener("click", e => {
    const t = e.target.closest("[data-close],[data-go],[data-reset],[data-revok],[data-revfail]"); if (!t) return;
    if (t.hasAttribute("data-close")) closeDrawer();
    else if (t.dataset.go) { openSkill(t.dataset.go); }
    else if (t.hasAttribute("data-revok")) {
        const s = byName[current];
        if (needsReval(s) && rv.length === s.criteria.length) { ensure(s).v = Date.now(); rv = []; save(); render(); renderDrawer(); toast("Revalidação confirmada. A próxima será daqui a " + REVAL_DAYS + " dias."); }
    }
    else if (t.hasAttribute("data-revfail")) {
        const s = byName[current];
        if (confirm("Os critérios de domínio desta habilidade serão desmarcados e ela volta para \"em andamento\" (material e desafio continuam marcados). Habilidades que dependem dela e ainda não foram concluídas voltam a ficar bloqueadas até você concluí-la de novo (as que você já concluiu continuam concluídas). Continuar?")) { const x = ensure(s); x.c = []; x.d = 0; x.v = 0; rv = []; save(); render(); renderDrawer(); toast("Sem problema: refaça os critérios e conclua de novo."); }
    }
    else if (t.hasAttribute("data-reset")) {
        if (confirm("Zerar todo o progresso desta habilidade?")) { delete state[current]; save(); render(); renderDrawer(); }
    }
});
drawer.addEventListener("change", e => {
    const t = e.target; if (!t.dataset) return;
    if (t.hasAttribute("data-rv")) { const i = +t.dataset.i; const p = rv.indexOf(i); if (t.checked) { if (p < 0) rv.push(i); } else if (p > -1) rv.splice(p, 1); renderDrawer(); return; }
    if (t.hasAttribute("data-date")) {
        const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t.value);
        if (m) {
            const s = byName[current]; const x = ensure(s); const tt = new Date(+m[1], +m[2] - 1, +m[3], 12).getTime();
            if (isDone(s) && Number.isFinite(tt)) { x.d = Math.min(Math.max(tt, 9.47e11), Date.now()); if (x.v < x.d) x.v = x.d; save(); render(); }
        }
        renderDrawer(); return;
    }
    if (t.hasAttribute("data-link")) {
        const v = t.value.trim();
        if (v && !URL_RE.test(v)) { linkErr = "Link inválido. Use um endereço que comece com http:// ou https://"; linkDraft = t.value; renderDrawer(); return; }
        ensure(byName[current]).l = v.slice(0, 500); save(); render(); renderDrawer(); return;
    }
    if (!t.dataset.k) return;
    const s = byName[current]; const x = ensure(s); const was = isDone(s); const arr = x[t.dataset.k]; const i = +t.dataset.i; const p = arr.indexOf(i);
    if (t.checked) { if (p < 0) arr.push(i); } else if (p > -1) arr.splice(p, 1);
    const now = isDone(s);
    if (!was && now) { x.d = x.v = Date.now(); } else if (was && !now) { x.d = 0; x.v = 0; }
    save(); render(); renderDrawer();
    if (!was && now) showCelebration(s);
});
ov.addEventListener("click", e => { if (e.target === ov) closeDrawer(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && current) closeDrawer(); });
document.getElementById("goals").addEventListener("click", e => { const t = e.target.closest("[data-go]"); if (t) openSkill(t.dataset.go); });
