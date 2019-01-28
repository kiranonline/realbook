-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 23, 2019 at 10:44 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fleapoco_kiran_test2`
--

-- --------------------------------------------------------

--
-- Table structure for table `component`
--

CREATE TABLE `component` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `component`
--

INSERT INTO `component` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Accommodation', '2019-01-18 16:24:10', '2019-01-18 16:24:10'),
(2, 'Meals', '2019-01-18 16:24:28', '2019-01-18 16:24:28'),
(3, 'Transportation', '2019-01-18 16:24:49', '2019-01-18 16:24:49');

-- --------------------------------------------------------

--
-- Table structure for table `itemmaster`
--

CREATE TABLE `itemmaster` (
  `id` int(11) NOT NULL,
  `rlb_item_id` int(11) DEFAULT NULL,
  `item_code` varchar(255) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_group` varchar(255) NOT NULL,
  `unit_master` varchar(255) NOT NULL,
  `unit_name` varchar(255) DEFAULT NULL,
  `hsn_code` varchar(255) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemmaster`
--

INSERT INTO `itemmaster` (`id`, `rlb_item_id`, `item_code`, `item_name`, `item_group`, `unit_master`, `unit_name`, `hsn_code`, `status`, `cid`, `segid`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'jhfjs', 'kiran', 'api1', 'api2', NULL, 'sdkjfskd', NULL, NULL, NULL, '2019-01-19 04:04:13', '2019-01-19 04:14:42'),
(3, NULL, 'dangue', 'chicken', 'api1', 'api2', NULL, 'birdflue', NULL, NULL, NULL, '2019-01-19 04:15:28', '2019-01-19 04:15:53');

-- --------------------------------------------------------

--
-- Table structure for table `ledgermaster`
--

CREATE TABLE `ledgermaster` (
  `id` int(11) NOT NULL,
  `ledger_nature` varchar(255) NOT NULL,
  `rlb_ledger_id` varchar(255) DEFAULT NULL,
  `portal_id` varchar(255) DEFAULT NULL,
  `ledger_name` varchar(255) NOT NULL,
  `ledger_code` varchar(255) NOT NULL,
  `ledger_group` varchar(255) NOT NULL,
  `ledger_gstin` varchar(255) DEFAULT NULL,
  `sac_code` varchar(255) DEFAULT NULL,
  `tax_group` varchar(255) DEFAULT NULL,
  `tax_name` varchar(255) DEFAULT NULL,
  `rate` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `isTasxDone` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ledgermaster`
--

