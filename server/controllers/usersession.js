import mongoose from 'mongoose';
import { TryCatch } from "../middlewares/error.js";
import bcrypt from 'bcrypt';
import userSession from '../models/usersession.js';

// create user session entry.
export const createUserSession = TryCatch(async (req, res, next) => {
    try {
        const { userID, user_type } = req.body;
        const userSession = new userSession({
            userID: userID,
            role: user_type,
        });
        await userSession.save();
        res.status(201).json(userSession);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
});

export const deleteUserSession = TryCatch(async (req, res) => {
    try {
      const { userID } = req.body;

      if (typeof userID !== 'string') {
        return res.status(400).json({ error: 'Invalid userID format' });
      }

      const modifiedUserID = userID.slice(1, -1);

      console.log('Deleting sessions for user:', modifiedUserID);

      await userSession.deleteMany({ userID: modifiedUserID });
      res.status(200).json({ message: 'User sessions deleted successfully' });
    } catch (error) {
      console.error('Error deleting user sessions:', error);
      res.status(500).json({ error: 'Failed to delete user sessions' });
    }
  });

// // delete user session entry.
// export const deleteUserSession = TryCatch(async (req, res, next) => {
//     try {
//         console.log("here")
//         const userID = req.params.userID;
//         await userSession.deleteMany({ userID: userID });
//         res.status(200).json({ message: "User sessions deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete user sessions" });
//     }
// });

// fetch user entry with latest timestamp.
export const fetchLatestUserSession = TryCatch(async (req, res, next) => {
    try {
        const latestUserSession = await userSession.findOne().sort({ timestamp: -1 });
        if (latestUserSession) {
            const userID = latestUserSession.userID;
            const role = latestUserSession.role;
            // const { userID, role } = latestUserSession;
            res.status(200).json({ userID, role });
        } else {
            res.status(404).json({ error: "No user session found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch latest user session" });
    }
});
