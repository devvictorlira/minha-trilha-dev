/* APIs › HTTP e status codes */
addSkill("APIs",
    S("HTTP e status codes", "Alta", [],
        ["Ciclo de requisição e resposta", "Métodos HTTP", "Headers (Content-Type, Authorization, Cache)", "Status codes por família (2xx a 5xx)", "Cookies e sessões", "CORS", "HTTPS e TLS (noções)", "HTTP/1.1 x HTTP/2", "Aba Network do DevTools"],
        ["Diferencio 401 de 403, 400 de 422 e 200 de 201 e 204", "Explico CORS e quando ele bloqueia", "Leio uma requisição completa na aba Network", "Uso curl para chamar uma API"],
        C("Detetive de requisições", "Analise o que acontece ao abrir 3 sites reais e reproduza as chamadas com curl.", ["Documento método, URL, headers e status de 5 requisições por site", "Reproduzo 3 chamadas com curl", "Explico por escrito um erro de CORS que provoquei", "Lista dos status codes encontrados e seu significado"]),
        "Se aparece um erro 401 ou de CORS e você não sabe por onde começar, ainda não entende HTTP. É a base de tudo em web: invista aqui.")
);
