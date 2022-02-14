import db from '../config/databse';

const {User} = db
import jwt from "jsonwebtoken";

require("dotenv").config();

export const loginUser = (req, res) => {
    const {email, password} = req.query;

    User.findOne({
        where: {
            email: email,
            password: hashPassword(password)
        }
    }).then((user) => {
        if (user) {
            const authToken = jwt.sign({
                id: user.id,
                role: user.role,
            }, process.env.AUTH_TOKEN_SECRET);
            const refreshToken = jwt.sign({
                id: user.id,
                role: user.role
            }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});

            res.status(201).json({
                message: "User created successfully",
                user: {
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
                authToken, refreshToken
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    });

};

const hashPassword = (plainPassword) => {
    return plainPassword;
}

const passwordStrength = (plainTextPassword) => {
    let regex = /^(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&? "])[a-zA-Z0-9!#$@^%&?]{8,200}$/
    return regex.test(plainTextPassword);
}

export const registerUser = (req, res) => {
    const {username, email, password, rePassword} = req.body;

    if (!username || !email || !password || !rePassword) {
        return res.status(400).json({msg: `Please enter all fields`});
    } else if (password.length < 8 || rePassword.length < 8) {
        return res.status(400).json({msg: 'Password must be at least 8 characters'});
    } else if (passwordStrength(password)) {
        return res.status(400).json({msg: 'Passwords is not strong enough'});
    } else if (password !== rePassword) {
        return res.status(400).json({msg: 'Passwords do not match'});
    }

    User.create({
        username: username,
        email: email,
        password: hashPassword(password)
    }).then((user) => {
        const authToken = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.AUTH_TOKEN_SECRET);
        const refreshToken = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});

        res.status(201).json({
            message: "User created successfully",
            user: {
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            },
            authToken, refreshToken
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    });

}


export const changeDetails = (req, res) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({msg: `Please enter all fields`});
    } else if (password.length < 8) {
        return res.status(400).json({msg: 'Password must be at least 8 characters'});
    } else if (passwordStrength(password)) {
        return res.status(400).json({msg: 'Passwords is not strong enough'});
    }

    User.update({
        username: username,
        email: email,
        password: hashPassword(password)
    }, {
        where: {
            id: req.body.id
        }
    }).then((user) => {
        User.findOne({
            where: {
                id: req.body.id
            }
        }).then((user) => {
            const authToken = jwt.sign({
                id: user.id,
                role: user.role,
            }, process.env.AUTH_TOKEN_SECRET);
            const refreshToken = jwt.sign({
                id: user.id,
                role: user.role
            }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1h'});

            res.status(201).json({
                message: "User created successfully",
                user: {
                    username: user.username,
                    email: user.email,
                    createdAt: user.createdAt
                },
                authToken, refreshToken
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Internal server error",
                error: err
            });
        });

    }).catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        });
    });

}
