import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileFieldComponent } from './file-field.component';

describe('FileFieldComponent', () => {
  let component: FileFieldComponent;
  let fixture: ComponentFixture<FileFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('accept', 'text/plain');
    fixture.componentRef.setInput('max_size', 5);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept said files', async () => {
    expect(component.accept() === 'text/plain').toBeTrue();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;

    expect(input).toBeTruthy();
    const datatransfer = new DataTransfer();
    datatransfer.items.add(new File([], 'hello world', { type: 'text/plain' }));
    input.files = datatransfer.files;
    input.dispatchEvent(new Event('change'));

    await fixture.whenStable();

    expect(component.value().type === 'text/plain').toBeTrue();
    expect(component.value().name === 'hello world').toBeTrue();
  });

  it('should reject files with wrong type', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;

    spyOn(window, 'alert');

    const datatransfer = new DataTransfer();
    datatransfer.items.add(
      new File([], 'hello world', { type: 'text/notplain' }),
    );
    input.files = datatransfer.files;

    input.dispatchEvent(new Event('change'));

    await fixture.whenStable();
    expect(window.alert).toHaveBeenCalledWith(
      `Only ${component.accept()} files please`,
    );
  });

  it('should do nothing if files are empty', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;
    const datatransfer = new DataTransfer();
    input.files = datatransfer.files;
    input.dispatchEvent(new Event('change'));

    await fixture.whenStable();
    expect(component.value()).toBeTruthy();
  });

  it('should reject file if size is too large', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;

    spyOn(window, 'alert');

    const datatransfer = new DataTransfer();
    datatransfer.items.add(
      new File(
        [
          JSON.stringify(
            { my: 'large object', having: 'more than two bytes' },
            null,
            2,
          ),
        ],
        'hello world',
        { type: 'text/plain' },
      ),
    );
    input.files = datatransfer.files;

    input.dispatchEvent(new Event('change'));

    await fixture.whenStable();
    expect(window.alert).toHaveBeenCalledWith(
      `Only files less than ${component.max_size() / Math.pow(2, 10)}MiB`,
    );
  });
});
