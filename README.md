# MultiPlatform-Messaging

# This is a personal project I created over winter break. 

# This project incorporates Firebase Cloud Messaging, MongoDB Atlas Database Hosting, and AWS Lambda Functions to scale to user demand.

# The client2 folder is the UI implemented in react-native. The UI is responsible for client-side processing, updating local state, and running the UI in both Android and IOS environments.

# The newBackend folder contains the back-end logic, implemented in NodeJS and Javascript. The backend server is deployed on AWS Lambda function servers, and is responsible for processing and handling requests from multiple clients. The backend delegates to a MongoDB Atlas server to store user interactions, credentials, and messages. The program also uses bcrypt password hashing to provide security even in the case of a database breach. To enable the functionality of push notifications, Google Firebase is used to authenticate and notify users of incoming messages. Currently this feature is only implemented for Android.
All other features should be able to operate in both IOS and Android environments, but not having an Apple device, I have been unable to reliably test for IOS. 
