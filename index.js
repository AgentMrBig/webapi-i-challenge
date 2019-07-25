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
                errorMessage: 'Could not get User Info!!!',
            });
        });
});

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res
                    .status(404)
                    .json({ message: 'Found no user with that ID!' });
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: 'Could not get user info!' });
        });
});

server.post('/api/users', (req, res) => {

    Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({
                errorMessage:
                    'User not saved to database, there was an error',
            });
        });
});


const port = 5000;
server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));