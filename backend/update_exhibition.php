<?php
// Arquivo: update_exhibition.php (Versão Corrigida)

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
    echo json_encode(["error" => "Exhibition ID is required"]);
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
    
    $sql = "UPDATE exhibition 
            SET name = :name, 
                description = :description 
            WHERE exhibition_id = :exhibition_id";
    
    $stmt = $pdo->prepare($sql);
    
    // MÉTODO CORRIGIDO: Passando um array para execute()
    $params = [
        ':name'          => $data["name"],
        ':description'   => $data["description"] ?? null,
        ':exhibition_id' => $id
    ];
    
    $stmt->execute($params);
    
    if (isset($data["artworks"]) && is_array($data["artworks"])) {
        $deleteArtSql = "DELETE FROM exhibition_art WHERE exhibition_id = :exhibition_id";
        $deleteArtStmt = $pdo->prepare($deleteArtSql);
        $deleteArtStmt->execute([':exhibition_id' => $id]);
        
        if (count($data["artworks"]) > 0) {
            $artSql = "INSERT INTO exhibition_art (exhibition_id, art_id) VALUES (:exhibition_id, :art_id)";
            $artStmt = $pdo->prepare($artSql);
            
            foreach ($data["artworks"] as $artId) {
                $artStmt->execute([':exhibition_id' => $id, ':art_id' => $artId]);
            }
        }
    }
    
    $pdo->commit();
    
    echo json_encode([
        "success" => true,
        "message" => "Exhibition updated successfully"
    ]);
    
} catch(PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Error updating exhibition: " . $e->getMessage()]);
}
?>