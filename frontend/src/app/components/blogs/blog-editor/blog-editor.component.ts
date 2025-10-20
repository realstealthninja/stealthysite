import {
  Component,
  ElementRef,
  inject,
  inputBinding,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogMarkdownRendererComponent } from '../blog-markdown-renderer/blog-markdown-renderer.component';
import { Blog } from '../../../interfaces/blog';

@Component({
  selector: 'app-blog-editor',
  imports: [],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css',
})
export class BlogEditorComponent implements OnInit {
  @ViewChild('iframe', { static: false })
  iframe!: ElementRef;

  private formBuilder = inject(FormBuilder);
  private vcr = inject(ViewContainerRef);

  isPreview = false;
  markdownForm!: FormGroup;
  markdownText = '';
  blogTitle = '';

  blog: Blog = {
    id: 99999,
    title: '',
    tags: [],
    content: '',
    comments: [],
    author: {
      id: 0,
      username: '',
      firstname: '',
      lastname: '',
      blogs: [],
    },
    created_on: new Date(),
    edited_on: new Date(),
  };

  blog$ = signal(this.blog);

  ngOnInit() {
    this.markdownForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });
  }

  renderMarkdown(event: Event) {
    this.blog.content = (event.target as HTMLTextAreaElement).value;
  }

  changeTitle(event: Event) {
    this.blog.title = (event.target as HTMLInputElement).value;
  }

  onLoad(iframe: HTMLIFrameElement) {
    const compRef = this.vcr.createComponent(BlogMarkdownRendererComponent, {
      bindings: [inputBinding('blog$', this.blog$)],
    });

    const doc = iframe.contentDocument;
    doc?.body.appendChild(compRef.location.nativeElement);
  }
}
