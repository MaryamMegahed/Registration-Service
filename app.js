"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var staffRouter_1 = require("./src/routers/staffRouter");
var userRouter_1 = require("./src/routers/userRouter");
var patientRouter_1 = require("./src/routers/patientRouter");
var loginController_1 = require("./src/controllers/loginController");
var app = (0, express_1.default)();
var port = process.env.PORT || 10000;
app.use(express_1.default.json());
app.use('/staff', staffRouter_1.default);
app.use('/user', userRouter_1.default);
app.use('/patient', patientRouter_1.default);
app.use('/login', loginController_1.loginUser);
app.listen(port, function () {
    console.log("Server is listening at http://localhost:".concat(port));
});
