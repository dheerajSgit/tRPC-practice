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
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
const standalone_1 = require("@trpc/server/adapters/standalone");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const todoInputTypes = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
});
const userSignupTypes = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8).max(20),
    fullName: zod_1.z.string(),
});
const appRouter = (0, trpc_1.router)({
    signUp: trpc_1.publicProcedure
        .input(userSignupTypes)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const email = opts.input.email;
        const password = opts.input.password;
        const fullName = opts.input.fullName;
        //Do Database stuff here
        const token = jsonwebtoken_1.default.sign({ email }, "Zcr9sdFAqggJkPk8iebKx/OZY2oOuFGzSEh7dAZOxmM=", { expiresIn: "1h" });
        return {
            email,
            password,
            fullName,
            token
        };
    })),
    createTodo: trpc_1.publicProcedure
        .input(todoInputTypes)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const title = opts.input.title;
        const description = opts.input.description;
        //Do Database stuff here
        return {
            title,
            description,
        };
    }))
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
});
server.listen(3000);
