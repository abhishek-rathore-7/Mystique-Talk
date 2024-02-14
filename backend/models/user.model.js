import mongoose from "mongoose";

/**
 * Mongoose schema for User collection
 * @typedef {Object} UserSchema
 * @property {string} fullName - Full name of the user
 * @property {string} username - Username of the user (unique)
 * @property {string} password - Password of the user (minimum length: 6 characters)
 * @property {string} gender - Gender of the user (enum: ["male", "female"])
 * @property {string} profilePic - URL of the user's profile picture
 * @property {Date} createdAt - Timestamp indicating when the user was created
 * @property {Date} updatedAt - Timestamp indicating when the user was last updated
 */

/**
 * User schema definition
 * @type {mongoose.Schema<UserSchema>}
 */
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

/**
 * Mongoose model for User collection
 * @typedef {mongoose.Model<UserSchema>} UserModel
 */

/**
 * User model
 * @type {UserModel}
 */
const User = mongoose.model("User", userSchema);

export default User;
