class UserService {
    constructor(db) {
        this.User = db.User
    }

    // Fetch a User object from the DB, by Email
    async getUserByEmail(email) {
        return this.User.findOne({ where: { Email: email } })
    }
    
    async create(name, email, encryptedPassword, salt) {

        console.log("CHECKPOINT")

        return await this.User.create({
            Name: name,
            Email: email,
            EncryptedPassword: encryptedPassword,
            Salt: salt,
        })
    }

}

module.exports = UserService