<?php

include 'functions.php';
$pdo = pdo_connect_mysql();
$msg = '';

// Verifica se o ID da arte existe na URL (ex: update.php?id=1)
if (isset($_GET['id'])) {
    // Verifica se o formulário foi submetido
    if (!empty($_POST)) {
        // Os dados do formulário
        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
        $title = isset($_POST['title']) ? $_POST['title'] : '';
        $description = isset($_POST['description']) ? $_POST['description'] : '';
        $year = isset($_POST['year']) ? $_POST['year'] : '';
        $url = isset($_POST['url']) ? $_POST['url'] : '';

        // Atualiza o registro na tabela 'art'
        $stmt = $pdo->prepare('UPDATE art SET id = ?, title = ?, description = ?, year = ?, url = ? WHERE id = ?');
        $stmt->execute([$id, $title, $description, $year, $url, $_GET['id']]);
        $msg = 'Obra de arte atualizada com sucesso!';
    }

    // Busca os dados da obra de arte na tabela 'art'
    $stmt = $pdo->prepare('SELECT * FROM art WHERE id = ?');
    $stmt->execute([$_GET['id']]);
    $art = $stmt->fetch(PDO::FETCH_ASSOC);

    // Se a obra de arte não existir com o ID especificado
    if (!$art) {
        exit('Obra de arte não existe com esse ID!');
    }
} else {
    exit('Nenhum ID especificado!');
}

?>

<?=template_header('Editar Obra de Arte')?>

<div class="content update">
    <h2>Editar Obra de Arte #<?=$art['id']?></h2>
    <form action="update.php?id=<?=$art['id']?>" method="post">
        <label for="id">ID</label>
        <label for="title">Título</label>
        <input type="text" name="id" value="<?=$art['id']?>" id="id" readonly>
        <input type="text" name="title" value="<?=$art['title']?>" id="title">

        <label for="description">Descrição</label>
        <label for="year">Ano</label>
        <input type="text" name="description" value="<?=$art['description']?>" id="description">
        <input type="text" name="year" value="<?=$art['year']?>" id="year">

        <label for="url">URL</label>
        <input type="text" name="url" value="<?=$art['url']?>" id="url">

        <input type="submit" value="Atualizar">
    </form>
    <?php if ($msg): ?>
    <p><?=$msg?></p>
    <?php endif; ?>
</div>

<?=template_footer()?>
