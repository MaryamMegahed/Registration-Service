"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStaff = exports.updateStaff = exports.createStaff = exports.getDoctorsByClinicID = exports.getStaffById = exports.getAllstaff = void 0;
var client_1 = require("@prisma/client");
// import { PrismaClient } from '@prisma/client';
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
var controller = require("../controllers/patientController");
var hashing_1 = require("../Hash/hashing");
//-------------------Get All staff -----------------------
var getAllstaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var roleMembers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 5]);
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            OR: [
                                { role: "Doctor" },
                                { role: "Admin" }
                            ]
                        }
                    })];
            case 1:
                roleMembers = _a.sent();
                res.status(200).json({ data: roleMembers });
                return [3 /*break*/, 5];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, prisma.$disconnect()];
            case 4:
                _a.sent();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAllstaff = getAllstaff;
//-------------------Get  all staff User By ID-----------------------
var getStaffById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, parsedUserId, userMember, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 6]);
                parsedUserId = parseInt(userId);
                if (isNaN(parsedUserId)) {
                    throw new Error('Invalid userId format. Must be an integer.');
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            userId: parsedUserId,
                            OR: [
                                { role: "Doctor" },
                                { role: "Admin" }
                            ]
                        }
                    })];
            case 2:
                userMember = _a.sent();
                if (userMember) {
                    res.status(200).json({ data: userMember });
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
                return [3 /*break*/, 6];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(400).json({ error: error_2.message });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getStaffById = getStaffById;
//-------------------Get  all docotrs By clinicID-----------------------
var getDoctorsByClinicID = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clinicId, parsedClinicId, userMember, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                clinicId = req.params.clinicId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 6]);
                parsedClinicId = parseInt(clinicId);
                if (isNaN(parsedClinicId)) {
                    throw new Error('Invalid clinic ID format. Please enter an integer.');
                }
                return [4 /*yield*/, prisma.user.findMany({
                        where: {
                            clinicId: parsedClinicId,
                            role: "Doctor",
                        },
                    })];
            case 2:
                userMember = _a.sent();
                if ((userMember.length === 0)) {
                    throw new Error('No Clinic with this ID.');
                }
                else {
                    res.status(200).json({ data: userMember });
                }
                return [3 /*break*/, 6];
            case 3:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(400).json({ error: error_3.message });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getDoctorsByClinicID = getDoctorsByClinicID;
//-------------------Create New Staff -----------------------
var createStaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, _a, newUser, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userData = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, 9, 11]);
                if (!(userData.role == "Patient")) return [3 /*break*/, 2];
                throw new Error('Invalid role or unmatched data');
            case 2:
                if (!(!userData.gender || !userData.firstName || !userData.lastName || !userData.email ||
                    !userData.phoneNumber || !userData.role || !userData.password || !userData.userName)) return [3 /*break*/, 3];
                throw new Error('Missing required data');
            case 3:
                if (!(controller.hasCapitalizedCharacter(userData.password) == false)) return [3 /*break*/, 4];
                throw new Error(' password must has at least one capital letter');
            case 4:
                // hashing the password 
                _a = userData;
                return [4 /*yield*/, hashing_1.default.hashPassword(userData.password)];
            case 5:
                // hashing the password 
                _a.password = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: userData,
                    })];
            case 6:
                newUser = _b.sent();
                res.status(201).json({ data: newUser });
                _b.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                error_4 = _b.sent();
                if (error_4 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    controller.checkUniqueValues(error_4, res);
                }
                else if (error_4 instanceof client_1.Prisma.PrismaClientValidationError) {
                    res.status(422).json({ error: 'Validation error in database request' });
                }
                else if (error_4.message) {
                    res.status(400).json({ error: error_4.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, prisma.$disconnect()];
            case 10:
                _b.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.createStaff = createStaff;
//-------------------Update staff-----------------------
var updateStaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userData, parsedUserId, userExists, _a, updatedUser, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                userData = req.body;
                parsedUserId = parseInt(userId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, 9, 11]);
                if (isNaN(parsedUserId)) {
                    throw new Error('Data type must be integer');
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            userId: parsedUserId,
                            OR: [
                                { role: "Doctor" },
                                { role: "Admin" }
                            ],
                        },
                    })];
            case 2:
                userExists = _b.sent();
                if (!!userExists) return [3 /*break*/, 3];
                throw new Error('User not found');
            case 3:
                if (!userData.password) return [3 /*break*/, 5];
                // Hash the new password using your hashPassword function
                _a = userData;
                return [4 /*yield*/, hashing_1.default.hashPassword(userData.password)];
            case 4:
                // Hash the new password using your hashPassword function
                _a.password = _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, prisma.user.update({
                    where: {
                        userId: parsedUserId,
                        OR: [
                            { role: "Doctor" },
                            { role: "Admin" }
                        ],
                    },
                    data: userData,
                })];
            case 6:
                updatedUser = _b.sent();
                res.status(200).json({ data: updatedUser });
                _b.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                error_5 = _b.sent();
                if (error_5 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    controller.checkUniqueValues(error_5, res);
                }
                else if (error_5 instanceof client_1.Prisma.PrismaClientValidationError) { // Handle validation errors
                    res.status(422).json({ error: 'Validation error in database request' });
                }
                else if (error_5.message) {
                    res.status(400).json({ error: error_5.message });
                }
                else {
                    res.status(500).json({ error: 'Internal Server Error' });
                }
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, prisma.$disconnect()];
            case 10:
                _b.sent();
                return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.updateStaff = updateStaff;
//-------------------Delete Staff -----------------------
var deleteStaff = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 6]);
                return [4 /*yield*/, prisma.user.delete({
                        where: {
                            userId: parseInt(userId, 10),
                            OR: [
                                { role: "Doctor" },
                                { role: "Admin" }
                            ]
                        }
                    })];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 6];
            case 3:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, prisma.$disconnect()];
            case 5:
                _a.sent();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteStaff = deleteStaff;
