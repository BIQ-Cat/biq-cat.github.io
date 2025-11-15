import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DowMapViewerWeb } from './dow-map-viewer-web';

describe('DowMapViewerWeb', () => {
  let component: DowMapViewerWeb;
  let fixture: ComponentFixture<DowMapViewerWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DowMapViewerWeb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DowMapViewerWeb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
