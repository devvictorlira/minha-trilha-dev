/* Construtores usados nos arquivos de dados */
const C = (t, d, r) => ({ t, d, r });
const S = (name, prio, pre, material, criteria, ch, obs) => ({ name, prio, pre, material, criteria, ch, obs });

/* Registra uma habilidade dentro da sua categoria (ver categories.js) */
const addSkill = (category, skill) => {
    const g = groups.find(x => x.category === category);
    if (!g) { console.error("Categoria inexistente:", category); return; }
    g.items.push(skill);
};
