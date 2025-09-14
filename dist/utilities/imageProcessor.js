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
exports.resizeImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fullDir = path_1.default.resolve(__dirname, "../../assets/full");
const thumbsDir = path_1.default.resolve(__dirname, "../../assets/thumbs");
if (!fs_1.default.existsSync(thumbsDir)) {
    fs_1.default.mkdirSync(thumbsDir, { recursive: true });
}
const resizeImage = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const inputPath = path_1.default.join(fullDir, `${filename}.jpg`);
    const outputPath = path_1.default.join(thumbsDir, `${filename}_${width}x${height}.jpg`);
    if (!fs_1.default.existsSync(inputPath)) {
        throw new Error("Image not found at: " + inputPath);
    }
    if (fs_1.default.existsSync(outputPath)) {
        return outputPath;
    }
    yield (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
});
exports.resizeImage = resizeImage;
