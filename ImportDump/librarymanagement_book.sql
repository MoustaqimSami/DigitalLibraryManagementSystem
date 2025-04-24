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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `Item_ID` int NOT NULL,
  `ISBN` int NOT NULL,
  `Page_Count` int DEFAULT NULL,
  `Genre` varchar(255) DEFAULT NULL,
  `Format` varchar(255) DEFAULT NULL,
  `Edition` int DEFAULT NULL,
  `Rating` int DEFAULT NULL,
  `Synopsys` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Item_ID`),
  CONSTRAINT `Item_ID` FOREIGN KEY (`Item_ID`) REFERENCES `library_item` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,97807432,180,'Classic','Hardcover',1,4,'A mysterious millionaire throws lavish parties in 1920s New York.'),(2,97800611,281,'Historical','Paperback',1,3,'A young girl confronts racial injustice in the American South.'),(3,97804515,328,'Dystopian','Paperback',1,3,'A dystopian future where Big Brother watches everyone.'),(4,97803167,277,'Coming-of-Age','Hardcover',1,5,'A teenager struggles with alienation and identity in New York.'),(5,97815032,432,'Romance','Paperback',1,4,'A spirited young woman navigates love and class in 19th-century England.'),(6,97815032,635,'Adventure','Hardcover',1,5,'A sea captain obsessively hunts a giant white whale.'),(7,97801992,1225,'Historical','Hardcover',1,5,'An epic tale of love and war in Napoleonic Russia.'),(8,97801402,541,'Poetry','Paperback',1,5,'An ancient Greek hero journeys home after the Trojan War.'),(9,97805479,310,'Fantasy','Hardcover',1,5,'A hobbit embarks on an adventure to reclaim a treasure from a dragon.'),(10,9780544,1178,'Fantasy','Hardcover',1,5,'A quest to destroy a powerful ring that threatens Middle-earth.'),(36,77777777,45,'Action','Hardcover',1,4,'A book about the solving backend issues'),(37,77777777,45,'Action','Hardcover',1,4,'A book about the solving backend issues'),(38,77777777,45,'Action','Hardcover',1,4,'A book about the solving backend issues'),(48,12345678,12,'Classical','Hardcover',2,4,'idk');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:19
