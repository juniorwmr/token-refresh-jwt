import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";
import { GenerateRefreshToken } from "../../provider/gerenateRefreshToken";
import secretKey from "../../utils/secretKey";

interface IRequestAuth {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ username, password }: IRequestAuth) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User or password incorrect.");
    }

    const isPasswordCorrect = await compare(
      password,
      userAlreadyExists.password
    );

    if (!isPasswordCorrect) {
      throw new Error("User or password incorrect.");
    }

    // gerenate token JWT
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    // adding a refresh token JWT
    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
