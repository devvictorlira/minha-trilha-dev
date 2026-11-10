/* ---------- ÍNDICES E VALIDAÇÃO ---------- */
const skills = []; const byName = {};
groups.forEach(g => g.items.forEach(s => { s.cat = g.category; s.icon = g.icon; skills.push(s); byName[s.name] = s; }));
skills.forEach(s => s.pre.forEach(n => { if (!byName[n]) console.error("Pré-requisito inexistente:", s.name, "->", n); }));
goals.forEach(g => g.skills.forEach(n => { if (!byName[n]) console.error("Meta com habilidade inexistente:", g.title, "->", n); }));
