-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 13, 2019 at 11:06 AM
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
-- Database: `realbooks`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookingmaster`
--

CREATE TABLE `bookingmaster` (
  `id` int(11) NOT NULL,
  `SBU` varchar(255) DEFAULT NULL,
  `CHECK_IN_DATE` date NOT NULL,
  `CHECK_OUT_DATE` date NOT NULL,
  `EXCHANGE_RATE` varchar(255) NOT NULL,
  `RA_FILE_HANDLER` varchar(255) NOT NULL,
  `PER_SERVICE_WISE_SUPPLIER_NAME` varchar(255) DEFAULT NULL,
  `RA_AGENT_CODE` varchar(255) DEFAULT NULL,
  `INVOICE_NUMBER` varchar(255) DEFAULT NULL,
  `INVOICE_CURRENCY` varchar(255) DEFAULT NULL,
  `INVOICE_DATE` datetime NOT NULL,
  `LEAD_PASSENGER` varchar(255) NOT NULL,
  `NO_OF_NIGHTS` varchar(255) NOT NULL,
  `NO_OF_ROOMS` varchar(255) NOT NULL,
  `BOOKING_NOTES` varchar(255) NOT NULL,
  `PAYMENT_DEADLINE` datetime NOT NULL,
  `PAYMENT_SLABS` varchar(255) NOT NULL,
  `PRODUCT_NAME` varchar(255) NOT NULL,
  `RA_REFERENCE` varchar(255) NOT NULL,
  `ROOM_CATEGORY` varchar(255) NOT NULL,
  `SERVICE_CATEGORY` varchar(255) NOT NULL,
  `SERVICE_CITY` varchar(255) NOT NULL,
  `SERVICE_COUNTRY` varchar(255) NOT NULL,
  `STAND_ALONE` varchar(255) NOT NULL,
  `TAX_CALCULATION` varchar(255) NOT NULL,
  `TOTAL_TAX_CALCULATION` varchar(255) NOT NULL,
  `TOTAL_IN_AMOUNTS` varchar(255) NOT NULL,
  `FOREIGN_CURRENCY` varchar(255) NOT NULL,
  `SUPPLIER_PAYMENT_DEADLINE` varchar(255) NOT NULL,
  `COMPONENTS_WISE_NET_COST` varchar(255) NOT NULL,
  `COMPONENTS_WISE_MARKUP` varchar(255) NOT NULL,
  `COMPONENTS_WISE_SELLING_COST` varchar(255) NOT NULL,
  `COMPONENTS_WISE_DISCOUNT_COMISSION` varchar(255) NOT NULL,
  `OVER_ALL_DISCOUNT` varchar(255) NOT NULL,
  `OVER_ALL_PROFIT` double NOT NULL,
  `OVER_ALL_LOSS` varchar(255) NOT NULL,
  `COMPONENTS_WISE_CURRENCY` varchar(255) NOT NULL,
  `FETCHED_ON` datetime NOT NULL,
  `OPERATED_ON` datetime DEFAULT NULL,
  `SENT_TO_REALBOOK` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookingmaster`
--

