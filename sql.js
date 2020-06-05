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
});




init = function() {
    sequelize.authenticate().then( () => {
        console.log("Connection has been established sucessfully");
    }).catch(err => {
        console.log("Unable to connect to database.", err);
    });

    Article.sync();
};

module.exports.init = init;