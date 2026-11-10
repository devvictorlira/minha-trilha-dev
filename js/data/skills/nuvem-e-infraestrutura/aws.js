/* Nuvem e infraestrutura › AWS */
addSkill("Nuvem e infraestrutura",
    S("AWS", "Média", ["Docker", "Linux e terminal"],
        ["Conta, billing e alertas de custo", "IAM: usuários, roles, políticas e MFA", "EC2", "S3", "RDS", "VPC e Security Groups (noções)", "Route 53 e DNS", "CloudWatch (logs)", "Lambda (noções)", "Deploy de container (ECS ou App Runner)"],
        ["Configuro alerta de orçamento antes de criar recursos", "Explico IAM e o princípio do menor privilégio", "Publico uma aplicação e consigo acessá-la pela internet", "Sei desligar tudo para não gerar custo"],
        C("Deploy da API na AWS", "Publique sua API dockerizada na AWS com banco e logs.", ["Alarme de orçamento criado primeiro", "API acessível por URL pública", "Banco em serviço gerenciado (RDS) ou equivalente", "Logs consultados no CloudWatch", "Recursos desligados ao final"]),
        "Se você tem medo de criar recursos por não saber quanto vai custar, ainda não aprendeu AWS. Custo e permissões são parte do conhecimento.")
);
