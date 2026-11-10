/* Engenharia de software › CI/CD e deploy */
addSkill("Engenharia de software",
    S("CI/CD e deploy", "Baixa", ["Git", "GitHub", "Docker"],
        ["Integração contínua x entrega contínua", "GitHub Actions: workflows", "Rodar testes e lint no pull request", "Build de imagem Docker no pipeline", "Deploy automático (Vercel, Render ou AWS)", "Ambientes (dev, staging e prod)", "Variáveis e secrets no pipeline", "Rollback"],
        ["Crio um workflow do zero", "Bloqueio merge com testes falhando", "Faço deploy automático ao dar merge"],
        C("Pipeline completo", "Crie um pipeline que teste, construa e publique seu projeto.", ["Testes e lint rodando no PR", "Build da imagem Docker", "Deploy automático após merge na main", "Secrets fora do código", "Plano de rollback documentado"]),
        "Se todo deploy seu é manual e arriscado, ainda não aprendeu CI/CD. É diferencial em vagas júnior.")
);
