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
-- Table structure for table `book_copies`
--

DROP TABLE IF EXISTS `book_copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_copies` (
  `ItemID` int NOT NULL,
  `No_of_copies` int NOT NULL,
  `Address` varchar(255) NOT NULL,
  PRIMARY KEY (`ItemID`,`No_of_copies`,`Address`),
  KEY `Address` (`Address`),
  CONSTRAINT `book_copies_ibfk_2` FOREIGN KEY (`Address`) REFERENCES `library_branch` (`Address`),
  CONSTRAINT `Item_IDbc` FOREIGN KEY (`ItemID`) REFERENCES `library_item` (`ItemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_copies`
--

LOCK TABLES `book_copies` WRITE;
/*!40000 ALTER TABLE `book_copies` DISABLE KEYS */;
INSERT INTO `book_copies` VALUES (1,5,'123 Maple Street'),(2,7,'123 Maple Street'),(3,6,'123 Maple Street'),(4,4,'123 Maple Street'),(5,8,'123 Maple Street'),(6,3,'123 Maple Street'),(7,7,'123 Maple Street'),(8,4,'123 Maple Street'),(9,6,'123 Maple Street'),(10,5,'123 Maple Street'),(11,3,'123 Maple Street'),(12,6,'123 Maple Street'),(13,7,'123 Maple Street'),(14,4,'123 Maple Street'),(15,5,'123 Maple Street'),(16,3,'123 Maple Street'),(17,6,'123 Maple Street'),(18,4,'123 Maple Street'),(19,8,'123 Maple Street'),(20,3,'123 Maple Street'),(21,5,'123 Maple Street'),(24,15,'123 Maple Street'),(31,21,'123 Maple Street'),(32,22,'123 Maple Street'),(32,23,'123 Maple Street'),(1,3,'456 Oak Avenue'),(2,4,'456 Oak Avenue'),(3,5,'456 Oak Avenue'),(4,3,'456 Oak Avenue'),(5,6,'456 Oak Avenue'),(6,2,'456 Oak Avenue'),(7,5,'456 Oak Avenue'),(8,3,'456 Oak Avenue'),(9,4,'456 Oak Avenue'),(10,2,'456 Oak Avenue'),(11,3,'456 Oak Avenue'),(12,5,'456 Oak Avenue'),(13,4,'456 Oak Avenue'),(14,6,'456 Oak Avenue'),(15,4,'456 Oak Avenue'),(16,2,'456 Oak Avenue'),(17,5,'456 Oak Avenue'),(18,4,'456 Oak Avenue'),(19,7,'456 Oak Avenue'),(20,2,'456 Oak Avenue'),(22,10,'456 Oak Avenue'),(23,7,'456 Oak Avenue'),(25,9,'456 Oak Avenue'),(31,10,'456 Oak Avenue'),(32,11,'456 Oak Avenue'),(32,12,'456 Oak Avenue');
/*!40000 ALTER TABLE `book_copies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:23
