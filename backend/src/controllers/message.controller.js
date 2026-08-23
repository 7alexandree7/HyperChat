import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";


export const getUsersForSideBar = async (req, res) => {

    try {
        const loggedInUserid = req.user._id;

        const users = await User.find({ _id: { $ne: loggedInUserid } }).select("-clerkId");
        if (!users) return res.status(404).json({ message: "No users found" });

        return res.status(200).json(users);
    } catch (error) {
        console.log("Error getting users from side bar", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getConversationsForSideBar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const conversations = await Message.aggregate([
            { $match: { $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }] } },
            { $group: { _id: { $cond: [{ $eq: ["$senderId", loggedInUserId] }, "$receiverId", "$senderId"] }, lastMessageAt: { $max: "$createdAt" } } },
            { $sort: { lastMessageAt: -1 } },
            { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
            { $replaceRoot: { newRoot: { $first: "$user" } } },
            { $project: { clerkId: 0 } }
        ]);

        return res.status(200).json(conversations);

    } catch (error) {
        console.log("Error getting conversations from side bar", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {

    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        if (!userToChatId) return res.status(400).json({ message: "Conversation id is required" });

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({ messages });
    } catch (error) {
        console.log("Error getting messages", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}