import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagFieldComponent } from './tag-field.component';

describe('TagFieldComponent', () => {
  let component: TagFieldComponent;
  let fixture: ComponentFixture<TagFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TagFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not do anything until , is added', async () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    expect(input).toBeTruthy();

    input.value = 'mytag';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(component.value().length === 0).toBeTrue();

    input.value += ',';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(input.value === '').toBeTrue();
    expect(component.value()[0] === 'mytag').toBeTrue();
  });

  it('should remove tag when button is pressed', async () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input',
    ) as HTMLInputElement;

    expect(input).toBeTruthy();

    input.value = 'mytag,';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    fixture.detectChanges(); // for loop must be ran again

    const xbutton = (fixture.nativeElement as HTMLElement).querySelector(
      'button',
    ) as HTMLButtonElement;

    xbutton.click();
    await fixture.whenStable();
    expect(component.value().length === 0).toBeTrue();
  });
});
