const mongoonse = require("mongoose")
let User = mongoonse.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: new Date()
    }
}, {
    collection : "users"
}
)

module.exports = mongoonse.model("User", User)