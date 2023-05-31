-- MySQL dump 10.13  Distrib 5.7.42, for osx10.18 (x86_64)
--
-- Host: localhost    Database: soccer
-- ------------------------------------------------------
-- Server version	5.7.42

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
-- Table structure for table `club_match_data`
--

DROP TABLE IF EXISTS `club_match_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_match_data` (
  `club_match_num` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  PRIMARY KEY (`club_match_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_match_data`
--

LOCK TABLES `club_match_data` WRITE;
/*!40000 ALTER TABLE `club_match_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `club_match_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_mom`
--

DROP TABLE IF EXISTS `match_mom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_mom` (
  `club_match_num` int(11) DEFAULT NULL,
  `match_num` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  KEY `club_match_num` (`club_match_num`),
  KEY `match_num` (`match_num`),
  KEY `id` (`id`),
  CONSTRAINT `match_mom_ibfk_1` FOREIGN KEY (`club_match_num`) REFERENCES `club_match_data` (`club_match_num`),
  CONSTRAINT `match_mom_ibfk_2` FOREIGN KEY (`match_num`) REFERENCES `matchs` (`match_num`),
  CONSTRAINT `match_mom_ibfk_3` FOREIGN KEY (`id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_mom`
--

LOCK TABLES `match_mom` WRITE;
/*!40000 ALTER TABLE `match_mom` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_mom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matchs` (
  `match_num` int(11) NOT NULL AUTO_INCREMENT,
  `team_num_a` int(11) DEFAULT NULL,
  `team_num_b` int(11) DEFAULT NULL,
  `scor_a` int(11) DEFAULT NULL,
  `scor_b` int(11) DEFAULT NULL,
  `club_match_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`match_num`),
  KEY `team_num_a` (`team_num_a`),
  KEY `team_num_b` (`team_num_b`),
  KEY `club_match_num` (`club_match_num`),
  CONSTRAINT `matchs_ibfk_1` FOREIGN KEY (`team_num_a`) REFERENCES `team` (`team_num`),
  CONSTRAINT `matchs_ibfk_2` FOREIGN KEY (`team_num_b`) REFERENCES `team` (`team_num`),
  CONSTRAINT `matchs_ibfk_3` FOREIGN KEY (`club_match_num`) REFERENCES `club_match_data` (`club_match_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchs`
--

LOCK TABLES `matchs` WRITE;
/*!40000 ALTER TABLE `matchs` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_team_mom`
--

DROP TABLE IF EXISTS `my_team_mom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `my_team_mom` (
  `club_match_num` int(11) DEFAULT NULL,
  `match_num` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  KEY `club_match_num` (`club_match_num`),
  KEY `match_num` (`match_num`),
  KEY `id` (`id`),
  CONSTRAINT `my_team_mom_ibfk_1` FOREIGN KEY (`club_match_num`) REFERENCES `club_match_data` (`club_match_num`),
  CONSTRAINT `my_team_mom_ibfk_2` FOREIGN KEY (`match_num`) REFERENCES `matchs` (`match_num`),
  CONSTRAINT `my_team_mom_ibfk_3` FOREIGN KEY (`id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_team_mom`
--

LOCK TABLES `my_team_mom` WRITE;
/*!40000 ALTER TABLE `my_team_mom` DISABLE KEYS */;
/*!40000 ALTER TABLE `my_team_mom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_info`
--

DROP TABLE IF EXISTS `personal_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `studentID` varchar(10) NOT NULL,
  `password` varchar(60) NOT NULL,
  `grade` int(11) NOT NULL,
  `role` int(11) DEFAULT '0',
  `mailaddress` varchar(500) DEFAULT NULL,
  `point` int(11) DEFAULT '0',
  `position` int(11) NOT NULL,
  `experience` int(11) DEFAULT '0',
  `furigana` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_info`
--

LOCK TABLES `personal_info` WRITE;
/*!40000 ALTER TABLE `personal_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point_getter`
--

DROP TABLE IF EXISTS `point_getter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `point_getter` (
  `point_num` int(11) NOT NULL AUTO_INCREMENT,
  `match_num` int(11) DEFAULT NULL,
  `team_num` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  PRIMARY KEY (`point_num`),
  KEY `match_num` (`match_num`),
  KEY `team_num` (`team_num`),
  KEY `id` (`id`),
  CONSTRAINT `point_getter_ibfk_1` FOREIGN KEY (`match_num`) REFERENCES `matchs` (`match_num`),
  CONSTRAINT `point_getter_ibfk_2` FOREIGN KEY (`team_num`) REFERENCES `team` (`team_num`),
  CONSTRAINT `point_getter_ibfk_3` FOREIGN KEY (`id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point_getter`
--

LOCK TABLES `point_getter` WRITE;
/*!40000 ALTER TABLE `point_getter` DISABLE KEYS */;
/*!40000 ALTER TABLE `point_getter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posision_mom`
--

DROP TABLE IF EXISTS `posision_mom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posision_mom` (
  `club_match_num` int(11) DEFAULT NULL,
  `Posision` int(11) NOT NULL,
  `id` int(11) DEFAULT NULL,
  KEY `club_match_num` (`club_match_num`),
  KEY `id` (`id`),
  CONSTRAINT `posision_mom_ibfk_1` FOREIGN KEY (`club_match_num`) REFERENCES `club_match_data` (`club_match_num`),
  CONSTRAINT `posision_mom_ibfk_2` FOREIGN KEY (`id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posision_mom`
--

LOCK TABLES `posision_mom` WRITE;
/*!40000 ALTER TABLE `posision_mom` DISABLE KEYS */;
/*!40000 ALTER TABLE `posision_mom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_num` int(11) NOT NULL AUTO_INCREMENT,
  `club_match_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`team_num`),
  KEY `club_match_num` (`club_match_num`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`club_match_num`) REFERENCES `club_match_data` (`club_match_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_member`
--

DROP TABLE IF EXISTS `team_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_member` (
  `team_num` int(11) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  KEY `team_num` (`team_num`),
  KEY `id` (`id`),
  CONSTRAINT `team_member_ibfk_1` FOREIGN KEY (`team_num`) REFERENCES `team` (`team_num`),
  CONSTRAINT `team_member_ibfk_2` FOREIGN KEY (`id`) REFERENCES `personal_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_member`
--

LOCK TABLES `team_member` WRITE;
/*!40000 ALTER TABLE `team_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 23:32:36
