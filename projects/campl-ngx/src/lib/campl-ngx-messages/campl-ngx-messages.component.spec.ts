import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { CamplNgxMessagesComponent } from './campl-ngx-messages.component';

import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Component, Input, OnInit } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing'; // spy
import { Message } from '../models/message';

// import { CamplNgxMessageComponent } from '../campl-ngx-message/campl-ngx-message.component';


describe('CamplNgxMessagesComponent', () => {
  let component: CamplNgxMessagesComponent;
  let fixture: ComponentFixture<CamplNgxMessagesComponent>;
  let notification_panel: DebugElement;
  // const close_button: new DebugElement();

  @Component({
    selector: 'campl-ngx-message',
    template: '<div>moke child Message</div>'
  })
  class CamplNgxMessageComponent implements OnInit {
    @Input() msgin: Message;
    show: boolean;
    constructor() {
      this.show = true;
    }

    ngOnInit() {
    }
    public hide() {
      this.show = false;
    }

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // CamplNgxMessageComponent],
      declarations: [
        CamplNgxMessagesComponent,
        CamplNgxMessageComponent],
      // schemas: [NO_ERRORS_SCHEMA] // this could hide other errors
    }).compileComponents();

    fixture = TestBed.createComponent(CamplNgxMessagesComponent);
    notification_panel = fixture.debugElement.query(
      By.css('.campl-notifications-panel')
    );
    component = fixture.componentInstance;
    component.message_log = [{ value: 'Test Message 1', type: 'alert' }];
    component.show = { 'alert': false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display the list of messages', () => {
    // TODO
    // set the message log and count the number of messages created
  })

  xit('messages hidden when close clicked', fakeAsync(() => {
    // THis needs moving to the campl-ngx-message component

    // spyOn(component, 'hideMessages'); // if you spy the function will not be called!

    // find our panel
    const panel_select = By.css('.campl-notifications-panel');
    const close_btn_select = By.css('.campl-close-panel');

    component.toggleMessages('alert'); // should now be set to true
    fixture.detectChanges(); // this can timeout if no changes occur?

    // The panel is displayed
    expect(fixture.debugElement.query(panel_select)).not.toBeNull(); //

    expect(fixture.debugElement.query(close_btn_select)).not.toBeNull(); //

    // calling the nativeElement.click() event causes the tets to re-run ?inside the tests?
    // close_button.nativeElement.click();

    fixture.debugElement
      .query(close_btn_select)
      .triggerEventHandler('click', { button: 0 });
    tick();
    // alternatives:
    // component.hideMessages();
    // component.show_messages = false;

    fixture.detectChanges(); // this can timeout if no changes occur?

    // the panel is hidden
    expect(fixture.debugElement.query(panel_select)).toBeNull();
  }));
});
