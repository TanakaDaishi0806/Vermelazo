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
-- Table structure for table `club_match`
--

DROP TABLE IF EXISTS `club_match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club_match` (
  `club_match_id` int(5) NOT NULL AUTO_INCREMENT,
  `year` int(4) NOT NULL,
  `month` int(2) NOT NULL,
  `day` int(2) NOT NULL,
  `vote_year` int(4) NOT NULL,
  `vote_month` int(2) NOT NULL,
  `vote_day` int(2) NOT NULL,
  `title` varchar(30) NOT NULL,
  `is_released` boolean DEFAULT false,
  `participant_num` int DEFAULT 0,
  `is_create_team` boolean DEFAULT false,
  `is_add_match` boolean DEFAULT false,
  `is_finish` boolean DEFAULT false,
  PRIMARY KEY (`club_match_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club_match`
--

LOCK TABLES `club_match` WRITE;
/*!40000 ALTER TABLE `club_match` DISABLE KEYS */;
/*!40000 ALTER TABLE `club_match` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Table structure for table `match_mom`
--

DROP TABLE IF EXISTS `match_mom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_mom` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `club_match_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  KEY `club_match_id` (`club_match_id`),
  KEY `match_id` (`match_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `match_mom_ibfk_1` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  CONSTRAINT `match_mom_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `matchs` (`match_id`),
  CONSTRAINT `match_mom_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  PRIMARY KEY (`id`)
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
  `match_id` int(5) NOT NULL AUTO_INCREMENT,
  `team_id_a` int(5) NOT NULL,
  `team_id_b` int(5) NOT NULL,
  `score_a` int(5),
  `score_b` int(5),
  `club_match_id` int(5) NOT NULL,
  `is_resister` boolean DEFAULT false,
  PRIMARY KEY (`match_id`),
  KEY `team_id_a` (`team_id_a`),
  KEY `team_id_b` (`team_id_b`),
  KEY `club_match_id` (`club_match_id`),
  CONSTRAINT `matchs_ibfk_1` FOREIGN KEY (`team_id_a`) REFERENCES `team` (`team_id`),
  CONSTRAINT `matchs_ibfk_2` FOREIGN KEY (`team_id_b`) REFERENCES `team` (`team_id`),
  CONSTRAINT `matchs_ibfk_3` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`)
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
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `club_match_id` int(5) NOT NULL,
  `match_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  KEY `club_match_id` (`club_match_id`),
  KEY `match_id` (`match_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `my_team_mom_ibfk_1` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  CONSTRAINT `my_team_mom_ibfk_2` FOREIGN KEY (`match_id`) REFERENCES `matchs` (`match_id`),
  CONSTRAINT `my_team_mom_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  PRIMARY KEY (`id`)
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `furigana` varchar(30) NOT NULL,
  `student_id` char(8) NOT NULL UNIQUE,
  `password` varchar(60) NOT NULL,
  `grade` int(1) NOT NULL,
  `role` int(1) DEFAULT 0,
  `mailaddress` varchar(50) NOT NULL,
  `point` int(5) DEFAULT 0,
  `position` int(1) NOT NULL,
  `experience` int(1) DEFAULT 0,
  `goal_num` int(3) DEFAULT 0,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `point_getter`
--

DROP TABLE IF EXISTS `point_getter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `point_getter` (
  `point_id` int(5) NOT NULL AUTO_INCREMENT,
  `match_id` int(5) NOT NULL,
  `team_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `club_match_id` int(5) NOT NULL,
  PRIMARY KEY (`point_id`),
  KEY `club_match_id` (`club_match_id`),
  KEY `match_id` (`match_id`),
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `point_getter_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matchs` (`match_id`),
  CONSTRAINT `point_getter_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `point_getter_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `point_getter_ibfk_5` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`)
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
-- Table structure for table `position_mom`
--

DROP TABLE IF EXISTS `position_mom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `position_mom` (
  `club_match_id` int(5) NOT NULL,
  `position` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  KEY `club_match_id` (`club_match_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `position_mom_ibfk_1` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  CONSTRAINT `position_mom_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  PRIMARY KEY (`club_match_id`, `position`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position_mom`
--

LOCK TABLES `position_mom` WRITE;
/*!40000 ALTER TABLE `position_mom` DISABLE KEYS */;
/*!40000 ALTER TABLE `position_mom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `team_id` int(5) NOT NULL AUTO_INCREMENT,
  `club_match_id` int(5) NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `club_match_id` (`club_match_id`),
  CONSTRAINT `team_ibfk_1` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`)
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
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participant` (
  `participant_id` int(5) NOT NULL AUTO_INCREMENT,
  `club_match_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  PRIMARY KEY (`participant_id`),
  KEY `club_match_id` (`club_match_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_club_match_id` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  CONSTRAINT `fk_club_match_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participant`
--

LOCK TABLES `participant` WRITE;
/*!40000 ALTER TABLE `participant` DISABLE KEYS */;
/*!40000 ALTER TABLE `participant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_member`
--

DROP TABLE IF EXISTS `team_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_member` (
  `team_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `club_match_id` int(5) NOT NULL,
  `is_exist` boolean DEFAULT true,
  KEY `team_id` (`team_id`),
  KEY `user_id` (`user_id`),
  KEY `club_match_id` (`club_match_id`),
  CONSTRAINT `team_member_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `team_member_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `team_member_ibfk_3` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  PRIMARY KEY (`team_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_member`
--

LOCK TABLES `team_member` WRITE;
/*!40000 ALTER TABLE `team_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_rank`
--

DROP TABLE IF EXISTS `team_rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_rank` (
  `team_id` int(5) NOT NULL,
  `club_match_id` int(5) NOT NULL,
  `point` int(3) DEFAULT 0,
  `match_num` int(2) DEFAULT 0,
  `win_num` int(2) DEFAULT 0,
  `draw_num` int(2) DEFAULT 0,
  `lose_num` int(2) DEFAULT 0,
  `goal_num` int(3) DEFAULT 0,
  `is_last_rank` boolean DEFAULT false,
  PRIMARY KEY (`team_id`,`club_match_id`),
  KEY `club_match_id` (`club_match_id`),
  KEY `team_id` (`team_id`),
  CONSTRAINT `team_rank_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`),
  CONSTRAINT `team_rank_ibfk_1` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_rank`
--

LOCK TABLES `team_rank` WRITE;
/*!40000 ALTER TABLE `team_rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_vote`
--

DROP TABLE IF EXISTS `match_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `match_vote` (
  `match_id` int(5) NOT NULL,
  `user_id` int(5) NOT NULL,
  `club_match_id` int(5) NOT NULL,
  `is_vote` boolean DEFAULT false,
  PRIMARY KEY (`match_id`,`user_id`),
  KEY `match_id` (`match_id`),
  KEY `user_id` (`user_id`),
  KEY `club_match_id` (`club_match_id`),
  CONSTRAINT `match_vote_ibfk_3` FOREIGN KEY (`club_match_id`) REFERENCES `club_match` (`club_match_id`),
  CONSTRAINT `match_vote_ibfk_1` FOREIGN KEY (`match_id`) REFERENCES `matchs` (`match_id`),
  CONSTRAINT `match_vote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_vote`
--

LOCK TABLES `match_vote` WRITE;
/*!40000 ALTER TABLE `match_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_vote` ENABLE KEYS */;
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
