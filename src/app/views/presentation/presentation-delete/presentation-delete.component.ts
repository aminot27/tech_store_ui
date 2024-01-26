import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PresentationService } from 'src/app/services/api/presentation.service'; 
import { ToastrService } from 'ngx-toastr';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-presentation-delete',
  templateUrl: './presentation-delete.component.html',
  styleUrls: ['./presentation-delete.component.scss']
})
export class PresentationDeleteComponent implements OnInit, OnDestroy{
  title = 'PRESENTACIÓN';
  id: number
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PresentationDeleteComponent>,
    private presentationService: PresentationService,
    private toastr: ToastrService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.id = this.data.presentation_id;
  }

  onConfirm(id: number): void {
    this.presentationService.deletePresentation(this.data.presentation_id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe({ 
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
      }
    });
  }
}