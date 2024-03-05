CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

Mon Mar 04 2024 17:32:20 GMT+0530 (India Standard Time) 


insert into todos(id, user_email, title, progress, date) values('0', 'kiruba@gmail.com', 'First todo', 10, '^[[200~Mon Mar 04 2024 17:32:20 GMT+0530 (India Standard Time)