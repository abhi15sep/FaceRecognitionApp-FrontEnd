const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'firattale',
        password: '',
        database: 'smart-brain'
    }
});

const handleProfileGet = (req, res) => {
    const { id } = req.params;
    knex.select('*').from('users').where({ id })
    .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	handleProfileGet
}