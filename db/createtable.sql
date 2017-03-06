
-- drop to exist tables;
DROP TABLE IF EXISTS scenario;
DROP TABLE IF EXISTS account;

-- account
CREATE TABLE account (
    id serial primary key,
    email varchar(64) unique,
    password varchar(64)
);

-- scenario
CREATE TABLE scenario (
    id serial primary key,
    owner integer NOT NULL,
    title varchar(32) NOT NULL,
    body text NOT NULL,
    updated_at timestamp default now(),
    created_at timestamp default now(),
    foreign key(owner) references account(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

