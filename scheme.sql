CREATE DATABASE reminder_list;
USE reminder_list;
 CREATE TABLE users(id_user TINYINT auto_increment PRIMARY KEY, name VARCHAR(50), pasword VARCHAR(8), country VARCHAR(3), city VARCHAR(20), UNIQUE (email) VARCHAR(20));
 CREATE TABLE lists(id_list TINYINT auto_increment PRIMARY KEY, name_list VARCHAR(20), datetime_register TIMESTAMP DEFAULT CURRENT_TIMESTAMP, id_user TINYINT, FOREIGN KEY(id_user) REFERENCES users(id_user));
 CREATE TABLE items(id_message TINYINT auto_increment PRIMARY KEY, message VARCHAR(100), datetime_reminder TIMESTAMP CURRENT_TIMESTAMP, id_list TINYINT, FOREIGN KEY(id_list) REFERENCES lists (id_list));
