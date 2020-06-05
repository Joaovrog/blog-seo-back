const Sequelize = require("sequelize");

const sequelize = new Sequelize("blogu", "root", "atown99", {
    host: "localhost",
    dialect: "mariadb",
    port: 3307,
    dialectOptions: {
        timezone: process.env.db_timezone
    }
});

const Article = sequelize.define('article', {
    title: { type: Sequelize.STRING },
    key: { type: Sequelize.STRING },
    date: { type: Sequelize.DATE },
    content: { type: Sequelize.TEXT },
    description: { type: Sequelize.TEXT },
    imageUrl: { type: Sequelize.STRING },
    viewCount: { type: Sequelize.INTEGER }
});




init = function() {
    sequelize.authenticate().then( () => {
        console.log("Connection has been established sucessfully");
    }).catch(err => {
        console.log("Unable to connect to database.", err);
    });

    Article.sync({ force: true }).then( () => {
        Article.create({
            title: 'My Gaara article',
            content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            description: 'Red hair and demon eyes, folks.',
            key: 'gaara-first',
            date: new Date(),
            imageUrl: 'https://www.comboinfinito.com.br/principal/wp-content/uploads/2018/05/boruto-gaara.jpg'
        });

        Article.create({
            title: 'Shinki article',
            content: '<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            description: 'He is Gaara`s son.',
            key: 'shinki-art',
            date: new Date(),
            imageUrl: 'https://pm1.narvii.com/6509/f8ede42610c9695bc4500d82d0c6d8a0cbb4c107_00.jpg',

        });
    });
};

getAllArticles = function(callback) {
    Article.findAll({ order: sequelize.literal("date DESC") }).then(articles => callback(articles));
};

getArticleByKey = function(options, callback) {
    Article.findOne({ where: { key: options.key }}).then(article =>  {
        if (article != null) {
            article.update( {viewCount: ++article.viewCount});
            callback(article);
        }
    });
        
};




module.exports.init = init;
module.exports.getAllArticles = getAllArticles;
module.exports.getArticleByKey = getArticleByKey;