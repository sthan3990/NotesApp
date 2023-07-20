-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS todo CASCADE;
CREATE TABLE todo (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER references users(id) ON DELETE CASCADE,
  category_id INTEGER references categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  desc VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  reminder BOOLEAN NOT NULL
);
