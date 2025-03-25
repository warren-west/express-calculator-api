class ResultService {
    constructor(db) {
        this.Result = db.Result
    }

    // Fetch a Result object from the DB, by UserId
    async getResultByUserId(userId) {
        return this.Result.findOne({ where: { UserId: userId } })
    }

    // Create a new Result object in the DB
    async createResult(operation, value, userId) {
        const model = this.Result
        return model.findOne({
            where: { UserId: userId }
        }).then((result) => {
            if (result) {
                return model.update({
                    OperationName: operation,
                    Value: value,
                }, {
                    where: { UserId: userId }
                })
            } else {
                return model.create({
                    OperationName: operation,
                    Value: value,
                    UserId: userId,
                })
            }
        })
    }

}

module.exports = ResultService