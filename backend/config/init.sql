CREATE TABLE theatre (
    id SERIAL PRIMARY KEY,
    theatre_name VARCHAR(100),
    theatre_location VARCHAR(100)
);

CREATE TABLE screen (
    id SERIAL PRIMARY KEY,
    screen_number INT NOT NULL,
    theatre_id INT REFERENCES theatre(id) ON DELETE CASCADE
); 

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(100),
    duration INT NOT NULL
);

CREATE TABLE seat (
    id SERIAL PRIMARY KEY,
    booked BOOLEAN NOT NULL DEFAULT FALSE, 
    screen_id INT REFERENCES screen(id) ON DELETE CASCADE 
);

CREATE TABLE time_slot (
    id SERIAL PRIMARY KEY,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_date DATE NOT NULL,
    screen_id INT REFERENCES screen(id) ON DELETE CASCADE
);

CREATE TABLE booking (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    seat_id INT REFERENCES seat(id) ON DELETE CASCADE,
    time_slot_id INT REFERENCES time_slot(id) ON DELETE CASCADE
);