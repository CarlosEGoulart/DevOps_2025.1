# Análise do Modelo Lógico MySQL

## Tabelas e Estrutura

Baseado no diagrama fornecido, o modelo lógico possui as seguintes tabelas:

### 1. Artist
- **artist_id**: INT, PK, AUTO_INCREMENT
- **name**: VARCHAR(255)
- **bio**: TEXT
- **year**: INT (ano de nascimento)
- **instagram**: VARCHAR(255)

### 2. Art
- **art_id**: INT, PK, AUTO_INCREMENT
- **title**: VARCHAR(255)
- **description**: TEXT
- **year**: INT (ano da obra)
- **url_image**: VARCHAR(255)
- **artist_id**: INT, FK referenciando Artist(artist_id)

### 3. Exhibition
- **exhibition_id**: INT, PK, AUTO_INCREMENT
- **name**: VARCHAR(255)
- **description**: TEXT

### 4. Exhibition_art (tabela de relacionamento)
- **exhibition_art_id**: INT, PK, AUTO_INCREMENT
- **art_id**: INT, FK referenciando Art(art_id)
- **exhibition_id**: INT, FK referenciando Exhibition(exhibition_id)

## Relacionamentos

1. **Artist (1) → Art (n)**: Um artista pode ter várias obras, mas cada obra pertence a apenas um artista.
2. **Art (1) → Exhibition_art (n)**: Uma obra pode estar em várias exposições (através da tabela de relacionamento).
3. **Exhibition (1) → Exhibition_art (n)**: Uma exposição pode conter várias obras (através da tabela de relacionamento).

## Mudanças Necessárias

Para adaptar o projeto atual para usar MySQL com este modelo lógico, precisamos:

1. **Configuração do MySQL**:
   - Substituir a configuração do SQLite por MySQL
   - Adicionar parâmetros de conexão (host, porta, usuário, senha, nome do banco)
   - Instalar dependências do MySQL para Node.js

2. **Scripts SQL**:
   - Criar script para criação das tabelas conforme o modelo
   - Criar script para inserção de dados iniciais
   - Garantir que as chaves estrangeiras sejam configuradas corretamente

3. **Adaptação dos Controladores**:
   - Atualizar os controladores para usar MySQL em vez de SQLite
   - Ajustar as consultas SQL para o dialeto MySQL
   - Garantir que os relacionamentos sejam respeitados nas operações CRUD

4. **Frontend**:
   - Ajustar o frontend para trabalhar com a nova estrutura de dados
   - Garantir que as operações de edição e exclusão respeitem as restrições de chave estrangeira

5. **Documentação**:
   - Atualizar as instruções para configuração do MySQL
   - Incluir passos para criação do banco de dados
   - Fornecer orientações para solução de problemas específicos do MySQL
