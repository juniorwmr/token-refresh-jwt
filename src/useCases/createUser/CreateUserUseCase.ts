import { hash } from "bcryptjs";
import { client } from "../../prisma/client";

export interface IUserRequest {
  username: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ username, password }: IUserRequest): Promise<IUserRequest> {
    // verify if users already exists
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }
    // register new user

    const passwordHash = await hash(password, 8);
    const user = await client.user.create({
      data: {
        username,
        password: passwordHash,
      },
    });
    return user;
  }
}

export { CreateUserUseCase };
