export interface IResultViewModel<T> {
  data: T;
  message: string;
  status: boolean;
}

export class ResultViewModel<T> implements IResultViewModel<T> {
  data: T;
  message: string;
  status: boolean;
}
