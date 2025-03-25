const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EncryptedPassword: {
            type: DataTypes.BLOB,
            allowNull: false
        },
        Salt: {
            type: DataTypes.BLOB,
            allowNull: false
        },
    },{
        timestamps: false
    })

    User.associate = function(db) {
        User.hasOne(db.Result)
    }
    
    return User
}