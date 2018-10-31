'use strict'

// Application Dependencies
const express = require('express');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
// Utilize ExpressJS functionality to parse the body of the request
app.use(express.urlencoded({extended: true}));

// Database Setup 'postgres://ncarignan:postgres@localhost:5432/task_app'
const client = new pg.Client('postgres://ncarignan:password@localhost:5432/todo_app_demo');
client.connect();
client.on('error', err => console.error(err));

// Set the view engine for server-side templating
app.set('view engine', 'ejs');

// API Routes
app.get('/', getTasks);

app.get('/tasks/:task_id', getOneTask);

app.get('/add', showForm);

app.post('/add', addTask);

app.post('/modify/:id', (req, res) => modifyById(req.params.id, req, res));

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


// HELPER FUNCTIONS

function getTasks(request, response) {
  let SQL = 'SELECT * from tasks;';

  return client.query(SQL)
    .then(results => response.render('index', {results: results.rows}))
    .catch(handleError);
}

function getOneTask(request, response) {
  let SQL = 'SELECT * FROM tasks WHERE id=$1;';
  let values = [request.params.task_id];

  return client.query(SQL, values)
    .then(result => response.render('pages/detail-view', {task: result.rows[0]}))
    .catch(handleError);
}

function modifyById(id, req, res){
  // client.query(`UPDATE tasks WHERE id=${id} update the values`)
  // .then(result => res.render('pages/detailview', result))

}

function showForm(request, response) {
  response.render('pages/add-view');
}

function addTask(request, response) {
  console.log(request.body);
  let {title, description, category, contact, status} = request.body;

  let SQL = 'INSERT INTO tasks(title, description, category, contact, status) VALUES ($1, $2, $3, $4, $5);';
  let values = [title, description, category, contact, status];

  return client.query(SQL, values)
    .then(response.redirect('/'))
    .catch(err => handleError(err, response));
}

function handleError(error, response) {
  response.render('pages/error-view', {error: 'Uh Oh'});
}
