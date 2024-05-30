"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json(), express_1.default.static("views"));
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "styles")));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
// root endpoint
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "index.html"));
});
// users api
app.use("/api/users", userRoute_1.default);
// products api
app.use("/api/products", productRoute_1.default);
// not found page
app.use((req, res) => {
    res.sendFile(path_1.default.join(__dirname, "views", "not-found.html"));
});
// connect to database
mongoose_1.default.connect(process.env.MONGO_URI, { dbName: "luminous" })
    .then(() => {
    app.listen(port, () => {
        console.log("Server is running");
    });
})
    .catch(error => {
    console.log(error);
});
