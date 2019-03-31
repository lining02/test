const { STRING } = require("sequelize");
module.exports = {
    schema: {
        username: STRING(30),
        age: STRING(30)
    },
    options: {
        timestamps: false
    }
};