INSERT INTO `bookingmaster` (`id`, `SBU`, `CHECK_IN_DATE`, `CHECK_OUT_DATE`, `EXCHANGE_RATE`, `RA_FILE_HANDLER`, `PER_SERVICE_WISE_SUPPLIER_NAME`, `RA_AGENT_CODE`, `INVOICE_NUMBER`, `INVOICE_CURRENCY`, `INVOICE_DATE`, `LEAD_PASSENGER`, `NO_OF_NIGHTS`, `NO_OF_ROOMS`, `BOOKING_NOTES`, `PAYMENT_DEADLINE`, `PAYMENT_SLABS`, `PRODUCT_NAME`, `RA_REFERENCE`, `ROOM_CATEGORY`, `SERVICE_CATEGORY`, `SERVICE_CITY`, `SERVICE_COUNTRY`, `STAND_ALONE`, `TAX_CALCULATION`, `TOTAL_TAX_CALCULATION`, `TOTAL_IN_AMOUNTS`, `FOREIGN_CURRENCY`, `SUPPLIER_PAYMENT_DEADLINE`, `COMPONENTS_WISE_NET_COST`, `COMPONENTS_WISE_MARKUP`, `COMPONENTS_WISE_SELLING_COST`, `COMPONENTS_WISE_DISCOUNT_COMISSION`, `OVER_ALL_DISCOUNT`, `OVER_ALL_PROFIT`, `OVER_ALL_LOSS`, `COMPONENTS_WISE_CURRENCY`, `FETCHED_ON`, `OPERATED_ON`, `SENT_TO_REALBOOK`) VALUES
(1, 'NA', '2019-02-02', '2019-02-05', '0.0323099', 'RED1152395', 'Patong Cliff View Co.,Ltd. (Centara Blue Marine Resort And Spa Phuket)', 'CD4091', NULL, 'USD', '2019-01-31 01:42:53', 'Mr DARPAN PATEL', '3', '1', '', '2018-01-27 18:30:00', 'NA', 'CENTARA BLUE MARINE RESORT AND SPA PHUKET [ DEAL AVAILABLE ] ', 'RED1152395', 'Double-Room-Premium-Deluxe-Ocean-Facing-Promo-1-Bed--Breakfast149-Booking-Code---CMP-000479--Book-by-28th-Feb-2019-', 'hotel', 'Phuket', 'Thailand', 'YES', 'NA', 'NA', '362.91', 'THB', 'NA', '10800.00', '4', '362.91', 'NA', 'NA', 13.9578768, '', 'THB', '2019-02-12 11:15:40', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `company_master`
--

CREATE TABLE `company_master` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company_master`
--

INSERT INTO `company_master` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Fleapo', '2019-01-09 00:00:00', '2019-01-11 00:00:00'),
(2, 'TCS', '2019-01-09 00:00:00', '2019-01-17 00:00:00');

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
(3, 'Transportation', '2019-01-18 16:24:49', '2019-01-18 16:24:49'),
(4, 'Tickets', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `component_to_service`
--

CREATE TABLE `component_to_service` (
  `id` int(11) NOT NULL,
  `component_id` int(11) NOT NULL,
  `service_category` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `name`, `symbol`, `createdAt`, `updatedAt`) VALUES
(1, 'INR', 'INR', '2019-01-09 00:00:00', '2019-01-09 00:00:00'),
(2, 'DOLLER', '$', '2019-01-09 00:00:00', '2019-01-10 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `fetcheddata`
--

CREATE TABLE `fetcheddata` (
  `id` int(11) NOT NULL,
  `SBU` varchar(255) DEFAULT NULL,
  `CHECK_IN_DATE` date NOT NULL,
  `CHECK_OUT_DATE` date NOT NULL,
  `EXCHANGE_RATE` varchar(255) NOT NULL,
  `RA_FILE_HANDLER` varchar(255) NOT NULL,
  `INVOICE_NUMBER` varchar(255) DEFAULT NULL,
  `INVOICE_CURRENCY` varchar(255) DEFAULT NULL,
  `INVOICE_DATE` datetime NOT NULL,
  `LEAD_PASSENGER` varchar(255) NOT NULL,
  `NO_OF_NIGHTS` varchar(255) NOT NULL,
  `NO_OF_ROOMS` varchar(255) NOT NULL,
  `BOOKING_NOTES` varchar(255) NOT NULL,
  `PER_SERVICE_WISE_SUPPLIER` varchar(255) NOT NULL,
  `PAYMENT_DEADLINE` datetime NOT NULL,
  `PAYMENT_SLABS` varchar(255) NOT NULL,
  `PRODUCT_NAME` varchar(255) NOT NULL,
  `RA_REFERENCE` varchar(255) NOT NULL,
  `ROOM_CATEGORY` varchar(255) NOT NULL,
  `SERVICE_CATEGORY` varchar(255) NOT NULL,
  `SERVICE_CITY` varchar(255) NOT NULL,
  `SERVICE_COUNTRY` varchar(255) NOT NULL,
  `STAND_ALONE` varchar(255) NOT NULL,
  `TAX_CALCULATION` varchar(255) NOT NULL,
  `TOTAL_TAX_CALCULATION` varchar(255) NOT NULL,
  `TOTAL_IN_AMOUNTS` varchar(255) NOT NULL,
  `FOREIGN_CURRENCY` varchar(255) NOT NULL,
  `SUPPLIER_PAYMENT_DEADLINE` varchar(255) NOT NULL,
  `COMPONENTS_WISE_NET_COST` varchar(255) NOT NULL,
  `COMPONENTS_WISE_MARKUP` varchar(255) NOT NULL,
  `COMPONENTS_WISE_SELLING_COST` varchar(255) NOT NULL,
  `COMPONENTS_WISE_DISCOUNT_COMISSION` varchar(255) NOT NULL,
  `OVER_ALL_DISCOUNT` varchar(255) NOT NULL,
  `OVER_ALL_PROFIT` double NOT NULL,
  `OVER_ALL_LOSS` varchar(255) NOT NULL,
  `COMPONENTS_WISE_CURRENCY` varchar(255) NOT NULL,
  `FETCHED_ON` datetime NOT NULL,
  `OPERATED_ON` datetime DEFAULT NULL,
  `SENT_TO_REALBOOK` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fetcheddata`
--

INSERT INTO `fetcheddata` (`id`, `SBU`, `CHECK_IN_DATE`, `CHECK_OUT_DATE`, `EXCHANGE_RATE`, `RA_FILE_HANDLER`, `INVOICE_NUMBER`, `INVOICE_CURRENCY`, `INVOICE_DATE`, `LEAD_PASSENGER`, `NO_OF_NIGHTS`, `NO_OF_ROOMS`, `BOOKING_NOTES`, `PER_SERVICE_WISE_SUPPLIER`, `PAYMENT_DEADLINE`, `PAYMENT_SLABS`, `PRODUCT_NAME`, `RA_REFERENCE`, `ROOM_CATEGORY`, `SERVICE_CATEGORY`, `SERVICE_CITY`, `SERVICE_COUNTRY`, `STAND_ALONE`, `TAX_CALCULATION`, `TOTAL_TAX_CALCULATION`, `TOTAL_IN_AMOUNTS`, `FOREIGN_CURRENCY`, `SUPPLIER_PAYMENT_DEADLINE`, `COMPONENTS_WISE_NET_COST`, `COMPONENTS_WISE_MARKUP`, `COMPONENTS_WISE_SELLING_COST`, `COMPONENTS_WISE_DISCOUNT_COMISSION`, `OVER_ALL_DISCOUNT`, `OVER_ALL_PROFIT`, `OVER_ALL_LOSS`, `COMPONENTS_WISE_CURRENCY`, `FETCHED_ON`, `OPERATED_ON`, `SENT_TO_REALBOOK`) VALUES
(2, 'NA', '2019-02-02', '2019-02-05', '0.0323099', 'RED1152395', NULL, 'USD', '2019-01-31 01:42:53', 'Mr DARPAN PATEL', '3', '1', '', 'S000000909', '2018-01-27 18:30:00', 'NA', 'CENTARA BLUE MARINE RESORT AND SPA PHUKET [ DEAL AVAILABLE ] ', 'RED1152395', 'Double-Room-Premium-Deluxe-Ocean-Facing-Promo-1-Bed--Breakfast149-Booking-Code---CMP-000479--Book-by-28th-Feb-2019-', 'hotel', 'Phuket', 'Thailand', 'YES', 'NA', 'NA', '362.91', 'THB', 'NA', '10800.00', '4', '362.91', 'NA', 'NA', 13.9578768, '', 'THB', '2019-02-08 05:02:15', NULL, NULL);

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
  `isTasxDone` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `itemtaxlink`
--

CREATE TABLE `itemtaxlink` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `ledger_id_linked_with` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `tax_group` int(11) DEFAULT NULL,
  `tax_name` int(11) DEFAULT NULL,
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
(1, 'tax', NULL, NULL, 'tax1', '3434', 'api1', NULL, NULL, 11736, 19, NULL, NULL, NULL, NULL, 0, '2019-02-08 04:34:16', '2019-02-08 04:34:16'),
(2, 'tax', NULL, NULL, 'tax18', '898', 'api2', NULL, NULL, 11736, 20, NULL, NULL, NULL, NULL, 0, '2019-02-08 04:34:43', '2019-02-08 04:34:43'),
(3, 'tax', NULL, NULL, 'taxx', '909', 'api1', NULL, NULL, 11737, 1, NULL, NULL, NULL, NULL, 0, '2019-02-08 04:34:55', '2019-02-08 04:34:55'),
(4, 'tax', NULL, NULL, 'tax200', '2323', 'api1', NULL, NULL, 11737, 11, '788', NULL, NULL, NULL, 0, '2019-02-08 04:35:15', '2019-02-08 04:35:15'),
(5, 'tax', NULL, NULL, 'tax288', '90', 'api2', NULL, NULL, 11737, 16, NULL, NULL, NULL, NULL, 0, '2019-02-08 04:35:38', '2019-02-08 04:35:38'),
(6, 'income', NULL, NULL, 'income189', '90909', 'api2', NULL, '343', NULL, NULL, NULL, NULL, NULL, NULL, 0, '2019-02-08 04:36:43', '2019-02-08 04:36:43');

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
(1, 6, 1, '2019-02-08 04:37:58', '2019-02-08 04:37:58'),
(2, 6, 2, '2019-02-08 04:37:58', '2019-02-08 04:37:58'),
(3, 6, 3, '2019-02-08 04:37:58', '2019-02-08 04:37:58'),
(4, 6, 4, '2019-02-08 04:37:58', '2019-02-08 04:37:58'),
(5, 6, 5, '2019-02-08 04:37:58', '2019-02-08 04:37:58');

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
  `value1` varchar(255) NOT NULL,
  `value2` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Table structure for table `vbill`
--

CREATE TABLE `vbill` (
  `id` int(11) NOT NULL,
  `referenceNo` varchar(255) DEFAULT NULL,
  `referenceDate` datetime DEFAULT NULL,
  `billAmount` decimal(10,0) DEFAULT NULL,
  `creditPeriod` int(11) DEFAULT NULL,
  `isNewReference` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `vdid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vbill`
--

INSERT INTO `vbill` (`id`, `referenceNo`, `referenceDate`, `billAmount`, `creditPeriod`, `isNewReference`, `status`, `vid`, `vdid`, `cid`, `segid`, `createdAt`, `updatedAt`) VALUES
(1, 'cr001', '2019-01-08 00:00:00', '100', 0, 0, 1, 1, 1, 1349, 1349, NULL, NULL),
(2, 'cr002', '2019-01-09 00:00:00', '200', 0, 0, 1, 2, 3, 1349, 1349, NULL, NULL),
(3, 'cr003', '2019-01-10 00:00:00', '300', 0, 0, 1, 3, 5, 1349, 1349, NULL, NULL),
(4, 'cr004', '2019-01-11 00:00:00', '350', 0, 0, 1, 4, 7, 1349, 1349, NULL, NULL),
(5, 'cr005', '2019-01-12 00:00:00', '400', 0, 0, 1, 5, 9, 1349, 1349, NULL, NULL),
(6, 'cr006', '2019-01-13 00:00:00', '450', 0, 0, 1, 6, 11, 1349, 1349, NULL, NULL),
(7, 'cr007', '2019-01-14 00:00:00', '500', 0, 0, 1, 7, 13, 1349, 1349, NULL, NULL),
(8, 'cr008', '2019-01-15 00:00:00', '550', 0, 0, 1, 8, 15, 1349, 1349, NULL, NULL),
(9, 'cr009', '2019-01-16 00:00:00', '600', 0, 0, 1, 9, 17, 1349, 1349, NULL, NULL),
(10, 'cr010', '2019-01-17 00:00:00', '650', 0, 0, 1, 10, 19, 1349, 1349, NULL, NULL),
(11, 'cr011', '2019-01-18 00:00:00', '700', 0, 0, 1, 11, 21, 1349, 1349, NULL, NULL),
(12, 'cr012', '2019-01-19 00:00:00', '750', 0, 0, 1, 12, 23, 1349, 1349, NULL, NULL),
(13, 'cr013', '2019-01-20 00:00:00', '800', 0, 0, 1, 13, 25, 1349, 1349, NULL, NULL),
(14, 'cr014', '2019-01-21 00:00:00', '850', 0, 0, 1, 14, 27, 1349, 1349, NULL, NULL),
(15, 'cr015', '2019-01-22 00:00:00', '850', 0, 0, 1, 15, 29, 1349, 1349, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vcc`
--

CREATE TABLE `vcc` (
  `id` int(11) NOT NULL,
  `costcenterName` varchar(255) DEFAULT NULL,
  `costAmount` decimal(10,0) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `groupName` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `vdid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vcc`
--

INSERT INTO `vcc` (`id`, `costcenterName`, `costAmount`, `date`, `groupName`, `status`, `vid`, `vdid`, `cid`, `segid`, `createdAt`, `updatedAt`) VALUES
(1, 'Test', '100', '2019-01-09 00:00:00', 'Test1', 1, 1, 1, 1349, 1349, NULL, NULL),
(2, 'Test', '100', '2019-01-11 00:00:00', 'Test1', 1, 3, 5, 1349, 1349, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vdetail`
--

CREATE TABLE `vdetail` (
  `id` int(11) NOT NULL,
  `dr` decimal(10,0) DEFAULT NULL,
  `cr` decimal(10,0) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `accessibleAmount` decimal(10,0) DEFAULT NULL,
  `bankInstrumentNo` varchar(255) DEFAULT NULL,
  `bankInstrumentDate` datetime DEFAULT NULL,
  `bankInstrumentType` varchar(255) DEFAULT NULL,
  `bankName` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `ledger` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vdetail`
--

INSERT INTO `vdetail` (`id`, `dr`, `cr`, `date`, `accessibleAmount`, `bankInstrumentNo`, `bankInstrumentDate`, `bankInstrumentType`, `bankName`, `status`, `vid`, `ledger`, `cid`, `segid`, `createdAt`, `updatedAt`) VALUES
(1, NULL, '100', '2019-01-09', NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1349, 1349, NULL, NULL),
(2, '100', NULL, '2019-01-09', NULL, NULL, NULL, NULL, NULL, 1, 1, 2, 1349, 1349, NULL, NULL),
(3, NULL, '200', '2019-01-10', NULL, NULL, NULL, NULL, NULL, 1, 2, 6, 1349, 1349, NULL, NULL),
(4, '200', NULL, '2019-01-10', NULL, NULL, NULL, NULL, NULL, 1, 2, 2, 1349, 1349, NULL, NULL),
(5, NULL, '300', '2019-01-11', NULL, NULL, NULL, NULL, NULL, 1, 3, 7, 1349, 1349, NULL, NULL),
(6, '300', NULL, '2019-01-11', NULL, NULL, NULL, NULL, NULL, 1, 3, 2, 1349, 1349, NULL, NULL),
(7, NULL, '350', '2019-01-12', NULL, NULL, NULL, NULL, NULL, 1, 4, 8, 1349, 1349, NULL, NULL),
(8, '350', NULL, '2019-01-12', NULL, NULL, NULL, NULL, NULL, 1, 4, 2, 1349, 1349, NULL, NULL),
(9, NULL, '400', '2019-01-13', NULL, NULL, NULL, NULL, NULL, 1, 5, 1, 1349, 1349, NULL, NULL),
(10, '400', NULL, '2019-01-13', NULL, NULL, NULL, NULL, NULL, 1, 5, 2, 1349, 1349, NULL, NULL),
(11, NULL, '450', '2019-01-14', NULL, NULL, NULL, NULL, NULL, 1, 6, 6, 1349, 1349, NULL, NULL),
(12, '450', NULL, '2019-01-14', NULL, NULL, NULL, NULL, NULL, 1, 6, 2, 1349, 1349, NULL, NULL),
(13, NULL, '500', '2019-01-15', NULL, NULL, NULL, NULL, NULL, 1, 7, 7, 1349, 1349, NULL, NULL),
(14, '500', NULL, '2019-01-15', NULL, NULL, NULL, NULL, NULL, 1, 7, 2, 1349, 1349, NULL, NULL),
(15, NULL, '550', '2019-01-16', NULL, NULL, NULL, NULL, NULL, 1, 8, 8, 1349, 1349, NULL, NULL),
(16, '550', NULL, '2019-01-16', NULL, NULL, NULL, NULL, NULL, 1, 8, 2, 1349, 1349, NULL, NULL),
(17, NULL, '600', '2019-01-17', NULL, NULL, NULL, NULL, NULL, 1, 9, 6, 1349, 1349, NULL, NULL),
(18, '600', NULL, '2019-01-17', NULL, NULL, NULL, NULL, NULL, 1, 9, 2, 1349, 1349, NULL, NULL),
(19, NULL, '650', '2019-01-18', NULL, NULL, NULL, NULL, NULL, 1, 10, 7, 1349, 1349, NULL, NULL),
(20, '650', NULL, '2019-01-18', NULL, NULL, NULL, NULL, NULL, 1, 10, 2, 1349, 1349, NULL, NULL),
(21, NULL, '700', '2019-01-19', NULL, NULL, NULL, NULL, NULL, 1, 11, 9, 1349, 1349, NULL, NULL),
(22, '700', NULL, '2019-01-19', NULL, NULL, NULL, NULL, NULL, 1, 11, 2, 1349, 1349, NULL, NULL),
(23, NULL, '750', '2019-01-20', NULL, NULL, NULL, NULL, NULL, 1, 12, 10, 1349, 1349, NULL, NULL),
(24, '750', NULL, '2019-01-20', NULL, NULL, NULL, NULL, NULL, 1, 12, 2, 1349, 1349, NULL, NULL),
(25, NULL, '800', '2019-01-21', NULL, NULL, NULL, NULL, NULL, 1, 13, 11, 1349, 1349, NULL, NULL),
(26, '800', NULL, '2019-01-21', NULL, NULL, NULL, NULL, NULL, 1, 13, 2, 1349, 1349, NULL, NULL),
(27, NULL, '850', '2019-01-22', NULL, NULL, NULL, NULL, NULL, 1, 14, 9, 1349, 1349, NULL, NULL),
(28, '850', NULL, '2019-01-22', NULL, NULL, NULL, NULL, NULL, 1, 14, 2, 1349, 1349, NULL, NULL),
(29, NULL, '900', '2019-01-23', NULL, NULL, NULL, NULL, NULL, 1, 15, 7, 1349, 1349, NULL, NULL),
(30, '900', NULL, '2019-01-23', NULL, NULL, NULL, NULL, NULL, 1, 15, 2, 1349, 1349, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vitem`
--

CREATE TABLE `vitem` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `segid` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `rlb_item_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id` int(11) NOT NULL,
  `transactionDate` date DEFAULT NULL,
  `transactionNumber` varchar(255) DEFAULT NULL,
  `transactionType` varchar(255) DEFAULT NULL,
  `transactionDescription` varchar(255) DEFAULT NULL,
  `txnCode` varchar(255) DEFAULT NULL,
  `voucherAlias` varchar(255) DEFAULT NULL,
  `apiRef` varchar(255) DEFAULT NULL,
  `docLink` varchar(255) DEFAULT NULL,
  `fxRate` float DEFAULT NULL,
  `isFx` int(11) DEFAULT NULL,
  `isInv` varchar(255) DEFAULT NULL,
  `refFileName` varchar(255) DEFAULT NULL,
  `isSEZ` int(11) DEFAULT NULL,
  `isAbatement` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `currencySymbol` varchar(255) DEFAULT NULL,
  `gstin` varchar(45) DEFAULT NULL,
  `gstParty` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `realbookID` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `voucher`
--

INSERT INTO `voucher` (`id`, `transactionDate`, `transactionNumber`, `transactionType`, `transactionDescription`, `txnCode`, `voucherAlias`, `apiRef`, `docLink`, `fxRate`, `isFx`, `isInv`, `refFileName`, `isSEZ`, `isAbatement`, `status`, `currencySymbol`, `gstin`, `gstParty`, `cid`, `segid`, `realbookID`, `createdAt`, `updatedAt`) VALUES
(1, '2019-01-09', '67767', 'credit', 'sold tires', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, 6104030, NULL, '2019-02-12 13:12:58'),
(2, '2019-01-10', '67768', 'credit', 'sold tires1', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, 6104055, NULL, NULL),
(3, '2019-01-11', '67769', 'credit', 'sold tires2', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, '2019-02-12 13:19:23'),
(4, '2019-01-12', '67770', 'credit', 'sold tires3', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, '2019-02-12 13:20:38'),
(5, '2019-01-13', '67771', 'credit', 'sold tires4', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(6, '2019-01-14', '67772', 'credit', 'sold tires5', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, 6104175, NULL, '2019-02-12 13:29:51'),
(7, '2019-01-15', '67773', 'credit', 'sold tires6', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(8, '2019-01-16', '67774', 'credit', 'sold tires7', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, '2019-02-12 13:19:28'),
(9, '2019-01-17', '67775', 'credit', 'sold tires8', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(10, '2019-01-18', '67776', 'credit', 'sold tires9', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(11, '2019-01-19', '67777', 'credit', 'sold tires10', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(12, '2019-01-20', '67778', 'credit', 'sold tires11', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(13, '2019-01-21', '67779', 'credit', 'sold tires12', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(14, '2019-01-22', '67780', 'credit', 'sold tires13', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL),
(15, '2019-01-23', '67781', 'credit', 'sold tires14', 'uyurw45', '8798uiu', 'red_apple', NULL, 233, 1, '0', 'no', 0, 0, 1, 'INR', '19CQZED1111I8Z7', NULL, 1349, 1349, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vprofitsharing`
--

CREATE TABLE `vprofitsharing` (
  `id` int(11) NOT NULL,
  `transaction_id` int(11) NOT NULL,
  `vid` int(11) NOT NULL,
  `sharing_master_id` int(11) NOT NULL,
  `supplier_co_id` int(11) NOT NULL,
  `seller_co_id` int(11) NOT NULL,
  `supplier_co_profit` decimal(10,0) NOT NULL,
  `seller_co_profit` decimal(10,0) NOT NULL,
  `isManual` int(11) DEFAULT '0',
  `manual_supplier_profit` decimal(10,0) NOT NULL,
  `manual_seller_profit` decimal(10,0) NOT NULL,
  `posted_supplier_profit` decimal(10,0) NOT NULL,
  `posted_seller_profit` decimal(10,0) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vtax`
--

CREATE TABLE `vtax` (
  `id` int(11) NOT NULL,
  `rate` decimal(10,0) DEFAULT NULL,
  `taxAmount` decimal(10,0) DEFAULT NULL,
  `extraData` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `vdid` int(11) DEFAULT NULL,
  `taxLedgerid` int(11) DEFAULT NULL,
  `cid` int(11) DEFAULT NULL,
  `segid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vtax`
--

INSERT INTO `vtax` (`id`, `rate`, `taxAmount`, `extraData`, `status`, `vid`, `vdid`, `taxLedgerid`, `cid`, `segid`, `createdAt`, `updatedAt`) VALUES
(1, '9', '9', NULL, 1, 1, 1, 3, 1349, 1349, NULL, NULL),
(2, '9', '9', NULL, 1, 1, 1, 4, 1349, 1349, NULL, NULL),
(3, '9', '9', NULL, 1, 2, 3, 3, 1349, 1349, NULL, NULL),
(4, '9', '9', NULL, 1, 2, 3, 4, 1349, 1349, NULL, NULL),
(5, '9', '9', NULL, 1, 3, 5, 3, 1349, 1349, NULL, NULL),
(6, '9', '9', NULL, 1, 3, 5, 4, 1349, 1349, NULL, NULL),
(7, '9', '9', NULL, 1, 4, 7, 3, 1349, 1349, NULL, NULL),
(8, '9', '9', NULL, 1, 4, 7, 4, 1349, 1349, NULL, NULL),
(9, '9', '9', NULL, 1, 5, 9, 3, 1349, 1349, NULL, NULL),
(10, '9', '9', NULL, 1, 5, 9, 4, 1349, 1349, NULL, NULL),
(11, '9', '9', NULL, 1, 6, 11, 3, 1349, 1349, NULL, NULL),
(12, '9', '9', NULL, 1, 6, 11, 4, 1349, 1349, NULL, NULL),
(13, '9', '9', NULL, 1, 7, 13, 3, 1349, 1349, NULL, NULL),
(14, '9', '9', NULL, 1, 7, 13, 4, 1349, 1349, NULL, NULL),
(15, '9', '9', NULL, 1, 8, 15, 3, 1349, 1349, NULL, NULL),
(16, '9', '9', NULL, 1, 8, 15, 4, 1349, 1349, NULL, NULL),
(17, '9', '9', NULL, 1, 9, 17, 3, 1349, 1349, NULL, NULL),
(18, '9', '9', NULL, 1, 9, 17, 4, 1349, 1349, NULL, NULL),
(19, '9', '9', NULL, 1, 10, 19, 3, 1349, 1349, NULL, NULL),
(20, '9', '9', NULL, 1, 10, 19, 4, 1349, 1349, NULL, NULL),
(21, '9', '9', NULL, 1, 11, 21, 3, 1349, 1349, NULL, NULL),
(22, '9', '9', NULL, 1, 11, 21, 4, 1349, 1349, NULL, NULL),
(23, '9', '9', NULL, 1, 12, 23, 3, 1349, 1349, NULL, NULL),
(24, '9', '9', NULL, 1, 12, 23, 4, 1349, 1349, NULL, NULL),
(25, '9', '9', NULL, 1, 13, 25, 3, 1349, 1349, NULL, NULL),
(26, '9', '9', NULL, 1, 13, 25, 4, 1349, 1349, NULL, NULL),
(27, '9', '9', NULL, 1, 14, 27, 3, 1349, 1349, NULL, NULL),
(28, '9', '9', NULL, 1, 14, 27, 4, 1349, 1349, NULL, NULL),
(29, '9', '9', NULL, 1, 15, 29, 3, 1349, 1349, NULL, NULL),
(30, '9', '9', NULL, 1, 15, 29, 4, 1349, 1349, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookingmaster`
--
ALTER TABLE `bookingmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_master`
--
ALTER TABLE `company_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `component`
--
ALTER TABLE `component`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `component_to_service`
--
ALTER TABLE `component_to_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fetcheddata`
--
ALTER TABLE `fetcheddata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemmaster`
--
ALTER TABLE `itemmaster`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `itemtaxlink`
--
ALTER TABLE `itemtaxlink`
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
-- Indexes for table `vbill`
--
ALTER TABLE `vbill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vcc`
--
ALTER TABLE `vcc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vdetail`
--
ALTER TABLE `vdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vitem`
--
ALTER TABLE `vitem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vprofitsharing`
--
ALTER TABLE `vprofitsharing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vtax`
--
ALTER TABLE `vtax`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingmaster`
--
ALTER TABLE `bookingmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `component`
--
ALTER TABLE `component`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `component_to_service`
--
ALTER TABLE `component_to_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fetcheddata`
--
ALTER TABLE `fetcheddata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `itemmaster`
--
ALTER TABLE `itemmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `itemtaxlink`
--
ALTER TABLE `itemtaxlink`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ledgermaster`
--
ALTER TABLE `ledgermaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ledgertaxlink`
--
ALTER TABLE `ledgertaxlink`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sellingcompany`
--
ALTER TABLE `sellingcompany`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sharingmaster`
--
ALTER TABLE `sharingmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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

--
-- AUTO_INCREMENT for table `vbill`
--
ALTER TABLE `vbill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vcc`
--
ALTER TABLE `vcc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vdetail`
--
ALTER TABLE `vdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `vitem`
--
ALTER TABLE `vitem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `vprofitsharing`
--
ALTER TABLE `vprofitsharing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vtax`
--
ALTER TABLE `vtax`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
