import {IBaseModel} from "../base.model";
import {UserModel} from "./user.model";


export interface IAuthUserModel extends IBaseModel {
  refresh: string,
  access: string,
  user: UserModel,
}

export class AuthUserModel implements IAuthUserModel {

  access: string
  refresh: string
  user: UserModel

  constructor(data?: IAuthUserModel) {
    this.init(data);
  }

  public init(_data?: any) {
    if (_data) {
      this.access = _data['access'];
      this.refresh = _data['refresh'];
      this.user = new UserModel(_data['user']);
    }
  }

  public fromJSON(data?: any): any {
    data = typeof data === 'object' ? data : {};
    return new AuthUserModel(data);
  }

  public toJSON(): {} {
    return {
      access: this.access,
      refresh: this.refresh,
      user: this.user.toJSON()
    }
  }
}
