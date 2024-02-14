import mongoose from "mongoose";

/**
 * Mongoose schema for Conversation collection
 * @typedef {Object} ConversationSchema
 * @property {mongoose.Types.ObjectId[]} participants - IDs of participants in the conversation
 * @property {mongoose.Types.ObjectId[]} messages - IDs of messages in the conversation
 * @property {Date} createdAt - Timestamp indicating when the conversation was created
 * @property {Date} updatedAt - Timestamp indicating when the conversation was last updated
 */

/**
 * Conversation schema definition
 * @type {mongoose.Schema<ConversationSchema>}
 */
const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

/**
 * Mongoose model for Conversation collection
 * @typedef {mongoose.Model<ConversationSchema>} ConversationModel
 */

/**
 * Conversation model
 * @type {ConversationModel}
 */
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
