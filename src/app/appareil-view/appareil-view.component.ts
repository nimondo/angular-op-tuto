import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { AppareilService } from '../appareil.service';
import { Appareil } from '../appareil';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit, OnDestroy {
  isAuth = false;
  appareilSubscription: Subscription;
  lastUpdate = new Date();
  appareils:Appareil[];
  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }
  onAllumer() {
    this.appareilService.switchOnAll();
  }
  getAppareils(): void {
    this.appareils= this.appareilService.getAppareils();
  }
  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
  }
  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (APPAREILS: Appareil[]) => {
        this.appareils = APPAREILS;
      }
    );
    this.appareilService.emitAppareilSubject();
  }
  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
  onSave() {
    this.appareilService.saveAppareilsToServer();
  }
  onFetch() {
    this.appareilService.getAppareilsFromServer();
}
}
