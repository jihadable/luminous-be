"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), express_1.default.static("views"));
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "styles")));
app.get("/", (req, res) => {
    res.send("RUN");
    // res.sendFile(path.join(__dirname, "views", "index.html"))
});
app.use("/api/users", userRoute_1.default);
app.listen(8000, () => {
    console.log("Server is running");
});
