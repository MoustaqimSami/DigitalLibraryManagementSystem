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
-- Table structure for table `library_item`
--

DROP TABLE IF EXISTS `library_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_item` (
  `ItemID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Status` varchar(255) NOT NULL,
  `Publisher_ID` int NOT NULL,
  `Publication_Date` date DEFAULT NULL,
  `Language` varchar(255) DEFAULT NULL,
  `Editor_ID` int NOT NULL,
  `Author_ID` int NOT NULL,
  `Cover_Color` varchar(45) NOT NULL,
  `Cover_URL` varchar(500) NOT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `Publisher_ID` (`Publisher_ID`),
  KEY `Editor_ID` (`Editor_ID`),
  KEY `Author_ID` (`Author_ID`),
  CONSTRAINT `library_item_ibfk_1` FOREIGN KEY (`Publisher_ID`) REFERENCES `publisher` (`Publisher_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `library_item_ibfk_2` FOREIGN KEY (`Editor_ID`) REFERENCES `editor` (`Editor_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `library_item_ibfk_3` FOREIGN KEY (`Author_ID`) REFERENCES `author` (`Author_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_item`
--

LOCK TABLES `library_item` WRITE;
/*!40000 ALTER TABLE `library_item` DISABLE KEYS */;
INSERT INTO `library_item` VALUES (1,'The Great Gatsby','Available',301,'1925-04-10','English',101,201,'#ff5733','https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_hr.jpg'),(2,'To Kill a Mockingbird','Unavailable',302,'1960-07-11','English',102,202,'#ff5733','https://media.glamour.com/photos/56e1f3c462b398fa64cbd304/master/w_1600%2Cc_limit/entertainment-2016-02-18-main.jpg'),(3,'1984','Available',303,'1949-06-08','English',103,203,'#ff5733','https://miro.medium.com/v2/resize:fit:7084/1*6QXManBm7wsBgDiagqPH8Q.png'),(4,'The Catcher in the Rye','Available',304,'1951-07-16','English',104,204,'#ff5733','https://m.media-amazon.com/images/I/8125BDk3l9L.jpg'),(5,'Pride and Prejudice','Unavailable',305,'1813-01-28','English',105,205,'#ff5733','https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_FMjpg_UX1000_.jpg'),(6,'Moby-Dick','Available',306,'1851-10-18','English',106,206,'#ff5733','https://m.media-amazon.com/images/I/91xNmlf86yL.jpg'),(7,'War and Peace','Unavailable',307,'1869-01-01','Russian',107,207,'#ff5733','https://m.media-amazon.com/images/I/81W6BFaJJWL.jpg'),(8,'The Odyssey','Available',308,'0800-01-01','Greek',108,208,'#ff5733','https://m.media-amazon.com/images/I/71auePo1a8L._AC_UF1000,1000_QL80_.jpg'),(9,'The Hobbit','Unavailable',309,'1937-09-21','English',109,209,'#ff5733','https://m.media-amazon.com/images/I/81axMfFDSrL.jpg'),(10,'The Lord of the Rings','Available',310,'1954-07-29','English',110,210,'#ff5733','https://m.media-amazon.com/images/I/913sMwNHsBL._AC_UF1000,1000_QL80_.jpg'),(11,'Global Warming Trends in the 21st Century','Available',301,'2017-06-05','English',103,211,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(12,'AI and the Future of Work','Unavailable',302,'2023-02-19','French',105,212,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(13,'Economic Impact of Renewable Energy','Available',308,'2020-10-12','Spanish',102,213,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(14,'A Study on Marine Biodiversity','Available',309,'2018-07-30','German',104,214,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(15,'Quantum Computing: Current State and Future Prospects','Available',310,'2021-01-25','English',102,215,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(16,'Mental Health in the Digital Age','Unavailable',310,'2016-09-11','French',105,216,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(17,'Blockchain and Financial Transparency','Unavailable',309,'2019-12-04','Spanish',101,217,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(18,'Cybersecurity in Smart Cities','Available',307,'2022-03-15','German',101,218,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(19,'Educational Reforms in the Post-Pandemic World','Available',305,'2024-08-09','English',103,219,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(20,'Neuroscience and Cognitive Development','Available',303,'2015-11-28','French',104,220,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(21,'Vogue Monthly','Available',301,'2024-02-01','English',121,221,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(22,'Hollywood Weekly','Unavailable',302,'2024-03-15','English',122,222,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(23,'World Soccer Digest','Available',303,'2024-01-10','English',123,223,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(24,'Style & Trends','Available',304,'2023-12-05','French',122,222,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(25,'Cinema Buzz','Unavailable',305,'2024-04-01','English',123,223,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(31,'The Morning Herald','Available',301,'2025-04-19','English',124,224,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(32,'Daily Global Times','Available',302,'2025-04-19','English',125,225,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(33,'The Evening Ledger','Unavailable',303,'2025-04-19','English',126,226,'#ff5733','https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg'),(34,'Testing Book','Available',301,'1925-04-30','English',101,201,'#ff5733','https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093'),(35,'Testing Book','Available',301,'1925-04-30','English',101,201,'#ff5733','https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093'),(36,'Testing Book','Available',301,'1925-04-30','English',101,201,'#ff5733','https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093'),(37,'Testing Book','Available',301,'1925-04-30','English',101,201,'#ff5733','https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093'),(38,'Testing Book','Available',301,'1925-04-30','English',101,201,'#ff5733','https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093'),(39,'Testing Magazine','Available',301,'1925-04-30','English',101,201,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(40,'Testing Magazine','Available',301,'1925-04-30','English',101,201,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(41,'Testing Magazine','Available',301,'1925-04-30','English',101,201,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(42,'Testing Magazine','Available',301,'1925-04-30','English',101,201,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(43,'Testing RP','Available',301,'1925-04-30','English',101,201,'#ff5733','https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg'),(48,'New Book','Available',301,'2025-04-24','English',101,201,'#ff0000','idk');
/*!40000 ALTER TABLE `library_item` ENABLE KEYS */;
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
