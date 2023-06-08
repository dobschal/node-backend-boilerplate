CREATE TABLE users
(
    user_id    serial PRIMARY KEY,
    username   VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);
