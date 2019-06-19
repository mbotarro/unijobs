CREATE TABLE IF NOT EXISTS category (
	id         serial,
	name       text NOT NULL,
	description text,
	CONSTRAINT pk_category PRIMARY KEY (id)
);