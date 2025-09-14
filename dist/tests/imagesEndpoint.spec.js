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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("GET /api/images", () => {
    it("returns 200 for valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=200&height=200");
        expect(response.status).toBe(200);
    }));
    it("returns 400 if all params are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Missing required parameters");
    }));
    it("returns 400 if filename is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?width=200&height=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Missing required parameters");
    }));
    it("returns 400 if width is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&height=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Missing required parameters");
    }));
    it("returns 400 if height is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Missing required parameters");
    }));
    it("returns 400 if width is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=abc&height=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Width and height must be valid numbers");
    }));
    it("returns 400 if height is not a number", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=200&height=xyz");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Width and height must be valid numbers");
    }));
    it("returns 400 if width <= 0", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=-10&height=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Width and height must be greater than 0");
    }));
    it("returns 400 if height <= 0", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=encenadaport&width=200&height=0");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Width and height must be greater than 0");
    }));
    it("returns 400 if filename has invalid format", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=fjord123!&width=200&height=200");
        expect(response.status).toBe(400);
        expect(response.text).toContain("Invalid filename format");
    }));
    it("returns 404 if filename does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/images?filename=notfound&width=200&height=200");
        expect(response.status).toBe(404);
        expect(response.text).toContain("Image not found");
    }));
});
