/* ---------- COMPARADOR DE VAGAS ---------- */
const norm = t => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const mk = alts => new RegExp("(^|[^a-z0-9+#.])(?:" + alts.join("|") + ")(?![a-z0-9+#])", "i");
const JOB_KEYS = {
    "HTML": ["html5?"],
    "CSS": ["css3?", "sass", "scss", "tailwind(?:css)?", "bootstrap"],
    "JavaScript": ["javascript", "js", "ecmascript", "es6"],
    "Node.js": ["node\\.?js", "node"],
    "TypeScript": ["typescript"],
    "SQL": ["sql", "bancos? de dados relacionais?", "bancos? relacionais?"],
    "Python": ["python", "django", "flask", "fastapi"],
    "React": ["react(?:\\.?js)?", "redux"],
    "Angular": ["angular(?:js)?"],
    "Express / NestJS": ["express(?:\\.?js)?", "nest\\.?js", "fastify"],
    "Next.js": ["next\\.?js"],
    "PostgreSQL": ["postgres(?:ql)?", "postgre"],
    "MySQL": ["mysql", "mariadb"],
    "MongoDB": ["mongo(?:db)?", "nosql", "mongoose", "dynamodb"],
    "Redis e cache": ["redis", "cache", "memcached"],
    "Docker": ["docker", "containers?", "conteineres?", "containerizacao"],
    "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda", "cloud", "nuvem"],
    "Azure": ["azure"],
    "APIs RESTful": ["restful", "rest apis?", "apis? rest(?:ful)?", "web apis?", "apis?", "web services?"],
    "GraphQL": ["graphql", "apollo"],
    "HTTP e status codes": ["https?", "status codes?", "cors"],
    "Git": ["git", "controle de versao", "versionamento", "gitflow", "git flow"],
    "GitHub": ["github", "gitlab", "bitbucket", "pull requests?"],
    "Linux e terminal": ["linux", "unix", "bash", "shell", "terminal", "ssh"],
    "Postman / Insomnia": ["postman", "insomnia"],
    "VS Code / IDE": ["vs ?code", "visual studio code"],
    "Lógica de programação": ["logica de programacao", "raciocinio logico", "logica"],
    "Estruturas de dados e algoritmos": ["estruturas? de dados", "algoritmos?", "data structures", "big o"],
    "Programação orientada a objetos": ["orientacao a objetos", "orientada a objetos", "poo", "oop", "object[- ]oriented", "solid", "design patterns", "padroes de projeto"],
    "Princípios de código limpo": ["clean code", "codigo limpo", "refatoracao", "refactoring", "boas praticas de (?:codigo|programacao|desenvolvimento)"],
    "Arquitetura de software": ["arquitetura de software", "arquitetura", "microsservicos?", "microservicos?", "microservices?", "mvc", "clean architecture", "ddd", "monolitos?"],
    "Testes automatizados": ["testes? automatizados?", "testes? unitarios?", "testes? de integracao", "jest", "vitest", "cypress", "playwright", "tdd", "unit tests?", "pytest", "testing"],
    "Depuração e tratamento de erros": ["depuracao", "debug(?:ging)?", "troubleshooting", "tratamento de erros"],
    "Autenticação e autorização": ["autenticacao", "autorizacao", "oauth2?", "jwt", "auth", "sso", "keycloak"],
    "Segurança básica de aplicações": ["seguranca", "owasp", "xss", "csrf", "sql injection", "vulnerabilidades?", "lgpd", "security"],
    "DNS e cliente-servidor": ["dns", "cliente[- ]servidor", "client[- ]server", "tcp(?:\\/ip)?", "cdn", "redes? de computadores"],
    "CI/CD e deploy": ["ci\\/cd", "ci cd", "cicd", "github actions", "gitlab ci", "devops", "deploy", "integracao continua", "continuous integration", "pipelines?"],
    "Documentação técnica": ["documentacao", "swagger", "openapi", "documentation", "readme"],
    "Resolução de problemas": ["resolucao de problemas", "resolver problemas", "problem[- ]solving", "analitic[oa]"],
    "Comunicação clara": ["comunicacao", "communication", "comunicativ[oa]"],
    "Trabalho em equipe": ["trabalho em equipe", "em equipe", "teamwork", "team player", "work(?:ing)? in teams?", "colaborativ[oa]", "colaboracao", "scrum", "agil", "agile", "kanban", "code review", "squads?"],
    "Organização e gestão do tempo": ["gestao do tempo", "organizacao do tempo", "time management", "prazos?", "priorizacao", "organizad[oa]"],
    "Autonomia para pesquisar e aprender": ["autonomia", "proatividade", "proativ[oa]", "autodidata", "aprender rapido", "vontade de aprender", "curiosidade", "self[- ]starter", "aprendizado continuo", "aprendizagem continua"],
    "Receber feedback e melhorar": ["feedbacks?"],
    "Inglês técnico": ["ingles", "english"],
    "Pacotes e build (npm e Vite)": ["npm", "yarn", "pnpm", "vite", "webpack", "babel", "bundlers?", "eslint", "prettier"],
    "IA no desenvolvimento": ["ferramentas de ia", "ia generativa", "inteligencia artificial", "copilot", "chatgpt", "llms?", "prompt engineering", "ai tools", "generative ai"],
    "Acessibilidade web (WCAG)": ["acessibilidade", "accessibility", "wcag", "a11y", "aria"],
    "Performance web (Core Web Vitals)": ["core web vitals", "web vitals", "lighthouse", "performance", "desempenho"],
    "Fundamentos de UI e UX": ["ui\\/ux", "ux\\/ui", "ui", "ux", "usabilidade", "experiencia do usuario", "user experience", "design de interface"],
    "Figma e protótipos": ["figma", "adobe xd", "sketch", "prototipacao", "prototipos?"],
    "Design system e componentes": ["design systems?", "storybook", "biblioteca de componentes", "design tokens"]
};
const JOB_RE = {};
Object.keys(JOB_KEYS).forEach(n => { if (!byName[n]) { console.error("Comparador: habilidade inexistente:", n); return; } JOB_RE[n] = mk(JOB_KEYS[n]); });
const JOB_OUT = [["Java", "java"], ["C#", "c#"], [".NET", "\\.net", "dotnet"], ["PHP", "php"], ["Laravel", "laravel"], ["Vue", "vue(?:\\.?js)?"], ["Svelte", "svelte"], ["Go (Golang)", "golang"], ["Rust", "rust"], ["Kotlin", "kotlin"], ["Swift", "swift"], ["Flutter", "flutter"], ["React Native", "react native"], ["Ruby on Rails", "ruby", "rails"], ["Spring", "spring(?: boot)?"], ["Kubernetes", "kubernetes", "k8s"], ["Terraform", "terraform"], ["Jenkins", "jenkins"], ["Kafka", "kafka"], ["RabbitMQ", "rabbitmq"], ["Elasticsearch", "elasticsearch"], ["Google Cloud", "gcp", "google cloud"], ["Power BI", "power ?bi"], ["Machine Learning", "machine learning", "aprendizado de maquina", "ciencia de dados", "data science"], ["C++", "c\\+\\+"]].map(a => [a[0], mk(a.slice(1))]);
const JOB_SAMPLE = `Desenvolvedor(a) Full Stack Júnior

Requisitos:
- Conhecimento em HTML, CSS e JavaScript (TypeScript é um diferencial)
- Experiência com React e Node.js
- Banco de dados relacionais (PostgreSQL ou MySQL) e noções de MongoDB
- Criação e consumo de APIs REST
- Git e GitHub
- Noções de Docker e AWS
- Testes automatizados (Jest)
- Inglês para leitura técnica
- Boa comunicação, trabalho em equipe e metodologias ágeis

Diferenciais: Next.js, CI/CD, Kubernetes, Java`;
function analyzeJob(raw) {
    const t = norm(raw).replace(/https?:\/\/\S+/g, " ");
    return { found: skills.filter(s => JOB_RE[s.name] && JOB_RE[s.name].test(t)), outs: JOB_OUT.filter(o => o[1].test(t)).map(o => o[0]) };
}
let jobAnalyzed = false;
const jobTextEl = document.getElementById("jobText"), jobBox = document.getElementById("jobResult");
function renderJobResult() {
    if (!jobAnalyzed) { jobBox.innerHTML = ""; return; }
    const raw = jobTextEl.value;
    if (raw.trim().length < 20) { jobBox.innerHTML = `<div class="msg" style="margin-top:14px">Cole o texto da vaga (principalmente requisitos e qualificações) para eu comparar.</div>`; return; }
    const { found, outs } = analyzeJob(raw);
    if (!found.length) { jobBox.innerHTML = `<div class="msg" style="margin-top:14px">Não reconheci nenhuma habilidade da trilha neste texto. Cole a parte de requisitos e qualificações da vaga.${outs.length ? " A vaga cita: " + outs.map(esc).join(", ") + " (fora da trilha)." : ""}</div>`; return; }
    const have = found.filter(isDone), prog = found.filter(s => !isDone(s) && statusOf(s) === "prog"), miss = found.filter(s => !isDone(s) && statusOf(s) !== "prog");
    const pct = Math.round(have.length / found.length * 100);
    const msg = pct >= 80 ? "Você cumpre a maior parte do que a vaga pede. Vale se candidatar e caprichar no portfólio." : pct >= 50 ? "Você já cumpre boa parte. Dá para se candidatar enquanto fecha o que falta, principalmente se faltarem itens desejáveis." : "Ainda falta base para esta vaga. Use a ordem de estudo abaixo como caminho.";
    const need = new Set(), req = new Set(found.map(s => s.name));
    const add = s => { if (isDone(s) || need.has(s.name)) return; need.add(s.name); s.pre.forEach(n => add(byName[n])); };
    found.forEach(add);
    const order = skills.filter(s => need.has(s.name)).sort((a, b) => depth(a) - depth(b) || skills.indexOf(a) - skills.indexOf(b));
    const base = order.filter(s => !req.has(s.name)).length;
    const col = (title, arr, cls) => `<div class="res-card"><h3>${title} (${arr.length})</h3>${arr.length ? `<div class="chips">${arr.map(s => chipFor(s, cls)).join("")}</div>` : `<div class="muted" style="font-size:13px">Nenhuma.</div>`}</div>`;
    jobBox.innerHTML = `<div class="res-card" style="margin-top:14px"><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><div class="big-pct">${pct}%</div><div style="flex:1;min-width:220px"><b>${have.length} de ${found.length} habilidades pedidas você já concluiu</b><div class="barline" style="margin-top:8px"><div class="bar"><div class="barfill" style="width:${pct}%"></div></div></div><div class="muted" style="font-size:13px;margin-top:8px">${msg}</div></div></div></div>
 <div class="res-grid">${col("✓ Você já tem", have, "ok")}${col("● Em andamento", prog, "")}${col("○ Faltam", miss, "lock")}</div>
 ${order.length ? `<div class="res-card" style="margin-top:14px"><h3>Ordem sugerida de estudo (${order.length})</h3><div class="muted" style="font-size:12px">${order.length - base} pedidas pela vaga${base ? ` e ${base} de base (pré-requisitos que a vaga não cita, mas que destravam as outras)` : ""}. Pré-requisitos vêm sempre antes.</div><ol class="study">${order.map(s => `<li>${chipFor(s)} <span class="muted">${req.has(s.name) ? "pedida na vaga" : "base necessária"}</span></li>`).join("")}</ol></div>` : ""}
 ${outs.length ? `<div class="res-card" style="margin-top:14px"><h3>Também pedido, fora da trilha</h3><div class="chips">${outs.map(o => `<span class="chip plain">${esc(o)}</span>`).join("")}</div><div class="muted" style="font-size:12px;margin-top:6px">Veja se são obrigatórios ou diferenciais. Muitas vezes dá para entrar sabendo a base e aprender o resto no trabalho.</div></div>` : ""}
 <div class="disclaimer">A comparação procura palavras-chave no texto. Ela não entende o contexto: leia a vaga com atenção e use este resultado como apoio, não como veredito.</div>`;
}
const runJob = () => { jobAnalyzed = true; renderJobResult(); };
document.getElementById("jobGo").addEventListener("click", runJob);
jobTextEl.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runJob(); });
document.getElementById("jobSample").addEventListener("click", () => { jobTextEl.value = JOB_SAMPLE; runJob(); });
document.getElementById("jobClear").addEventListener("click", () => { jobTextEl.value = ""; jobAnalyzed = false; renderJobResult(); });
jobBox.addEventListener("click", e => { const t = e.target.closest("[data-go]"); if (t) openSkill(t.dataset.go); });
