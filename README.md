# TO-DOs Microservices Project

This project implements a TO-DOs web application using microservices architecture. The application allows users to create, edit, and delete TO-DOs, and it also includes a notification service for sending reminders about approaching deadlines.
## Prerequisites

Before running the project, make sure you have the following software installed:

- Node.js: Ensure that you have Node.js installed on your machine. You can download it from the official website: https://nodejs.org

- MongoDB: Install MongoDB Community Edition by following the instructions provided in the MongoDB documentation: https://docs.mongodb.com/manual/administration/install-community/

- RabbitMQ: Install RabbitMQ by following the installation guide provided in the RabbitMQ documentation: https://www.rabbitmq.com/download.html


## Services

The project consists of the following microservices:

1. **TODO Service**: Responsible for managing TO-DOs. It provides API endpoints for creating, updating, and deleting TO-DOs. The service persists the data in a MongoDB database and publishes messages to a RabbitMQ message broker for further processing.

2. **Notification Service**: Handles the notification logic and sends reminders to users when TO-DO deadlines are approaching. It consumes messages from the RabbitMQ message broker and checks if the deadlines have passed. If a TO-DO is expired, it sends a notification to the user.

## Technologies Used

- Node.js: A JavaScript runtime environment used for building server-side applications.
- MongoDB: A NoSQL database used for persisting TO-DO data.
- RabbitMQ: A message broker used for inter-service communication and handling asynchronous message processing.
- TypeScript: A typed superset of JavaScript used for writing clean and scalable code.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
2. Install dependencies:
3. Start the Services:

   - Open a terminal and navigate to the `todo-service` directory.
   - Run the following command to start the TODO Service: npm run dev

   - Open another terminal and navigate to the `notification-service` directory.
   - Run the following command to start the Notification Service: npm run dev

5. The services should now be up and running. You can access the TODO Service API endpoints at `http://localhost:<TODO_SERVICE_PORT>` and send requests to manage TO-DOs. The Notification Service will consume messages from RabbitMQ and send notifications for expired deadlines.

## Conclusion

This project demonstrates the implementation of a TO-DOs web application using microservices architecture. The separation of concerns into distinct services allows for scalability, maintainability, and independent development and deployment of each service. The TODO Service handles CRUD operations for TO-DOs, while the Notification Service handles the notification logic. Together, they provide a seamless and efficient user experience.

Feel free to explore and enhance the project based on your specific requirements.
