const sqlite = require('sqlite');
const path = require('path');

const dbConnection = sqlite.open(path.resolve(__dirname, 'db.sqlite'), { Promise });

module.exports = {
    async show(req, res) {
        const { id } = req.params;
        const db = await dbConnection;
        const vacancy = await db.get(`SELECT * FROM vacancies WHERE id = ${id}`)
        return res.render('vacancy', { vacancy });
    }
}