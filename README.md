# Galeria de Arte - Goski Gallery

Este projeto implementa uma aplicação web completa para gerenciamento de uma galeria de arte, com backend em TypeScript/Express e frontend em HTML/CSS/JS.

## Estrutura do Projeto

```
projeto-pronto-para-rodar/
├── backend/               # Código do servidor
│   ├── src/               # Código-fonte TypeScript
│   │   ├── config/        # Configurações do sistema
│   │   ├── controllers/   # Controladores (lógica de negócios)
│   │   ├── setup/         # Scripts de inicialização
│   │   ├── index.ts       # Ponto de entrada da aplicação
│   │   ├── routes.ts      # Definição de rotas da API
│   │   └── server.ts      # Configuração do servidor Express
│   ├── package.json       # Dependências e scripts
│   ├── tsconfig.json      # Configuração do TypeScript
│   └── .env.example       # Exemplo de variáveis de ambiente
│
└── frontend/              # Interface do usuário
    ├── css/               # Estilos CSS
    ├── js/                # Scripts JavaScript
    ├── index.html         # Página inicial
    ├── library.html       # Página de biblioteca
    └── create.html        # Página de criação
```

## Instruções para Execução

### Pré-requisitos

- Node.js (v14+)

### Passos para Execução

1. **Extraia o arquivo zip** em um diretório de sua escolha

2. **Configure o ambiente**:
   ```bash
   cd backend
   cp .env.example .env
   ```

3. **Instale as dependências e configure o banco de dados**:
   ```bash
   npm run setup
   ```
   Este comando irá:
   - Instalar todas as dependências necessárias
   - Compilar o código TypeScript
   - Criar e configurar o banco de dados SQLite
   - Inserir dados iniciais para demonstração

4. **Inicie o servidor**:
   ```bash
   npm start
   ```

5. **Acesse a aplicação** em seu navegador:
   ```
   http://localhost:3000
   ```

## Funcionalidades

- **Gerenciamento de Artistas**: Cadastro, visualização, edição e exclusão
- **Gerenciamento de Obras de Arte**: Cadastro, visualização, edição e exclusão
- **Gerenciamento de Exposições**: Cadastro, visualização, edição e exclusão
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos

## Tecnologias Utilizadas

- **Backend**: TypeScript, Express, SQLite
- **Frontend**: HTML5, CSS3, JavaScript
- **Banco de Dados**: SQLite (embutido, sem necessidade de instalação separada)

## Solução de Problemas

Se encontrar algum problema durante a execução:

1. **Porta em uso**: Se a porta 3000 estiver em uso, edite o arquivo `.env` e altere o valor da variável `PORT`

2. **Erro de permissão**: Certifique-se de que seu usuário tem permissão para escrever no diretório do projeto

3. **Banco de dados**: Se houver problemas com o banco de dados, você pode reiniciar do zero excluindo o arquivo `database.sqlite` e executando `npm run setup` novamente

## Desenvolvimento

Para continuar o desenvolvimento do projeto:

1. **Modo de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Este comando inicia o servidor com hot-reload para facilitar o desenvolvimento

2. **Compilação manual**:
   ```bash
   npm run build
   ```
   
3. **Estrutura de arquivos**:
   - Adicione novos controladores em `src/controllers/`
   - Adicione novas rotas em `src/routes.ts`
   - Modifique o frontend nos arquivos em `frontend/`
