import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilmesPage } from './filmes.page';

describe('FilmesPage', () => {
  let component: FilmesPage;
  let fixture: ComponentFixture<FilmesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
