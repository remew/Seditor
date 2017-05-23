
-- drop to exist tables;
DROP TABLE IF EXISTS scenario;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS tag;

DROP TABLE IF EXISTS tagging;

-- account
CREATE TABLE account (
    id serial primary key,
    email varchar(64) NOT NULL UNIQUE,
    name varchar(16) NOT NULL,
    hashed_password varchar(64) NOT NULL,
    created_at timestamp default now() NOT NULL
);

-- scenario
CREATE TABLE scenario (
    id serial primary key,
    owner_id integer NOT NULL,
    title varchar(32) NOT NULL,
    body text NOT NULL,
    updated_at timestamp default now() NOT NULL,
    created_at timestamp default now() NOT NULL,
    foreign key(owner_id) references account(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- tag
CREATE TABLE tag (
    id serial primary key,
    name varchar(16) NOT NULL UNIQUE
);

-- relation table
-- tagging
CREATE TABLE tagging (
    scenario_id integer NOT NULL,
    tag_id integer NOT NULL,
    PRIMARY KEY(scenario_id, tag_id),
    foreign key(scenario_id) references scenario(id),
    foreign key(tag_id) references tag(id)
);


