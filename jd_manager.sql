/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : jd_manager

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-06-03 20:55:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `catelog`
-- ----------------------------
DROP TABLE IF EXISTS `catelog`;
CREATE TABLE `catelog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4h79h3yljn5e1pw3hqk5ygol2` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of catelog
-- ----------------------------
INSERT INTO `catelog` VALUES ('2', '单人房');
INSERT INTO `catelog` VALUES ('4', '双人房');
INSERT INTO `catelog` VALUES ('7', '商务房');
INSERT INTO `catelog` VALUES ('6', '大床房');
INSERT INTO `catelog` VALUES ('8', '特价房');

-- ----------------------------
-- Table structure for `hibernate_sequence`
-- ----------------------------
DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hibernate_sequence
-- ----------------------------
INSERT INTO `hibernate_sequence` VALUES ('1');
INSERT INTO `hibernate_sequence` VALUES ('1');

-- ----------------------------
-- Table structure for `room`
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `area` int(11) NOT NULL,
  `catelog_id` bigint(20) NOT NULL,
  `room_number` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `money` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `room_number` (`room_number`) USING BTREE,
  KEY `catelog_id` (`catelog_id`),
  CONSTRAINT `catelog_id` FOREIGN KEY (`catelog_id`) REFERENCES `catelog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('1', '100', '2', '200', '1557551073318.jpg', 'kkk', '1000');
INSERT INTO `room` VALUES ('12', '123', '2', '123', '1557551073318.jpg', '222', '11');
INSERT INTO `room` VALUES ('13', '18', '8', '55', '1557551073318.jpg', '限时特惠', '66');
INSERT INTO `room` VALUES ('16', '111', '2', '300', '1557551073318.jpg', '222', '111');
INSERT INTO `room` VALUES ('17', '11', '2', '255', '1557551073318.jpg', 'null', '11');
INSERT INTO `room` VALUES ('38', '4', '4', '555', '1557551073318.jpg', 'null', '5');
INSERT INTO `room` VALUES ('39', '444', '2', '444', '1557551073318.jpg', 'null', '44');
INSERT INTO `room` VALUES ('40', '24', '7', '111', '1557551073318.jpg', 'null', '666');
INSERT INTO `room` VALUES ('41', '555', '2', '222', '1557551073318.jpg', 'null', '441');
INSERT INTO `room` VALUES ('42', '555', '4', '666', '1557551073318.jpg', 'null', '44');
INSERT INTO `room` VALUES ('44', '666', '2', '333', '1557551073318.jpg', 'null', '555');
INSERT INTO `room` VALUES ('45', '199', '2', '777', '1557551073318.jpg', 'null', '111');
INSERT INTO `room` VALUES ('46', '22', '2', '43', '1557551073318.jpg', 'null', '22');
INSERT INTO `room` VALUES ('47', '33', '2', '44', '1557551073318.jpg', 'null', '33');
INSERT INTO `room` VALUES ('48', '77', '2', '77', '1557551073318.jpg', 'null', '77');
INSERT INTO `room` VALUES ('50', '22', '8', '877', '1557550961554.jpg', 'null', '555');
INSERT INTO `room` VALUES ('51', '32', '6', '423', '1557551073318.jpg', 'null', '22');
INSERT INTO `room` VALUES ('53', '333', '7', '888', '1557630326699.jpg', '', '333');
INSERT INTO `room` VALUES ('54', '222', '6', '1', '1557837746736.jpg', 'null', '555');
INSERT INTO `room` VALUES ('55', '23', '4', '1234', '1557835991740.jpg', 'null', '22');
INSERT INTO `room` VALUES ('56', '55', '4', '5', '1557836341477.jpg', 'null', '555');
INSERT INTO `room` VALUES ('57', '22', '4', '6', '1557837760676.jpg', 'null', '11');
INSERT INTO `room` VALUES ('58', '22', '2', '2', '1557838766806.jpg', 'null', '22');
INSERT INTO `room` VALUES ('59', '44', '6', '4', '1557838985742.jpg', 'null', '33');
INSERT INTO `room` VALUES ('60', '123', '2', '123546', '1591186821269.jpg', 'null', '22');

-- ----------------------------
-- Table structure for `subscription`
-- ----------------------------
DROP TABLE IF EXISTS `subscription`;
CREATE TABLE `subscription` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `start_time` bigint(20) NOT NULL,
  `end_time` bigint(20) NOT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0是未确认订单，1是确认订单',
  PRIMARY KEY (`id`),
  KEY `userId` (`user_id`),
  KEY `roomId` (`room_id`),
  CONSTRAINT `roomId` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `userId` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subscription
-- ----------------------------
INSERT INTO `subscription` VALUES ('1', '1', '1', '1556855989000', '1556942389000', '1');
INSERT INTO `subscription` VALUES ('2', '1', '16', '1556769600000', '1557288000000', '1');
INSERT INTO `subscription` VALUES ('3', '1', '13', '1557547200000', '1557633600000', '1');
INSERT INTO `subscription` VALUES ('4', '1', '1', '1558065600000', '1558152000000', '0');
INSERT INTO `subscription` VALUES ('5', '1', '1', '1558152000000', '1558238400000', '1');
INSERT INTO `subscription` VALUES ('6', '1', '50', '1557460800000', '1557547200000', '1');
INSERT INTO `subscription` VALUES ('7', '1', '47', '1557460800000', '1557633600000', '0');
INSERT INTO `subscription` VALUES ('8', '1', '47', '1557979200000', '1558065600000', '0');
INSERT INTO `subscription` VALUES ('9', '1', '48', '1557979200000', '1558065600000', '0');
INSERT INTO `subscription` VALUES ('10', '26', '48', '1557288000000', '1557547200000', '2');
INSERT INTO `subscription` VALUES ('11', '26', '46', '1557979200000', '1558065600000', '1');
INSERT INTO `subscription` VALUES ('12', '26', '46', '1556769600000', '1556942400000', '2');
INSERT INTO `subscription` VALUES ('13', '1', '12', '1557806400000', '1558065600000', '0');
INSERT INTO `subscription` VALUES ('14', '1', '38', '1557892800000', '1558152000000', '0');
INSERT INTO `subscription` VALUES ('15', '1', '57', '1557892800000', '1558152000000', '0');
INSERT INTO `subscription` VALUES ('16', '1', '55', '1557892800000', '1558152000000', '0');
INSERT INTO `subscription` VALUES ('17', '26', '42', '1557892800000', '1558065600000', '1');
INSERT INTO `subscription` VALUES ('18', '1', '42', '1560744000000', '1560916800000', '0');
INSERT INTO `subscription` VALUES ('19', '1', '56', '1559880000000', '1560052800000', '0');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `role` int(11) DEFAULT '0' COMMENT '0是普通用户，1是管理员',
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '1', 'admin', '17320211087', '123');
INSERT INTO `user` VALUES ('0', '7', '11', '11', '11');
INSERT INTO `user` VALUES ('0', '8', '11', '11', '11');
INSERT INTO `user` VALUES ('0', '9', '222', '33', '44');
INSERT INTO `user` VALUES ('0', '10', '55', '66', '77');
INSERT INTO `user` VALUES ('0', '11', '88', '99', '11');
INSERT INTO `user` VALUES ('0', '12', '11', '22', '33');
INSERT INTO `user` VALUES ('0', '13', '44', '55', '66');
INSERT INTO `user` VALUES ('0', '14', '888', '999', '111');
INSERT INTO `user` VALUES ('0', '19', 'ssss', '111', 'dddd');
INSERT INTO `user` VALUES ('0', '20', '123', '1563', '123');
INSERT INTO `user` VALUES ('0', '21', 'qin', '555', '123456');
INSERT INTO `user` VALUES ('0', '22', 'qinguoshuai', '666', 'aaa');
INSERT INTO `user` VALUES ('0', '23', 'kkk', '666', '123');
INSERT INTO `user` VALUES ('0', '24', 'aaa', '15637232065', '123');
INSERT INTO `user` VALUES ('0', '25', '1235', '15637232065', '666');
INSERT INTO `user` VALUES ('0', '26', 'yanmingxiao', '15637232065', '123456');
