import confg from "../confg/confg"; // env imported

import { Client, Account, ID } from "appwrite" 
// client account id imported fro appwrite as they are needed to make authenticate service

// make a class which has service which has some methods which will contact with backend

export class AuthService {
  // which methods are we going to make here
  // client and account all methods are attach  with account .create ,.logout etc

  // property

  client = new Client(); // 1 client make

  account; // acount make

  constructor() {
    this.client // set client setendpoint and project these methods axcpt our backend api end and project id
      .setEndpoint(confg.appWriteUrl)
      .setProject(confg.appWriteProjectId);

    this.account = new Account(this.client); // 2 make account
  }
  // 3 create account as create account return us a promise so we make async
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // create another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login({ email, password }) {
    // step 4 creaate a login   after create account
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  // step  5 wether i am login or log out account get

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  //step 5 for logout

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

// this class will have some methids and to use that methods we need to make a object so make a object here and eccxport that object

const authService = new AuthService(); //  object made from AuthService class

export default authService;
