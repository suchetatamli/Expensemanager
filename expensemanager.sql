-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2020 at 04:24 PM
-- Server version: 5.7.29-0ubuntu0.18.04.1
-- PHP Version: 7.2.26-1+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expensemanager`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `group_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `created_by`, `start_date`, `created_at`, `updated_at`) VALUES
(1, 'Demo', 1, '2020-01-21 18:30:00', '2020-01-14 05:50:18', '2020-01-14 05:50:18'),
(5, 'Test', 2, '2020-01-21 18:30:00', '2020-01-14 09:10:42', '2020-01-14 09:10:42'),
(6, 'Daily Expense', 1, '2020-01-30 18:30:00', '2020-01-30 09:05:40', '2020-01-30 09:05:40');

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `admin` int(11) DEFAULT '0',
  `deposit` double DEFAULT '0',
  `pay` double DEFAULT '0',
  `pay_share` double DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `group_id`, `user_id`, `admin`, `deposit`, `pay`, `pay_share`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, 0, 60, '2020-01-14 05:50:18', '2020-02-04 10:49:11'),
(12, 5, 2, 1, 0, 0, 150, '2020-01-14 09:10:42', '2020-02-04 09:47:44'),
(3, 1, 2, 0, 110, 0, 0, '2020-01-14 05:50:18', '2020-02-04 10:49:11'),
(15, 1, 3, 0, 200, 120, 60, '2020-01-14 10:27:41', '2020-02-04 10:49:11'),
(17, 5, 3, 0, 250, 200, 150, '2020-01-15 05:22:25', '2020-02-04 09:47:44'),
(18, 5, 4, 0, 110, 100, 0, '2020-01-15 05:22:33', '2020-02-04 07:53:11'),
(22, 6, 2, 0, 10, 0, 0, '2020-01-30 09:05:40', '2020-01-30 09:05:40'),
(21, 6, 4, 0, 0, 0, 0, '2020-01-30 09:05:40', '2020-01-30 09:05:40'),
(20, 6, 1, 1, 0, 0, 0, '2020-01-30 09:05:40', '2020-01-30 09:05:40'),
(16, 1, 4, 0, 12, 0, 0, '2020-01-14 11:18:21', '2020-01-30 05:36:06');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `payby` int(11) NOT NULL,
  `paydate` datetime DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `amount` double NOT NULL,
  `addedby` int(11) NOT NULL,
  `editby` int(11) DEFAULT NULL,
  `sharewith` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `group_id`, `payby`, `paydate`, `description`, `category`, `amount`, `addedby`, `editby`, `sharewith`, `created_at`, `updated_at`) VALUES
(14, 5, 4, '2020-01-17 06:36:33', 'Cold-drinks', 'Drink', 100, 2, 3, '2,3', '2020-01-30 06:01:47', '2020-01-30 06:01:47'),
(19, 5, 3, '2020-02-11 18:30:00', 'Rent', 'Hotel', 200, 4, 3, '2,3', '2020-02-04 09:47:44', '2020-02-04 09:47:44'),
(24, 1, 3, '2020-02-04 18:30:00', 'Dinner', 'Food', 120, 2, 3, '1,3', '2020-02-04 10:49:11', '2020-02-04 10:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20191126090230-create-user.js'),
('20191126092043-create-group.js'),
('20191216062849-create-group-member.js'),
('20200115121711-create-payment.js'),
('20200117060419-create-share-member.js');

-- --------------------------------------------------------

--
-- Table structure for table `share_members`
--

CREATE TABLE `share_members` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `share_members`
--

INSERT INTO `share_members` (`id`, `payment_id`, `user_id`, `created_at`, `updated_at`) VALUES
(53, 24, 3, '2020-02-04 10:49:11', '2020-02-04 10:49:11'),
(30, 14, 3, '2020-01-30 06:01:47', '2020-01-30 06:01:47'),
(29, 14, 2, '2020-01-30 06:01:47', '2020-01-30 06:01:47'),
(39, 19, 3, '2020-02-04 09:47:44', '2020-02-04 09:47:44'),
(38, 19, 2, '2020-02-04 09:47:44', '2020-02-04 09:47:44'),
(52, 24, 1, '2020-02-04 10:49:11', '2020-02-04 10:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(1, 'Sucheta Tamli', 'sucheta@mailinator.com', '25d55ad283aa400af464c76d713c07ad', '2019-11-29 06:42:24', '2019-11-29 06:42:24'),
(2, 'Kaushik Mondal', 'kaushik@mailinator.com', '25d55ad283aa400af464c76d713c07ad', '2019-11-29 07:31:44', '2019-11-29 07:31:44'),
(3, 'Papan Saha', 'papan@mailinator.com', '25d55ad283aa400af464c76d713c07ad', '2019-12-04 10:46:24', '2019-12-04 10:46:24'),
(4, 'Sanjay Karmakar', 'sanjay@yopmail.com', '25d55ad283aa400af464c76d713c07ad', '2019-12-19 05:09:29', '2019-12-19 05:09:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `payby` (`payby`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `share_members`
--
ALTER TABLE `share_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `share_members`
--
ALTER TABLE `share_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
