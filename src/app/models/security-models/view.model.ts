import {IBaseModel} from "../base.model";

export interface IViewModel extends IBaseModel {
  viewId: number,
  view: string,
  description: string,
  path: string,
  order: number,
  icon: string
}

export class ViewModel implements IViewModel {
  description: string;
  icon: string;
  view: string;
  order: number;
  viewId: number;
  path: string;

  constructor(data?: IViewModel) {
    this.init(data);
  }

  fromJSON(data?: any): ViewModel {
    data = typeof data === 'object' ? data : {}
    return new ViewModel(data);
  }

  init(data?: any): void {
    if (data) {
      this.view = data['view'];
      this.description = data['description'];
      this.icon = data['icon'];
      this.order = data['order'];
      this.viewId = data['view_id'];
      this.path = data['path'];
    }
  }

  toJSON(): {} {
    return {
      view: this.view,
      description: this.description,
      icon: this.icon,
      order: this.order,
      view_id: this.viewId,
      path: this.path,
    };
  }

}
