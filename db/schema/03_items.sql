CREATE TABLE Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES Categories(category_id),
    user_id INTEGER REFERENCES Users(user_id),
    status VARCHAR(20) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
