const sqlite = require('sqlite');
const dbConnection = sqlite.open('database/db.sqlite', { Promise });

module.exports = {
    async index (req, res) {
        const db = await dbConnection;
        const categoriesDB = await db.all('SELECT id, name FROM categories;');
        const vacanciesDB = await db.all('SELECT id, title, category_id FROM vacancies;');
        const categories = categoriesDB.map(category => {
            return {
                ...category,
                vacancies: vacanciesDB
                    .filter(vacancy => vacancy.category_id === category.id)
            }
        });
        return res.render('home', { categories });
    }
}