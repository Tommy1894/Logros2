/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 1usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `1usuarios` (
  `cedula` varchar(13) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(11) NOT NULL,
  `sexo` enum('M', 'F') NOT NULL,
  `fecha_nac` date NOT NULL,
  `correo` varchar(40) NOT NULL,
  `contrasena` varchar(20) NOT NULL,
  `perfil` enum('E', 'P', 'A') NOT NULL,
  `estado` enum('A', 'I', 'B') NOT NULL DEFAULT 'A',
  `intentos` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`cedula`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 2cursos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `2cursos` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `costo` float(12, 2) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` enum('A', 'I') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 3notificacions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `3notificacions` (
  `numReferencia` varchar(30) NOT NULL,
  `nom_banco` varchar(50) NOT NULL,
  `ced_titular` varchar(15) NOT NULL,
  `seccion_id` varchar(10) NOT NULL,
  `monto` float(12, 2) NOT NULL,
  `estado` enum('A', 'R', 'E') NOT NULL DEFAULT 'E',
  `fecha_pago` date NOT NULL,
  `fecha_procesada` date DEFAULT NULL,
  `est_cedula` varchar(13) NOT NULL,
  PRIMARY KEY (`numReferencia`),
  KEY `est_cedula` (`est_cedula`),
  CONSTRAINT `3notificacions_ibfk_1` FOREIGN KEY (`est_cedula`) REFERENCES `1usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 4seccions
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `4seccions` (
  `id` varchar(10) NOT NULL,
  `modalidad` enum('I', 'S') NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date DEFAULT NULL,
  `hora_inicio` time NOT NULL,
  `hora_finalizacion` time NOT NULL,
  `cupo_actual` int(2) NOT NULL,
  `cupo_maximo` int(2) NOT NULL,
  `estado` enum('A', 'I') NOT NULL DEFAULT 'A',
  `curso_id` int(10) NOT NULL,
  `prof_cedula` varchar(13) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `curso_id` (`curso_id`),
  KEY `prof_cedula` (`prof_cedula`),
  CONSTRAINT `4seccions_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `2cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `4seccions_ibfk_2` FOREIGN KEY (`prof_cedula`) REFERENCES `1usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: 5nota
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `5nota` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nota` float(3, 1) DEFAULT NULL,
  `seccion_id` varchar(10) NOT NULL,
  `est_cedula` varchar(13) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `seccion_id` (`seccion_id`),
  KEY `est_cedula` (`est_cedula`),
  CONSTRAINT `5nota_ibfk_1` FOREIGN KEY (`seccion_id`) REFERENCES `4seccions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `5nota_ibfk_2` FOREIGN KEY (`est_cedula`) REFERENCES `1usuarios` (`cedula`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 1usuarios
# ------------------------------------------------------------

INSERT INTO
  `1usuarios` (
    `cedula`,
    `nombre`,
    `apellido`,
    `direccion`,
    `telefono`,
    `sexo`,
    `fecha_nac`,
    `correo`,
    `contrasena`,
    `perfil`,
    `estado`,
    `intentos`
  )
VALUES
  (
    '10',
    'tony',
    'negron',
    'xd',
    '2345',
    'M',
    '2023-07-17',
    'ton.@gmail.com',
    'uwu',
    'E',
    'A',
    0
  );
INSERT INTO
  `1usuarios` (
    `cedula`,
    `nombre`,
    `apellido`,
    `direccion`,
    `telefono`,
    `sexo`,
    `fecha_nac`,
    `correo`,
    `contrasena`,
    `perfil`,
    `estado`,
    `intentos`
  )
VALUES
  (
    '28',
    'uwu',
    'negron',
    'xd',
    '2345',
    'M',
    '2023-07-17',
    'ton.s@gmail.com',
    'uwu',
    'E',
    'A',
    0
  );
INSERT INTO
  `1usuarios` (
    `cedula`,
    `nombre`,
    `apellido`,
    `direccion`,
    `telefono`,
    `sexo`,
    `fecha_nac`,
    `correo`,
    `contrasena`,
    `perfil`,
    `estado`,
    `intentos`
  )
VALUES
  (
    '2ga25',
    'uwu',
    'negron',
    'xd',
    '2345',
    'M',
    '2023-07-17',
    'ton.azs@gmail.com',
    'uwu',
    'P',
    'A',
    0
  );
INSERT INTO
  `1usuarios` (
    `cedula`,
    `nombre`,
    `apellido`,
    `direccion`,
    `telefono`,
    `sexo`,
    `fecha_nac`,
    `correo`,
    `contrasena`,
    `perfil`,
    `estado`,
    `intentos`
  )
VALUES
  (
    '9999',
    'bolivar',
    'ndsa',
    'asdf',
    '023',
    'F',
    '2023-07-05',
    'asd',
    'zXC',
    'E',
    'A',
    0
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 2cursos
# ------------------------------------------------------------

INSERT INTO
  `2cursos` (`id`, `nombre`, `costo`, `descripcion`, `estado`)
VALUES
  (10, 'uwu', 20.00, 'rafael.vicente.sa@gmail.com', 'A');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 3notificacions
# ------------------------------------------------------------

INSERT INTO
  `3notificacions` (
    `numReferencia`,
    `nom_banco`,
    `ced_titular`,
    `seccion_id`,
    `monto`,
    `estado`,
    `fecha_pago`,
    `fecha_procesada`,
    `est_cedula`
  )
VALUES
  (
    '243425',
    'merca',
    '292134',
    '23',
    245.00,
    'A',
    '2023-07-17',
    NULL,
    '28'
  );
INSERT INTO
  `3notificacions` (
    `numReferencia`,
    `nom_banco`,
    `ced_titular`,
    `seccion_id`,
    `monto`,
    `estado`,
    `fecha_pago`,
    `fecha_procesada`,
    `est_cedula`
  )
VALUES
  (
    '24543425',
    'merca',
    '28',
    '10',
    2345.00,
    'E',
    '2023-07-17',
    NULL,
    '28'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 4seccions
# ------------------------------------------------------------

INSERT INTO
  `4seccions` (
    `id`,
    `modalidad`,
    `fecha_inicio`,
    `fecha_finalizacion`,
    `hora_inicio`,
    `hora_finalizacion`,
    `cupo_actual`,
    `cupo_maximo`,
    `estado`,
    `curso_id`,
    `prof_cedula`
  )
VALUES
  (
    '23',
    'S',
    '2023-07-17',
    '2023-07-17',
    '16:00:00',
    '16:00:00',
    4,
    5,
    'A',
    10,
    '10'
  );
INSERT INTO
  `4seccions` (
    `id`,
    `modalidad`,
    `fecha_inicio`,
    `fecha_finalizacion`,
    `hora_inicio`,
    `hora_finalizacion`,
    `cupo_actual`,
    `cupo_maximo`,
    `estado`,
    `curso_id`,
    `prof_cedula`
  )
VALUES
  (
    '236',
    'S',
    '2023-07-04',
    '2023-07-04',
    '12:17:43',
    '12:17:43',
    10,
    20,
    'A',
    10,
    '10'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: 5nota
# ------------------------------------------------------------

INSERT INTO
  `5nota` (`id`, `nota`, `seccion_id`, `est_cedula`)
VALUES
  (4, NULL, '23', '28');
INSERT INTO
  `5nota` (`id`, `nota`, `seccion_id`, `est_cedula`)
VALUES
  (5, 20.0, '23', '10');
INSERT INTO
  `5nota` (`id`, `nota`, `seccion_id`, `est_cedula`)
VALUES
  (6, 18.0, '236', '28');
INSERT INTO
  `5nota` (`id`, `nota`, `seccion_id`, `est_cedula`)
VALUES
  (7, NULL, '23', '9999');

# ------------------------------------------------------------
# TRIGGER DUMP FOR: registrar_nota
# ------------------------------------------------------------

DROP TRIGGER IF EXISTS registrar_nota;
DELIMITER ;;
CREATE TRIGGER `registrar_nota` AFTER UPDATE ON 3notificacions FOR EACH ROW BEGIN IF new.estado='A' THEN INSERT INTO 5nota (seccion_id, est_cedula) VALUES (new.seccion_id, new.est_cedula); END IF; END;;
DELIMITER ;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
