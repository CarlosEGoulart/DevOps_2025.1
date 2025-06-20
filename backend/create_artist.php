<?php
// Arquivo: create_artist.php (Versão Final e Corrigida)

// Inclui a configuração do banco de dados
require_once "config.php";

// Define os cabeçalhos para a resposta JSON e CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Lida com a requisição preflight OPTIONS (para CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

// Verifica se o método da requisição é POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Method not allowed. Use POST."]);
    exit;
}

// Obtém os dados enviados no corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

// Valida campos obrigatórios
if (!isset($data["name"]) || empty($data["name"])) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Name is required"]);
    exit;
}

try {
    // 1. Prepara a instrução SQL com placeholders
    $sql = "INSERT INTO artist (name, bio, year, instagram) 
            VALUES (:name, :bio, :year, :instagram)";
    
    $stmt = $pdo->prepare($sql);
    
    // 2. Cria um array com os parâmetros para evitar erros com bindParam
    $params = [
        ':name'      => $data["name"],
        ':bio'       => $data["bio"] ?? null,
        ':year'      => $data["year"] ?? null,
        ':instagram' => $data["instagram"] ?? null
    ];
    
    // 3. Executa o comando passando o array de parâmetros diretamente
    $stmt->execute($params);
    
    // Pega o ID do artista recém-criado
    $newId = $pdo->lastInsertId();
    
    // Retorna uma resposta de sucesso em JSON
    echo json_encode([
        "success" => true,
        "message" => "Artist created successfully",
        "id" => $newId
    ]);
    
} catch(PDOException $e) {
    // Em caso de erro no banco de dados, retorna uma resposta de erro em JSON
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Error creating artist: " . $e->getMessage()]);
}
?>