import { makeAutoObservable } from "mobx";
import { User } from "../types/types";

export default class UserStore {
  private _isAuth: boolean;
  private _user: object;
  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }
  setUser(user: User) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
