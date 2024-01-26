import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss']
})
export class GenericFormComponent implements OnInit {
  @Input() title: string;
  @Input() config: any;
  @Output() submitEvent = new EventEmitter<any>();
  @Input() showAddButtonForSerial: boolean;
  @Input() showActions: boolean = true;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.config.forEach(field => {
      let controlValue = field.value !== undefined ? field.value : '';
      let validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.maxLength) {
        validators.push(Validators.maxLength(field.maxLength));
      }
      if (field.type === 'checkbox') {
        controlValue = !!controlValue;
      }
      const control = this.formBuilder.control(controlValue, validators);
      group.addControl(field.name, control);
    });
    return group;
  }

  onFormSubmit() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

  resetForm() {
    this.form.reset();
  }
}