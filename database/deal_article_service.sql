-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2021 at 07:12 AM
-- Server version: 8.0.21
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `deal_article_service`
--

-- --------------------------------------------------------

--
-- =
-- --------------------------------------------------------

--
-- Table structure for table `story`
--

CREATE TABLE `article` (
  `id` int NOT NULL,
  `publisher_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `body` varchar(512) NOT NULL,
  `comment` varchar(512) NOT NULL,
  `image_url` varchar(512) NOT NULL,
  `lang_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------


-- --------------------------------------------------------



--
-- Indexes for dumped tables
--



--
-- Indexes for table `story`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);



--
-- AUTO_INCREMENT for dumped tables
--



--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE `article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;



--
-- Constraints for dumped tables
--



