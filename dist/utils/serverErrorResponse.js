"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverErrorResponse = (error, res) => {
    console.log(error.message);
    return res.status(500).json({
        status: 500,
        ok: false,
        message: error.message
    });
};
exports.default = serverErrorResponse;
