<?php
// Arquivo: create_exhibition.php (Versão Corrigida)

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

if (!isset($data["name"]) || empty($data["name"])) {
    http_response_code(400);
    echo json_encode(["error" => "Exhibition name is required"]);
    exit;
}

try {
    $pdo->beginTransaction();
    
    $sql = "INSERT INTO exhibition (name, description) 
            VALUES (:name, :description)";
    
    $stmt = $pdo->prepare($sql);

    // MÉTODO CORRIGIDO: Passando um array para execute()
    $params = [
        ':name'        => $data["name"],
        ':description' => $data["description"] ?? null
    ];
    
    $stmt->execute($params);
    
    $exhibitionId = $pdo->lastInsertId();
    
    if (isset($data["artworks"]) && is_array($data["artworks"]) && count($data["artworks"]) > 0) {
        $artSql = "INSERT INTO exhibition_art (exhibition_id, art_id) VALUES (:exhibition_id, :art_id)";
        $artStmt = $pdo->prepare($artSql);
        
        foreach ($data["artworks"] as $artId) {
            $artStmt->execute([':exhibition_id' => $exhibitionId, ':art_id' => $artId]);
        }
    }
    
    $pdo->commit();
    
    echo json_encode([
        "success" => true,
        "message" => "Exhibition created successfully",
        "id" => $exhibitionId
    ]);
    
} catch(PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Error creating exhibition: " . $e->getMessage()]);
}
?>