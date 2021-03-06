import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * A service to store and manage the state of the localnav menu
 * at the moment essentially the position of the
 * local-navigation-container element
 */

@Injectable({
  providedIn: 'root'
})
export class CamplNgxLocalmenuService {

  public localNavSource = new ReplaySubject<any>(1);
  public current_pos = -99999;

  constructor() {
    this.localNavSource.next(this.current_pos);
  }


  updatePosition(pos: number) {
    // share these with all our components!
    this.current_pos = pos;
    this.localNavSource.next(pos);
  }
  moveLeft(step: number) {
    this.updatePosition(this.current_pos - step);
  }
  moveRight(step: number) {
    this.updatePosition(this.current_pos + step);
  }
}
