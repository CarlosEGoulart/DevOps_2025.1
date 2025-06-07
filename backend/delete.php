<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

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
    echo json_encode(["error" => "Art ID is required"]);
    exit;
}

try {
    // Prepare the SQL statement
    $sql = "DELETE FROM art WHERE art_id = :art_id";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameter
    $stmt->bindParam(":art_id", $id);
    
    // Execute the statement
    $stmt->execute();
    
    // Check if any row was affected
    if ($stmt->rowCount() > 0) {
        // Return success response
        echo json_encode([
            "success" => true,
            "message" => "Art piece deleted successfully"
        ]);
    } else {
        // No rows affected, art piece not found
        http_response_code(404);
        echo json_encode(["error" => "Art piece not found"]);
    }
    
} catch(PDOException $e) {
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error deleting art piece: " . $e->getMessage()]);
}
?>
