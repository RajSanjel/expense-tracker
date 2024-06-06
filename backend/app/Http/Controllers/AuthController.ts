import { Request, Response } from "express";
import * as AuthProvider from "../../Providers/auth";

const AuthController = {
  user: async (req: Request, res: Response) => {
    try {
      const userData = (await AuthProvider.user(req)) as any;

      if (userData.msg) {
        return res.status(400).json({ msg: userData.msg });
      }

      return res.status(200).json(userData);
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ msg: "Server Error" });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const loginData = await AuthProvider.login(req);

      if (loginData.msg) {
        return res.status(400).json({ msg: loginData.msg });
      }

      return res.status(200).json(loginData);
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ msg: "Server Error" });
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const registerData = (await AuthProvider.register(req)) as any;

      if (registerData.msg) {
        return res.status(400).json({ msg: registerData.msg });
      }

      return res.status(200).json(registerData);
    } catch (error) {
      console.error((error as Error).message);
      return res.status(500).json({ msg: "Server Error" });
    }
  },
};

export default AuthController;
