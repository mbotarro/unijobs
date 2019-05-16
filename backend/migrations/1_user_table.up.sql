CREATE TABLE IF NOT EXISTS userdata(
	username      text UNIQUE,
	password      text NOT NULL, 
	email         text UNIQUE,
	address       text,
	telephone     text UNIQUE,
	userid        serial,
	universitario boolean DEFAULT FALSE,
	CONSTRAINT pk_user PRIMARY KEY (userid)
);