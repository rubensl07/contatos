-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 11:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_alphacode`
--

-- --------------------------------------------------------

--
-- Table structure for table `contatos`
--


CREATE DATABASE IF NOT EXISTS database_alphacode;
USE database_alphacode;

CREATE TABLE `contatos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `data_nascimento` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `profissao` varchar(30) NOT NULL,
  `telefone` bigint(12) NOT NULL,
  `celular` bigint(11) NOT NULL,
  `possui_whatsapp` tinyint(1) NOT NULL DEFAULT 0,
  `notificacoes_email` tinyint(1) NOT NULL DEFAULT 0,
  `notificacoes_sms` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contatos`
--

INSERT INTO `contatos` (`id`, `nome`, `data_nascimento`, `email`, `profissao`, `telefone`, `celular`, `possui_whatsapp`, `notificacoes_email`, `notificacoes_sms`) VALUES
(36, 'Letícia Pacheco', '2003-10-03', 'leticia@gmail.com', 'Desenvolvedora Web', 1140332019, 11984932039, 1, 1, 1),
(37, 'Rubens Luiz Lobo de Almeida', '2007-03-16', 'rubencio@gmail.com', 'Dev', 1111111111, 11111111111, 1, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contatos`
--
ALTER TABLE `contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
