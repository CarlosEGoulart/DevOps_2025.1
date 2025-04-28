<?php
include 'functions.php';
$pdo = pdo_connect_mysql();
$msg = '';
// Verifica se os dados POST não estão vazios
if (!empty($_POST)) {
    // Dados POST não vazios, insere um novo registro
    // Define as variáveis que serão inseridas, devemos verificar se as variáveis POST existem, caso contrário, podemos defini-las como vazias
    $id = isset($_POST['id']) && !empty($_POST['id']) && $_POST['id'] != 'auto' ? $_POST['id'] : NULL;
    // Verifica se a variável POST "title" existe, caso contrário, define o valor como vazio, basicamente o mesmo para todas as variáveis
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $year = isset($_POST['year']) ? $_POST['year'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';

    // Insere um novo registro na tabela 'art'
    $stmt = $pdo->prepare('INSERT INTO art (id, title, description, year, url) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$id, $title, $description, $year, $url]);
    // Mensagem de saída
    $msg = 'Obra adicionada com sucesso!';
}
?>

<?= template_header('Adicionar') ?>

<div class="content update">
    <h2>Adicionar Obra</h2>
    <form action="create.php" method="post">
        <label for="id">ID</label>
        <label for="title">Título</label>
        <input type="text" name="id" placeholder="26" value="auto" id="id">
        <input type="text" name="title" placeholder="Titulo da obra" id="title">
        <label for="description">Descrição</label>
        <label for="year">Ano</label>
        <input type="text" name="description" placeholder="Descricao da obra" id="description">
        <input type="text" name="year" placeholder="Ano de criacao" id="year">
        <label for="url">URL</label>
        <input type="text" name="url" placeholder="Url da imagem" id="url">
        <input type="submit" value="Criar">
    </form>
    <?php if ($msg): ?>
        <p><?= $msg ?></p>
    <?php endif; ?>
</div>

<?= template_footer() ?>
