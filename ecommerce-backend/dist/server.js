"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = __importDefault(require("./routes/product"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const DB_CONNECTION_URL = (_a = process.env.DB_CONNECTION_URL) !== null && _a !== void 0 ? _a : '';
const corsOptions = {
    origin: ['http://localhost:3000']
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
// API routes
app.use('/api/products', product_1.default);
app.get('/', (req, res) => {
    res.send('APP IS RUNNING OK');
});
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(DB_CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
//# sourceMappingURL=server.js.map