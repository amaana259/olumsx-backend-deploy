import express from "express";
import { newUser, loginUser , updateUser, deleteUser, getUserDetails, getAllCustomers, getAllVendors} from "../controllers/user.js";
import { authenticate } from "../middlewares/authenticate.js";
const app = express.Router();

// Route to Signup page
app.post("/signup", newUser);

// Route to login page
app.post("/login", loginUser);

// Route to update user API
app.put('/updateuser', updateUser);

// API to delete user by ID
app.delete('/deleteuser', deleteUser);

// Finding user details by ID
app.post('/getuserbyid', getUserDetails);

// Finding all customer details.
app.get('/getcustomers', getAllCustomers);

// Finding all vendor details.
app.get('/getvendors', getAllVendors);

// Check Auth status
app.get('/me', authenticate, (req, res) => {
});

export default app;
