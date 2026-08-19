# Project Documentation for CampusAdmin

## Project Overview
**Project Name**: CampusAdmin  
**Backend Framework**: Spring Boot  

CampusAdmin is a web application designed to manage student information efficiently. The application allows users to add, update, find, and delete student records through a user-friendly interface. The backend is built using Spring Boot, providing a robust and scalable solution for handling API requests.

## Features
- **Add Student**: Users can add new student records with relevant details.
- **Update Student**: Existing student records can be updated with new information.
- **Find Student**: Users can search for a student by their ID to view details.
- **Delete Student**: Users can remove a student record from the system.
- **View All Students**: A table displaying all students with pagination support for better performance and usability.

## Technical Stack
- **Frontend**: HTML, CSS (Bootstrap)
- **Backend**: Spring Boot
- **Database**: MySQL
- **API Communication**: RESTful APIs
- **API Documentation**: Swagger UI

## Configuration

| Variable | Default value |
| --- | --- |
| `DB_URL` | `jdbc:mysql://localhost:3306/student_db` |
| `DB_USER` | `campusadmin` |
| `DB_PASSWORD` | Empty |

Set these variables to connect to a different database or use different credentials. The previous default username was `root`; existing local setups should set `DB_USER` explicitly if they still use that account.

## Installation Instructions
1. **Clone the Repository**
   ```bash
   git clone https://github.com/lakshay1341/CampusAdmin.git
   cd CampusAdmin
   ```

2. **Set Up the Database**
   - Create a database in your preferred database management system.
   - Configure the application with the environment variables in the Configuration section.

3. **Run the Application**
   - Navigate to the project directory and run:
   ```bash
   ./mvnw spring-boot:run
   ```
   - The application will start on `http://localhost:8080`.

4. **Access the Swagger UI**
   - Open your web browser and go to:
     ```
     http://localhost:8080/swagger-ui.html
     ```
   - Use this interface to explore and test the APIs.

## API Documentation (via Swagger UI)

The API documentation for CampusAdmin is auto-generated and accessible through Swagger UI. It provides an interactive interface to test and understand all available endpoints.

### How to Use Swagger UI
1. Navigate to `http://localhost:8080/swagger-ui.html`.
2. Expand each API endpoint group to view detailed documentation.
3. Use the "Try it out" button to test API endpoints directly from the browser.
4. Review responses for each endpoint, including HTTP status codes and data structures.

### Example Endpoints (Available in Swagger UI)
- **POST /api/student/create**: Add a new student.
- **PUT /api/student/modify**: Update student details.
- **GET /api/student/find/{id}**: Find a student by ID.
- **DELETE /api/student/remove/{id}**: Delete a student by ID.
- **GET /api/student/all**: View all students with pagination.

## Conclusion

The CampusAdmin project provides a comprehensive solution for managing student records efficiently using modern web technologies. With the integration of Swagger UI, API testing and documentation have become seamless, enhancing the overall development and user experience.

## Contributing

Issues here are **first come, first merged**. Assignment is not reservation: if an issue is assigned to someone and you open a working PR first, yours is the one that gets merged. Commenting "I'd like to work on this" is welcome and I'll assign it, but it does not hold the issue against a PR that arrives sooner. If you want an issue, the reliable way to get it is to open the PR.
