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
-- Table structure for table `client_accounts`
--

DROP TABLE IF EXISTS `client_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_accounts` (
  `Email` varchar(255) NOT NULL,
  `User` varchar(45) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `Access_level` int NOT NULL,
  PRIMARY KEY (`Email`),
  CONSTRAINT `client_accounts_ibfk_1` FOREIGN KEY (`Email`) REFERENCES `client` (`Email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_accounts`
--

LOCK TABLES `client_accounts` WRITE;
/*!40000 ALTER TABLE `client_accounts` DISABLE KEYS */;
INSERT INTO `client_accounts` VALUES ('adam.dixon@example.com','adixon','X9rT7bF3','NONMEMBER',1),('alexander.bryant@example.com','abryant','Jm4pUc8nRv123','MEMBER',2),('amelia.jenkins@example.com','ajenkins','Vq6rTf2oNm','MEMBER',2),('aria.morgan@example.com','amorgan','aT4zVuW2','NONMEMBER',1),('ashley.hall@example.com','ahall','Lp5uCn8rYk','MEMBER',2),('ashton.doyle@example.com','adoyle','qL9nH2eK','NONMEMBER',1),('aubree.wells@example.com','awells','Jd6Pq4Nz','NONMEMBER',1),('aubrey.perry@example.com','aperry','Rm3Ew7Yv','NONMEMBER',1),('ava.hernandez@example.com','ahern','uH6Nc3Lo','NONMEMBER',1),('benjamin.carter@example.com','bcarter','Ax1qTr9mZc','MEMBER',2),('blake.summers@example.com','bsummers','Ks5Tp9Wd','NONMEMBER',1),('brian.martin@example.com','bmartin','Zn7Qx2Cb','NONMEMBER',1),('carter.brooks@example.com','cbrooks','Fo8Wd5Jr','NONMEMBER',1),('chloe.hughes@example.com','chughes','Nc2uPw6oLv','MEMBER',2),('chloe.wilson@example.com','cwilson','Hp3rZv5qMn','MEMBER',2),('christopher.ross@example.com','cross','Xy9Bp6Km','NONMEMBER',1),('claire.hansen@example.com','chansen','Ar4Gq2Mf','NONMEMBER',1),('cole.parker@example.com','cparker','Vc1Nd7Ts','NONMEMBER',1),('daniel.lee@example.com','dlee','Ur1cTa5lGq','MEMBER',2),('david.lopez@example.com','dlopez','Lw5Jm8Qr','NONMEMBER',1),('david.ward@example.com','dward','Hp3Za9Et','NONMEMBER',1),('elena.bradley@example.com','ebradley','Qv6Kx2Yt','NONMEMBER',1),('elijah.bailey@example.com','eballey','Ng8Dr4Vb','NONMEMBER',1),('ella.diaz@example.com','ediaz','Pk2yNo9cTw','MEMBER',2),('ella.turner@example.com','eturner','Ec2Rf5Jz','NONMEMBER',1),('emily.james@example.com','ejames','Af4yTz9mVc','MEMBER',2),('emma.davis@example.com','edavis','Kw2eNx8dJo','MEMBER',2),('ethan.patel@example.com','epatel','Rg1kPn7vUc','MEMBER',2),('evelyn.watson@example.com','ewatson','Mw7Ks9Ti','NONMEMBER',1),('george.bates@example.com','gbates','Pq3Zb6Lu','NONMEMBER',1),('grace.reed@example.com','greed','Tz3pNm7cXq','MEMBER',2),('hannah.shaw@example.com','hshaw','Lt9Ym4Gv','NONMEMBER',1),('harper.taylor@example.com','htaylor','Lt0nKf5vJm','MEMBER',2),('hazel.mason@example.com','hmason','Rt5Bj2Kp','NONMEMBER',1),('henry.cook@example.com','hcook','Sp6Lm3Ae','NONMEMBER',1),('isaac.foster@example.com','ifoster','Bn2Wq8Ys','NONMEMBER',1),('isabella.rivera@example.com','irivera','Tm1Zr9Xc','NONMEMBER',1),('jack.green@example.com','jgreen','Zw7Tp3Qv','NONMEMBER',1),('jacob.wright@example.com','jwright','Yl6Fd4Kw','NONMEMBER',1),('jake.baker@example.com','jbaker','Bm6rLd0nYq','MEMBER',2),('james.bennett@example.com','jbennett','Xp3Br9Uc','NONMEMBER',1),('jessica.clark@example.com','jclark','Tb9sQd2eLu','MEMBER',2),('john.doe@example.com','jdoe','Zq6pLv0tHd','MEMBER',2),('john@example.com','john','john','MEMBER',2),('jonah.garrett@example.com','jgarret','Ng7Ks2Mv','NONMEMBER',1),('joseph.hall@example.com','jhall','Ht1Qx5Fw','NONMEMBER',1),('julian.evans@example.com','jevans','Wu9Bj6Ze','NONMEMBER',1),('justin.scott@example.com','jscott','Ax8Wp2Ks','NONMEMBER',1),('kevin.nguyen@example.com','knguyen','Je0dKt6bXw','MEMBER',2),('lauren.green@example.com','lgreen','Qf3nKs7dHp','MEMBER',2),('layla.owens@example.com','lowens','Lq4Vr7Nj','NONMEMBER',1),('leah.long@example.com','llong','Ct3Zy5Pm','NONMEMBER',1),('leo.ramos@example.com','lramons','Jr2Xt8Gq','NONMEMBER',1),('liam.murphy@example.com','lmurphy','Sw7cBl3qXp','MEMBER',2),('lily.ross@example.com','lross','Mv6La3Zw','NONMEMBER',1),('lisa.chen@example.com','lchen','Mf9uYc3kBn','MEMBER',2),('logan.thomas@example.com','lthomas','Kw9Qb2Ft','NONMEMBER',1),('lucas.coleman@example.com','lcoleman','Hb8qRm4tYv','MEMBER',2),('lucy.caldwell@example.com','lcaldwell','Nb5Xw7Gc','NONMEMBER',1),('madison.fox@example.com','mfox','Ys1Pt4Ek','NONMEMBER',1),('matthew.kelly@example.com','mkelly','Tx3Jd9Vw','NONMEMBER',1),('megan.king@example.com','mking','Xt6cAm9vQf','MEMBER',2),('mia.nguyen@example.com','mnguyen','Pv4Rw8Yc','NONMEMBER',1),('michael.brown@example.com','mbrown','nA4wRz7bPh','MEMBER',2),('michael.smith@example.com','msmith','Kd9vRn3pLe','MEMBER',2),('miles.burns@example.com','mburns','Rn8Fa3Ls','NONMEMBER',1),('natalie.barnes@example.com','nbarnes','Lp7Qm6Wk','NONMEMBER',1),('natalie.young@example.com','nyoung','Ck8pXw2vTd','MEMBER',2),('nathan.cole@example.com','ncole','Gv3Kp9Qt','NONMEMBER',1),('noah.martin@example.com','nmartin','Xn3dKc5lZw','MEMBER',2),('nora.henderson@example.com','nhenderson','Qy2Lb8Nj','NONMEMBER',1),('olivia.morris@example.com','omorris','Ms2xLq8tHo','MEMBER',2),('olivia.taylor@example.com','otaylor','Vb7oQm9nXs','MEMBER',2),('owen.barker@example.com','obarker','Ac9Vf3Kw','NONMEMBER',1),('paisley.ray@example.com','pray','Dj6Zr2Mc','NONMEMBER',1),('ruby.steele@example.com','rsteele','Zm1Lp7Fx','NONMEMBER',1),('ryan.bell@example.com','rbell','Vb5Wr3Kj','NONMEMBER',1),('savannah.black@example.com','sblack','Hq8Xn9Gl','NONMEMBER',1),('sebastian.wood@example.com','swood','Pr2Zm4Uw','NONMEMBER',1),('sienna.bowman@example.com','sbownman','Rw9Kc6Yj','NONMEMBER',1),('sophie.knight@example.com','sknight','Lk7Gp2Rt','NONMEMBER',1),('testing','admin','seila','MEMBER',2),('tristan.hicks@example.com','thicks','Yc5Mr3Bw','NONMEMBER',1),('victoria.phillips@example.com','vphill','Eq2Xw8Jm','NONMEMBER',1),('vincent.stone@example.com','vstone','Ot3Lz9Fv','NONMEMBER',1),('xavier.holt@example.com','xholt','Gd1Mq7Kw','NONMEMBER',1),('zoe.foster@example.com','zfoster','Fk8Vb2Ly','NONMEMBER',1),('zoe.graham@example.com','zgrahahm','Tw6Yp3Nc','NONMEMBER',1),('zoey.richards@example.com','zrichards','Ks4Xt8Qv','NONMEMBER',1);
/*!40000 ALTER TABLE `client_accounts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-23 17:55:21
