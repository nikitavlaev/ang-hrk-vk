import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFriendsComponent } from './info-friends.component';

describe('InfoFriendsComponent', () => {
  let component: InfoFriendsComponent;
  let fixture: ComponentFixture<InfoFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
