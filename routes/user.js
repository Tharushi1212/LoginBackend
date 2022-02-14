import express from "express";
import {changeDetails, loginUser, registerUser} from "../controllers/user";
import {validateToken} from "../middlewares/user";

const router = express.Router();


router.get("/login-user", loginUser);
router.post("/register-user", registerUser);
router.put("/change-details", validateToken, changeDetails);


module.exports = router;
