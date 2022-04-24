import {IUser} from "../entity/user";
import { tokenService } from './tokenService';
import { ITokenData } from '../interfaces';


// @ts-ignore
class authService {
    public async registration(createdUser: IUser): Promise<ITokenData> {
        return this._getTokenData(createdUser);
    }

    private async _getTokenData(userData: IUser): Promise<ITokenData> {
        // @ts-ignore
        const { id, email } = userData;
        const tokensPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });
        await tokenService.saveToken(id, tokensPair.refreshToken, tokensPair.accessToken);

        return {
            ...tokensPair,
            userId: id,
            userEmail: email,
        };
    }
}

// @ts-ignore
export const authService = new AuthService();