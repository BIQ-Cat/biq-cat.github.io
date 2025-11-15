import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProject } from './single-project';

describe('SingleProject', () => {
  let component: SingleProject;
  let fixture: ComponentFixture<SingleProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
