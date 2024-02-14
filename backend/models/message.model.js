import mongoose from "mongoose";

/**
 * Mongoose schema for Message collection
 * @typedef {Object} MessageSchema
 * @property {mongoose.Types.ObjectId} senderId - ID of the sender of the message
 * @property {mongoose.Types.ObjectId} receiverId - ID of the receiver of the message
 * @property {string} message - Content of the message
 * @property {Date} createdAt - Timestamp indicating when the message was created
 * @property {Date} updatedAt - Timestamp indicating when the message was last updated
 */

/**
 * Message schema definition
 * @type {mongoose.Schema<MessageSchema>}
 */
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Mongoose model for Message collection
 * @typedef {mongoose.Model<MessageSchema>} MessageModel
 */

/**
 * Message model
 * @type {MessageModel}
 */
const Message = mongoose.model("Message", messageSchema);

export default Message;
