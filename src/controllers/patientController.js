"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.deletePatient = exports.getPatientById = exports.updatePatient = exports.createPatient = exports.hasCapitalizedCharacter = exports.checkUniqueValues = void 0;
var client_1 = require("@prisma/client");
var hashing_1 = require("../Hash/hashing");
var prisma = new client_1.PrismaClient();
//-----------------------check for unique values in database --------------------------------
function checkUniqueValues(error, res) {
    var _a;
    if (error.code === 'P2002') { // code for unique value errors
        var targetArray = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
        if (targetArray && targetArray.includes('ssn')) {
            res.status(400).json({ error: 'SSN must be unique' });
        }
        else if (targetArray && targetArray.includes('userName')) {
            res.status(400).json({ error: 'Username must be unique' });
        }
        else if (targetArray && targetArray.includes('email')) {
            res.status(400).json({ error: 'email must be unique' });
        }
        else { // Handle other Prisma known errors
            res.status(400).json({ error: 'Invalid request to the database' });
        }
    }
}
exports.checkUniqueValues = checkUniqueValues;
//-----------------------check for capital letter in password --------------------------------
function hasCapitalizedCharacter(inputString) {
    for (var i = 0; i < inputString.length; i++) {
        if (inputString[i] === inputString[i].toUpperCase()) {
            return true; // Found a capitalized character
        }
    }
    return false; // No capitalized character found
}
exports.hasCapitalizedCharacter = hasCapitalizedCharacter;
//-----------------------Create Patient --------------------------------
var createPatient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patientData, _a, newPatient, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                patientData = req.body;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, 9, 11]);
                if (!(patientData.role != "Patient")) return [3 /*break*/, 2];
                throw new Error('Invalid role or unmatched data');
            case 2:
                if (!(!patientData.gender || !patientData.firstName || !patientData.lastName || !patientData.email ||
                    !patientData.phoneNumber || !patientData.role || !patientData.password || !patientData.userName ||
                    !patientData.insurancePersentage || !patientData.emergencyContactName || !patientData.emergencyContactNumber)) return [3 /*break*/, 3];
                throw new Error('Missing required data');
            case 3:
                if (!(hasCapitalizedCharacter(patientData.password) == false)) return [3 /*break*/, 4];
                throw new Error(' password must has at least one capital letter');
            case 4:
                // hashing the password 
                _a = patientData;
                return [4 /*yield*/, hashing_1.default.hashPassword(patientData.password)];
            case 5:
                // hashing the password 
                _a.password = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: __assign({}, patientData),
                    })];
            case 6:
                newPatient = _b.sent();
                res.status(201).json({ data: newPatient }); // successsful response
                _b.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                error_1 = _b.sent();
                if (error_1 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    checkUniqueValues(error_1, res);
                }
                else if (error_1 instanceof client_1.Prisma.PrismaClientValidationError) {
                    // Handle validation errors
                    res.status(422).json({ error: 'Validation error in database request' });
                }
                else if (error_1.message) {
                    res.status(400).json({ error: error_1.message });
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
exports.createPatient = createPatient;
//-----------------------Update Patient --------------------------------
var updatePatient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, patientData, parsedUserId, patientExists, _a, updatedPatient, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                patientData = req.body;
                parsedUserId = parseInt(userId);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, 9, 11]);
                if (isNaN(parsedUserId)) {
                    throw new Error('Invalid userId format. Must be an integer.');
                }
                return [4 /*yield*/, prisma.user.findUnique({
                        where: {
                            userId: parsedUserId,
                            role: 'Patient',
                        },
                    })];
            case 2:
                patientExists = _b.sent();
                if (!!patientExists) return [3 /*break*/, 3];
                throw new Error('User not found');
            case 3:
                if (!patientData.password) return [3 /*break*/, 5];
                // Hash the new password using your hashPassword function
                _a = patientData;
                return [4 /*yield*/, hashing_1.default.hashPassword(patientData.password)];
            case 4:
                // Hash the new password using your hashPassword function
                _a.password = _b.sent();
                _b.label = 5;
            case 5: return [4 /*yield*/, prisma.user.update({
                    where: {
                        userId: parsedUserId,
                        role: 'Patient',
                    },
                    data: __assign(__assign({}, patientData), { role: 'Patient' })
                })];
            case 6:
                updatedPatient = _b.sent();
                res.status(200).json({ data: updatedPatient });
                _b.label = 7;
            case 7: return [3 /*break*/, 11];
            case 8:
                error_2 = _b.sent();
                console.error(error_2);
                if (error_2 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    checkUniqueValues(error_2, res);
                }
                else if (error_2 instanceof client_1.Prisma.PrismaClientValidationError) {
                    // Handle validation errors
                    res.status(422).json({ error: 'Validation error in database request' });
                }
                else if (error_2.message) {
                    res.status(400).json({ error: error_2.message });
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
exports.updatePatient = updatePatient;
//-----------------------Get Patient By ID --------------------------------
var getPatientById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, parsedUserId, patient, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                console.log(userId);
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
                            role: 'Patient',
                        }
                    })];
            case 2:
                patient = _a.sent();
                if (patient) {
                    res.status(200).json({ data: patient });
                }
                else {
                    throw new Error('Patient not found');
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
exports.getPatientById = getPatientById;
//-----------------------Delete Patient --------------------------------
var deletePatient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 6]);
                return [4 /*yield*/, prisma.user.delete({
                        where: {
                            userId: parseInt(userId),
                            role: 'Patient',
                        },
                    })];
            case 2:
                _a.sent();
                res.status(204).send();
                return [3 /*break*/, 6];
            case 3:
                error_4 = _a.sent();
                console.error(error_4);
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
exports.deletePatient = deletePatient;
