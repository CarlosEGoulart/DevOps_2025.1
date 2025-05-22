# Galeria de Arte - Goski Gallery

Este é um projeto completo de Galeria de Arte com backend em TypeScript/Express, frontend em HTML/CSS/JS e banco de dados MySQL, seguindo o modelo lógico especificado.

## Estrutura do Projeto

```
projeto/
├── backend/               # Código do servidor
│   ├── src/               # Código-fonte
│   │   ├── config/        # Configurações do sistema
│   │   ├── controllers/   # Controladores (lógica de negócios)
│   │   ├── setup/         # Scripts de configuração
│   │   │   └── sql/       # Scripts SQL
│   │   ├── index.ts       # Ponto de entrada da aplicação
│   │   ├── routes.ts      # Definição de rotas da API
│   │   └── server.ts      # Configuração do servidor Express
│   ├── .env.example       # Exemplo de variáveis de ambiente
│   ├── package.json       # Dependências e scripts
│   └── tsconfig.json      # Configuração do TypeScript
│
└── frontend/              # Interface do usuário
    ├── css/               # Estilos CSS
    ├── js/                # Scripts JavaScript
    ├── index.html         # Página inicial
    ├── library.html       # Página de biblioteca
    └── create.html        # Página de criação
```

## Modelo de Dados

O banco de dados segue o seguinte modelo lógico:

1. **Artist (Artista)**
   - artist_id (PK)
   - name
   - bio
   - year
   - instagram

2. **Art (Obra de Arte)**
   - art_id (PK)
   - title
   - description
   - year
   - url_image
   - artist_id (FK -> Artist)

3. **Exhibition (Exposição)**
   - exhibition_id (PK)
   - name
   - description

4. **Exhibition_art (Relação Exposição-Obra)**
   - exhibition_art_id (PK)
   - art_id (FK -> Art)
   - exhibition_id (FK -> Exhibition)

## Requisitos

- Node.js (v14+)
- MySQL (v5.7+)

## Configuração e Execução

### 1. Configurar o Banco de Dados

1. Certifique-se de que o MySQL está instalado e em execução
2. Crie um banco de dados vazio (ou use um existente)
3. Copie o arquivo `.env.example` para `.env` e ajuste as configurações:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=galeria_arte
```

### 2. Instalar Dependências e Configurar o Projeto

Execute o seguinte comando na pasta `backend`:

```bash
npm run setup
```

Este comando irá:
- Instalar todas as dependências
- Compilar o código TypeScript
- Criar as tabelas no banco de dados
- Inserir dados iniciais de exemplo

### 3. Iniciar o Servidor

```bash
npm start
```

O servidor será iniciado em http://localhost:3000

## Funcionalidades

- **Artistas**: Cadastro, visualização, edição e exclusão de artistas
- **Obras de Arte**: Cadastro, visualização, edição e exclusão de obras de arte
- **Exposições**: Cadastro, visualização, edição e exclusão de exposições
- **Relacionamentos**: Associação de obras de arte a exposições

## Rotas da API

### Artistas
- `GET /api/artists` - Listar todos os artistas
- `POST /api/artists` - Criar novo artista
- `GET /api/artists/:id` - Obter artista por ID
- `PUT /api/artists/:id` - Atualizar artista
- `DELETE /api/artists/:id` - Excluir artista

### Obras de Arte
- `GET /api/arts` - Listar todas as obras de arte
- `POST /api/arts` - Criar nova obra de arte
- `GET /api/arts/:id` - Obter obra de arte por ID
- `PUT /api/arts/:id` - Atualizar obra de arte
- `DELETE /api/arts/:id` - Excluir obra de arte
- `GET /api/artists/:id/arts` - Listar obras de arte de um artista

### Exposições
- `GET /api/exhibitions` - Listar todas as exposições
- `POST /api/exhibitions` - Criar nova exposição
- `GET /api/exhibitions/:id` - Obter exposição por ID
- `PUT /api/exhibitions/:id` - Atualizar exposição
- `DELETE /api/exhibitions/:id` - Excluir exposição
- `GET /api/exhibitions/:id/arts` - Listar obras de arte em uma exposição
- `POST /api/exhibitions/:exhibitionId/arts/:artId` - Adicionar obra de arte a uma exposição
- `DELETE /api/exhibitions/:exhibitionId/arts/:artId` - Remover obra de arte de uma exposição

## Solução de Problemas

### Erro de conexão com o banco de dados
- Verifique se o MySQL está em execução
- Confirme se as credenciais no arquivo `.env` estão corretas
- Certifique-se de que o banco de dados especificado existe

### Erro ao iniciar o servidor
- Verifique se a porta 3000 está disponível
- Certifique-se de que todas as dependências foram instaladas com `npm install`
- Verifique se o código foi compilado com `npm run build`

## Desenvolvimento

Para desenvolvimento, você pode usar o modo de desenvolvimento que reinicia automaticamente o servidor quando os arquivos são alterados:

```bash
npm run dev
```
