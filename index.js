// implement your API here

const express = require('express');

const Users = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (request, response) => {
    response.send('hello world from express!!');
})

server.get('/now', (request, response) => {
    const now = new Date().toISOString();
    response.send(now);
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: 'The users information could not be retrieved.',
            });
        });
});


const port = 5000;
server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));