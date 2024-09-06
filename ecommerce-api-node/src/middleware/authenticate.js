const jwtProvider = require("../config/jwtProvider.js");
const userService = require("../services/user.service.js");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Token not found" }); // Changed to 401
        }

        const userId = jwtProvider.getUserIdFromToken(token);

        if (!userId) {
            return res.status(401).send({ error: "Invalid token" }); // Handle invalid token
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" }); // Handle user not found
        }

        req.user = user; // Attach user to request object
        next(); // Call next only if everything is fine
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;
