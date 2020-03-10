const sqlite = require('sqlite');
const dbConnection = sqlite.open('database/db.sqlite', { Promise });

module.exports = {
    async show(req, res) {
        const { id } = req.params;
        const db = await dbConnection;
        const vacancy = await db.get(`SELECT * FROM vacancies WHERE id = ${id}`)
        return res.render('vacancy', { vacancy });
    }
}