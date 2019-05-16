CREATE TABLE interest (
	id          serial,
	name        text NOT NULL,
	description text,
	price       integer,
	userid      integer NOT NULL,
	categoryid  integer NOT NULL,
	CONSTRAINT pk_interest PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (categoryid) REFERENCES category(id)
);
