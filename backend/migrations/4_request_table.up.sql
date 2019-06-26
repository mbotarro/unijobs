CREATE TABLE IF NOT EXISTS request (
	id          text NOT NULL,
	name        text NOT NULL,
	description text, 
	extrainfo	text NOT NULL,
	minprice    integer,
	maxprice    integer,
	userid      integer NOT NULL,
	categoryid  integer,
	timestamp	timestamp NOT NULL,
	telephone 	text NOT NULL,
	email		text NOT NULL, 
	CONSTRAINT pk_request PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (categoryid) REFERENCES category(id)
);
