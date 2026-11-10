/* Banco de dados › Redis e cache */
addSkill("Banco de dados",
    S("Redis e cache", "Baixa", ["Node.js", "Docker"],
        ["Estruturas: string, hash, list, set e sorted set", "TTL e expiração", "Padrão cache-aside", "Invalidação de cache", "Rate limiting", "Sessões e tokens em memória", "Pub/Sub e filas simples (noções)", "Persistência (noções)", "Uso com Node.js", "Monitoramento e limites de memória"],
        ["Explico cache-aside e o risco de dados desatualizados", "Defino o TTL com critério", "Implemento um rate limiting simples", "Subo o Redis com Docker e o uso a partir do Node"],
        C("Cache e limite de requisições na API", "Adicione Redis a uma API sua para cachear uma consulta cara e limitar requisições.", ["Redis rodando via Docker Compose", "Cache-aside em uma rota de listagem", "TTL justificado e invalidação ao alterar dados", "Rate limiting por IP", "Medição do tempo de resposta antes e depois"]),
        "Cache bem feito é difícil: se você não sabe quando invalidar, vai servir dado errado. Se isso não ficou claro, ainda não aprendeu Redis por completo.")
);
