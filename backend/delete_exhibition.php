<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Check if the request method is DELETE
if ($_SERVER["REQUEST_METHOD"] !== "DELETE") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use DELETE."]);
    exit;
}

// Get the ID from the URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Exhibition ID is required"]);
    exit;
}

try {
    // Start transaction
    $pdo->beginTransaction();
    
    // First, delete all exhibition-art relationships
    $deleteRelSql = "DELETE FROM exhibition_art WHERE exhibition_id = :exhibition_id";
    $deleteRelStmt = $pdo->prepare($deleteRelSql);
    $deleteRelStmt->bindParam(":exhibition_id", $id);
    $deleteRelStmt->execute();
    
    // Then, delete the exhibition
    $sql = "DELETE FROM exhibition WHERE exhibition_id = :exhibition_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":exhibition_id", $id);
    $stmt->execute();
    
    // Check if any row was affected
    if ($stmt->rowCount() > 0) {
        // Commit transaction
        $pdo->commit();
        
        // Return success response
        echo json_encode([
            "success" => true,
            "message" => "Exhibition deleted successfully"
        ]);
    } else {
        // No rows affected, exhibition not found
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["error" => "Exhibition not found"]);
    }
    
} catch(PDOException $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error deleting exhibition: " . $e->getMessage()]);
}
?>
