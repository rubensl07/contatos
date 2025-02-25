SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS database_alphacode;
USE database_alphacode;

CREATE TABLE `contatos` (
  `id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `data_nascimento` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `profissao` varchar(30) NOT NULL,
  `telefone` bigint NOT NULL,
  `celular` bigint NOT NULL,
  `possui_whatsapp` tinyint(1) NOT NULL DEFAULT 0,
  `notificacoes_email` tinyint(1) NOT NULL DEFAULT 0,
  `notificacoes_sms` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 
INSERT INTO `contatos` (`nome`, `data_nascimento`, `email`, `profissao`, `telefone`, `celular`, `possui_whatsapp`, `notificacoes_email`, `notificacoes_sms`) VALUES
('Letícia Pacheco', '2003-10-03', 'leticia@gmail.com', 'Desenvolvedora Web', 1140332019, 11984932039, 1, 1, 1),
('Rubens Luiz Lobo de Almeida', '2007-03-16', 'rubencio@gmail.com', 'Dev', 1111111111, 11111111111, 1, 1, 0);