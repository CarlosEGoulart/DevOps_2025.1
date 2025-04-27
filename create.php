<?php
include 'functions.php';
$pdo = pdo_connect_mysql();
$msg = '';
// Check if POST data is not empty
if (!empty($_POST)) {
    // Post data not empty insert a new record
    // Set-up the variables that are going to be inserted, we must check if the POST variables exist if not we can default them to blank
    $id = isset($_POST['id']) && !empty($_POST['id']) && $_POST['id'] != 'auto' ? $_POST['id'] : NULL;
    // Check if POST variable "name" exists, if not default the value to blank, basically the same for all variables
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $year = isset($_POST['year']) ? $_POST['year'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';
    
    // Insert new record into the contacts table
    $stmt = $pdo->prepare('INSERT INTO art VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->execute([$id, $title, $description, $year, $url]);
    // Output message
    $msg = 'Obra adicionada com sucesso!';
}
?>

<?=template_header('Adicionar')?>

<div class="content update">
	<h2>Adicionar Obra</h2>
    <form action="create.php" method="post">
        <label for="id">ID</label>
        <label for="title">Titulo</label>
        <input type="text" name="id" placeholder="26" value="auto" id="id">
        <input type="text" name="titulo" placeholder="Gato Mafioso" id="title">
        <label for="description">Descricao</label>
        <label for="year">Year</label>
        <input type="text" name="description" placeholder="Uma obra de arte representando uma figura ilustrativa de um gato mafioso." id="description">
        <input type="text" name="year" placeholder="2024" id="year">
        <label for="url">Url</label>
        <input type="text" name="url" placeholder="aaaaaaaaaaa" id="url">
        <input type="submit" value="Create">
    </form>
    <?php if ($msg): ?>
    <p><?=$msg?></p>
    <?php endif; ?>
</div>

<?=template_footer()?>
