import dayjs from "dayjs";

import { client } from "../prisma/client";

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, "second").unix();

    const refreshTokenAlreadyExists = await client.refreshToken.findFirst({
      where: {
        userId,
      },
    });

    if (refreshTokenAlreadyExists) {
      const generateRefreshToken = await client.refreshToken.update({
        data: {
          expiresIn,
        },
        where: {
          id: refreshTokenAlreadyExists.id,
        },
      });

      return generateRefreshToken;
    }
    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
