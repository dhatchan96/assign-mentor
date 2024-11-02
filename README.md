
# Mentor Student API

This project is a simple Mentor and Student Assigning API built with Node.js, Express, and MongoDB. It provides endpoints to create mentors and students, assign students to mentors, change mentor assignments, and view related data.

## Features

- **Create Mentor**: Create a new mentor with a unique name.
- **Create Student**: Create a new student with a unique name.
- **Assign Students to Mentor**: Assign multiple students to a specified mentor.
- **Change Mentor for Student**: Change the assigned mentor for a specific student.
- **List Students for Mentor**: Show all students assigned to a particular mentor.
- **List Previous Mentors for Student**: View a list of previously assigned mentors for a particular student.

## Prerequisites

- **Node.js** (v12 or higher)
- **MongoDB Atlas** (or a local MongoDB instance for development)
- **Postman** (for testing API endpoints)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dhatchan96/assign-mentor
    cd assign-mentor
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your MongoDB URI and other necessary variables:

    **.env**
    ```plaintext
    MONGO_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/mentor_student_db?retryWrites=true&w=majority
    PORT=3000
    ```

4. Start the server:

    ```bash
    node server.js
    ```

5. The server should now be running on `http://localhost:3000`.

## API Endpoints

### 1. Create a Mentor

- **URL**: `POST /mentors`
- **Body** (JSON):
    ```json
    {
      "name": "John Doe"
    }
    ```
- **Description**: Creates a new mentor.

### 2. Create a Student

- **URL**: `POST /students`
- **Body** (JSON):
    ```json
    {
      "name": "Jane Smith"
    }
    ```
- **Description**: Creates a new student.

### 3. Assign Multiple Students to a Mentor

- **URL**: `POST /mentors/{mentorId}/assign-students`
- **Body** (JSON):
    ```json
    {
      "studentIds": ["<studentId1>", "<studentId2>"]
    }
    ```
- **Description**: Assigns multiple students to a specified mentor.

### 4. Assign or Change Mentor for a Student

- **URL**: `PUT /students/{studentId}/assign-mentor`
- **Body** (JSON):
    ```json
    {
      "mentorId": "<mentorId>"
    }
    ```
- **Description**: Changes the mentor assigned to a specific student.

### 5. Show All Students for a Particular Mentor

- **URL**: `GET /mentors/{mentorId}/students`
- **Description**: Lists all students assigned to a particular mentor.

### 6. Show Previously Assigned Mentors for a Student

- **URL**: `GET /students/{studentId}/previous-mentors`
- **Description**: Shows previously assigned mentors for a specific student.

## Testing in Postman

You can test this API by importing the provided Postman collection and accessing the published documentation.

- **Published Postman Documentation**: [Mentor Student API Documentation](https://web.postman.co/workspace/c97313b9-26ed-426f-85e3-1044b4c2b6c1/collection/39256239-1ab34e25-3368-4e41-8a30-7f799ff3a81b)

## Directory Structure

```
assign-mentor/
├── models/
│   ├── Mentor.js
│   └── Student.js
├── routes/
│   ├── mentors.js
│   └── students.js
├── .env
├── .gitignore
├── app.js
└── server.js
```

## Important Notes

- **In-Memory vs Persistent Storage**: This project uses MongoDB for persistent data storage.
- **Environment Variables**: Ensure you have a `.env` file with the necessary configuration.

## License

This project is licensed under the MIT License.
