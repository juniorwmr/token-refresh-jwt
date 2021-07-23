import { sign } from "jsonwebtoken";
import secretKey from "../utils/secretKey";

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, secretKey.key, {
      subject: userId,
      expiresIn: "20s",
    });

    return token;
  }
}

export { GenerateTokenProvider };
