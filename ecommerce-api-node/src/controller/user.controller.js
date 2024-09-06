const userService = require("../services/user.service.js");

// [Bearer, token]

const getUserProfile = async (req, res) => {
    const jwt = req.headers.authorization?.split(" ")[1];

    try {
        if (!jwt) {
            return res.status(401).send({ error: "Token not found" }); // Changed to 401
        }

        const user = await userService.getUserProfileByToken(jwt);
        if (!user) {
            return res.status(401).send({ error: "Invalid token" }); // Check for user existence
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { getUserProfile, getAllUsers };