INSERT INTO `ledgermaster` (`id`, `ledger_nature`, `rlb_ledger_id`, `portal_id`, `ledger_name`, `ledger_code`, `ledger_group`, `ledger_gstin`, `sac_code`, `tax_group`, `tax_name`, `rate`, `status`, `cid`, `segid`, `isTasxDone`, `createdAt`, `updatedAt`) VALUES
(1, 'income', NULL, NULL, 'income1', '1', 'api1', NULL, '90', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2019-01-23 11:15:32', '2019-01-23 11:19:35'),
(2, 'tax', NULL, NULL, 'tax1', '2', 'api1', NULL, '898', 'Intra-UnionTeritory-RCM Input', 'UGST-RCM-Input', '99', NULL, NULL, NULL, 0, '2019-01-23 11:18:46', '2019-01-23 11:18:46'),
(3, 'tax', NULL, NULL, 'tax2', '3', 'api1', NULL, '98', 'Intra-UnionTeritory-RCM Input', 'UGST-RCM-Output', '78', NULL, NULL, NULL, 0, '2019-01-23 11:19:16', '2019-01-23 11:19:16'),
(4, 'income', NULL, NULL, 'income2', '787', 'api1', NULL, '98', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2019-01-23 13:19:20', '2019-01-23 13:19:20'),
(5, 'tax', NULL, NULL, 'taxn', '989', 'api1', NULL, '787', 'Inter-State Advance', 'CGST-ADV', '787', NULL, NULL, NULL, 0, '2019-01-23 14:00:14', '2019-01-23 14:00:14'),
(6, 'tax', NULL, NULL, 'tax29', '898', 'api1', NULL, '989', 'Inter-State Advance', 'SGST-ADV', '8787', NULL, NULL, NULL, 0, '2019-01-23 14:00:49', '2019-01-23 14:00:49'),
(7, 'tax', NULL, NULL, 'taxxx', '778', 'api1', NULL, '9800', 'Inter-State Advance', 'UGST-ADV', '677', NULL, NULL, NULL, 0, '2019-01-23 14:01:20', '2019-01-23 14:01:20'),
(8, 'tax', NULL, NULL, 'jjhj', '8989', 'api1', NULL, '898', 'Inter-State Advance', 'CGST-ADV', '900', NULL, NULL, NULL, 0, '2019-01-23 14:01:51', '2019-01-23 14:01:51');

-- --------------------------------------------------------

--
-- Table structure for table `ledgertaxlink`
--

CREATE TABLE `ledgertaxlink` (
  `id` int(11) NOT NULL,
  `ledger_id` int(11) NOT NULL,
  `ledger_id_linked_with` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ledgertaxlink`
--

INSERT INTO `ledgertaxlink` (`id`, `ledger_id`, `ledger_id_linked_with`, `createdAt`, `updatedAt`) VALUES
(7, 1, 2, '2019-01-23 09:31:42', '2019-01-23 09:31:42'),
(8, 1, 3, '2019-01-23 09:31:42', '2019-01-23 09:31:42'),
(9, 1, 5, '2019-01-23 09:31:42', '2019-01-23 09:31:42'),
(10, 1, 6, '2019-01-23 09:31:42', '2019-01-23 09:31:42'),
(11, 1, 7, '2019-01-23 09:31:42', '2019-01-23 09:31:42');

-- --------------------------------------------------------

--
-- Table structure for table `sellingcompany`
--

CREATE TABLE `sellingcompany` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sellingcompany`
--

INSERT INTO `sellingcompany` (`id`, `name`, `currency`, `createdAt`, `updatedAt`) VALUES
(1, 'Default', 'INR', '2019-01-18 16:25:02', '2019-01-18 16:25:02'),
(2, 'Dubbai', '$', '2019-01-18 16:25:09', '2019-01-18 16:25:09');

-- --------------------------------------------------------

--
-- Table structure for table `sharingmaster`
--

CREATE TABLE `sharingmaster` (
  `id` int(11) NOT NULL,
  `selling_id` int(11) NOT NULL,
  `selling_name` varchar(255) NOT NULL,
  `supplying_id` int(11) NOT NULL,
  `supplying_name` varchar(255) NOT NULL,
  `component_id` int(11) NOT NULL,
  `component_name` varchar(255) NOT NULL,
  `fromdate` varchar(255) NOT NULL,
  `todate` varchar(255) NOT NULL,
  `minshare` varchar(255) NOT NULL,
  `rule` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sharingmaster`
--

INSERT INTO `sharingmaster` (`id`, `selling_id`, `selling_name`, `supplying_id`, `supplying_name`, `component_id`, `component_name`, `fromdate`, `todate`, `minshare`, `rule`, `value`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Default', 1, 'RBClient International FZE', 2, 'Meals', '01/31/2019', '01/31/2019', '56', 'sharingpercentage', '100', '2019-01-18 17:30:44', '2019-01-18 17:56:47');

-- --------------------------------------------------------

--
-- Table structure for table `supplyingcompany`
--

CREATE TABLE `supplyingcompany` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `selling_id` varchar(255) NOT NULL,
  `selling_name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplyingcompany`
--

INSERT INTO `supplyingcompany` (`id`, `name`, `currency`, `selling_id`, `selling_name`, `createdAt`, `updatedAt`) VALUES
(1, 'RBClient International FZE', 'INR', '1', 'Default', '2019-01-18 16:34:45', '2019-01-18 16:34:45'),
(2, 'RBClient UK', 'INR', '2', 'Dubbai', '2019-01-18 16:35:05', '2019-01-18 16:35:05');

-- --------------------------------------------------------

--
-- Table structure for table `taxmaster`
--

CREATE TABLE `taxmaster` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `nature` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `state` varchar(20) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `dt_create` datetime DEFAULT NULL,
  `dt_update` datetime DEFAULT NULL,
  `uid_create` int(11) DEFAULT NULL,
  `uid_update` int(11) DEFAULT NULL,
  `isSystem` int(11) DEFAULT '1',
  `applied_on` int(11) DEFAULT '0',
  `tax_system` varchar(20) DEFAULT '1',
  `pid` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taxmaster`
--

INSERT INTO `taxmaster` (`id`, `name`, `nature`, `category`, `country`, `state`, `cid`, `segid`, `status`, `dt_create`, `dt_update`, `uid_create`, `uid_update`, `isSystem`, `applied_on`, `tax_system`, `pid`) VALUES
(1, 'CGST-ADV', 'CGST_ADV_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11737),
(2, 'CGST-Input', 'CGST_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11728),
(3, 'CGST-Output', 'CGST_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11731),
(4, 'CGST-RCM-Input', 'CGST_RCM_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11734),
(5, 'CGST-RCM-Output', 'CGST_RCM_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11734),
(6, 'IGST-ADV', 'IGST_ADV_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11738),
(7, 'IGST-Input', 'IGST_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11729),
(8, 'IGST-Output', 'IGST_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11730),
(9, 'IGST-RCM-Input', 'IGST_RCM_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '1', 11735),
(10, 'IGST-RCM-Output', 'IGST_RCM_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11735),
(11, 'SGST-ADV', 'SGST_ADV_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11737),
(12, 'SGST-Input', 'SGST_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11728),
(13, 'SGST-Output', 'SGST_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11731),
(14, 'SGST-RCM-Input', 'SGST_RCM_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11734),
(15, 'SGST-RCM-Output', 'SGST_RCM_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11734),
(16, 'UGST-ADV', 'UGST_ADV_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11737),
(17, 'UGST-Input', 'UGST_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11732),
(18, 'UGST-Output', 'UGST_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11733),
(19, 'UGST-RCM-Input', 'UGST_RCM_I', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11736),
(20, 'UGST-RCM-Output', 'UGST_RCM_O', 'GST', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 11736),
(22, 'Inter-State Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(23, 'Inter-State Output', 'GST_O', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(24, 'Inter-State-RCM Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(25, 'Intra-State Advance', 'GST_ADV_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(26, 'Intra-State Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(27, 'Intra-State Output', 'GST_O', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(28, 'Intra-State-RCM Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(29, 'Intra-UnionTeritory Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(30, 'Intra-UnionTeritory Output', 'GST_O', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(11736, 'Intra-UnionTeritory-RCM Input', 'GST_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0),
(11737, 'Inter-State Advance', 'GST_ADV_I', 'tax_link', 'India', 'ALL', 1089, 1089, 1, NULL, NULL, 0, 0, 1, 0, '2', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `component`
--
ALTER TABLE `component`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemmaster`
--
ALTER TABLE `itemmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledgermaster`
--
ALTER TABLE `ledgermaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ledgertaxlink`
--
ALTER TABLE `ledgertaxlink`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sellingcompany`
--
ALTER TABLE `sellingcompany`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sharingmaster`
--
ALTER TABLE `sharingmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplyingcompany`
--
ALTER TABLE `supplyingcompany`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxmaster`
--
ALTER TABLE `taxmaster`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `component`
--
ALTER TABLE `component`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `itemmaster`
--
ALTER TABLE `itemmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ledgermaster`
--
ALTER TABLE `ledgermaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ledgertaxlink`
--
ALTER TABLE `ledgertaxlink`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sellingcompany`
--
ALTER TABLE `sellingcompany`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sharingmaster`
--
ALTER TABLE `sharingmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `supplyingcompany`
--
ALTER TABLE `supplyingcompany`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `taxmaster`
--
ALTER TABLE `taxmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11738;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
