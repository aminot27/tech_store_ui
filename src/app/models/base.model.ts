export interface IBaseModel {
  init(data?: any): void;

  fromJSON(data?: any): any;

  toJSON(): {};
}
