import {IBaseModel} from "../base.model";
import {ViewModel} from "./view.model";

export interface IModuleModel extends IBaseModel {
  moduleId: number;
  module: string;
  description: string;
  order: number;
  icon: string;
  code: string;
  url: string;
  views: ViewModel[];
}

export class ModuleModel implements IModuleModel {
  moduleId: number;
  module: string;
  description: string;
  order: number;
  icon: string;
  code: string;
  url: string;
  views: ViewModel[];

  constructor(data?: IModuleModel) {
    this.init(data);
  }

  fromJSON(data?: any): ModuleModel {
    data = typeof data === 'object' ? data : {};
    return new ModuleModel(data);
  }

  init(_data?: any): void {
    if (_data) {
      this.moduleId = _data['module_id'];
      this.module = _data['name'];
      this.description = _data['description'];
      this.order = _data['order'];
      this.icon = _data['icon'];
      this.code = _data['code'];
      this.url = _data['url'];
      this.views = _data['views'] instanceof Array ? _data['views'].map(view => new ViewModel(view)) : [];
    }
  }

  toJSON(): {} {
    return {
      description: this.description,
      icon: this.icon,
      module_id: this.moduleId,
      module: this.module,
      order: this.order,
      code: this.code,
      views: this.views.map(view => view.toJSON())
    }
  }

}
