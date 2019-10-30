import { TopListHoverDirective } from "./top-list-hover.directive";

// Do not test (an do not use this directive)
// Avoid manipulating the DOM with Angular - think of a better implementation
/* xdescribe("TopListHoverDirective", () => {
  xit("should create an instance", () => {
    const directive = new TopListHoverDirective();
    expect(directive).toBeTruthy();
  });
}); */
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { CamplNgCapabilitiesService } from "../services/campl-ng-capabilities.service";
import { ReplaySubject } from "rxjs";

@Component({
  template:
    '<ul><li class="someclass" camplTopListHover>My test div wit hwrap</li></ul>'
})
class TestTopListHoverDirectiveComponent {}

describe("CamplNgWrapDirective", () => {
  let component: TestTopListHoverDirectiveComponent;
  let fixture: ComponentFixture<TestTopListHoverDirectiveComponent>;
  let myli: DebugElement;
  let fakeCapabilities;
  let capSubject = new ReplaySubject(1);

  beforeEach(() => {
    fakeCapabilities = {
      modernizrSource: capSubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [TopListHoverDirective, TestTopListHoverDirectiveComponent],
      providers: [
        { provide: CamplNgCapabilitiesService, useValue: fakeCapabilities }
      ]
    });
    fixture = TestBed.createComponent(TestTopListHoverDirectiveComponent);
    component = fixture.componentInstance;
    myli = fixture.debugElement.query(By.css("li"));
  });
  it("supporting browsers (non mobile) have campl-hover applied", () => {
    capSubject.next({ supported: true });
    myli.triggerEventHandler("mouseover", null);
    expect(myli.nativeElement.classList.contains("campl-hover")).toBeTruthy();
    myli.triggerEventHandler("mouseleave", null);
    expect(
      myli.nativeElement.classList.contains("campl-hover")
    ).not.toBeTruthy();
  });
  it("supporting browsers (mobile) do NOT have campl-hover applied", () => {
    capSubject.next({ supported: true, mobile_layout: true });
    myli.triggerEventHandler("mouseover", null);
    expect(
      myli.nativeElement.classList.contains("campl-hover")
    ).not.toBeTruthy();
    myli.triggerEventHandler("mouseleave", null);
    expect(
      myli.nativeElement.classList.contains("campl-hover")
    ).not.toBeTruthy();
  });
});
