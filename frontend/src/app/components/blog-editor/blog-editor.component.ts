import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarkdownPipe } from 'ngx-markdown';

@Component({
  selector: 'app-blog-editor',
  imports: [MarkdownPipe, AsyncPipe],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css'
})
export class BlogEditorComponent {
  private formBuilder = inject(FormBuilder);

  markdownForm!: FormGroup;
  markdownText: string = "";

  ngOnInit() {
    this.markdownForm = this.formBuilder.group(
      {
        title: ['', [Validators.required]],
        text: ['', [Validators.required]],
        tags: ['', [Validators.required]]
      }
    )
  }

  renderMarkdown(event: Event) {
    this.markdownText = (event.target as HTMLInputElement).value;
  }
}
