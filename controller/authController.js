const User = require('../models/user')
const Role = require('../models/role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const { secret } = require("../config")

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors})
            }
            const {username, password, role} = req.body;
            const userRole = await Role.findOne({value: role})
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User with this username already exist!"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, role: userRole})
            await user.save()
            return res.json({message: "User is successfuly created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async role(req, res) {
        try {
            const {value} = req.body;
            const role = new Role({value})
            await role.save()
            return res.json({message: "Role is successfuly created"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Role creation error'})
        }
    }


    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username}).populate({
                path: "role"
              });
            console.log(user)
            if (!user) {
                return res.status(400).json({message: `User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Incorrect password`})
            }
            const token = generateAccessToken(user._id, user.role)
            return res.json({ user: user, token });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async get_role(req, res) {
        try{
          const role = await Role.findById(req.params.id);
          console.log(role)
          res.json(role)
      } catch(error){
          res.status(500).json({message: error.message})
      }
  };

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()