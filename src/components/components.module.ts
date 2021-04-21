import { NgModule } from '@angular/core';
import { RichTextComponent } from './rich-text/rich-text';
import { DatePickerComponent } from './date-picker/date-picker';
@NgModule({
	declarations: [RichTextComponent,
    DatePickerComponent,
    DatePickerComponent],
	imports: [],
	exports: [RichTextComponent,
    DatePickerComponent,
    DatePickerComponent]
})
export class ComponentsModule {}
