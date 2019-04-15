-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-03-02 15:17:54
-- 服务器版本： 10.1.31-MariaDB
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `msj`
--

-- --------------------------------------------------------

--
-- 表的结构 `ms_togup`
--

CREATE TABLE `ms_togup` (
  `toid` int(11) NOT NULL,
  `togup` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `ms_togup`
--

INSERT INTO `ms_togup` (`toid`, `togup`) VALUES
(1, '家常菜谱'),
(2, '中华菜系'),
(3, '各地小吃'),
(4, '国外菜谱'),
(5, '烘焙  ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ms_togup`
--
ALTER TABLE `ms_togup`
  ADD PRIMARY KEY (`toid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `ms_togup`
--
ALTER TABLE `ms_togup`
  MODIFY `toid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
