const sqlite = require('sqlite');
const path = require('path');

const dbConnection = sqlite.open(path.resolve(__dirname, 'database', 'db.sqlite'), { Promise });

module.exports = {
    async index(req, res) {
        return res.render('admin/home');
    },
    
    async indexVacancies(req, res) {
        const db = await dbConnection;
        const vacancies = await db.all('SELECT * FROM vacancies');
    
        return res.render('admin/vacancies', { vacancies });
    },

    async createVacancies(req, res) {
        const db = await dbConnection;
        const categories = await db.all('SELECT * FROM categories');
        return res.render('admin/create_vacancy', { categories });
    },

    async storeVacancies(req, res) {
        const { title, description, category_id } = req.body;
        const db = await dbConnection;
        await db.run(`
            INSERT INTO vacancies (title, description, category_id)
            VALUES ('${title}', '${description}', ${category_id})
        `);
        return res.redirect('/admin/vagas');
    },

    async editVacancies(req, res) {
        const db = await dbConnection;
        const { id } = req.params;
        const categories = await db.all('SELECT * FROM categories');
        const vacancy = await db.get(`SELECT * FROM vacancies WHERE id = ${id}`);
        return res.render('admin/edit_vacancy', { categories, vacancy });
    },

    async updateVacancies(req, res) {
        const { title, description, category_id } = req.body;
        const { id } = req.params;
        const db = await dbConnection;
        await db.run(`
            UPDATE vacancies
            SET title = '${title}',
                description = '${description}',
                category_id = ${category_id}
            WHERE id = ${id}
        `);
        return res.redirect('/admin/vagas');
    },

    async destroyVacancies(req, res) {
        const db = await dbConnection;
        await db.run(`DELETE FROM vacancies WHERE id = ${req.params.id}`);
        return res.redirect('/admin/vagas');
    }
}