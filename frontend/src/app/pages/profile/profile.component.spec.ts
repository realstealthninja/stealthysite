import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { provideMarkdown } from 'ngx-markdown';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, RouterModule.forRoot([])],
      providers: [provideMarkdown()],
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
    fixture.componentRef.setInput('user', test_user);
    fixture.componentRef.setInput('blogs', []);
    fixture.componentRef.setInput('me', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
