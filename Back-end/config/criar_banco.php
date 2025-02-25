<?php
$config = require(__DIR__ . '/credentials.php');

$db_server = $config['host'];
$db_user = $config['user'];
$db_pass = $config['pass'];
$db_name = $config['dbname'];

try {
    $pdo = new PDO("mysql:host=$db_server", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $stmt = $pdo->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = :dbname");
    $stmt->bindParam(':dbname', $db_name, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        $pdo->exec("CREATE DATABASE `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        echo "Banco de dados '$db_name' criado com sucesso.\n";
    } else {
        echo "Banco de dados já existe.\n";
    }

    $pdo = new PDO("mysql:host=$db_server;dbname=$db_name", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    $sql = "
        CREATE TABLE IF NOT EXISTS contatos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50) NOT NULL,
            data_nascimento DATE NOT NULL,
            email VARCHAR(100) NOT NULL,
            profissao VARCHAR(30),
            telefone BIGINT NOT NULL,
            celular BIGINT NOT NULL,
            possui_whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
            notificacoes_email BOOLEAN NOT NULL DEFAULT FALSE,
            notificacoes_sms BOOLEAN NOT NULL DEFAULT FALSE
        );
    ";

    $pdo->exec($sql);
    echo "Tabela 'contatos' criada/verificada com sucesso.\n";

    $checkStmt = $pdo->query("SELECT COUNT(*) FROM contatos");
    $rowCount = $checkStmt->fetchColumn();

    if ($rowCount == 0) {
        $insertSql = "
            INSERT INTO contatos (nome, data_nascimento, email, profissao, telefone, celular, possui_whatsapp, notificacoes_email, notificacoes_sms) 
            VALUES 
            ('Letícia Pacheco', '2003-10-03', 'leticia@gmail.com', 'Desenvolvedora Web', '1140332019', '11984932039', 1, 1, 1),
            ('Rubens Luiz', '2007-03-17', 'rubencio@email.com', 'Dev', '1111111111', '11111111111', 1, 1, 0);
        ";
        $pdo->exec($insertSql);
        echo "Dados iniciais inseridos na tabela 'contatos'.\n";
    } else {
        echo "Dados já existem na tabela 'contatos', inserção ignorada.\n";
    }

} catch (PDOException $e) {
    die("Erro ao conectar/criar o banco: " . $e->getMessage());
}
?>
