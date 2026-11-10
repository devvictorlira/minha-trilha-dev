/* Engenharia de software › Autenticação e autorização */
addSkill("Engenharia de software",
    S("Autenticação e autorização", "Alta", ["Express / NestJS", "HTTP e status codes"],
        ["Autenticação x autorização", "Hash de senha (bcrypt ou argon2)", "Sessões x JWT", "Refresh token", "OAuth2 e OIDC (login social)", "RBAC", "Cookies httpOnly, secure e sameSite", "Noções de MFA", "Rotas protegidas no front e no back"],
        ["Explico por que senha nunca é salva em texto", "Explico a diferença entre sessão e JWT", "Protejo rotas por perfil de usuário", "Defino a validade e a renovação de tokens"],
        C("Sistema de login completo", "Implemente cadastro, login, logout e rotas protegidas na sua API.", ["Senha com hash", "Access e refresh token", "Rotas com perfis (RBAC)", "Cookies seguros ou tokens bem armazenados", "Testes dos fluxos de login"]),
        "Se você guarda senha sem hash ou deixa token em lugar inseguro, esse é um risco grave. Autenticação não é item para aprender pela metade.")
);
