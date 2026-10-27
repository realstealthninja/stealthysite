import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagFieldComponent } from './tag-field.component';

describe('TagFieldComponent', () => {
  let component: TagFieldComponent;
  let fixture: ComponentFixture<TagFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagFieldComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TagFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
