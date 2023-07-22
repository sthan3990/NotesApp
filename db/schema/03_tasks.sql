DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    user_id INTEGER REFERENCES users(id),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);