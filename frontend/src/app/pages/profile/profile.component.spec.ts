import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { computed } from '@angular/core';
import { User } from '../../interfaces/user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterModule.forRoot([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    const test_user: User = {
      id: 'abcd-efgh-hijk-lmno',
      username: 'John Doe',
      avatar: '',
      bio: 'Hello world my name is John doe',
      blogs: [],
      comments: [],
      roles: [],
    };
    fixture.componentInstance.user = computed(
      () => test_user,
    ) as unknown as typeof fixture.componentInstance.user;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
