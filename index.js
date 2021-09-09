const express = require('express');
morgan = require('morgan');

const app = express();

let movies = [
  {
    title: ' The Notebook (2004)',
    director: 'Nick Cassavetes '
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

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.send('Welcome to the movie app');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});