const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'firattale',
        password: '',
        database: 'smart-brain'
    }
});

const handleImage = (req, res) => {
    let { id } = req.body;
    knex('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to do it'))
}

module.exports = {
	handleImage
}