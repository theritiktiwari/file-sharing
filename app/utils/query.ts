"use server";
import prisma from "@/app/utils/db";

// Save the file to the database
export async function saveFileToDB(userId: string, key: string, secretToken: string) {
    const file = await prisma.file?.create({
        data: {
            userId,
            key,
            secretToken
        }
    });
    return file;
}

// User can get all the files that he has uploaded
export async function getAllFiles(userId: string) {
    const files = await prisma.file?.findMany({
        where: { userId }
    });
    return files;
}

// get the single file by key
export async function getFileById(key: string) {
    const file = await prisma.file?.findMany({
        where: { key }
    });
    return file[0];
}

// get user details by email
export async function getUserByEmail(email: string) {
    const user = await prisma.user?.findUnique({
        where: { email }
    });
    return user;
}

// update the user profile
export async function updateUserProfile(email: string, name?: string, image?: string) {
    const user = await prisma.user?.update({
        where: { email: email },
        data: { name, image }
    });
    return user;
}

// get all the sessions of the user
export async function getAllSessions(userId: string) {
    const sessions = await prisma.session?.findMany({
        where: { userId }
    });
    return sessions;
}

// remove all the sessions of the user
export async function removeAllSessions(userId: string) {
    try {
        const sessions = await prisma.session?.deleteMany({
            where: { userId }
        });
        return sessions;
    } catch (e: any) {
        return {
            type: "error",
            message: e.message
        }
    }
}

// Admin can get all the users
export async function getAllUsers() {
    const users = await prisma.user?.findMany();
    return users;
}

// Admin can delete the user by id
export async function deleteUserById(id: string) {
    const user = await prisma.user?.delete({
        where: { id }
    });
    return user;
}