import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CamplNgNavComponent } from "./campl-ng-nav.component";
import { CamplNgLocalnavMenuComponent } from "../campl-ng-localnav-menu/campl-ng-localnav-menu.component";

import { of, ReplaySubject } from "rxjs";
import { NavMenu } from "../models/nav-menu";
import { CamplNgCapabilitiesService } from "../services/campl-ng-capabilities.service";
import { Component, Input } from "@angular/core";

@Component({
  selector: "campl-ng-localnav-menu",
  template: "<p>Mock localnav</p>"
})
class MocklocalNavComponent {
  @Input() menu: any;
}

describe("CamplNgNavComponent", () => {
  let component: CamplNgNavComponent;
  let fixture: ComponentFixture<CamplNgNavComponent>;
  let fakeCapabilities;
  let capSubject = new ReplaySubject(1);

  beforeEach(async(() => {}));

  beforeEach(() => {
    fakeCapabilities = {
      modernizrSource: capSubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [CamplNgNavComponent, MocklocalNavComponent],
      providers: [
        { provide: CamplNgCapabilitiesService, useValue: fakeCapabilities }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CamplNgNavComponent);
    component = fixture.componentInstance;

    capSubject.next({ supported: true });
    // mock an input to the component
    let navm = {} as NavMenu;
    component.nav_menu$ = of(navm);

    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
