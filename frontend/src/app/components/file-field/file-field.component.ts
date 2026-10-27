import { Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  imports: [],
  selector: 'app-file-field',
  styleUrl: './file-field.component.css',
  templateUrl: './file-field.component.html',
})
export class FileFieldComponent implements FormValueControl<File> {
  accept = input<string>();
  max_size = input<number>(1_000_000);
  value = model(new File([], '', {}));

  onChange(event: Event) {
    const element = event.target as HTMLInputElement;

    if (!element.files || element.files.length === 0) {
      return;
    }
    const file = element.files[0];

    if (file.type !== this.accept()) {
      alert(`Only ${this.accept()} files please`);
      element.files = new DataTransfer().files;
      return;
    }
    if (file.size > this.max_size()) {
      alert(`Only files less than ${this.max_size() / Math.pow(2, 10)}MiB`);
      element.files = new DataTransfer().files;
      return;
    }

    this.value.set(file);
  }
}
