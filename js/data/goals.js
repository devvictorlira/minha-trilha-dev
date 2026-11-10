/* ---------- METAS ---------- */
const goals = [
    {
        title: "Estágio em desenvolvimento web", sub: "Porta de entrada: estágio e primeiras oportunidades", icon: "①",
        skills: ["Lógica de programação", "HTML", "CSS", "JavaScript", "Git", "GitHub", "Depuração e tratamento de erros", "Resolução de problemas", "Autonomia para pesquisar e aprender", "Comunicação clara", "Receber feedback e melhorar", "Inglês técnico", "Currículo e LinkedIn", "Busca e candidatura a vagas", "Entrevista comportamental"],
        msgs: ["Ainda é cedo para se candidatar com segurança. Foque em lógica, HTML, CSS e JavaScript, e comece a publicar projetos no GitHub.", "Você está no caminho. Já dá para se candidatar a processos que formam iniciantes, mas o portfólio precisa de mais projetos.", "Quase lá. Você já pode competir por estágios em programação e web. Complete o que falta e deixe 2 ou 3 projetos bem documentados.", "Você atende aos requisitos típicos de uma vaga de estágio em desenvolvimento web. Candidate-se, mesmo sem se sentir 100% pronto."],
        projects: ["Landing page semântica e responsiva", "App de tarefas em JavaScript puro", "GitHub com README de perfil e projetos fixados", "Currículo e LinkedIn prontos, com links dos projetos"],
        obs: "Estágio costuma avaliar base, vontade de aprender e comunicação mais do que tecnologia avançada. Não espere dominar tudo para começar a se candidatar."
    },

    {
        title: "Front-end júnior", sub: "Vagas de desenvolvedor front-end (React e TypeScript)", icon: "②",
        skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Acessibilidade web (WCAG)", "Performance web (Core Web Vitals)", "Pacotes e build (npm e Vite)", "Git", "GitHub", "HTTP e status codes", "APIs RESTful", "Depuração e tratamento de erros", "Testes automatizados", "Princípios de código limpo", "Documentação técnica", "Trabalho em equipe", "Comunicação clara", "Inglês técnico", "Currículo e LinkedIn", "Teste técnico e entrevista técnica"],
        msgs: ["Você ainda está construindo a base. Priorize JavaScript sólido e depois React.", "Você já tem parte do que se pede. Falta aprofundar React, TypeScript e consumo de APIs para competir em vagas júnior.", "Quase pronto. Você já consegue competir por vagas júnior de front-end que aceitam crescimento. Reforce testes e portfólio.", "Você atende ao conjunto típico de uma vaga front-end júnior. Foque em candidaturas e em polir 2 ou 3 projetos."],
        projects: ["SPA em React consumindo API real", "Projeto em TypeScript com testes", "Clone de interface com foco em responsividade e acessibilidade"],
        obs: "Para front-end, portfólio visual e código organizado pesam muito. Acessibilidade e responsividade são diferenciais."
    },

    {
        title: "Back-end júnior (Node.js)", sub: "Vagas de desenvolvedor back-end com Node, SQL e APIs", icon: "③",
        skills: ["Lógica de programação", "JavaScript", "TypeScript", "Node.js", "Express / NestJS", "SQL", "PostgreSQL", "HTTP e status codes", "APIs RESTful", "Autenticação e autorização", "Segurança básica de aplicações", "Git", "GitHub", "Linux e terminal", "Docker", "Testes automatizados", "Depuração e tratamento de erros", "Postman / Insomnia", "Documentação técnica", "MongoDB", "Pacotes e build (npm e Vite)", "Currículo e LinkedIn", "Teste técnico e entrevista técnica"],
        msgs: ["Ainda longe. Comece por JavaScript, Node, SQL e HTTP, e só depois vá para frameworks.", "Você já tem a base. Falta consolidar API, banco e autenticação para ter um projeto de back-end convincente.", "Quase pronto. Você já consegue competir por vagas júnior de back-end com Node. Finalize Docker, testes e segurança.", "Você atende ao conjunto típico de uma vaga back-end júnior. Tenha uma API completa no ar, documentada e testada."],
        projects: ["API REST completa com banco, autenticação e testes", "API dockerizada com deploy online", "Documentação OpenAPI e coleção de testes"],
        obs: "Back-end júnior é avaliado por SQL, APIs, autenticação e noções de segurança. Tenha um projeto no ar que alguém possa chamar."
    },

    {
        title: "Full stack júnior", sub: "Meta principal: front-end e back-end no mesmo perfil", icon: "④",
        skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express / NestJS", "SQL", "PostgreSQL", "HTTP e status codes", "APIs RESTful", "Autenticação e autorização", "Segurança básica de aplicações", "Git", "GitHub", "Docker", "Testes automatizados", "Depuração e tratamento de erros", "Princípios de código limpo", "Documentação técnica", "Comunicação clara", "Trabalho em equipe", "Inglês técnico", "Next.js", "MongoDB", "Pacotes e build (npm e Vite)", "Acessibilidade web (WCAG)", "IA no desenvolvimento", "Currículo e LinkedIn", "Busca e candidatura a vagas", "Teste técnico e entrevista técnica", "Entrevista comportamental"],
        msgs: ["Esta meta é ampla. Avance por camadas: base web, depois front, depois back, e por fim integração.", "Você tem boa parte da base. Falta fechar as duas pontas e construir um projeto completo.", "Quase lá. Você já pode competir por vagas full stack júnior que valorizem potencial. Faltam poucos itens.", "Você atende ao conjunto típico de uma vaga full stack júnior. Mostre um projeto completo, com deploy, README e testes."],
        projects: ["Aplicação completa: front em React, API em Node e PostgreSQL", "Login com perfis de usuário e rotas protegidas", "Deploy online com README em português e inglês"],
        obs: "Full stack júnior costuma ser julgado por um projeto de ponta a ponta. Um bom projeto completo vale mais que muitos pedaços soltos."
    },

    {
        title: "Full stack pleno (visão de longo prazo)", sub: "Rumo ao próximo nível: arquitetura, nuvem e automação", icon: "⑤",
        skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Node.js", "Express / NestJS", "SQL", "PostgreSQL", "APIs RESTful", "GraphQL", "Autenticação e autorização", "Segurança básica de aplicações", "Git", "GitHub", "Linux e terminal", "Docker", "AWS", "CI/CD e deploy", "Testes automatizados", "Arquitetura de software", "Programação orientada a objetos", "Estruturas de dados e algoritmos", "DNS e cliente-servidor", "Princípios de código limpo", "Trabalho em equipe", "Comunicação clara", "Organização e gestão do tempo", "Next.js", "MongoDB", "Redis e cache", "Performance web (Core Web Vitals)", "Acessibilidade web (WCAG)", "Pacotes e build (npm e Vite)", "IA no desenvolvimento", "Teste técnico e entrevista técnica"],
        msgs: ["Meta de longo prazo. Por ora, use-a como mapa e foque no júnior.", "Você está construindo as bases do próximo nível. Continue acumulando projetos reais.", "Faltam poucos itens, mas pleno exige experiência prática em produção, além do checklist.", "Checklist completo. Para pleno, agora conta experiência real: decisões, incidentes, liderança técnica."],
        projects: ["Sistema com arquitetura documentada (ADRs)", "Pipeline de CI/CD com deploy automatizado", "Contribuição em projeto de maior porte"],
        obs: "Nível pleno não se mede só por tecnologias. Pesam autonomia, decisões técnicas e histórico de entrega em ambientes reais."
    }
];
