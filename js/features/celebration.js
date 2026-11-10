/* ---------- CELEBRAÇÃO AO CONCLUIR UMA HABILIDADE ---------- */
const celeEl = document.getElementById("celebrate"), celeCard = document.getElementById("celeCard"), confettiCv = document.getElementById("confetti");
const REDUCED = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
const CELE_MSGS = ["Mais um degrau na trilha.", "Consistência vence intensidade.", "Você entregou o desafio, e isso é o que conta.", "Cada habilidade concluída é portfólio em construção.", "Seguiu o processo. Continue assim.", "Isso foi feito com prática, não com sorte."];
let celeTimer = 0, celeRaf = 0, celeTok = 0;
function stopConfetti() { cancelAnimationFrame(celeRaf); const c = confettiCv.getContext("2d"); c.clearRect(0, 0, confettiCv.width, confettiCv.height); }
function startConfetti() {
    stopConfetti(); if (REDUCED) return;
    const cv = confettiCv, ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.width = Math.round(innerWidth * dpr), h = cv.height = Math.round(innerHeight * dpr);
    const cols = ["#5b8cff", "#9a72ff", "#42d6a0", "#ffbd59", "#ff8ca5", "#ffffff"];
    const P = Array.from({ length: 160 }, (_, i) => {
        const left = i % 2 === 0, a = -Math.PI / 2 + (left ? 0.4 : -0.4) + (Math.random() - .5) * 1.1, v = (10 + Math.random() * 11) * dpr;
        return { x: w * (left ? .15 : .85), y: h * .7, vx: Math.cos(a) * v, vy: Math.sin(a) * v, s: (6 + Math.random() * 6) * dpr, r: Math.random() * 6.28, vr: (Math.random() - .5) * .35, c: cols[Math.floor(Math.random() * cols.length)], life: 0, max: 130 + Math.random() * 70, rect: Math.random() < .55 };
    });
    const step = () => {
        ctx.clearRect(0, 0, w, h); let alive = 0;
        P.forEach(p => {
            p.vy += .3 * dpr; p.vx *= .992; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
            if (p.life >= p.max || p.y > h + 40) return;
            alive++; ctx.save(); ctx.globalAlpha = Math.min(1, (p.max - p.life) / 40); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
            if (p.rect) ctx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); else { ctx.beginPath(); ctx.arc(0, 0, p.s / 2.5, 0, 6.283); ctx.fill(); }
            ctx.restore();
        });
        if (alive) celeRaf = requestAnimationFrame(step); else ctx.clearRect(0, 0, w, h);
    };
    celeRaf = requestAnimationFrame(step);
}
function hideCelebration() {
    clearTimeout(celeTimer); if (!celeEl.classList.contains("show")) return;
    const tok = ++celeTok; celeCard.classList.add("out"); stopConfetti();
    setTimeout(() => { if (tok === celeTok) { celeEl.classList.remove("show"); celeCard.classList.remove("out"); } }, 330);
}
function showCelebration(s) {
    clearTimeout(celeTimer); const tok = ++celeTok;
    const done = skills.filter(isDone).length, pct = Math.round(done / skills.length * 100);
    const goalsDone = goals.filter(g => g.skills.includes(s.name) && goalPct(g) === 100);
    const freed = skills.filter(k => k.pre.includes(s.name) && !isDone(k) && unlocked(k));
    const msg = CELE_MSGS[Math.floor(Math.random() * CELE_MSGS.length)];
    celeCard.innerHTML = `<div class="cele-emoji">🏆</div><div class="cele-title">Parabéns!</div><div class="cele-skill">Você completou <b>${esc(s.name)}</b></div><div class="cele-sub">${esc(msg)}</div>
<div class="cele-bar"><div style="width:${pct}%"></div></div><div class="cele-note">${done} de ${skills.length} habilidades concluídas · ${pct}%</div>
${goalsDone.length ? `<div class="cele-extra">🎯 Meta concluída: ${goalsDone.map(g => esc(g.title)).join(", ")}</div>` : ""}
${freed.length ? `<div class="cele-extra">🔓 Liberou: ${freed.map(k => esc(k.name)).join(", ")}</div>` : ""}
<div class="cele-hint">Toque para fechar</div>`;
    celeCard.className = "cele-card"; celeEl.classList.add("show"); void celeCard.offsetWidth;
    startConfetti();
    celeTimer = setTimeout(hideCelebration, 6000);
}
celeCard.addEventListener("click", hideCelebration);
document.addEventListener("keydown", e => { if (e.key === "Escape") hideCelebration(); });
