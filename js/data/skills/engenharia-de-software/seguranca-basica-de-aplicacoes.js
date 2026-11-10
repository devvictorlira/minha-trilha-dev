/* Engenharia de software › Segurança básica de aplicações */
addSkill("Engenharia de software",
    S("Segurança básica de aplicações", "Alta", ["Autenticação e autorização"],
        ["OWASP Top 10", "SQL Injection", "XSS e CSRF", "Validação e sanitização de entrada", "Gestão de segredos (.env e nunca no Git)", "HTTPS, CORS e headers de segurança", "Dependências vulneráveis (npm audit)", "Princípio do menor privilégio", "Noções de LGPD"],
        ["Explico SQL Injection e como evitá-la", "Explico XSS e CSRF", "Rodo auditoria de dependências", "Mantenho segredos fora do repositório"],
        C("Ataque e corrija sua própria API", "Teste sua própria API contra as vulnerabilidades mais comuns e corrija.", ["Teste de SQL Injection e XSS (em ambiente seu)", "Todas as entradas validadas", "Headers de segurança configurados", "npm audit sem vulnerabilidades altas", "Relatório do que foi encontrado e corrigido"]),
        "Se você não sabe responder o que acontece quando alguém envia um script no campo de comentário do seu app, ainda não aprendeu segurança básica.")
);
