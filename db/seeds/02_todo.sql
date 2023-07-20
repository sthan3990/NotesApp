-- todo table seeds here (example)


  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER references users(id) ON DELETE CASCADE,
  category_id INTEGER references categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  desc VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  reminder BOOLEAN NOT NULL

INSERT INTO todo (id, user_id, category_id, title, desc, date, reminder)
VALUES '1', '1', '1', '1', 'Lord of the Rings', 'Read LOTR', '2023-09-29', 'TRUE')

INSERT INTO todo (id, user_id, category_id, title, desc, date, reminder)
VALUES '2', '2', '2', 'Lord of the Rings', 'Watch LOTR', '2023-08-20', 'FALSE')

INSERT INTO todo (id, user_id, category_id, title, desc, date, reminder)
VALUES '3', '2', '3', 'Buy Harry Potter', 'Buy Harry Potter Books', '2023-08-25', 'TRUE')
