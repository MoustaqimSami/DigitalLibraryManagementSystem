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
-- Table structure for table `author_genres`
--

DROP TABLE IF EXISTS `author_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_genres` (
  `Author_ID` int NOT NULL,
  `Genre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Author_ID`),
  CONSTRAINT `author_genres_ibfk_1` FOREIGN KEY (`Author_ID`) REFERENCES `author` (`Author_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_genres`
--

LOCK TABLES `author_genres` WRITE;
/*!40000 ALTER TABLE `author_genres` DISABLE KEYS */;
INSERT INTO `author_genres` VALUES (201,'Fiction'),(202,'Fiction'),(203,'Dystopian Fiction'),(204,'Fiction'),(205,'Classic Literature'),(206,'Adventure Fiction'),(207,'Historical Fiction'),(208,'Epic Poetry'),(209,'Fantasy Fiction'),(210,'Fantasy Fiction'),(211,'Non-fiction'),(212,'Non-fiction'),(213,'Non-fiction'),(214,'Non-fiction'),(215,'Non-fiction'),(216,'Non-fiction'),(217,'Non-fiction'),(218,'Non-fiction'),(219,'Non-fiction'),(220,'Non-fiction'),(221,'Magazine'),(222,'Magazine'),(223,'Magazine'),(224,'Newspaper'),(225,'Newspaper');
/*!40000 ALTER TABLE `author_genres` ENABLE KEYS */;
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
