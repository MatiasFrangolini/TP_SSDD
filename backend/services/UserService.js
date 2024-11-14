import { getAllUsers, createUser } from "../repositories/AdminRepository.js";

class UserService {
    getAllUsers() {
        return getAllUsers();
    }

    createUser(user) {
        return createUser(user);
    }
}

const userService = new UserService();
export default userService