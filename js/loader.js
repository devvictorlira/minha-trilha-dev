/* Carrega os scripts do app na ordem certa.
   Os arquivos compartilham o mesmo escopo global (sem módulos), então a ORDEM importa:
   dados -> core -> ui -> features -> main. Funciona abrindo o index.html direto (file://). */
(function () {
    const base = "js/";
    const files = [

        /* data */
        "data/helpers.js",
        "data/categories.js",

        /* data/skills/linguagens */
        "data/skills/linguagens/html.js",
        "data/skills/linguagens/css.js",
        "data/skills/linguagens/javascript.js",
        "data/skills/linguagens/node-js.js",
        "data/skills/linguagens/typescript.js",
        "data/skills/linguagens/sql.js",
        "data/skills/linguagens/python.js",

        /* data/skills/frameworks */
        "data/skills/frameworks/react.js",
        "data/skills/frameworks/angular.js",
        "data/skills/frameworks/express-nestjs.js",
        "data/skills/frameworks/next-js.js",

        /* data/skills/banco-de-dados */
        "data/skills/banco-de-dados/postgresql.js",
        "data/skills/banco-de-dados/mysql.js",
        "data/skills/banco-de-dados/mongodb.js",
        "data/skills/banco-de-dados/redis-e-cache.js",

        /* data/skills/nuvem-e-infraestrutura */
        "data/skills/nuvem-e-infraestrutura/docker.js",
        "data/skills/nuvem-e-infraestrutura/aws.js",
        "data/skills/nuvem-e-infraestrutura/azure.js",

        /* data/skills/apis */
        "data/skills/apis/apis-restful.js",
        "data/skills/apis/graphql.js",
        "data/skills/apis/http-e-status-codes.js",

        /* data/skills/ferramentas */
        "data/skills/ferramentas/git.js",
        "data/skills/ferramentas/github.js",
        "data/skills/ferramentas/linux-e-terminal.js",
        "data/skills/ferramentas/postman-insomnia.js",
        "data/skills/ferramentas/vs-code-ide.js",
        "data/skills/ferramentas/pacotes-e-build-npm-e-vite.js",
        "data/skills/ferramentas/ia-no-desenvolvimento.js",

        /* data/skills/engenharia-de-software */
        "data/skills/engenharia-de-software/logica-de-programacao.js",
        "data/skills/engenharia-de-software/estruturas-de-dados-e-algoritmos.js",
        "data/skills/engenharia-de-software/programacao-orientada-a-objetos.js",
        "data/skills/engenharia-de-software/principios-de-codigo-limpo.js",
        "data/skills/engenharia-de-software/arquitetura-de-software.js",
        "data/skills/engenharia-de-software/testes-automatizados.js",
        "data/skills/engenharia-de-software/depuracao-e-tratamento-de-erros.js",
        "data/skills/engenharia-de-software/autenticacao-e-autorizacao.js",
        "data/skills/engenharia-de-software/seguranca-basica-de-aplicacoes.js",
        "data/skills/engenharia-de-software/dns-e-cliente-servidor.js",
        "data/skills/engenharia-de-software/ci-cd-e-deploy.js",
        "data/skills/engenharia-de-software/documentacao-tecnica.js",
        "data/skills/engenharia-de-software/acessibilidade-web-wcag.js",
        "data/skills/engenharia-de-software/performance-web-core-web-vitals.js",

        /* data/skills/soft-skills */
        "data/skills/soft-skills/resolucao-de-problemas.js",
        "data/skills/soft-skills/comunicacao-clara.js",
        "data/skills/soft-skills/trabalho-em-equipe.js",
        "data/skills/soft-skills/organizacao-e-gestao-do-tempo.js",
        "data/skills/soft-skills/autonomia-para-pesquisar-e-aprender.js",
        "data/skills/soft-skills/receber-feedback-e-melhorar.js",
        "data/skills/soft-skills/ingles-tecnico.js",

        /* data/skills/carreira */
        "data/skills/carreira/curriculo-e-linkedin.js",
        "data/skills/carreira/busca-e-candidatura-a-vagas.js",
        "data/skills/carreira/teste-tecnico-e-entrevista-tecnica.js",
        "data/skills/carreira/entrevista-comportamental.js",

        /* data/skills/design-e-ux-ui */
        "data/skills/design-e-ux-ui/fundamentos-de-ui-e-ux.js",
        "data/skills/design-e-ux-ui/figma-e-prototipos.js",
        "data/skills/design-e-ux-ui/design-system-e-componentes.js",

        /* data */
        "data/goals.js",

        /* core */
        "core/indexes.js",
        "core/state.js",
        "core/dates.js",

        /* ui */
        "ui/render.js",
        "ui/drawer.js",

        /* features */
        "features/backup.js",
        "features/graph.js",
        "features/evolution.js",
        "features/map.js",
        "features/jobs.js",
        "features/celebration.js",

        /* main */
        "main.js"
    ];

    const done = () => document.body.classList.remove("is-loading");
    let left = files.length;
    files.forEach(f => {
        const s = document.createElement("script");
        s.src = base + f;
        s.async = false;                      // mantém a ordem de execução
        s.onload = () => { if (--left === 0) done(); };
        s.onerror = () => { console.error("Falha ao carregar", base + f); if (--left === 0) done(); };
        document.body.appendChild(s);
    });
})();
