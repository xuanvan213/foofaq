const express = require("express");
const router = require("express-promise-router")();
const UserController = require("../controllers/user");
const {
	validateBody,
	validateParam,
	schemas
} = require('../helpers/routerHelpers')

//Route get all user
router.route('/').get(UserController.index)
//Route create user
router.route('/').post(validateBody(schemas.userSchema), UserController.newUser)
// Route register
router.route('/signup').post(validateBody(schemas.authSignUpSchema), UserController.signUp)
// Route login
router.route('/signin').post(validateBody(schemas.authSignInSchema), { session: false }, UserController.signIn)
// Route secret
router.route('/secret').get(passport.authenticate('jwt', { session: false }), UserController.secret)

//Route get detail a user
router.route('/:userID').get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
//Route relace user
router.route('/:userID').put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
//Route update user
router.route('/:userID').patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)

module.exports = router