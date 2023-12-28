"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController = require("../controllers/userController");
var router = express_1.default.Router();
router.get('/', userController.getAllUsers);
router.get('/userId/:userId', userController.getUserById);
router.get('/userName/:userName', userController.getUserByUserName);
exports.default = router;
