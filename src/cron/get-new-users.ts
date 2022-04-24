import cron from "node-cron";
import { userRepository } from "../repositories/user/userRepository";

export const getNewUsers = async ()=> {
    cron.shedule('*/10*****', async () => {
        console.log('START WORK WITH GET NEW USERS');
        const newUsers = await userRepository.getNewUsers();

        console.log('******************');
        console.log(newUsers);
        console.log('******************');
    });
}