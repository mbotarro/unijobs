CREATE TABLE IF NOT EXISTS offer (
	id         	text NOT NULL,
	name       	text NOT NULL,
	description text, 
	extrainfo	text,
	minprice    integer,
	maxprice    integer,
	userid      integer NOT NULL,
	categoryid  integer,
	timestamp	timestamp NOT NULL,
	CONSTRAINT pk_offer PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (categoryid) REFERENCES category(id)
);
