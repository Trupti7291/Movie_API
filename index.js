const express = require('express');
bodyParser = require('body-parser');
morgan = require('morgan');
uuid = require('uuid');

const app = express();

let movies = [
  {
    title: ' The Notebook (2004)',
    director: 'Nick Cassavetes ',
  },
  {
    title: 'Titanic (1997)',
    director: 'James Cameron'
  },
  {
    title: 'Jurassic Park (1993)',
    director: 'Steven Spielberg'
  },
  {
    title: 'WALL-E',
    director: 'Andrew Stanton'
  },
  {
    title: 'The Lord Of The Rings: The Fellowship Of The Rings (2001)',
    director: 'Peter Jackson'
  },
  {
    title: 'The Lord Of The Rings: The Two Towers (2002)',
    director: 'Peter Jackson'
  },
  {
    title: 'The Lord Of The Rings: The Return Of The King (2003)',
    director: 'Peter Jackson'
  },
  {
    title: 'Toy Story',
    director: 'John Lasseter'
  },
  {
    title: 'A Star Is Born (2018)',
    director: 'Bradley Cooper'
  },
  {
    title: 'Incredibles',
    director: ' Brad Bird'
  }
  
];

app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => { 
  res.send('Welcome to the movie app');
});

// Get all Movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// Get Movies by title
app.get('/movies/:title', (req, res) => {
  res.json(movies);
});

// Get movies by Genres
app.get('/movies/:genre', (req, res) => {
  res.json(movies);
});

// Get movies by Directors Name
app.get('/directors/:name', (req, res) => {
  res.json(movies);
});

// Allow new users to register
app.post('/users', (req, res) => {
  let newUsers = req.body

  if(!newUsers.name) {
    const message = 'Missing name in a request body';
    res.status(400).send(message);
  }
  else {
    newUsers.id = uuid.v4();
    users.push(newUsers);
    res.status(201).send(newUsers);
  }
});

//Allow users to update their user info (username)
app.put('/users/:name', (req, res) => {
  res.json();
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Name/movies/:MovieID', (req, res) => {
  res.json();
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:Name/movies/:MovieID', (req, res) => {

});

// Allow existing users to deregister
app.delete('/users/:name', (req, res) => {

});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});