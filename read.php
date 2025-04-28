<?php
include 'functions.php';
// Conecta ao banco de dados MySQL
$pdo = pdo_connect_mysql();
// Obtém o número da página via requisição GET (parâmetro URL: page), se não existir, define a página para 1
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
// Número de registros a serem exibidos por página
$records_per_page = 5;

// Prepara a instrução SQL e obtém os registros da tabela 'art', LIMIT determinará a página
$stmt = $pdo->prepare('SELECT * FROM art ORDER BY id LIMIT :current_page, :record_per_page');
$stmt->bindValue(':current_page', ($page - 1) * $records_per_page, PDO::PARAM_INT);
$stmt->bindValue(':record_per_page', $records_per_page, PDO::PARAM_INT);
$stmt->execute();
// Busca os registros para que possamos exibi-los no nosso template.
$arts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Obtém o número total de obras de arte, para determinar se deve haver botões de próxima e anterior
$num_arts = $pdo->query('SELECT COUNT(*) FROM art')->fetchColumn();
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
        // Calcula o número total de páginas
        $total_pages = ceil($num_arts / $records_per_page);
        // Exibe os números das páginas
        for ($i = max(1, $page - 2); $i <= min($total_pages, $page + 2); $i++): ?>
            <a href="read.php?page=<?= $i ?>" class="<?= ($i == $page) ? 'current' : '' ?>"><?= $i ?></a>
        <?php endfor; ?>
        <?php if ($page * $records_per_page < $num_arts): ?>
            <a href="read.php?page=<?= $page + 1 ?>"><i class="fas fa-angle-double-right fa-sm"></i></a>
        <?php endif; ?>
    </div>
</div>

<?= template_footer() ?>
