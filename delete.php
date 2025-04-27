<?php

include 'functions.php';
$pdo = pdo_connect_mysql();
$msg = '';

// Verifica se o ID da obra de arte existe na URL
if (isset($_GET['id'])) {
    // Seleciona o registro que será excluído
    $stmt = $pdo->prepare('SELECT * FROM art WHERE id = ?');
    $stmt->execute([$_GET['id']]);
    $art = $stmt->fetch(PDO::FETCH_ASSOC);

    // Se a obra de arte não existir com o ID especificado
    if (!$art) {
        exit('Obra de arte não existe com esse ID!');
    }

    // Garante que o usuário confirme a exclusão
    if (isset($_GET['confirm'])) {
        if ($_GET['confirm'] == 'yes') {
            // Usuário clicou no botão "Sim", exclui o registro
            $stmt = $pdo->prepare('DELETE FROM art WHERE id = ?');
            $stmt->execute([$_GET['id']]);
            $msg = 'A obra de arte foi excluída!';
        } else {
            // Usuário clicou no botão "Não", redireciona de volta para a página de leitura (onde você lista as obras)
            header('Location: read.php'); // Assumindo que você tem uma página chamada 'read.php'
            exit;
        }
    }

} else {
    exit('Nenhum ID especificado!');
}

?>

<?=template_header('Excluir Obra de Arte')?>

<div class="content delete">
    <h2>Excluir Obra de Arte #<?=$art['id']?></h2>
    <?php if ($msg): ?>
    <p><?=$msg?></p>
    <?php else: ?>
    <p>Você tem certeza que deseja excluir a obra de arte "<?=$art['title']?>"?</p>
    <div class="yesno">
        <a href="delete.php?id=<?=$art['id']?>&confirm=yes">Sim</a>
        <a href="delete.php?id=<?=$art['id']?>&confirm=no">Não</a>
    </div>
    <?php endif; ?>
</div>

<?=template_footer()?>
