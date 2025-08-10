const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isFlowComplete: {
        type: Boolean,
        default: false
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
    }],
    dietary_preference: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian', 'eggetarian', 'none'],
        default: 'none'
    },
    allergies: {
        type: [String],
        default: []
    },

    intolerances: {
        type: [String],
        default: []
    },
    profilePic: {
        type: String,
        default: "/profileDefault.png"
    }


},
    { timestamps: true }
)
const User = mongoose.model('user', userSchema);


module.exports = User;
