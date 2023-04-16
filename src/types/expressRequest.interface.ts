import { UserEntity } from "@app/user/user.entity";
import { Request } from "express";

export interface ExpressRquest extends Request {
  user?: UserEntity
}