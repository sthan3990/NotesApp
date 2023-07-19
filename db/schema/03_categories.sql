-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  watch VARCHAR(255) NOT NULL,
  read VARCHAR(255) NOT NULL,
  buy VARCHAR(255) NOT NULL,
);
