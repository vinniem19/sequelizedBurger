Create database burgers_db;
use burgers_db;
Create table burgers (
    id int AUTO_INCREMENT NOT NULL,
    burger_name VARCHAR(255) NOT NULL,
    devoured BOOLEAN,
    PRIMARY KEY(id)
);
 