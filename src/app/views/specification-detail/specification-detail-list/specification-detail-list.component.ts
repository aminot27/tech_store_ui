import { Component, OnDestroy, OnInit } from '@angular/core';
import { ISpecificationDetail } from 'src/app/models/specification-detail.model';
import { SpecificationDetailService } from 'src/app/services/api/specification-detail.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { SpecificationDetailEditComponent } from '../specification-detail-edit/specification-detail-edit.component';
import { SpecificationDetailDeleteComponent } from '../specification-detail-delete/specification-detail-delete.component';
import { SpecificationDetailAddComponent } from '../specification-detail-add/specification-detail-add.component';
import { ISpecification } from 'src/app/models/specification.model';
import { SpecificationService } from 'src/app/services/api/specification.service';

@Component({
  selector: 'app-specification-detail-list', 
  templateUrl: './specification-detail-list.component.html', 
  styleUrls: ['./specification-detail-list.component.scss']
})
export class SpecificationDetailListComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['specificationName','key', 'value', 'created', 'modified'];
  columnNames: string[] = ['Especificación','Key', 'Valor', 'Creado', 'Modificado'];
  dataSource: MatTableDataSource<ISpecificationDetail>; 
  private unsubscribe$: Subject<any> = new Subject<any>();
  private specifications: ISpecification[] = [];

  constructor(
    private specificationDetailService: SpecificationDetailService, 
    private dialog: MatDialog,
    private crudEventsService: CrudEventsService,
    private specificationService: SpecificationService,
  ) {
    this.dataSource = new MatTableDataSource<ISpecificationDetail>([]); 
  }

  ngOnInit(): void {
    this.loadSpecifications();
    this.updateTableData();
    this.crudEventsService.itemAdded
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
    this.crudEventsService.itemUpdated
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.updateTableData();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadSpecifications(): void{
    this.specificationService.getSpecifications()
    .pipe(takeUntil(this.unsubscribe$))
      .subscribe(specifications => {
        this.specifications = specifications;
      });
  }

  getSpecificationName(specificationId: number): string {
    const specification = this.specifications.find(s => s.specification_id === specificationId);
    return specification ? specification.name : 'N/A';
  }

  updateTableData(): void {
    forkJoin({
      specificationsDetail: this.specificationDetailService.getSpecificationDetails(),
      specifications: this.specificationService.getSpecifications() 
    })
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(({ specificationsDetail, specifications }) => {
      this.specifications = specifications;
      this.dataSource.data = specificationsDetail.map(spec => ({
        ...spec,
        specificationName: this.getSpecificationName(spec.specification)
      }));
    });
  }

  openEditModal(element: any){
    const dialogRef = this.dialog.open(SpecificationDetailEditComponent, {
      data: { specification: element }
    });
    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  openDeleteModal(element: any){
    const dialogRef = this.dialog.open(SpecificationDetailDeleteComponent, {
      data: { specification_detail_id: element.specification_detail_id }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }

  addSpecificationDetailModal(){
    const dialogRef = this.dialog.open(SpecificationDetailAddComponent, {});
    dialogRef.afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if (result) {
        this.updateTableData();
      }
    });
  }
}