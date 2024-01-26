import {DragAndDropDirective} from "./drag-and-drop.directive";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [DragAndDropDirective],
  imports: [CommonModule],
  exports: [DragAndDropDirective],
})
export class DirectivesModule {
}
