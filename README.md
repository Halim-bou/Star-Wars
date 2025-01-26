# Star-Wars-Explorer

Star-Wars-Explorer is a dynamic and interactive web application for Star Wars enthusiasts. This app offers a user-friendly interface to explore characters, movies, and more, with added functionality like user comments and authentication.

---

## Features

### Home Page

- A simple and well-designed introduction to the app.
- Easy navigation to explore characters and movies.

### Character Page

- Displays Star Wars characters with images.
- Pop-up details for each character when clicked.
- Option to add comments for each character (requires login).
- Pagination for smooth navigation through the list of characters.

### Movies Page

- Lists Star Wars movies with episode details.
- Pop-up information for each episode when clicked.
- Pagination for an enhanced browsing experience.

### Authentication

- Simple and secure user registration, login, and logout functionality.
- Users must log in to add comments.

---

## Installation Guide

### Prerequisites

- **Node.js**: Install Node.js using [Node.js official website](https://nodejs.org/).
- **NVM**: Use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to manage Node.js versions.
- **MariaDB**: Install MariaDB from the [official site](https://mariadb.org/).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/star-wars-explorer.git
   cd star-wars-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Start MariaDB.
   - Create a database named `star_wars`:
     ```sql
     CREATE DATABASE star_wars;
     ```

4. Configure environment variables:

   - In the main folder, create a `.env` file with the following content:
     ```env
     DB_USER_NAME=your_db_username
     DB_PASSWORD=your_db_password
     ```

5. Start the development server:

   ```bash
   npm run dev
   ```

---

## Technologies Used

### Frontend

- **React**: For building a dynamic user interface.
- **TypeScript**: For type safety and better code quality.
- **TailwindCSS**: For styling with a modern, responsive design.
- **Vite**: For a faster development environment.

### Backend

- **ExpressJS**: For creating the backend server.
- **MariaDB**: For database management.
- **JWT Authentication**: For secure user sessions.

---

## Data Integration

- **Star Wars API**: The app fetches data for characters and movies dynamically.
- Each character or episode click triggers a pop-up displaying details fetched from the API.
- Comments are linked to individual characters or episodes, stored in the database.

---

## New Technologies Explored

- **ExpressJS**: For handling API requests and database integration.
- **Vite**: To streamline the development and build process.
- **ESLint**: To enforce code quality standards.

---

## How to Use

1. Open the home page to navigate through the app.
2. Visit the character or movie pages to explore Star Wars content.
3. Click on any character or episode for detailed information.
4. Log in to add comments to any character or episode.

---

## Contribution

Feel free to fork the repository and submit pull requests with improvements. Contributions are always welcome!

---

## AUTH

Abdelhalim elbouaami.
