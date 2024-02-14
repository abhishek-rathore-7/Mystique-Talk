import User from "../models/user.model.js";

/**
 * Controller function to fetch users for sidebar
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
export async function getUsersForSidebar(req, res) {
  try {
    const loggedInUserId = req.user._id;

    // Fetch users excluding the logged-in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
