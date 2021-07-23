import { Router } from "express";
import { CreateUserController } from "./useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenUserController } from "./useCases/refreshTokenUser/RefreshTokenUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router.post("/users", createUserController.handle);
router.post("/auth", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenUserController.handle);

router.use(ensureAuthenticated);
router.get("/courses", (request, response) => {
  return response.json([
    { id: 1, name: "Nodejs" },
    { id: 2, name: "ReactJS" },
  ]);
});

export { router };
