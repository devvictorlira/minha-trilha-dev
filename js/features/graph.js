/* ---------- GRAFO: NÍVEL DE CADA HABILIDADE ---------- */
const depthMemo = {};
function depth(s, seen) {
    if (depthMemo[s.name] !== undefined) return depthMemo[s.name];
    seen = seen || new Set(); if (seen.has(s.name)) return 0; seen.add(s.name);
    return depthMemo[s.name] = s.pre.length ? 1 + Math.max(...s.pre.map(n => depth(byName[n], seen))) : 0;
}
const dependentsOf = {};
skills.forEach(s => s.pre.forEach(p => (dependentsOf[p] = dependentsOf[p] || []).push(s.name)));
const statusIcon = s => { const st = statusOf(s); return st === "done" ? (needsReval(s) ? "⟳" : "✓") : st === "locked" ? "🔒" : st === "prog" ? "●" : "○"; };
const statusText = s => { const st = statusOf(s); return st === "done" ? (needsReval(s) ? "Concluída, revalidação pendente" : "Concluída") : { locked: "Bloqueada", prog: "Em andamento", avail: "Disponível" }[st]; };
const chipFor = (s, cls) => `<button type="button" class="chip ${cls || ""}" data-go="${esc(s.name)}">${statusIcon(s)} ${esc(s.name)}</button>`;
