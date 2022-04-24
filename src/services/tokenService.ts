import jwt from 'jsonwebtoken';

import {config} from '../config/config';
import {IToken} from '../entity/token';
import {tokenRepository} from '../repositories/token/tokenRepository';
import {ITokenPair, IUserPayload} from '../interfaces';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        // @ts-ignore
        const {SECRET_ACCESS_KEY} = config;
        const accessToken = jwt.sign(
            payload,
            SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string, accessToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenByUserId(userId);
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ accessToken, refreshToken, userId });
    }

    async deleteUserTokenPair(userId: number) {
        return tokenRepository.deleteByParams({ userId });
    }

    async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteByParams(searchObject);
    }

    verifyToken(authToken: string, tokenType = 'access'): IUserPayload {
        // @ts-ignore
        let {SECRET_ACCESS_KEY: secretWord} = config;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();