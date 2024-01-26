import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudEventsService {
  itemAdded = new Subject<void>();
  itemUpdated = new Subject<void>();
  itemDeleted = new Subject<any>();
}