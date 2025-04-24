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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `Member_Email` varchar(255) NOT NULL,
  `Start_Date` date NOT NULL,
  `Expiration_Date` date NOT NULL,
  PRIMARY KEY (`Member_Email`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`Member_Email`) REFERENCES `client` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('alexander.bryant@example.com','2025-04-22','2025-04-24'),('amelia.jenkins@example.com','2025-04-16','2025-04-25'),('ashley.hall@example.com','2025-04-10','2026-04-10'),('benjamin.carter@example.com','2024-06-30','2025-06-30'),('chloe.hughes@example.com','2024-07-18','2025-07-18'),('chloe.wilson@example.com','2025-03-01','2026-03-01'),('daniel.lee@example.com','2025-02-05','2026-02-05'),('ella.diaz@example.com','2025-01-05','2026-01-05'),('emily.james@example.com','2024-11-11','2025-11-11'),('emma.davis@example.com','2024-04-25','2025-04-25'),('ethan.patel@example.com','2025-04-01','2026-04-01'),('grace.reed@example.com','2025-04-20','2026-04-20'),('harper.taylor@example.com','2024-05-01','2025-05-01'),('jake.baker@example.com','2025-03-22','2026-03-22'),('jessica.clark@example.com','2024-05-30','2025-05-30'),('john.doe@example.com','2025-01-10','2026-01-10'),('kevin.nguyen@example.com','2024-08-22','2025-08-22'),('lauren.green@example.com','2024-12-03','2025-12-03'),('liam.murphy@example.com','2024-04-10','2025-04-10'),('lisa.chen@example.com','2024-11-20','2025-11-20'),('lucas.coleman@example.com','2024-12-20','2025-12-20'),('megan.king@example.com','2025-01-25','2026-01-25'),('michael.brown@example.com','2024-07-01','2025-07-01'),('michael.smith@example.com','2025-02-15','2026-02-15'),('natalie.young@example.com','2024-07-07','2025-07-07'),('noah.martin@example.com','2024-09-25','2025-09-25'),('olivia.morris@example.com','2024-06-05','2025-06-05'),('olivia.taylor@example.com','2024-06-18','2025-06-18');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
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
