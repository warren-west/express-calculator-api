const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Result = sequelize.define('Result', {
        OperationName: DataTypes.STRING,
        Value: DataTypes.INTEGER
    }, {
        timestamps: false
    })

    Result.associate = function (db) {
        Result.belongsTo(db.User)
    }

    return Result
}