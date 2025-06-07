<?php
// Include database configuration
require_once "config.php";

// Set header to return JSON
header('Content-Type: application/json');

// Check if the request method is PUT
if ($_SERVER["REQUEST_METHOD"] !== "PUT") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed. Use PUT."]);
    exit;
}

// Get the ID from the URL
$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Exhibition ID is required"]);
    exit;
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!isset($data["name"]) || empty($data["name"])) {
    http_response_code(400);
    echo json_encode(["error" => "Exhibition name is required"]);
    exit;
}

try {
    // Start transaction
    $pdo->beginTransaction();
    
    // Prepare the SQL statement for exhibition update
    $sql = "UPDATE exhibition 
            SET name = :name, 
                description = :description 
            WHERE exhibition_id = :exhibition_id";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->bindParam(":name", $data["name"]);
    $stmt->bindParam(":description", $data["description"] ?? null);
    $stmt->bindParam(":exhibition_id", $id);
    
    // Execute the statement
    $stmt->execute();
    
    // Check if exhibition exists
    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        http_response_code(404);
        echo json_encode(["error" => "Exhibition not found"]);
        exit;
    }
    
    // If artworks are provided, update the exhibition-art relationships
    if (isset($data["artworks"]) && is_array($data["artworks"])) {
        // First, remove all existing relationships
        $deleteArtSql = "DELETE FROM exhibition_art WHERE exhibition_id = :exhibition_id";
        $deleteArtStmt = $pdo->prepare($deleteArtSql);
        $deleteArtStmt->bindParam(":exhibition_id", $id);
        $deleteArtStmt->execute();
        
        // Then, add the new relationships
        if (count($data["artworks"]) > 0) {
            $artSql = "INSERT INTO exhibition_art (exhibition_id, art_id) VALUES (:exhibition_id, :art_id)";
            $artStmt = $pdo->prepare($artSql);
            
            foreach ($data["artworks"] as $artId) {
                $artStmt->bindParam(":exhibition_id", $id);
                $artStmt->bindParam(":art_id", $artId);
                $artStmt->execute();
            }
        }
    }
    
    // Commit transaction
    $pdo->commit();
    
    // Return success response
    echo json_encode([
        "success" => true,
        "message" => "Exhibition updated successfully"
    ]);
    
} catch(PDOException $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    
    // Return error message
    http_response_code(500);
    echo json_encode(["error" => "Error updating exhibition: " . $e->getMessage()]);
}
?>
