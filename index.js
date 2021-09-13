const express = require('express');
bodyParser = require('body-parser');
morgan = require('morgan');
uuid = require('uuid');

const app = express();

let movies = [
  {
    title: ' The Notebook (2004)',
    director: 'Nick Cassavetes ',
    genre: 'Romantic drama'
  },
  {
    title: 'Titanic (1997)',
    director: 'James Cameron',
    genre: ' Epic romance and disaster'
  },
  {
    title: 'Jurassic Park (1993)',
    director: 'Steven Spielberg',
    genre: 'Science fiction action'
  },
  {
    title: 'WALL-E',
    director: 'Andrew Stanton',
    genre: 'Animated science fiction'
  },
  {
    title: 'The Lord Of The Rings: The Fellowship Of The Rings (2001)',
    director: 'Peter Jackson',
    genre: 'Fantasy adventure'
  },
  {
    title: 'The Lord Of The Rings: The Two Towers (2002)',
    director: 'Peter Jackson',
    genre: 'Fantasy adventure'
  },
  {
    title: 'The Lord Of The Rings: The Return Of The King (2003)',
    director: 'Peter Jackson',
    genre: 'Fantasy adventure'
  },
  {
    title: 'Toy Story',
    director: 'John Lasseter',
    genre: 'Computer-animated comedy'
  },
  {
    title: 'A Star Is Born (2018)',
    director: 'Bradley Cooper',
    genre: 'Musical romantic drama'
  },
  {
    title: 'Incredibles',
    director: ' Brad Bird',
    genre: 'Computer-animated superhero film'
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
  let movie = movies.find((movie) => {
    return movie.title === req.params.title
  });
  res.json(movie);
});

// Get movies by Genres
app.get('/movies/:genre', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.genre === req.params.genre
  });
  res.json(movie);
});

// Get movies by Directors Name
app.get('/director/:name', (req, res) => {
  let movie = movies.find((movie) => {
    return movie.director === req.params.director
  });
  res.json(movie);
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
app.put('/users/:id', (req, res) => {
  res.send(' Successfully updated');
});

// Allow users to add a movie to their list of favorites
app.post('/users/:id/movies/:id', (req, res) => {
  res.send('Successfully added to the Favourite list');
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:id/movies/:id', (req, res) => {
  res.send('Successfully removed from the favourite list');
});

// Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { 
    return user.id === req.params.id 
  });

  if (user) {
    users = users.filter((obj) => { 
      return obj.id !== req.params.id 
    });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});