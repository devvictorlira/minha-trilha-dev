/* Linguagens › Node.js */
addSkill("Linguagens",
    S("Node.js", "Alta", ["JavaScript"],
        ["Como o Node funciona: V8, event loop e single-thread", "Módulos (CommonJS x ESM), npm e package.json", "fs, path, os e streams", "Variáveis de ambiente (.env)", "Servidor HTTP nativo", "Async no Node: Promises, async/await e EventEmitter", "Tratamento de erros e logs", "Scripts npm e nodemon", "Conexão com banco (driver ou ORM)", "Boas práticas: estrutura de pastas e validação de entrada"],
        ["Explico o event loop com minhas palavras", "Crio um servidor HTTP sem usar framework", "Gerencio dependências e variáveis de ambiente corretamente", "Leio e escrevo arquivos de forma assíncrona"],
        C("CLI e servidor HTTP puro", "Crie uma CLI (ex.: gerenciador de notas salvo em arquivo) e um servidor HTTP nativo, sem Express, que exponha os mesmos dados em JSON.", ["Leitura e escrita assíncrona de arquivo", "Rotas GET e POST usando o módulo http nativo", "Configuração via .env", "Erros tratados com status adequados", "README explicando como rodar"]),
        "Se você só sabe usar Node dentro de um framework e não sabe o que acontece por baixo (event loop, requisição, resposta), ainda não aprendeu Node por completo.")
);
