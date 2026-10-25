# DCIT26 Lab 5: Student Records API
This is a REST API for managing student records using Express and MongoDB.

## Setup Instructions
1. Run `npm install`
2. Create a `.env` file based on `.env.example`
3. Run `npm run dev` to start the server
4. Install  Thunder Client to test the health route and every CRUD Operations

MongoDB Configuration
To run this API, you need to connect it to a MongoDB database:
1. Create a cluster in MongoDB Atlas (or use an existing one).
2. Create a database user with a username and password.
3. Get your MongoDB connection string (URI) from Atlas.
4. Create a .env file in the root directory based on the .env.example template.
5. Add your exact connection string to the .env file, replacing <your_username> and <your_password> with your database user credentials:

## API Routes
* GET /api/health 
* POST /api/students 
* GET /api/students 
* GET /api/students/:id 
* PUT /api/students/:id 
* DELETE /api/students/:id