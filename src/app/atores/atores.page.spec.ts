import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtoresPage } from './atores.page';

describe('AtoresPage', () => {
  let component: AtoresPage;
  let fixture: ComponentFixture<AtoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
