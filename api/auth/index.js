import { Router } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { require_auth, secret } from '../authorize'

import User from '../../models/user'
import Domain from '../../models/domain'

//mongoose.Promise = Promise
const router = new Router()

// Register a user
router.post('/', function(req, res) {
  var domain_id = new mongoose.Types.ObjectId()

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    domain_id: domain_id
  })

  const domain = new Domain({
    _id: domain_id,
    name: req.body.company
  })

  user.save()
    .then(user => {
	return domain.save()
     })
    .then(domain => {
        res.status(201).json({ status: 'success', data: { domain: domain._id }})
    })
    .catch(err => {
      let error = {field: 'none', message: err.errmsg || err._message || err.message}

      if (typeof err.errors != 'undefined') {
        if (typeof err.errors.name != 'undefined') error = {field: 'company', message: err.errors.name.message}
        if (typeof err.errors.email != 'undefined') error = {field: 'email', message: err.errors.email.message}
        if (typeof err.errors.password != 'undefined') error = {field: 'password', message: err.errors.password.message}
      }

      res.status(500).json({ status: 'error', errors: [error] })
    })
})

// Login
router.post('/login', function(req, res) {
    var user_ = null

    User.findOne({email: req.body.email})
      .exec()
      .then(user => { 
        if (user == null) throw 'Invalid credentials!'
        user_ = user
        return user.passwordMatches(req.body.password, user)
      })
      .then(matches => {
        if (!matches) throw 'Invalid credentials!'

        var token = jwt.sign({user_id: user_._id.toString(), domain_id: user_.domain_id.toString()}, secret, {
          algorithm:'HS256',
          expiresIn: 60 * 60 * 24 * 10
        })
 
        res.status(200).json({ status: 'success', token: token, data: {user_id: user_._id.toString(), domain_id: user_.domain_id.toString()} })
      })
      .catch((err) => {
        res.status(401).json({ status: 'error', message: err })
      })
})

export default router
