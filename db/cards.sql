-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : dim. 30 jan. 2022 à 23:52
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cards`
--
CREATE DATABASE IF NOT EXISTS `cards` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `cards`;

-- --------------------------------------------------------

--
-- Structure de la table `card`
--

CREATE TABLE `card` (
  `card_id` bigint NOT NULL,
  `color` int DEFAULT NULL,
  `number` int NOT NULL,
  `symbol` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `card`
--

INSERT INTO `card` (`card_id`, `color`, `number`, `symbol`) VALUES
(5, NULL, 1, 5),
(6, NULL, 2, 4),
(7, NULL, 3, 6),
(9, NULL, 1, 5),
(10, NULL, 2, 4),
(11, NULL, 3, 6),
(12, 0, 1, 0),
(13, 0, 2, 0),
(14, 0, 3, 0),
(15, 0, 4, 0),
(16, 0, 5, 0),
(17, 0, 6, 0),
(18, 0, 7, 0),
(19, 0, 8, 0),
(20, 0, 9, 0),
(21, 0, 10, 0),
(22, 0, 11, 0),
(23, 0, 12, 0),
(24, 0, 13, 0),
(25, 0, 1, 1),
(26, 0, 2, 1),
(122, 0, 4, 0),
(28, 0, 4, 1),
(29, 0, 5, 1),
(30, 0, 6, 1),
(31, 0, 7, 1),
(32, 0, 8, 1),
(33, 0, 9, 1),
(34, 0, 10, 1),
(35, 0, 11, 1),
(36, 0, 12, 1),
(37, 0, 13, 1),
(38, 1, 1, 3),
(39, 1, 2, 3),
(40, 1, 3, 3),
(41, 1, 4, 3),
(42, 1, 5, 3),
(43, 1, 6, 3),
(44, 1, 7, 3),
(120, 0, 2, 0),
(46, 1, 9, 3),
(47, 1, 10, 3),
(48, 1, 11, 3),
(49, 1, 12, 3),
(50, 1, 13, 3),
(51, 1, 1, 2),
(52, 1, 2, 2),
(53, 1, 3, 2),
(54, 1, 4, 2),
(55, 1, 5, 2),
(56, 1, 6, 2),
(57, 1, 7, 2),
(58, 1, 8, 2),
(59, 1, 9, 2),
(60, 1, 10, 2),
(61, 1, 11, 2),
(62, 1, 12, 2),
(63, 1, 13, 2),
(64, 0, 1, 0),
(65, 0, 2, 0),
(66, 0, 3, 0),
(67, 0, 4, 0),
(68, 0, 5, 0),
(121, 0, 3, 0),
(70, 0, 7, 0),
(119, 0, 1, 0),
(72, 0, 9, 0),
(73, 0, 10, 0),
(74, 0, 11, 0),
(75, 0, 12, 0),
(76, 0, 13, 0),
(77, 0, 1, 1),
(78, 0, 2, 1),
(79, 0, 3, 1),
(80, 0, 4, 1),
(81, 0, 5, 1),
(82, 0, 6, 1),
(83, 0, 7, 1),
(84, 0, 8, 1),
(85, 0, 9, 1),
(86, 0, 10, 1),
(87, 0, 11, 1),
(88, 0, 12, 1),
(89, 0, 13, 1),
(90, 1, 1, 3),
(91, 1, 2, 3),
(92, 1, 3, 3),
(93, 1, 4, 3),
(94, 1, 5, 3),
(95, 1, 6, 3),
(96, 1, 7, 3),
(97, 1, 8, 3),
(98, 1, 9, 3),
(99, 1, 10, 3),
(100, 1, 11, 3),
(101, 1, 12, 3),
(102, 1, 13, 3),
(103, 1, 1, 2),
(104, 1, 2, 2),
(105, 1, 3, 2),
(106, 1, 4, 2),
(107, 1, 5, 2),
(108, 1, 6, 2),
(109, 1, 7, 2),
(110, 1, 8, 2),
(111, 1, 9, 2),
(112, 1, 10, 2),
(113, 1, 11, 2),
(114, 1, 12, 2),
(115, 1, 13, 2),
(123, 0, 5, 0),
(124, 0, 6, 0),
(125, 0, 7, 0),
(126, 0, 8, 0),
(127, 0, 9, 0),
(128, 0, 10, 0),
(129, 0, 11, 0),
(130, 0, 12, 0),
(131, 0, 13, 0),
(132, 0, 1, 1),
(133, 0, 2, 1),
(134, 0, 3, 1),
(135, 0, 4, 1),
(136, 0, 5, 1),
(137, 0, 6, 1),
(138, 0, 7, 1),
(139, 0, 8, 1),
(140, 0, 9, 1),
(141, 0, 10, 1),
(142, 0, 11, 1),
(143, 0, 12, 1),
(144, 0, 13, 1),
(145, 1, 1, 3),
(146, 1, 2, 3),
(147, 1, 3, 3),
(148, 1, 4, 3),
(149, 1, 5, 3),
(150, 1, 6, 3),
(151, 1, 7, 3),
(152, 1, 8, 3),
(153, 1, 9, 3),
(154, 1, 10, 3),
(155, 1, 11, 3),
(156, 1, 12, 3),
(157, 1, 13, 3),
(158, 1, 1, 2),
(159, 1, 2, 2),
(160, 1, 3, 2),
(161, 1, 4, 2),
(162, 1, 5, 2),
(163, 1, 6, 2),
(164, 1, 7, 2),
(165, 1, 8, 2),
(166, 1, 9, 2),
(167, 1, 10, 2),
(168, 1, 11, 2),
(169, 1, 12, 2),
(170, 1, 13, 2),
(174, 0, 1, 0),
(175, 0, 2, 0),
(176, 0, 3, 0),
(177, 0, 4, 0),
(178, 0, 5, 0),
(179, 0, 6, 0),
(180, 0, 7, 0),
(181, 0, 8, 0),
(182, 0, 9, 0),
(183, 0, 10, 0),
(184, 0, 11, 0),
(185, 0, 12, 0),
(186, 0, 13, 0),
(187, 0, 1, 1),
(188, 0, 2, 1),
(189, 0, 3, 1),
(190, 0, 4, 1),
(191, 0, 5, 1),
(192, 0, 6, 1),
(193, 0, 7, 1),
(194, 0, 8, 1),
(195, 0, 9, 1),
(196, 0, 10, 1),
(197, 0, 11, 1),
(198, 0, 12, 1),
(199, 0, 13, 1),
(200, 1, 1, 3),
(201, 1, 2, 3),
(202, 1, 3, 3),
(203, 1, 4, 3),
(204, 1, 5, 3),
(205, 1, 6, 3),
(206, 1, 7, 3),
(207, 1, 8, 3),
(208, 1, 9, 3),
(209, 1, 10, 3),
(210, 1, 11, 3),
(211, 1, 12, 3),
(212, 1, 13, 3),
(213, 1, 1, 2),
(214, 1, 2, 2),
(215, 1, 3, 2),
(216, 1, 4, 2),
(217, 1, 5, 2),
(218, 1, 6, 2),
(219, 1, 7, 2),
(220, 1, 8, 2),
(221, 1, 9, 2),
(222, 1, 10, 2),
(223, 1, 11, 2),
(224, 1, 12, 2),
(225, 1, 13, 2);

-- --------------------------------------------------------

--
-- Structure de la table `deck_cards`
--

CREATE TABLE `deck_cards` (
  `game_game_id` bigint NOT NULL,
  `deck_card_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `deck_cards`
