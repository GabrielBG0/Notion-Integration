## Instruções

Para executar o projeto use <code>node ./src/index.js |caminho para o arquivo csv para inportar|</code>

Crie um arquivo .env e configure as variaveis **NOTION_KEY** e **NOTION_DATABASE_ID** seguindo [esse passos](https://developers.notion.com/docs#:~:text=Step%201%3A%20Create,v%3D...%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C---------%20Database%20ID%20--------%7C) (1 e 2)

### Limitações
- Não impede duplicatas
- Aceita apenas campos de texto
- Não necessariamente insere na order crescente dos IDs, configure o sort da tabela para garantir a sequencialidade
