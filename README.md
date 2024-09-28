# Seat Booking App

## Description
The Seat Booking App is a web application that allows users to book seats for movies in various theaters. Users can view available movies, select a theater and screen, choose their seats, and make bookings for specific time slots. This project aims to streamline the movie booking process for users and theater administrators.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and authentication
- Movie listing with details
- Theater and screen selection
- Seat selection and booking
- Time slot management
- Admin functionalities for managing movies, theaters, and bookings


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/GaneshPatil1806/seatBooking.git
   cd seat-booking-app
   npm install
   npm run migrate
   npm run dev

## Database Schema
### Theatre Table
- `id`: SERIAL PRIMARY KEY
- `theatre_name`: VARCHAR(100)
- `theatre_location`: VARCHAR(100)

### Screen Table
- `id`: SERIAL PRIMARY KEY
- `screen_number`: INT NOT NULL
- `theatre_id`: INT REFERENCES theatre(id) ON DELETE CASCADE

### User Table
- `id`: SERIAL PRIMARY KEY
- `name`: VARCHAR(100)
- `email`: VARCHAR(100) UNIQUE
- `password`: VARCHAR(100)

### Movie Table
- `id`: SERIAL PRIMARY KEY
- `movie_name`: VARCHAR(100)
- `duration`: INT NOT NULL

### Seat Table
- `id`: SERIAL PRIMARY KEY
- `seat_number`: INT NOT NULL
- `booked`: BOOLEAN NOT NULL DEFAULT FALSE
- `screen_id`: INT REFERENCES screen(id) ON DELETE CASCADE

### Time Slot Table
- `id`: SERIAL PRIMARY KEY
- `start_time`: TIME NOT NULL
- `end_time`: TIME NOT NULL
- `slot_date`: DATE NOT NULL
- `screen_id`: INT REFERENCES screen(id) ON DELETE CASCADE

### Booking Table
- `id`: SERIAL PRIMARY KEY
- `user_id`: INT REFERENCES user(id) ON DELETE CASCADE
- `seat_id`: INT REFERENCES seat(id) ON DELETE CASCADE
- `time_slot_id`: INT REFERENCES time_slot(id) ON DELETE CASCADE
