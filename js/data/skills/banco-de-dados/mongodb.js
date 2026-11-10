/* Banco de dados › MongoDB */
addSkill("Banco de dados",
    S("MongoDB", "Média", ["SQL", "Node.js"],
        ["Documentos, coleções e BSON", "CRUD e operadores de consulta", "Modelagem: embutir x referenciar", "Índices e planos de consulta", "Aggregation pipeline", "Driver oficial ou Mongoose", "Validação de esquema", "Transações (noções) e consistência", "MongoDB Atlas e conexão segura", "Quando escolher NoSQL em vez de SQL"],
        ["Decido entre embutir e referenciar com um argumento claro", "Escrevo um aggregation pipeline com filtro, agrupamento e ordenação", "Cito 2 casos em que SQL é melhor e 2 em que NoSQL é melhor", "Crio um índice e confirmo que a consulta o usa"],
        C("Mesma API, outro banco", "Reimplemente a persistência de uma das suas APIs usando MongoDB e compare com o modelo relacional.", ["Modelagem documentada (o que foi embutido e o que foi referenciado)", "CRUD completo funcionando", "Pelo menos 1 índice justificado", "Um aggregation pipeline para um relatório", "Comparativo por escrito com o modelo em SQL"]),
        "Se você escolhe MongoDB só por parecer mais fácil e não sabe justificar quando ele é pior que SQL, ainda não aprendeu NoSQL. A escolha do banco precisa de motivo.")
);
