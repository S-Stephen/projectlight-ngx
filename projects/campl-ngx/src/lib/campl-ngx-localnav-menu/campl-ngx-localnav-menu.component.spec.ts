import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CamplNgLocalnavMenuComponent } from "./campl-ngx-localnav-menu.component";
import { CamplNgCapabilitiesService } from "../services/campl-ngx-capabilities.service";
import { ReplaySubject } from "rxjs";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: "<campl-ngx-localnav-menu></campl-ngx-localnav-menu>"
})
class TestContainerComponent {}

describe("CamplNgLocalnavMenuComponent", () => {
  let component: TestContainerComponent;
  let fixture: ComponentFixture<TestContainerComponent>;
  let mymenu: DebugElement;
  let fakeCapabilities;
  let capSubject = new ReplaySubject(1);

  beforeEach(async(() => {}));

  beforeEach(() => {
    fakeCapabilities = {
      modernizrSource: capSubject.asObservable()
    };
    TestBed.configureTestingModule({
      declarations: [CamplNgLocalnavMenuComponent, TestContainerComponent],
      providers: [
        { provide: CamplNgCapabilitiesService, useValue: fakeCapabilities }
      ]
    });
    fixture = TestBed.createComponent(TestContainerComponent);
    component = fixture.componentInstance;
    mymenu = fixture.debugElement.query(By.css("campl-ngx-localnav-menu"));
  });

  it("should create", () => {
    capSubject.next({ supported: true });
    expect(component).toBeTruthy();
  });
});