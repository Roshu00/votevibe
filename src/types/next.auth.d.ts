import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  export interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}
