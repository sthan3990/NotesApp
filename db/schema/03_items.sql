<<<<<<< HEAD
CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES Categories(category_id),
    user_id INTEGER REFERENCES Users(user_id),
    status VARCHAR(20) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
=======
CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES Categories(category_id),
    user_id INTEGER REFERENCES Users(user_id),
    status VARCHAR(20) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
>>>>>>> 262bb02 (Implemented database.js Adding queries for login, register, Also fixed)
