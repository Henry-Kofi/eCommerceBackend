const UserModel = require("../models/User")
const {} = require('../util/utility.function')

exports.verifyUser = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        res.status(400).json({message:"you are not authorised",res})
    //   sendResponseError(400, 'You are not authorized ', res)
      return
    } else if (!authorization.startsWith('Bearer ')) {
        res.status(400).json({message:"you are not authorised",res})
        //   sendResponseError(400, 'You are not authorized ', res)
      return
    }
  
    try {
      const payload = await verifyToken(authorization.split(' ')[1])
      console.log(payload)
      if (payload) {
        const user = await User.findById(payload.id, {password: 0})
  
        req['user'] = user
  
        next()
      } else {
        res.status(400).json({message:"you are not authorised",res})
      }
    } catch (err) {
      console.log('Error ', err)
      res.status(400).json({message:err,res})
    }
  }