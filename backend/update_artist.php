<?php
// Arquivo: update_artist.php (Versão Corrigida)

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
    echo json_encode(["error" => "Artist ID is required"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || empty($data["name"])) {
    http_response_code(400);
    echo json_encode(["error" => "Name is required"]);
    exit;
}

try {
    $sql = "UPDATE artist 
            SET name = :name, 
                bio = :bio, 
                year = :year, 
                instagram = :instagram 
            WHERE artist_id = :artist_id";
    
    $stmt = $pdo->prepare($sql);
    
    // MÉTODO CORRIGIDO: Passando um array para execute()
    $params = [
        ':name'      => $data["name"],
        ':bio'       => $data["bio"] ?? null,
        ':year'      => $data["year"] ?? null,
        ':instagram' => $data["instagram"] ?? null,
        ':artist_id' => $id
    ];
    
    $stmt->execute($params);
    
    echo json_encode([
        "success" => true,
        "message" => "Artist updated successfully"
    ]);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error updating artist: " . $e->getMessage()]);
}
?>