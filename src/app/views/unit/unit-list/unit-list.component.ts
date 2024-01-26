import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUnit} from 'src/app/models/unit.model';
import {UnitService} from 'src/app/services/api/unit.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {UnitAddComponent} from '../unit-add/unit-add.component';
import {CrudEventsService} from 'src/app/services/crud-events.service';
import {UnitDeleteComponent} from '../unit-delete/unit-delete.component';
import {UnitEditComponent} from '../unit-edit/unit-edit.component';
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'abbreviation', 'created', 'modified'];
  columnNames: string[] = [ 'Nombre', 'Abreviatura','Creado', 'Modificado'];
  dataSource: MatTableDataSource<IUnit>;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private unitService: UnitService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService
  ) {
    this.dataSource = new MatTableDataSource<IUnit>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.updateTableData();
    this.crudEventsService.itemAdded
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateTableData();
      });
  }

  updateTableData(): void {
    this.unitService.getUnits().pipe(takeUntil(this.unsubscribe$))
      .subscribe(units => {
        this.dataSource.data = units;
      });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(UnitAddComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openEditModal(unit: IUnit): void {
    const dialogRef = this.dialog.open(UnitEditComponent, {
      data: {unit}
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
  
  openDeleteModal(element: any): void {
    const dialogRef = this.dialog.open(UnitDeleteComponent, {
      data: {unit_id: element.unit_id}
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}
