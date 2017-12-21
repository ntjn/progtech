CREATE TABLE IF NOT EXISTS characters (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    armySize int NOT NULL COLLATE utf8_hungarian_ci,
    state tinyint NOT NULL COLLATE utf8_hungarian_ci,
    house varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS houses (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    crest varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    motto varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS alliances (
    id int(11) NOT NULL AUTO_INCREMENT,
    houseP varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    houseQ varchar(32) NOT NULL COLLATE utf8_hungarian_ci,
    begin datetime NOT NULL COLLATE utf8_hungarian_ci,
    end datetime NOT NULL COLLATE utf8_hungarian_ci,
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci AUTO_INCREMENT=1 ;
