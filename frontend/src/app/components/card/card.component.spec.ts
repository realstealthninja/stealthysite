import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test123');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate read time', () => {
    expect(component.calculateReadTime('hello world')).toBeCloseTo(0);
    expect(
      component.calculateReadTime(
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, cum nulla. Vel quidem adipisci cum in consequuntur repellendus exercitationem nostrum ipsa quia optio aperiam, aut, officiis expedita possimus excepturi ab?',
      ),
    ).toBeCloseTo(0);
  });
});
