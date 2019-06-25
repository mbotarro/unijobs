CREATE TABLE IF NOT EXISTS match (
	userid      serial,
	offerid     text,  
	CONSTRAINT pk_match PRIMARY KEY (userid, offerid),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (offerid) REFERENCES offer(id)
);