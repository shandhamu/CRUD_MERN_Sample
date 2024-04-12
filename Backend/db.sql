Create Table users (
userid int NOT NULL AUTO_INCREMENT,
username varchar(500),
email varchar(500),
verify boolean,
password varchar(50);
PRIMARY KEY (userid)
);
