import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: { type: String, required: true, unique: true },
        googleId: { type: String, required: true, unique: true },
        coindcxApiKey: { type: String },
        coindcxSecretKey: { type: String },
    }, 
    { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
