/* APIs › APIs RESTful */
addSkill("APIs",
    S("APIs RESTful", "Alta", ["HTTP e status codes", "JavaScript"],
        ["Recursos, URIs e verbos", "Status codes corretos", "Idempotência e segurança dos métodos", "Paginação, filtro e ordenação", "Versionamento", "Padrão de erros", "Autenticação (Bearer, JWT, API key)", "OpenAPI e Swagger", "Rate limiting e cache (ETag, Cache-Control)"],
        ["Nomeio rotas de forma consistente e sem verbos", "Uso o status code certo em cada resposta", "Explico idempotência de PUT e DELETE", "Documento minha API em OpenAPI"],
        C("Projete e documente antes de codar", "Desenhe uma API no formato OpenAPI antes de escrever código e depois implemente.", ["Arquivo OpenAPI completo", "Paginação e filtros em uma listagem", "Padrão único de erro", "Implementação fiel à documentação", "Coleção de testes no Postman ou Insomnia"]),
        "Se suas rotas têm nomes como /getUsuario ou /deletar, ou tudo devolve 200, ainda não aprendeu a projetar APIs REST.")
);
