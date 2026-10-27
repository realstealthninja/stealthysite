import { Component, model, ModelSignal } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-tag-field',
  styleUrl: './tag-field.component.css',
  templateUrl: './tag-field.component.html',
})
export class TagFieldComponent implements FormValueControl<string[]> {
  public value: ModelSignal<string[]> = model<string[]>([]);

  onInput(event: InputEvent) {
    const inputElement = event.target as HTMLInputElement;
    let tag = inputElement.value;

    if (!tag.endsWith(',')) {
      return;
    }

    tag = tag.replace(',', '');
    this.value().push(tag);
    inputElement.value = '';
  }

  removeTag(tag: string) {
    this.value().splice(this.value().indexOf(tag), 1);
  }
}
