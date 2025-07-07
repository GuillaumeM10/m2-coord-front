import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { GamesService } from '@app/services/games.service';
import { GameDto } from '@api/models/game-dto';

const mockGamesService = {
  getGames: () => ({
    subscribe: (fn: (games: GameDto[]) => void) => fn([]),
  }),
};

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryComponent],
      providers: [{ provide: GamesService, useValue: mockGamesService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
