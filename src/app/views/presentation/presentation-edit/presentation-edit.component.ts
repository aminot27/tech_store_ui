import { Component, OnInit, Inject } from '@angular/core';
import { PresentationService } from 'src/app/services/api/presentation.service';
import { UnitService } from 'src/app/services/api/unit.service'; 
import { CrudEventsService } from 'src/app/services/crud-events.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-presentation-edit',
  templateUrl: './presentation-edit.component.html',
  styleUrls: ['./presentation-edit.component.scss']
})
export class PresentationEditComponent implements OnInit {
  title = 'EDITAR PRESENTACIÓN';
  units = [];
  private unsubscribe$: Subject<any> = new Subject<any>();
  presentationFormConfig: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private presentationService: PresentationService,
    private unitService: UnitService, 
    private crudEventsService: CrudEventsService,
    public dialogRef: MatDialogRef<PresentationEditComponent>,
    private toastr: ToastrService
  ) {
    this.presentationFormConfig = [
      { name: 'unit', label: 'Nombre de Unidad', type: 'select', options: this.units, required: true, value: data.presentation.unit }, 
      { name: 'description', label: 'Descripción', type: 'text', required: true, maxLength: 20, value: data.presentation.description },
      { name: 'quantity', label: 'Cantidad', type: 'number', required: true, value: data.presentation.quantity },
      { name: 'is_min', label: '¿Es Mínimo?', type: 'checkbox', required: true, value: data.presentation.is_min }
    ];
  }

  ngOnInit() {
    this.loadUnits();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  loadUnits() {
    this.unitService.getUnits()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      (data) => {
        this.units = data.map(unit => ({ value: unit.unit_id, viewValue: unit.name }));
        const unitField = this.presentationFormConfig.find(field => field.name === 'unit');
        if (unitField) {
          unitField.options = this.units;
        }
      },
      (error) => {
        this.toastr.error('Error al cargar las unidades');
      }
    );
  }

  onFormSubmit(formValue: any) {
    this.presentationService.updatePresentation(this.data.presentation.presentation_id, formValue)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      response => {
        this.crudEventsService.itemUpdated.next();
        this.dialogRef.close(true);
      },
      error => {
        this.toastr.error('Error al editar la presentación');
      }
    );
  }
}