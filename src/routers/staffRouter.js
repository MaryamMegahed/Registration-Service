"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const  staffController = require("../controllers/userController");
// const express = require("express");
var express_1 = require("express");
var staffController = require("../controllers/staffController");
var router = express_1.default.Router();
router.get('/', staffController.getAllstaff); //  doctors and admin
router.get('/:userId', staffController.getStaffById);
router.get('/clinic/:clinicId', staffController.getDoctorsByClinicID);
router.post('/', staffController.createStaff);
router.put('/:userId', staffController.updateStaff);
router.delete('/:userId', staffController.deleteStaff);
exports.default = router;
