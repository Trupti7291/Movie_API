const express = require('express');
bodyParser = require('body-parser');
morgan = require('morgan');
uuid = require('uuid');
mongoose = require('mongoose');
Models = require('./models.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifieldTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(express.static('public'));

let movies = [
  {
    Title: 'The Notebook',
    Description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    Genre: 'Romantic drama',
    Director: 'Nick Cassavetes ',
    ImagePath: " https://upload.wikimedia.org/wikipedia/en/8/86/Posternotebook.jpg",

  },
  {
    Title: 'Titanic',
    Description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    Genre: ' Romance and disaster',
    Director: 'James Cameron',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/19/Titanic_%28Official_Film_Poster%29.png",

  },
  {
    Title: 'Jurassic Park',
    Description: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    Genre: 'Science fiction action',
    Director: 'Steven Spielberg',
    ImagePath: "https://images-na.ssl-images-amazon.com/images/I/8142L+TQEyL.jpg",

  },
  {
    Title: 'WALL-E',
    Description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.",
    Genre: 'Animated',
    Director: 'Andrew Stanton',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/WALL-Eposter.jpg/220px-WALL-Eposter.jpg",

  },
  {
    Title: 'The Lord Of The Rings: The Fellowship Of The Rings',
    Description: " A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    Genre: 'Fantasy adventure',
    Director: 'Peter Jackson',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",

  },
  {
    Title: 'The Lord Of The Rings: The Two Towers',
    Description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    Genre: 'Fantasy adventure',
    Director: 'Peter Jackson',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/d/d0/Lord_of_the_Rings_-_The_Two_Towers_%282002%29.jpg",

  },
  {
    title: 'The Lord Of The Rings: The Return Of The King',
    Description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    Genre: 'Fantasy adventure',
    Director: 'Peter Jackson',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/be/The_Lord_of_the_Rings_-_The_Return_of_the_King_%282003%29.jpg",
  },
  {
    Title: 'Toy Story',
    Description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    Genre: 'Animated comedy',
    Director: 'John Lasseter',
    ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",

  },
  {
    Title: 'A Star Is Born',
    Description: "A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.",
    Genre: 'Romantic drama',
    Director: 'Bradley Cooper',
    ImagePath: "https://m.media-amazon.com/images/M/MV5BNmE5ZmE3OGItNTdlNC00YmMxLWEzNjctYzAwOGQ5ODg0OTI0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",

  },
  {
    Title: 'Incredibles',
    Description: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world.",
    Genre: 'Animated superhero film',
    Director: ' Brad Bird',
    ImagePath: "https://m.media-amazon.com/images/M/MV5BMTY5OTU0OTc2NV5BMl5BanBnXkFtZTcwMzU4MDcyMQ@@._V1_.jpg",

  }

];



app.get('/', (req, res) => {
  res.send('Welcome to the movie app');
});

// Get all Movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    });
});

// Get Movies by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get movies by Genres
app.get('/genre/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
      res.json(genre.Description);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get movies by Directors Name
app.get('/director/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get all users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Allow new users to register
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//Allow users to update their user info (username)
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      }
    });
});

// Allow users to add a movie to their list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $push: { FavouriteMovies: req.params.MovieID } },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      }
    });
});

// Allow users to remove a movie from their list of favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndDelete({ Username: req.params.Username }, { $pull: { FavouriteMovies: req.params.MovieID } },
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error: ' + error);
      }
    });
});

// Allow existing users to deregister
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + 'was not found');
      }
      else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});