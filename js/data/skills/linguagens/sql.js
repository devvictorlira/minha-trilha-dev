/* Linguagens › SQL */
addSkill("Linguagens",
    S("SQL", "Alta", [],
        ["Modelo relacional: tabelas, chaves primárias e estrangeiras", "SELECT, WHERE, ORDER BY e LIMIT", "INSERT, UPDATE e DELETE", "JOINs (INNER, LEFT, RIGHT)", "GROUP BY, HAVING e agregações", "Subqueries e CTEs", "Normalização (1FN a 3FN)", "Índices e EXPLAIN", "Transações e ACID", "Views e funções de janela (noções)", "Constraints e tipos de dados"],
        ["Escrevo um JOIN de 3 tabelas sem consultar", "Explico a diferença entre INNER e LEFT JOIN", "Normalizo um modelo até a 3FN", "Leio um EXPLAIN e percebo se há uso de índice"],
        C("Modelar e consultar uma loja online", "Modele o banco de uma loja (clientes, produtos, pedidos, itens do pedido) e responda 10 perguntas de negócio usando SQL.", ["Diagrama entidade-relacionamento", "Chaves e constraints bem definidas", "10 consultas, incluindo JOIN, GROUP BY e subquery", "Um índice criado com justificativa", "Script SQL versionado no GitHub"]),
        "Se você só consegue fazer SELECT simples e depende de ORM ou de IA para qualquer JOIN, ainda não aprendeu SQL. Backend sem SQL sólido costuma travar em performance e dados.")
);
