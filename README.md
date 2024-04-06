# HMO COVID Tracker

The HMO COVID Tracker is a web-based application designed to manage information related to COVID-19 patients within an HMO (Health Maintenance Organization) or healthcare system. This application allows healthcare providers to add, view, update, and delete user records, facilitating efficient management of COVID-19 cases.

## Features

- **Add User**: Healthcare providers can add new users/patients to the system by filling out a form with their personal details, including ID, name, contact information, address, sickness date, recovery date, and vaccine details.
  
- **User Management**: The application provides functionalities to view a list of all registered users, delete users, and update user information.

## Technologies Used

- **HTML**: Used for creating the structure and layout of the web pages.
  
- **CSS**: Used for styling the web pages and enhancing user interface elements.
  
- **JavaScript**: Used for client-side scripting to handle user interactions and perform asynchronous requests to the server.
  
- **Node.js**: A JavaScript runtime used for building server-side applications. It serves as the backend for handling data storage and retrieval.
  
- **Express.js**: A web application framework for Node.js used for routing and handling HTTP requests in the backend.

- **RESTful API**: The application follows the principles of Representational State Transfer (REST) architecture for designing its API endpoints.

- **JSON**: Data exchanged between the client and server is formatted using JSON (JavaScript Object Notation), a lightweight data interchange format.

## Getting Started

1. Clone the repository to your local machine:

2. Install dependencies:

3. Start the server:

4. Access the application in your web browser at `http://localhost:3000`.

## Usage

1. **Adding a User**:
- Navigate to the "Add User" page.
- Fill out the form with the user's details.
- Click "Add User" to submit the information to the server.

2. **Viewing User Records**:
- Access the homepage to view a table listing all registered users.
- Use the provided options to delete or update user records.

3. **Updating User Information**:
- Navigate to the "Update User" page.
- Enter the user ID of the record you want to update.
- Modify the user's details as needed.
- Click "Update User" to save the changes.

4. **Deleting a User**:
- On the homepage, enter the ID of the user you want to delete in the designated field.
- Click "Delete" to remove the user from the system.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/improvement`).
5. Create a new Pull Request.
