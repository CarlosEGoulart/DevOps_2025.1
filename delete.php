<?php

include 'functions.php';
$pdo = pdo_connect_mysql();
$msg = '';

if (isset($_GET['id'])) {
    try {
        $stmt = $pdo->prepare('SELECT * FROM art WHERE id = ?');
        $stmt->execute([$_GET['id']]);
        $art = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$art) {
            exit('Obra de arte não existe com esse ID!');
        }

        if (isset($_GET['confirm'])) {
            if ($_GET['confirm'] == 'yes') {
                $stmt = $pdo->prepare('DELETE FROM art WHERE id = ?');
                $stmt->execute([$_GET['id']]);
                $msg = 'A obra de arte foi excluída!';
                gravarLog("Obra excluída: ID=" . $_GET['id'] . ", Title='" . $art['title'] . "'");
            } else {
                header('Location: read.php');
                exit;
            }
        }
    } catch (PDOException $e) {
        gravarLog("Erro ao excluir obra: " . $e->getMessage());
        $msg = 'Erro ao excluir obra. Por favor, tente novamente.';
    }

} else {
    exit('Nenhum ID especificado!');
}

?>

<?= template_header('Excluir Obra de Arte') ?>

<div class="content delete">
    <h2>Excluir Obra de Arte #<?= $art['id'] ?></h2>
    <?php if ($msg): ?>
        <p><?= $msg ?></p>
    <?php else: ?>
        <p>Você tem certeza que deseja excluir a obra de arte "<?= $art['title'] ?>"?</p>
        <div class="yesno">
            <a href="delete.php?id=<?= $art['id'] ?>&confirm=yes">Sim</a>
            <a href="delete.php?id=<?= $art['id'] ?>&confirm=no">Não</a>
        </div>
    <?php endif; ?>
</div>

<?= template_footer() ?>
