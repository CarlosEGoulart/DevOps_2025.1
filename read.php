<?php
include 'functions.php';
$pdo = pdo_connect_mysql();
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
$records_per_page = 5;

try {
    $stmt = $pdo->prepare('SELECT * FROM art ORDER BY id LIMIT :current_page, :record_per_page');
    $stmt->bindValue(':current_page', ($page - 1) * $records_per_page, PDO::PARAM_INT);
    $stmt->bindValue(':record_per_page', $records_per_page, PDO::PARAM_INT);
    $stmt->execute();
    $arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $num_arts = $pdo->query('SELECT COUNT(*) FROM art')->fetchColumn();

    gravarLog("Página de listagem de artes acessada. Página: " . $page);

} catch (PDOException $e) {
    gravarLog("Erro ao ler artes: " . $e->getMessage());
    echo "Ocorreu um erro ao carregar a lista de artes.";
    $arts = []; // Garante que $arts seja um array vazio para evitar erros no template
    $num_arts = 0;
}
?>

<?= template_header('Lista de Artes') ?>

<div class="content read">
    <h2>Lista de artes</h2>
    <a href="create.php" class="create-art">Adicionar obra de arte</a>
    <table>
        <thead>
            <tr>
                <td>#</td>
                <td>Título da obra</td>
                <td>Descrição da obra</td>
                <td>Ano de criação</td>
                <td>URL</td>
                <td class="actions"></td>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($arts as $art): ?>
                <tr>
                    <td><?= $art['id'] ?></td>
                    <td><?= $art['title'] ?></td>
                    <td><?= $art['description'] ?></td>
                    <td><?= $art['year'] ?></td>
                    <td><?= $art['url'] ?></td>
                    <td class="actions">
                        <a href="update.php?id=<?= $art['id'] ?>" class="edit"><i class="fas fa-pen fa-xs"></i></a>
                        <a href="delete.php?id=<?= $art['id'] ?>" class="trash"><i class="fas fa-trash fa-xs"></i></a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <div class="pagination">
        <?php if ($page > 1): ?>
            <a href="read.php?page=<?= $page - 1 ?>"><i class="fas fa-angle-double-left fa-sm"></i></a>
        <?php endif; ?>
        <?php
        $total_pages = ceil($num_arts / $records_per_page);
        for ($i = max(1, $page - 2); $i <= min($total_pages, $page + 2); $i++): ?>
            <a href="read.php?page=<?= $i ?>" class="<?= ($i == $page) ? 'current' : '' ?>"><?= $i ?></a>
        <?php endfor; ?>
        <?php if ($page * $records_per_page < $num_arts): ?>
            <a href="read.php?page=<?= $page + 1 ?>"><i class="fas fa-angle-double-right fa-sm"></i></a>
        <?php endif; ?>
    </div>
</div>

<?= template_footer() ?>
