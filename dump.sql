-- MySQL dump 10.16  Distrib 10.1.28-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: gameOfThrones
-- ------------------------------------------------------
-- Server version	10.1.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alliances`
--

DROP TABLE IF EXISTS `alliances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alliances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `houseP` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `houseQ` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `begin` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alliances`
--

LOCK TABLES `alliances` WRITE;
/*!40000 ALTER TABLE `alliances` DISABLE KEYS */;
INSERT INTO `alliances` VALUES (1,'Reed','Stark','2010-01-01 01:01:30','2010-01-01 01:01:35');
/*!40000 ALTER TABLE `alliances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `armySize` int(11) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `house` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Tyrionz',5,0,'Lannister'),(2,'Ned',5,0,'Stark'),(177,'test',9,1,'TH'),(178,'test',9,1,'TH'),(179,'test',9,1,'TH'),(180,'test',9,1,'TH'),(181,'test',9,1,'TH'),(182,'test',9,1,'TH'),(183,'test',9,1,'TH'),(184,'test',9,1,'TH'),(185,'test',9,1,'TH'),(186,'test',9,1,'TH'),(187,'fdsfsd',343,0,'fdsf'),(188,'test',9,1,'TH'),(189,'fdsf',5,0,'fsdfQQQQ'),(190,'test',9,1,'TH'),(191,'test',9,1,'TH'),(192,'test',9,1,'TH'),(193,'test',9,1,'TH'),(194,'test',9,1,'TH'),(195,'test',9,1,'TH'),(196,'test',9,1,'TH'),(197,'test',9,1,'TH'),(198,'Q',2,0,'W'),(199,'test',9,1,'TH'),(200,'test',9,1,'TH'),(201,'test',9,1,'TH'),(202,'test',9,1,'TH'),(203,'test',9,1,'TH'),(204,'test',9,1,'TH'),(205,'test',9,1,'TH'),(206,'test',9,1,'TH'),(207,'test',9,1,'TH'),(208,'test',9,1,'TH'),(209,'test',9,1,'TH'),(210,'test',9,1,'TH'),(211,'test',9,1,'TH'),(212,'test',9,1,'TH'),(213,'test',9,1,'TH'),(214,'test',9,1,'TH'),(215,'test',9,1,'TH'),(216,'test',9,1,'TH'),(217,'test',9,1,'TH'),(218,'test',9,1,'TH'),(219,'test',9,1,'TH'),(220,'test',9,1,'TH'),(221,'test',9,1,'TH'),(222,'test',9,1,'TH'),(223,'test',9,1,'TH'),(224,'test',9,1,'TH'),(225,'test',9,1,'TH'),(226,'test',9,1,'TH'),(227,'test',9,1,'TH'),(228,'test',9,1,'TH'),(229,'test',9,1,'TH'),(230,'test',9,1,'TH'),(231,'test',9,1,'TH'),(232,'test',9,1,'TH'),(233,'test',9,1,'TH'),(234,'test',9,1,'TH'),(235,'test',9,1,'TH'),(236,'test',9,1,'TH'),(237,'test',9,1,'TH'),(238,'test',9,1,'TH'),(239,'test',9,1,'TH'),(240,'Tyrion2',5,0,'Lannister2'),(241,'test',9,1,'TH'),(242,'test',9,1,'TH'),(243,'test',9,1,'TH'),(244,'test',9,1,'TH'),(245,'test',9,1,'TH'),(246,'test',9,1,'TH'),(247,'test',9,1,'TH'),(248,'test',9,1,'TH'),(249,'wer',3,0,'F'),(250,'wer',3,0,'F');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `crest` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `motto` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (1,'Stark','Direwolf','Winter is coming!'),(2,'Lannister','Lion','Hear Me Roar!'),(3,'Reed','Crocodile','-');
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-21 13:58:00
