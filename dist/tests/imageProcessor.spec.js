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
const imageProcessor_1 = require("../utilities/imageProcessor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
describe("resizeImage function", () => {
    const outputPath = path_1.default.resolve(__dirname, "../../assets/thumbs/encenadaport_200x200.jpg");
    beforeEach(() => {
        if (fs_1.default.existsSync(outputPath))
            fs_1.default.unlinkSync(outputPath);
    });
    it("creates a resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = yield (0, imageProcessor_1.resizeImage)("encenadaport", 200, 200);
        expect(fs_1.default.existsSync(imagePath)).toBeTrue();
    }));
    it("throws for non-existent image", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessor_1.resizeImage)("no-image", 100, 100)).toBeRejected();
    }));
    it("throws for invalid width/height", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, imageProcessor_1.resizeImage)("encenadaport", -50, 100)).toBeRejected();
        yield expectAsync((0, imageProcessor_1.resizeImage)("encenadaport", 100, 0)).toBeRejected();
    }));
});
