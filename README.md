# movie API

This App will consist of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. 

The REST API will be accessed via commonly used HTTP methods like GET and POST. Similar methods(CRUD) will be used to retrieve data from your database and store that data in a non-relationalway. 

Whenever users of myFlix are interacting with the application, the server-side of the application will be in use, processing their requests and performing operations against the data in the database. These users will be able to use the myFlix application whenever they like to read information about different movies or update their user information, for instance, their list of “Favorite Movies.”

## Feature Requirements
- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a
single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

## Technical Requirements
- The API must be a Node.js and Express application.
- The API must use REST architecture, with URL endpoints corresponding to the data
operations listed above
- The API must use at least three middleware modules, such as the body-parser package for
reading data from requests and morgan for logging.
- The API must use a “package.json” file.
- The database must be built using MongoDB.
- The business logic must be modeled with Mongoose.
- The API must provide movie information in JSON format.
- The JavaScript code must be error-free.
- The API must be tested in Postman.
- The API must include user authentication and authorization code.
- The API must include data validation logic.
- The API must meet data security regulations.
- The API source code must be deployed to a p