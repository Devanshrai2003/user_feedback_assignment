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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const DB_URL = process.env.MONGO_URL;
const feedback_1 = __importDefault(require("./routes/feedback"));
app.use("/feedback", feedback_1.default);
app.get("/", (req, res) => {
    res.send("Hello, World");
});
const PORT = process.env.PORT || 5000;
function serve() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!DB_URL) {
            console.error("database URL not found");
            return;
        }
        try {
            yield mongoose_1.default.connect(DB_URL);
            console.log("connected to mongoDB");
            app.listen(PORT);
            console.log(`server is running on port ${PORT}`);
        }
        catch (error) {
            console.log("error connecting to mongoDB");
        }
    });
}
serve();
