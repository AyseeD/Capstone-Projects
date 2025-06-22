Create table books (
	id SERIAL PRIMARY KEY NOT NULL,
	title TEXT NOT NULL,
	author VARCHAR(100) DEFAULT 'anonymous',
	review TEXT,
	picture TEXT
);