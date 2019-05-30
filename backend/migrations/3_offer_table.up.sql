CREATE TABLE IF NOT EXISTS offer (
	id         serial,
	name       text NOT NULL,
	description text, 
	price       integer,
	userid      integer ,
	categoryid  integer,
	CONSTRAINT pk_offer PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (categoryid) REFERENCES category(id)
);
