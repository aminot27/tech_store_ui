import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPresentation } from 'src/app/models/presentation.model';
import { IUnit } from 'src/app/models/unit.model';
import { PresentationService } from 'src/app/services/api/presentation.service';
import { UnitService } from 'src/app/services/api/unit.service';
import { MatTableDataSource } from '@angular/material/table';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialog } from '@angular/material/dialog';
import { PresentationEditComponent } from '../presentation-edit/presentation-edit.component';
import { PresentationDeleteComponent } from '../presentation-delete/presentation-delete.component';
import { PresentationAddComponent } from '../presentation-add/presentation-add.component';
import { takeUntil, forkJoin } from "rxjs";
import { Subject } from "rxjs";

@Component({
  selector: 'app-presentation-list',
  templateUrl: './presentation-list.component.html',
  styleUrls: ['./presentation-list.component.scss']
})
export class PresentationListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [ "unitName", "description", "quantity", "is_min","created", "modified"];
  columnNames: string[] = ["Nombre Unidad",  "Descripción","Cantidad", "Es Mínimo","Creado", "Modificado"];
  dataSource: MatTableDataSource<IPresentation>;
  private unsubscribe$: Subject<any> = new Subject<any>();
  private units: IUnit[] = [];

  constructor(
    private presentationService: PresentationService,
    private unitService: UnitService,
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService) {
    this.dataSource = new MatTableDataSource<IPresentation>([]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loadUnits();
    this.updateTableData();
    this.crudEventsService.itemAdded
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateTableData();
      });
  }

  loadUnits(): void {
    this.unitService.getUnits()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(units => {
        this.units = units;
      });
  }

  getUnitName(unitId: number): string {
    const unit = this.units.find(u => u.unit_id === unitId);
    return unit ? unit.name : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      presentations: this.presentationService.getPresentations(),
      units: this.unitService.getUnits()
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ presentations, units }) => {
      this.units = units;
      this.dataSource.data = presentations.map(presentation => ({
        ...presentation,
        unitName: this.getUnitName(presentation.unit)
      }));
    });
  }

  openEditModal(presentation: IPresentation): void {
    const dialogRef = this.dialog.open(PresentationEditComponent, {
      data: { presentation }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any) {
    const dialogRef = this.dialog.open(PresentationDeleteComponent, {
      data: { presentation_id: element.presentation_id }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(PresentationAddComponent);
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}