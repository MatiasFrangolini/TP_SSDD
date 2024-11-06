import { getAllUsers, createUser } from "../repositories/UserRepository.js"; 

export const userService = {

    async getAllUsers() {
        return await getAllUsers();
    },

    async createUser(user) {
        return await createUser(user);
    },

};