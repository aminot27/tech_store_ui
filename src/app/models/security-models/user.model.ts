import {IBaseModel} from "../base.model";

export interface IUserModel extends IBaseModel {
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: string;
  username: string;
}

export class UserModel implements IUserModel {
  email: string;
  firstName: string;
  lastName: string;
  lastLogin: string;
  username: string;

  constructor(data?: IUserModel) {
    this.init(data);
  }

  fromJSON(data?: any): UserModel {
    data = typeof data === 'object' ? data : {}
    return new UserModel(data)
  }

  init(_data?: any): void {
    if (_data) {
      this.email = _data['email'];
      this.firstName = _data['first_name'];
      this.lastName = _data['last_name'];
      this.lastLogin = _data['last_login'];
      this.username = _data['username'];
    }
  }

  toJSON(): {} {
    return {
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      last_login: this.lastName,
      username: this.username,
    };
  }

}
