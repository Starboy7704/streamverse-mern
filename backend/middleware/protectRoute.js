import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies["jwt-streamverse"];
        
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" })
        }

        const user = await User.findById(decoded.userId).select("-password");
        
        if (!User) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        req.user = user;
        

        next()
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Issue" })
    }
}


