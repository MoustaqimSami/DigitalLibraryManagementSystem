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
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `Email` varchar(255) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `MInit` varchar(5) DEFAULT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `Phone_no` int DEFAULT NULL,
  PRIMARY KEY (`Email`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('adam.dixon@example.com','Adam','T','Dixon',2025551052),('alexander.bryant@example.com','Alex','S','Bryant',2025551020),('amelia.jenkins@example.com','Amelias','N','Jenkins',2025551013),('aria.morgan@example.com','Aria','T','Morgan',2025551035),('ashley.hall@example.com','Ashley','E','Hall',1553546578),('ashton.doyle@example.com','Ashton','','Doyle',2025551064),('aubree.wells@example.com','Aubree','','Wells',2025551059),('aubrey.perry@example.com','Aubrey','K','Perry',2025551047),('ava.hernandez@example.com','Ava','K','Hernandez',2025551009),('benjamin.carter@example.com','Benjamin','J','Carter',2025551022),('blake.summers@example.com','Blake','G','Summers',2025551062),('brian.martin@example.com','Brian','D','Martin',1550123456),('carter.brooks@example.com','Carter','S','Brooks',2025551046),('chloe.hughes@example.com','Chloe','A','Hughes',2025551023),('chloe.wilson@example.com','Chloe','J','Wilson',1559012345),('christopher.ross@example.com','Christopher','B','Ross',2025551048),('claire.hansen@example.com','Claire','D','Hansen',2025551071),('cole.parker@example.com','Cole','T','Parker',2025551066),('daniel.lee@example.com','Daniel','R','Lee',1556789012),('david.lopez@example.com','David','P','Lopez',1552435467),('david.ward@example.com','David','K','Ward',2025551034),('elena.bradley@example.com','Elena','N','Bradley',2025551055),('elijah.bailey@example.com','Elijah','','Bailey',2025551032),('ella.diaz@example.com','Ella','','Diaz',2025551015),('ella.turner@example.com','Ella','D','Turner',2025551043),('emily.james@example.com','Emily','A','James',1025551001),('emma.davis@example.com','Emma','S','Davis',1555678901),('ethan.patel@example.com','Ethan','S','Patel',2025551008),('evelyn.watson@example.com','Evelyn','M','Watson',2025551019),('george.bates@example.com','George','H','Bates',2025551060),('grace.reed@example.com','Grace','T','Reed',2025551025),('hannah.shaw@example.com','Hannah','A','Shaw',2025551041),('harper.taylor@example.com','Harper','','Taylor',2025551017),('hazel.mason@example.com','Hazel','A','Mason',2025551053),('henry.cook@example.com','Henry','','Cook',2025551026),('isaac.foster@example.com','Isaac','','Foster',2025551044),('isabella.rivera@example.com','Isabella','R','Rivera',2025551011),('jack.green@example.com','Jack','L','Green',2025551024),('jacob.wright@example.com','Jacob','J','Wright',2025551006),('jake.baker@example.com','Jake','X','Baker',1550213245),('james.bennett@example.com','James','E','Bennett',2025551018),('jessica.clark@example.com','Jessica','N','Clark',1551324356),('john.doe@example.com','John','K','Doe',1554567890),('john@example.com','John','J','John',123456789),('jonah.garrett@example.com','Jonah','J','Garrett',2025551056),('joseph.hall@example.com','Joseph','C','Hall',2025551036),('julian.evans@example.com','Julian','E','Evans',2025551050),('justin.scott@example.com','Justin','M','Scott',1556879801),('kevin.nguyen@example.com','Kevin','C','Nguyen',1558901234),('lauren.green@example.com','Lauren','Q','Green',1557980912),('layla.owens@example.com','Layla','S','Owens',2025551073),('leah.long@example.com','Leah','','Long',2025551051),('leo.ramos@example.com','Leo','','Ramos',2025551040),('liam.murphy@example.com','Liam','T','Murphy',2025551016),('lily.ross@example.com','Lily','B','Ross',2025551027),('lisa.chen@example.com','Lisa','M','Chen',1553456789),('logan.thomas@example.com','Logan','D','Thomas',2025551012),('lucas.coleman@example.com','Lucas','G','Coleman',2025551014),('lucy.caldwell@example.com','Lucy','E','Caldwell',2025551065),('madison.fox@example.com','Madison','E','Fox',2025551039),('matthew.kelly@example.com','Matthew','','Kelly',2025551030),('megan.king@example.com','Megan','H','King',1555768790),('mia.nguyen@example.com','Mia','','Nguyen',2025551007),('michael.brown@example.com','Michael','T','Brown',1552345678),('michael.smith@example.com','Michael','B','Smith',2025551004),('miles.burns@example.com','Miles','N','Burns',2025551070),('natalie.barnes@example.com','Natalie','','Barnes',2025551049),('natalie.young@example.com','Natalie','V','Young',1559102134),('nathan.cole@example.com','Nathan','M','Cole',2025551042),('noah.martin@example.com','Noah','','Martin',2025551010),('nora.henderson@example.com','Nora','G','Henderson',2025551031),('olivia.morris@example.com','Olivia','L','Morris',2025551005),('olivia.taylor@example.com','Olivia','L','Taylor',1557890123),('owen.barker@example.com','Owen','K','Barker',2025551072),('paisley.ray@example.com','Paisley','F','Ray',2025551063),('ruby.steele@example.com','Ruby','B','Steele',2025551067),('ryan.bell@example.com','Ryan','H','Bell',2025551038),('savannah.black@example.com','Savannah','C','Black',2025551057),('sebastian.wood@example.com','Sebastian','E','Wood',2025551028),('sienna.bowman@example.com','Sienna','L','Bowman',2025551061),('sophia.khan@example.com','Sophia','','Khan',2025551003),('sophie.knight@example.com','Sophie','C','Knight',2025551069),('testing','admin','a','admin',12345678),('tristan.hicks@example.com','Tristan','J','Hicks',2025551068),('tyler.hill@example.com','Tyler','Z','Hill',1558091023),('victoria.phillips@example.com','Victoria','N','Phillips',2025551033),('vincent.stone@example.com','Vincent','M','Stone',2025551058),('xavier.holt@example.com','Xavier','','Holt',2025551054),('zoe.foster@example.com','Zoe','M','Foster',2025551029),('zoe.graham@example.com','Zoe','L','Graham',2025551045),('zoey.richards@example.com','Zoey','J','Richards',2025551037);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:20
