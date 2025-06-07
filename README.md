# Goski Gallery - CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application for managing art pieces in the Goski Gallery.

## Features

- Create, view, edit, and delete art pieces
- Simple and responsive design
- No frameworks used, just pure PHP, HTML, CSS, and JavaScript

## Setup Instructions

### Database Setup

1. Create a MySQL database named `artGallery`
2. Import the `backend/create_tables.sql` file to create the necessary tables and sample data
3. Update the database connection details in `backend/config.php` if needed

### Running the Application

1. Place the entire project folder in your web server's document root (e.g., htdocs for XAMPP)
2. Access the application through your web browser: `http://localhost/goski_gallery/frontend/`

## Project Structure

- `backend/`: Contains PHP files for the API and database operations
  - `config.php`: Database connection configuration
  - `create.php`: API endpoint for creating art pieces
  - `read.php`: API endpoint for retrieving all art pieces
  - `read_single.php`: API endpoint for retrieving a single art piece
  - `update.php`: API endpoint for updating art pieces
  - `delete.php`: API endpoint for deleting art pieces
  - `create_tables.sql`: SQL script to create the database tables and sample data

- `frontend/`: Contains HTML, CSS, and JavaScript files for the user interface
  - `index.html`: Homepage with featured art pieces
  - `create.html`: Page for adding new art pieces
  - `library.html`: Page for viewing, editing, and deleting art pieces
  - `css/`: Contains stylesheets
    - `styles.css`: Main stylesheet for the application
  - `js/`: Contains JavaScript files
    - `api.js`: Utility functions for API communication
    - `index.js`: Script for the homepage
    - `create.js`: Script for the create page
    - `library.js`: Script for the library page
  - `images/`: Directory for storing image assets

## Technologies Used

- Backend: PHP (no frameworks)
- Database: MySQL
- Frontend: HTML, CSS, JavaScript (no frameworks)
- Fonts: Google Fonts (Montserrat, Playfair Display)

## Domain

goskigallery.com
