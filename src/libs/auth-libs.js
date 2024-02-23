import prisma from "@/libs/prisma"
import bcrypt from "bcrypt"

export function validateUserInput(dataUser) {
    if (!dataUser.email || !dataUser.email.includes('@')) {
        return {
            status: false,
            message: "Invalid email!"
        };
    }
    if (!dataUser.password || dataUser.password.length < 6) {
        return {
            status: false,
            message: "Password must be at least 6 characters long!"
        };
    }
    return {
        status: true,
        message: "Valid input!"
    };
}

export async function register(dataUser) {
    const validation = validateUserInput(dataUser);
    if (!validation.status) {
        return validation;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: dataUser.email
        }
    });

    if (user) {
        return {
            status: false,
            statusCode: 400,
            message: "Email already exist."
        };
    } else {
        dataUser.password = await bcrypt.hash(dataUser.password, 10);

        try {
            await prisma.user.create({ data: dataUser })
            return ({ status: true, statusCode: 200, message: "Register Success" })
        } catch (error) {
            console.error(error);
            return ({ status: false, statusCode: 400, message: "An error occurred while registering. Please try again." })
        }
    }
}

export async function login(dataUser) {
    const validation = validateUserInput(dataUser);
    if (!validation.status) {
        return validation;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: dataUser.email
        }
    });

    if(user){
        return user
    } else {
        return null
    }
}
