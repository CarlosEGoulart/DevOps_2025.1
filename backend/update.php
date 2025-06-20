<?php
// Arquivo: update.php (Versão Corrigida com busca de artista)

require_once "config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use PUT."]);
    exit;
}

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Art ID is required"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["title"]) || empty($data["title"])) {
    http_response_code(400);
    echo json_encode(["error" => "Title is required"]);
    exit;
}

try {
    // Lógica adicionada para buscar o ID do artista pelo nome
    $artist_id = null;
    if (!empty($data['artist_name'])) {
        $artistStmt = $pdo->prepare("SELECT artist_id FROM artist WHERE name = :name LIMIT 1");
        $artistStmt->execute([':name' => $data['artist_name']]);
        $artist = $artistStmt->fetch();
        if ($artist) {
            $artist_id = $artist['artist_id'];
        }
    }

    $sql = "UPDATE art 
            SET title = :title, 
                description = :description, 
                year = :year, 
                url_image = :url_image, 
                artist_id = :artist_id 
            WHERE art_id = :art_id";
    
    $stmt = $pdo->prepare($sql);
    
    // MÉTODO CORRIGIDO: Passando um array para execute()
    $params = [
        ':title'       => $data["title"],
        ':description' => $data["description"] ?? null,
        ':year'        => $data["year"] ?? null,
        ':url_image'   => $data["url_image"] ?? null,
        ':artist_id'   => $artist_id, // Usando o ID que buscamos
        ':art_id'      => $id
    ];
    
    $stmt->execute($params);
    
    echo json_encode([
        "success" => true,
        "message" => "Art piece updated successfully"
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error updating art piece: " . $e->getMessage()]);
}
?>