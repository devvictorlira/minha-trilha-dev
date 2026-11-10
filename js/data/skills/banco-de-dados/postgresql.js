/* Banco de dados › PostgreSQL */
addSkill("Banco de dados",
    S("PostgreSQL", "Alta", ["SQL"],
        ["Instalação e uso do psql", "Tipos (uuid, jsonb, timestamptz, enum)", "Schemas, roles e permissões", "Migrations", "Índices (B-tree e GIN)", "Transações e níveis de isolamento", "Views, funções e triggers (noções)", "ORM x SQL puro", "Backup e restore (pg_dump)", "Rodando Postgres com Docker"],
        ["Subo um Postgres local sem instalador gráfico", "Escrevo e executo uma migration", "Uso jsonb num caso real", "Faço backup e restore de um banco"],
        C("Banco da sua API com migrations", "Conecte uma API ao PostgreSQL com migrations versionadas e dados de teste (seed).", ["Migrations versionadas no Git", "Relacionamentos com chaves estrangeiras", "Pelo menos 1 índice justificado", "Seed com dados de teste", "Backup e restore testados"]),
        "Se você só usa o banco por interface gráfica ou por ORM e não sabe o que ele gerou, ainda não aprendeu PostgreSQL.")
);
