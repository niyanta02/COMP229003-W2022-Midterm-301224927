/**
 * Author's Name  : Niyanta
 * Student ID : 301224927
 * App Name :  Favourite Movie
 * File Name :  movie.js
 */

// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(movieList)
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    });
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    let id = req.params.id;
    // movie by its id
    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', 
            {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE 
     let movie = Movie()
     // to render movie add_edit page
     res.render('movie/add_edit', 
     {
         title: 'Add Movie',
         movie: movie
     });
}

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {

    // ADD YOUR CODE HERE
    //data for the add new form
    let movie = Movie({
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    })

    //to show error message and redirect back to movie_list page 
    Movie.create(movie, (err, movie) =>{
        if(err) 
        {
            console.log(err);
            res.end(err);
        } else 
        {
            res.redirect('/movie/list');
        }
    });
}

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    //gets a movie by id
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        } else 
        {
            //render the page to add_edit
            res.render('movie/add_edit', 
            {
                title: 'Edit Movie', 
                movie : movie,
            })
        }
    });
}

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    // processing the data submitted 
    let id = req.params.id
    let movie = Movie({
        _id: req.body.id,
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    });

    // update the movie 
    Movie.updateOne({_id: id}, movie, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        } else 
        {
            //redirect back to movie/list page
            res.redirect('/movie/list');
        }
    });   
}

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
    
    // ADD YOUR CODE HERE
    // delete the movie by finding its id
    let id = req.params.id
    Movie.remove({_id: id}, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        } else 
        {
            //redirect back to movie/list page
            res.redirect('/movie/list');
        }
    });
}