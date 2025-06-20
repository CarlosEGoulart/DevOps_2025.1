<?php
// Arquivo: create.php (Versão Corrigida com busca de artista)

require_once "config.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use POST."]);
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

    $sql = "INSERT INTO art (title, description, year, url_image, artist_id) 
            VALUES (:title, :description, :year, :url_image, :artist_id)";
    
    $stmt = $pdo->prepare($sql);
    
    // MÉTODO CORRIGIDO: Passando um array para execute()
    $params = [
        ':title'       => $data["title"],
        ':description' => $data["description"] ?? null,
        ':year'        => $data["year"] ?? null,
        ':url_image'   => $data["url_image"] ?? null,
        ':artist_id'   => $artist_id // Usando o ID que buscamos
    ];
    
    $stmt->execute($params);
    
    $newId = $pdo->lastInsertId();
    
    echo json_encode([
        "success" => true,
        "message" => "Art piece created successfully",
        "id" => $newId
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error creating art piece: " . $e->getMessage()]);
}
?>