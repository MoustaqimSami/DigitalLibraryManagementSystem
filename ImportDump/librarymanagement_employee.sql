-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: librarymanagement
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `SIN` int NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Minit` varchar(255) DEFAULT NULL,
  `Lname` varchar(255) NOT NULL,
  `Hire_Date` date DEFAULT NULL,
  `Access_Level` int NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone_no` int DEFAULT NULL,
  `Work_Hours` int NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Branch_Address` varchar(255) NOT NULL,
  PRIMARY KEY (`SIN`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (110923474,'Emily','E','White','2022-02-10',1,'101 Birch Lane',1567890123,35,'emily.white@email.com','456 Oak Avenue'),(120398407,'David','H','Wilson','2023-01-30',1,'404 Willow Boulevard',1890123456,40,'david.wilson@email.com','456 Oak Avenue'),(120401220,'Ava','S','Thomas','2019-03-18',1,'707 Spruce Street',1232345678,36,'ava.thomas@email.com','456 Oak Avenue'),(120949235,'Michael','L','Martinez','2018-05-17',2,'202 Cedar Road',1678901234,40,'michael.martinez@email.com','123 Maple Street'),(120972036,'Olivia','F','Brown','2017-09-05',3,'303 Redwood Drive',1789012345,37,'olivia.brown@email.com','123 Maple Street'),(129374038,'Sophia','G','Lee','2016-08-12',2,'505 Cherry Street',1901234567,38,'sophia.lee@email.com','456 Oak Avenue'),(182134983,'Robert','C','Johnson','2019-11-23',3,'789 Pine Street',1456789012,42,'robert.johnson@email.com','456 Oak Avenue'),(182369122,'Jane','M','Smith','2020-07-15',2,'456 Oak Street',1345678901,38,'jane.smith@email.com','123 Maple Street'),(192803979,'James','K','Anderson','2021-10-20',3,'606 Maple Way',1012345678,40,'james.anderson@email.com','123 Maple Street'),(192931271,'John','A','Doe','2021-03-01',1,'123 Main Street',1234567890,40,'john.doe@email.com','123 Maple Street');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:25
