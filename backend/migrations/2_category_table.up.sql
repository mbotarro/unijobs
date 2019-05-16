CREATE TABLE IF NOT EXISTS category (
	id         serial,
	name       text NOT NULL,
	decription text,
	CONSTRAINT pk_category PRIMARY KEY (id)
);