import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyServer } from './easy-server';

describe('EasyServer', () => {
  let component: EasyServer;
  let fixture: ComponentFixture<EasyServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EasyServer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyServer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
