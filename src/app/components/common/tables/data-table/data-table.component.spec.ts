import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { CdkTableDataSourceInput } from '@angular/cdk/table';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should populate displayedColumns from the keys of the first object when dataSource is a non-empty array', () => {
      const rows: Array<Record<string, unknown>> = [
        { id: 1, name: 'Alice', active: true },
        { id: 2, name: 'Bob', active: false },
      ];
      component.dataSource = rows as CdkTableDataSourceInput<unknown>;
      component.ngOnInit();
      expect(component.displayedColumns).toEqual(['id', 'name', 'active']);
    });

    it('should leave displayedColumns empty if dataSource is not an array', () => {
      component.dataSource = ({ connect: () => null, disconnect: () => {} } as any) as CdkTableDataSourceInput<unknown>;
      component.ngOnInit();
      expect(component.displayedColumns).toEqual([]);
    });

    it('should throw TypeError when dataSource is an empty array', () => {
      component.dataSource = [] as CdkTableDataSourceInput<unknown>;
      expect(() => component.ngOnInit()).toThrow(TypeError);
    });
  });
});
