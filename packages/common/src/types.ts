const { z } = require("zod");

const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    name: z.string(),
});

const SigninSchema = z.object({
    username: z.string(),
    password: z.string(),
});

const CreateRoomSchema = z.object({
    name: z.string().min(3).max(30)
});

// Exporting in CommonJS
module.exports = {
    CreateUserSchema,
    SigninSchema,
    CreateRoomSchema
};