--

INSERT INTO `deck_cards` (`game_game_id`, `deck_card_id`) VALUES
(171, 225),
(171, 224),
(171, 223),
(171, 222),
(171, 221),
(171, 220),
(171, 219),
(171, 218),
(171, 217),
(171, 216),
(171, 215),
(171, 214),
(171, 213),
(171, 211),
(171, 208),
(171, 207),
(171, 206),
(171, 205),
(171, 204),
(171, 203),
(171, 202),
(171, 201),
(171, 200),
(171, 199),
(171, 198),
(171, 197),
(171, 196),
(171, 195),
(171, 194),
(171, 193),
(171, 192),
(171, 191),
(171, 190),
(171, 189),
(171, 188),
(171, 187),
(171, 186),
(171, 185),
(171, 184),
(171, 183),
(171, 182),
(171, 181),
(171, 180),
(171, 179),
(171, 178),
(171, 177),
(171, 175),
(171, 174);

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `game_id` bigint NOT NULL,
  `game_status` int DEFAULT NULL,
  `manche` int NOT NULL,
  `max_manche` int NOT NULL,
  `name` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `game`
--

INSERT INTO `game` (`game_id`, `game_status`, `manche`, `max_manche`, `name`) VALUES
(3, 0, 2, 3, 0),
(116, 0, 2, 3, 2),
(171, 0, 1, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `game_players`
--

CREATE TABLE `game_players` (
  `game_game_id` bigint NOT NULL,
  `player_list_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `game_players`
--

INSERT INTO `game_players` (`game_game_id`, `player_list_id`) VALUES
(3, 4),
(3, 8),
(116, 117),
(116, 118),
(171, 173),
(171, 172);

-- --------------------------------------------------------

--
-- Structure de la table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(226);

-- --------------------------------------------------------

--
-- Structure de la table `last_winner_player`
--

CREATE TABLE `last_winner_player` (
  `last_winner_id` bigint DEFAULT NULL,
  `game_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE `player` (
  `id` bigint NOT NULL,
  `score` int NOT NULL,
  `user_user_id` bigint DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `player`
--

INSERT INTO `player` (`id`, `score`, `user_user_id`) VALUES
(4, 1, 2),
(8, 0, NULL),
(117, 0, 2),
(118, 1, NULL),
(172, 13, 2),
(173, 20, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `player_hand`
--

CREATE TABLE `player_hand` (
  `player_id` bigint NOT NULL,
  `hand_card_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `player_hand`
--

INSERT INTO `player_hand` (`player_id`, `hand_card_id`) VALUES
(4, 5),
(4, 6),
(4, 7),
(8, 9),
(8, 10),
(8, 11),
(117, 12),
(117, 13),
(117, 14),
(117, 15),
(117, 16),
(117, 17),
(117, 18),
(117, 19),
(117, 20),
(117, 21),
(117, 22),
(117, 23),
(117, 24),
(117, 25),
(117, 26),
(117, 27),
(117, 28),
(117, 29),
(117, 30),
(117, 31),
(117, 32),
(117, 33),
(117, 34),
(117, 35),
(117, 36),
(117, 37),
(117, 38),
(117, 39),
(117, 40),
(117, 41),
(117, 42),
(117, 43),
(117, 44),
(117, 45),
(117, 46),
(117, 47),
(117, 48),
(117, 49),
(117, 50),
(117, 51),
(117, 52),
(117, 53),
(117, 54),
(117, 55),
(117, 56),
(117, 57),
(117, 58),
(117, 59),
(117, 60),
(117, 61),
(117, 62),
(117, 63),
(118, 64),
(118, 65),
(118, 66),
(118, 67),
(118, 68),
(118, 69),
(118, 70),
(118, 71),
(118, 72),
(118, 73),
(118, 74),
(118, 75),
(118, 76),
(118, 77),
(118, 78),
(118, 79),
(118, 80),
(118, 81),
(118, 82),
(118, 83),
(118, 84),
(118, 85),
(118, 86),
(118, 87),
(118, 88),
(118, 89),
(118, 90),
(118, 91),
(118, 92),
(118, 93),
(118, 94),
(118, 95),
(118, 96),
(118, 97),
(118, 98),
(118, 99),
(118, 100),
(118, 101),
(118, 102),
(118, 103),
(118, 104),
(118, 105),
(118, 106),
(118, 107),
(118, 108),
(118, 109),
(118, 110),
(118, 111),
(118, 112),
(118, 113),
(118, 114),
(118, 115),
(173, 212),
(173, 209),
(172, 210),
(172, 176);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_id` bigint NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pseudo` varchar(255) DEFAULT NULL,
  `role` int DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `email`, `password`, `pseudo`, `role`, `username`) VALUES
(1, 'admin@gmail.com', '$2a$10$QBAc6PTRhGy27.gBHNpeG.0MyCvJifTcMyEs5R2ugeDS.DK2xRutS', 'Admin', 1, 'admin@gmail.com'),
(2, 'relhanti@gmail.com', '$2a$10$f61sOgozugk51mgdPDBFwensD8CuLyST8Ng49NR0tU5yoOJxg3gb.', 'Redha', 0, 'relhanti@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `winner`
--

CREATE TABLE `winner` (
  `winner_id` bigint DEFAULT NULL,
  `game_id` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`card_id`);

--
-- Index pour la table `deck_cards`
--
ALTER TABLE `deck_cards`
  ADD UNIQUE KEY `UK_m0xqyw8f6pyvcq95829mufaqq` (`deck_card_id`),
  ADD KEY `FK43whcx11xdkq8fdoau0fkcybd` (`game_game_id`);

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`);

--
-- Index pour la table `game_players`
--
ALTER TABLE `game_players`
  ADD UNIQUE KEY `UK_3h2cm0b5q3glwgn7h0t1hs7lu` (`player_list_id`),
  ADD KEY `FKtaqwqj699sigdheaesl1idxk2` (`game_game_id`);

--
-- Index pour la table `last_winner_player`
--
ALTER TABLE `last_winner_player`
  ADD PRIMARY KEY (`game_id`),
  ADD KEY `FK3p0h7tm9x79s9xmgc9nasskhx` (`last_winner_id`);

--
-- Index pour la table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi08poxythxcnmt9x8ui8kii8i` (`user_user_id`);

--
-- Index pour la table `player_hand`
--
ALTER TABLE `player_hand`
  ADD UNIQUE KEY `UK_oc6lhqlpvfe8jutwk5444t9bh` (`hand_card_id`),
  ADD KEY `FK2rt5vgq8ajqdqdfudtarwgkm7` (`player_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `winner`
--
ALTER TABLE `winner`
  ADD PRIMARY KEY (`game_id`),
  ADD KEY `FKch25bn1k9h32tj86tkr2flm4q` (`winner_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
