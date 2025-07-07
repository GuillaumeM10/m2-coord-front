import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesComponent } from './games.component';
import { GamesService } from '@app/services/games.service';
import { of } from 'rxjs';
import { GameDto } from '@api/models/game-dto';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let gamesServiceMock: Partial<GamesService>;

  const gamesMock: GameDto[] = [
    {
      id: '1',
      key: 'test',
      name: 'Test Game',
      modes: ['CLASSIC'],
      photoUrl: 'test_url',
    } as GameDto,
  ];

  beforeEach(async () => {
    gamesServiceMock = {
      getGames: jest.fn(() => of([])),
    };

    await TestBed.configureTestingModule({
      imports: [GamesComponent],
      providers: [{ provide: GamesService, useValue: gamesServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch games on init', () => {
    const spy = jest.spyOn(gamesServiceMock, 'getGames');
    (gamesServiceMock.getGames as jest.Mock).mockReturnValue(of(gamesMock));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.games).toEqual(gamesMock);
  });
});
