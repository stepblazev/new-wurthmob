import HttpApi from "@/core/http-api";

interface IAuthPayload {
    login: string;
    password: string;
}

interface IGetByIdPayload {
    id: string | number;
}

export class UserRepository {
    static async auth(payload: IAuthPayload) {
        const response = await HttpApi.get('/user/auth.php', { params: payload });
        return response.data;
    }
    static async getById(payload: IGetByIdPayload) {
        const response = await HttpApi.get('/user/auth.php', { params: payload });
        return response;
    }
}