const express = require('express');
const app = express(); // All the functions in express are now in app.
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
require('dotenv').config();

// MONGODB CONNECTION
let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = 'rap';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
	(client) => {
		console.log(`Connected to ${dbName} Database`);
		db = client.db(dbName);
	}
);

// SERVER AND MIDDLEWARE SETUP
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API - MADE UP OF GET, POST, DELETE, AND UPDATE

// GET / READ REQUEST
app.get('/', (request, response) => {
	db.collection('rappers')
		.find()
		.sort({ likes: -1 }) // ITEMS IN THE DATABASE ARE SORTED BASED ON THEIR LIKES PROPERTY, FROM MOST TO LEAST
		.toArray()
		.then((data) => {
			response.render('index.ejs', { info: data });
		})
		.catch((error) => console.error(error));
});

// POST / CREATE REQUEST
app.post('/addRapper', (request, response) => {
	db.collection('rappers')
		.insertOne(request.body)
		.then((result) => {
			console.log('Rapper Added');
			response.redirect('/');
		})
		.catch((error) => console.error(error));
});

// DELETE REQUEST
app.delete('/deleteRapper', (request, response) => {
	db.collection('rappers')
		.deleteOne({ stageName: request.body.stageNameS })
		.then((result) => {
			console.log('Rapper Deleted');
			response.json('Rapper Deleted');
		})
		.catch((error) => console.log(error));
});

// PUT / UPDATE REQUEST
app.put('/addOneLike', (request, response) => {
	db.collection('rappers')
		.updateOne(
			{
				stageName: request.body.stageNameS,
				birthName: request.body.birthNameS,
				likes: request.body.likesS,
			},
			{
				$set: {
					likes: request.body.likesS + 1,
				},
			},
			{
				sort: { _id: -1 }, // FINDS THE FIRST MATCH, THEN STOP LOOKING, UPDATE THE ONE THAT WAS FOUND
				upsert: true, // IF THE MATCH IS NOT FOUND, JUST GO AHEAD AND CREATE A NEW DOCUMENT IN THE DATABASE.
			}
		)
		.then((result) => {
			console.log('Added One Like');
			response.json('Like Added');
		});
});

// SERVER TO LISTEN TO PORT
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
