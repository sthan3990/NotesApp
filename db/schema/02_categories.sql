<<<<<<< HEAD
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE categories (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
=======
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL
);
>>>>>>> 578b71b (Implemented database.js Adding queries for login, register, Also fixed)
