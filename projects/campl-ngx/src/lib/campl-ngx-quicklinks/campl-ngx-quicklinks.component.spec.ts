import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CamplNgxQuicklinksComponent } from './campl-ngx-quicklinks.component';
import {
  Component,
  Injectable,
  DebugElement,
  Directive,
  Input,
  HostListener
} from '@angular/core';

import { CamplService } from '../services/campl.service';

// See https://angular.io/guide/testing#components-with-routerlink
// to prevent our tests failing 'routerLink' attribute unknown
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

// Create a parent component, to hold quicklinks in
@Component({
  selector: 'campl-test-ql',
  template: `
    <div>
      <div class='testele'>Some div to click on</div>
      <campl-ngx-quicklinks></campl-ngx-quicklinks>
    </div>
  `
})
class TestQuicklinksComponent {
  someCode() {
    console.log('clicked container element');
  }
}

@Injectable()
class MockCamplService {
  private config: any;
  public getConfig(): any {
    return (this.config = [
      { link: 'testlink1', label: 'label 1' },
      { link: 'testlink2', label: 'label 2' },
      { link: 'testlink3', label: 'label 3' }
    ]);
  }
}

describe('CamplNgxQuicklinksComponent', () => {
  let component: CamplNgxQuicklinksComponent;
  let fixture: ComponentFixture<CamplNgxQuicklinksComponent>;
  let fixture_outer: ComponentFixture<TestQuicklinksComponent>;
  let linkToggle: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestQuicklinksComponent,
        CamplNgxQuicklinksComponent,
        RouterLinkStubDirective
      ],
      providers: [{ provide: CamplService, useClass: MockCamplService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamplNgxQuicklinksComponent);
    fixture_outer = TestBed.createComponent(TestQuicklinksComponent);
    component = fixture.componentInstance;
    linkToggle = fixture.debugElement.query(By.css('.campl-quicklinks'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle list on click', fakeAsync(() => {
    const quicklinks_list_select = By.css('.campl-quicklinks-list');
    // test close-open-close
    // hidden at the start

    // expect(fixture.debugElement.query(quicklinks_list_select)).toBeNull();
    // https://stackoverflow.com/questions/41811609/test-freezes-when-expectresult-tobenull-fails-test-angular-2-jasmine
    let result = fixture.debugElement.query(quicklinks_list_select);
    expect(result === null).toBeTruthy();

    // after clicking the menu it should be available
    linkToggle.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.query(quicklinks_list_select)).not.toBeNull();

    // after clicking the open menu it should be removed
    linkToggle.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();

    // list no longer presented
    result = fixture.debugElement.query(quicklinks_list_select);
    expect(result === null).toBeTruthy();

    // open again an we will test that the list closes if a user clicks elsewhere on the page:
  }));

  it('should close menu when click elsewhere on page', fakeAsync(() => {
    // test open, click elsewhere close
    // fime/complete - @Hostlistener not capturing of eelement click

    const quicklinks_list_select = By.css('.campl-quicklinks-list');
    const outer_element = By.css('.testele');
    // test close-open-close(by external element)
    // hidden at the start

    // expect(fixture.debugElement.query(quicklinks_list_select)).toBeNull();
    // https://stackoverflow.com/questions/41811609/test-freezes-when-expectresult-tobenull-fails-test-angular-2-jasmine
    let result = fixture.debugElement.query(quicklinks_list_select);
    expect(result === null).toBeTruthy();

    // after clicking the menu it should be available
    linkToggle.triggerEventHandler('click', { button: 0 });
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.query(quicklinks_list_select)).not.toBeNull();

    // the outer element is visible:
    expect(fixture_outer.debugElement.query(outer_element)).not.toBeNull();

    // const event = new Event('click', { bubbles: true });
    // This doesn't seemed to trigger or bubble up to the document and
    // therefore not captured by the @HostListener on the test element
    // fixture_outer.debugElement
    //  .query(outer_element)
    //  .triggerEventHandler('click', { bubbles: true });

    // https://stackoverflow.com/questions/49878559/how-to-test-document-clicks-in-unit-tests-in-angular
    // NB we should refactor without the outer Component now!!
    document.dispatchEvent(new MouseEvent('click'));

    tick();
    fixture.detectChanges();

    result = fixture.debugElement.query(quicklinks_list_select);
    expect(result === null).toBeTruthy();
  }));

  xit('should follow menu link on click', () => {
    // TODO test user can navigate to external links open close
  });
});
