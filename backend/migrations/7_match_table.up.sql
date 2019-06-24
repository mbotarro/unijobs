CREATE TABLE IF NOT EXISTS match (
	userid      serial,
	offerid     serial,  
	CONSTRAINT pk_category PRIMARY KEY (userid, offerid),
    FOREIGN KEY (userid) REFERENCES userdata(userid),
    FOREIGN KEY (offerid) REFERENCES offer(id)
);