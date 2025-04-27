CREATE TABLE IF NOT EXISTS `art` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`title` varchar(255) NOT NULL,
  	`description` varchar(255) NOT NULL,
  	`year` varchar(255) NOT NULL,
  	`url` varchar(255)  NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

INSERT INTO `art` (`id`, `title`, `description`, `year`, `url`) VALUES
(1, 'Gato Mafioso', 'Uma obra de arte representando uma figura ilustrativa de um gato mafioso.', '2024', 'aaaaaaaaaaaa'),
(2, 'Ganso de terno', 'Uma obra de arte representando uma figura ilustrativa de um ganso vestindo um terno.', '2024', 'aaaaaaaaa'),
(3, 'Lobo Sombrio', 'Uma obra de arte representando um lobo sombrio.', '2025', 'aaaaaaaaaaa');
