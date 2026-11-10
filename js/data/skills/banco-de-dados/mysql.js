/* Banco de dados › MySQL */
addSkill("Banco de dados",
    S("MySQL", "Média", ["PostgreSQL"],
        ["Diferenças de sintaxe entre MySQL e Postgres", "Engines InnoDB x MyISAM", "Tipos e collations (utf8mb4)", "AUTO_INCREMENT", "Usuários e privilégios", "Índices e EXPLAIN no MySQL", "mysqldump", "Conexão via CLI e Workbench"],
        ["Cito 3 diferenças práticas entre MySQL e Postgres", "Crio usuário com privilégios mínimos", "Exporto e importo um banco com mysqldump"],
        C("Porte o banco para MySQL", "Pegue o banco do desafio de PostgreSQL e recrie em MySQL, documentando o que mudou.", ["Esquema recriado e funcionando", "Lista das diferenças encontradas", "Usuário com privilégios mínimos", "Dump e restore testados"]),
        "Como o conceito é o mesmo do Postgres, se você sabe um bem, aprender o outro leva dias. Se levou semanas, a base ainda está fraca.")
);
