/* Nuvem e infraestrutura › Docker */
addSkill("Nuvem e infraestrutura",
    S("Docker", "Alta", ["Linux e terminal"],
        ["Imagens x containers", "Dockerfile, camadas e cache", "Volumes e redes", "docker compose", "Variáveis de ambiente e secrets", "Multi-stage build", "Docker Hub e registries", "Boas práticas: usuário não-root e .dockerignore"],
        ["Escrevo um Dockerfile do zero", "Subo aplicação e banco com compose", "Explico a diferença entre imagem e container", "Reduzo o tamanho da imagem com multi-stage"],
        C("Dockerize sua API e o banco", "Empacote sua API e o banco de dados para rodar com um único comando.", ["Dockerfile escrito por você", "docker compose com API e banco", "Volume para persistir os dados", "Variáveis via .env (nunca no Git)", "README com como subir tudo"]),
        "Se o seu projeto só roda na sua máquina e você não consegue colocá-lo para rodar em outra com um comando, ainda não aprendeu Docker.")
);
