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
-- Table structure for table `loan`
--

DROP TABLE IF EXISTS `loan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loan` (
  `LoanID` int NOT NULL AUTO_INCREMENT,
  `Library_Item_ID` int NOT NULL,
  `Client_Email` varchar(255) NOT NULL,
  `LoanStatus` varchar(255) DEFAULT NULL,
  `LoanDate` date DEFAULT NULL,
  `DueDate` date DEFAULT NULL,
  `CurrentFine` int DEFAULT NULL,
  PRIMARY KEY (`LoanID`,`Library_Item_ID`,`Client_Email`),
  KEY `Client_Email` (`Client_Email`),
  KEY `loan_Item_ID_idx` (`Library_Item_ID`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`Client_Email`) REFERENCES `client` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `loan_Item_ID` FOREIGN KEY (`Library_Item_ID`) REFERENCES `library_item` (`ItemID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=502 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loan`
--

LOCK TABLES `loan` WRITE;
/*!40000 ALTER TABLE `loan` DISABLE KEYS */;
INSERT INTO `loan` VALUES (402,2,'michael.brown@example.com','Returned','2025-04-07','2025-04-21',0),(403,2,'lisa.chen@example.com','Returned','2025-03-31','2025-04-14',0),(404,2,'john.doe@example.com','Overdue','2025-04-08','2025-04-22',30),(405,2,'emma.davis@example.com','Returned','2025-04-08','2025-04-22',0),(406,2,'daniel.lee@example.com','Overdue','2025-03-30','2025-04-13',20),(407,2,'olivia.taylor@example.com','Returned','2025-04-07','2025-04-21',0),(408,2,'kevin.nguyen@example.com','Returned','2025-04-06','2025-04-20',0),(409,2,'chloe.wilson@example.com','Overdue','2025-04-08','2025-04-22',10),(410,2,'olivia.taylor@example.com','Returned','2025-04-08','2025-04-22',0),(411,2,'jessica.clark@example.com','Returned','2025-03-30','2025-04-13',0),(412,5,'david.lopez@example.com','Returned','2025-04-01','2025-04-15',0),(413,5,'ashley.hall@example.com','Returned','2025-04-03','2025-04-17',0),(415,5,'megan.king@example.com','Returned','2025-04-02','2025-04-16',0),(416,5,'jessica.clark@example.com','Returned','2025-04-07','2025-04-21',0),(417,5,'lauren.green@example.com','Overdue','2025-04-07','2025-04-21',10),(418,5,'tyler.hill@example.com','Overdue','2025-04-05','2025-04-19',10),(419,5,'natalie.young@example.com','Returned','2025-04-02','2025-04-16',0),(420,5,'jake.baker@example.com','Returned','2025-04-01','2025-04-15',0),(421,5,'emily.james@example.com','Overdue','2025-04-09','2025-04-23',30),(423,5,'michael.smith@example.com','Returned','2025-04-02','2025-04-16',0),(424,5,'olivia.morris@example.com','Returned','2025-04-06','2025-04-20',0),(425,5,'jacob.wright@example.com','Returned','2025-04-08','2025-04-22',0),(426,7,'mia.nguyen@example.com','Returned','2025-04-05','2025-04-19',0),(427,7,'ethan.patel@example.com','Returned','2025-04-03','2025-04-17',0),(428,7,'chloe.wilson@example.com','Returned','2025-03-31','2025-04-14',0),(429,7,'noah.martin@example.com','Returned','2025-03-30','2025-04-13',0),(430,7,'isabella.rivera@example.com','Returned','2025-04-06','2025-04-20',0),(431,7,'olivia.taylor@example.com','Returned','2025-04-07','2025-04-21',0),(432,7,'amelia.jenkins@example.com','Returned','2025-04-05','2025-04-19',0),(433,7,'lucas.coleman@example.com','Returned','2025-04-08','2025-04-22',0),(434,7,'ella.diaz@example.com','Returned','2025-04-04','2025-04-18',0),(435,7,'liam.murphy@example.com','Overdue','2025-04-06','2025-04-20',20),(436,7,'harper.taylor@example.com','Returned','2025-04-02','2025-04-16',0),(437,7,'michael.smith@example.com','Returned','2025-04-08','2025-04-22',0),(438,9,'natalie.young@example.com','Returned','2025-04-01','2025-04-15',0),(439,9,'alexander.bryant@example.com','Returned','2025-04-04','2025-04-18',0),(441,9,'benjamin.carter@example.com','Overdue','2025-04-06','2025-04-20',30),(442,9,'chloe.hughes@example.com','Returned','2025-04-05','2025-04-19',0),(443,9,'emma.davis@example.com','Returned','2025-04-07','2025-04-21',0),(444,9,'grace.reed@example.com','Returned','2025-04-06','2025-04-20',0),(445,9,'henry.cook@example.com','Returned','2025-04-08','2025-04-22',0),(446,9,'lily.ross@example.com','Returned','2025-04-02','2025-04-16',0),(447,9,'sebastian.wood@example.com','Returned','2025-04-03','2025-04-17',0),(448,12,'zoe.foster@example.com','Returned','2025-03-30','2025-04-13',0),(449,12,'matthew.kelly@example.com','Returned','2025-04-04','2025-04-18',0),(450,12,'nora.henderson@example.com','Overdue','2025-03-31','2025-04-14',30),(452,12,'michael.brown@example.com','Returned','2025-04-02','2025-04-16',0),(453,12,'lisa.chen@example.com','Overdue','2025-04-03','2025-04-17',20),(454,12,'john.doe@example.com','Returned','2025-04-05','2025-04-19',0),(455,12,'olivia.taylor@example.com','Returned','2025-04-01','2025-04-15',0),(456,12,'daniel.lee@example.com','Overdue','2025-04-08','2025-04-22',20),(457,12,'olivia.taylor@example.com','Overdue','2025-04-02','2025-04-16',10),(458,12,'kevin.nguyen@example.com','Returned','2025-04-09','2025-04-23',0),(459,16,'chloe.wilson@example.com','Returned','2025-04-02','2025-04-16',0),(460,16,'brian.martin@example.com','Returned','2025-04-07','2025-04-21',0),(461,16,'jessica.clark@example.com','Returned','2025-04-09','2025-04-23',0),(462,16,'emily.james@example.com','Overdue','2025-04-05','2025-04-19',30),(463,16,'ashley.hall@example.com','Returned','2025-03-31','2025-04-14',0),(465,17,'megan.king@example.com','Returned','2025-04-05','2025-04-19',0),(466,17,'justin.scott@example.com','Returned','2025-04-06','2025-04-20',0),(467,17,'lauren.green@example.com','Returned','2025-04-03','2025-04-17',0),(468,17,'tyler.hill@example.com','Returned','2025-04-03','2025-04-17',0),(469,17,'natalie.young@example.com','Returned','2025-04-04','2025-04-18',0),(470,17,'jake.baker@example.com','Overdue','2025-04-09','2025-04-23',20),(471,17,'emily.james@example.com','Overdue','2025-04-05','2025-04-19',30),(473,17,'michael.smith@example.com','Returned','2025-04-06','2025-04-20',0),(474,17,'olivia.morris@example.com','Returned','2025-04-03','2025-04-17',0),(475,22,'michael.brown@example.com','Returned','2025-04-06','2025-04-20',0),(476,22,'lisa.chen@example.com','Overdue','2025-04-08','2025-04-22',10),(477,22,'ethan.patel@example.com','Returned','2025-04-01','2025-04-15',0),(478,22,'ava.hernandez@example.com','Returned','2025-04-08','2025-04-22',0),(479,22,'noah.martin@example.com','Overdue','2025-04-07','2025-04-21',30),(481,22,'logan.thomas@example.com','Returned','2025-04-09','2025-04-23',0),(482,22,'amelia.jenkins@example.com','Returned','2025-03-31','2025-04-14',0),(483,22,'lucas.coleman@example.com','Returned','2025-04-07','2025-04-21',0),(484,22,'ella.diaz@example.com','Returned','2025-04-03','2025-04-17',0),(485,25,'liam.murphy@example.com','Returned','2025-04-06','2025-04-20',0),(486,25,'harper.taylor@example.com','Returned','2025-03-31','2025-04-14',0),(487,25,'james.bennett@example.com','Returned','2025-04-08','2025-04-22',0),(488,25,'evelyn.watson@example.com','Overdue','2025-04-07','2025-04-21',30),(489,25,'alexander.bryant@example.com','Overdue','2025-04-05','2025-04-19',30),(491,25,'benjamin.carter@example.com','Returned','2025-04-02','2025-04-16',0),(492,25,'chloe.hughes@example.com','Returned','2025-04-08','2025-04-22',0),(493,25,'jack.green@example.com','Returned','2025-04-09','2025-04-23',0),(496,1,'alexander.bryant@example.com','In Progress','2025-04-23','2025-05-23',0),(499,3,'alexander.bryant@example.com','In Progress','2025-04-23','2025-05-23',0),(500,1,'john@example.com','In Progress','2025-04-23','2025-05-23',0),(501,1,'alexander.bryant@example.com','In Progress','2025-04-23','2025-05-23',0);
/*!40000 ALTER TABLE `loan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:26
