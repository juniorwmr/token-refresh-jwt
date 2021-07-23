import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import secretKey from "../utils/secretKey";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: "Token is missing." });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, secretKey.key);
    return next();
  } catch (e) {
    return response.status(401).json({
      message: "Invalid token.",
    });
  }
}
