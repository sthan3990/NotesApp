-- Drop and recreate Users table (Example)
-- Page renders category as the true value

DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  watch BOOLEAN,
  read BOOLEAN,
  buy BOOLEAN
);
