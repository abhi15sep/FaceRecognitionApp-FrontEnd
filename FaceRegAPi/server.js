const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
const database = [{
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    },
    {
        id: '234',
        name: 'Jane',
        email: 'Jane@gmail.com',
        password:'bananas',
        entries: 0,
        joined: new Date()
    }
]

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(database)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database[0].email &&
        req.body.password === database[0].password) {
        res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
})

app.post("/register", (req, res) => {
	bcrypt.hash(req.body.password, null, null, function(err, hash) {
    console.log(hash);
});
    const newUser = {
        "id": (Math.floor((Math.random() * 100000) + 1)).toString(),
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "entries": 0,
        "joined": new Date()
    }
    if (database.push(newUser)) {
        res.json('success');
    } else {
        res.status(400).json('error registering');
    }
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.forEach(user => {
    	if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('no found');
    }
})

app.put('/image', (req,res) => {
	  const { id } = req.body;
    let found = false;
    database.forEach(user => {
    	if (user.id === id) {
          found = true;
          user.entries++;
          return res.json(user.entries);
        }
    })
    if (!found) {
      res.status(400).json('no found');
    }
})

app.listen(3000, () => {
    console.log('Server has started');
})
