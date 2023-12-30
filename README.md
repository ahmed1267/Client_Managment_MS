**Client Management Microservice**
**Overview**

The Client Management Microservice is a GraphQL-based microservice built using TypeScript, Node.js, MongoDB, and potentially Docker for containerization. This microservice provides functionalities to manage client data, including creating, updating, retrieving single or multiple clients, and enforcing certain validations.

**Features:**  
  -GraphQL API: Utilizes GraphQL for defining queries and mutations to interact with client data.  
  -TypeScript: Utilizes TypeScript for static typing, enhancing code quality and maintainability.  
  -MongoDB: Uses MongoDB for storing client data and leverages Mongoose for object modeling.  
  -Docker Support: Provides Docker support for containerizing the microservice, facilitating deployment and scalability.  

**Requirements**  
  -Node.js (latest version)  
  -TypeScript (latest version)  
  -MongoDB  
  -tsx  
  -mongoose  
   -Apollo  
  -Graphql  
  -Docker (optional for containerization)  

**Installation**  
  -Clone the Repository
```
    git clone (https://github.com/ahmed1267/Client_Managment_MS)
```
  -Navigate to Project Directory

```
cd client-management-microservice
```

  -Install Dependencies

```
    npm install
    npm install --save-dev tsx
    npm install dotenv --save
    npm install --save graphql
    npm install @apollo/server graphql
    npm install mongoose --save    
```

  **Configuration**  
    Environment Variables  
      
  Create a .env file in the root directory.  
  Add MongoDB connection string, database credentials, and other necessary environment variables.  
    makefile
```
        DB_USERNAME=<your-db-username>
        DB_PASSWORD=<your-db-password>
```

**Usage**  
    Start the Application  

```
    npm run start
```
  GraphQL Endpoint:  
    Once the application is running, navigate to http://localhost:3000/graphql to access the GraphQL playground and execute queries and mutations.  

Docker Support (Optional)

  Build Docker Image

```
docker build -t client-management-microservice .
Run Docker Container
```

```
    docker run -p 3000:3000 client-management-microservice
```
