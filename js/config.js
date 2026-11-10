/* =====================================================================
   🔐 CONFIGURAÇÃO DA CHAVE DE ACESSO  ←←← É AQUI QUE VOCÊ COLOCA A SUA CHAVE

   Por segurança o código NÃO guarda a senha em texto: guarda só um "hash"
   (uma impressão digital irreversível dela).

   COMO CONFIGURAR (1 minuto):
     1. Deixe a linha abaixo como está (vazia) e abra o index.html no navegador.
     2. Na tela de acesso, digite a chave que VOCÊ quer usar e clique em "Gerar código".
     3. Clique em "Copiar linha" e cole aqui, SUBSTITUINDO a linha ACCESS_PASSWORD_HASH.
     4. Salve o arquivo e recarregue. Pronto: só entra quem souber a chave.

   Para trocar a senha depois: apague o valor entre aspas e repita o processo.
   ===================================================================== */
const ACCESS_PASSWORD_HASH = "5f8d37dae10cccc3af1dcede1d5f3430b4946d114f27c324ffae12f7789ef7e2";

/* Não mude o texto abaixo depois de gerar o hash (senão a chave deixa de funcionar). */
const GATE_SALT = "trilhadev-v1:";
