# Arc Engine Interview Documentation

## Introduction
This documentation provides a detailed overview of the changes and enhancements made to the Arc Engine Interview project. The aim was to develop a simple web application akin to [tinyUrl](https://tinyurl.com/app) that transforms "long" URLs into shortened versions. The project tests proficiency in a range of technologies, including Docker, NodeJS, TypeScript, ReactJS, Express, Lambda, and DynamoDB.

## How to Run the Application
Before delving into the modifications, let's understand how to get the application up and running:

```bash
# (1) Clone the project repository
$ git clone https://github.com/izabayo7/arc-engine-interview-smalluri.git

# (2) Build the Docker images
$ sudo docker-compose build

# (3) Initiate and run the Docker containers
$ sudo docker-compose up
```

Once executed, you can access the frontend application by navigating to your browser and visiting `http://localhost:8080`.

## Detailed Changes and Enhancements

### 1) DynamoDB Table Creation
The infrastructure for DynamoDB was enhanced by creating a table named `URLMappings`. This table plays a pivotal role in mapping shortened URLs to their original counterparts.
- **Change**: The `infrastructure/dynamo/tables/example.json` was renamed to urlMappings and modified to incorporate the `ShortCode` field, which stores the shortened URL version.
  
### 2) API Endpoints
Two primary endpoints were introduced:
- **Short URL Creation**: Accepts a "long" URL and returns a shortened version.
- **URL Redirection**: Accepts the short URL and redirects to the original "long" URL.

### 3) Frontend Improvements
The frontend was refined to communicate with the backend via API calls. Upon providing a "long" URL, the frontend displays the generated short URL.
  
### 4) Logging and User Feedback
- **Logger**: Introduced to offer clearer log outputs for debugging and monitoring.
  - As a bonus the loggs will also be kept in files (application-yyy-mm-dd.log) to easily find logs.
- **Toastify**: Integrated on the frontend to display errors or notifications to the user.

### 5) Security Measures
To bolster the application's security:
- **Endpoints Removal**: Unnecessary endpoints (`/tables` and `/table/:name`) that might potentially expose database details were pruned.

### 6) Performance Optimization with Caching
Redis was employed as a caching solution to enhance the application's performance. This reduces the need to make frequent requests to DynamoDB by serving cached results, thereby improving response times.

### 7) Short URL Deletion
Added functionalities include:
- **Manual Deletion**: Users can delete a shortened URL by invoking a specific endpoint.
- **Automated Deletion**: Implemented a cron job that automatically removes short URLs older than a pre-configured duration.

### 8) Documentation
This file, `SOLUTION.md`, was introduced to furnish users with a step-by-step guide on how to run the application and understand the under-the-hood changes.

## Conclusion
The Arc Engine Interview project was augmented with a slew of features and improvements to meet the outlined objectives and then some. All changes were systematically documented in commits, providing a clear roadmap of the development journey. Rest assured, the application has been rigorously tested and is fully functional.