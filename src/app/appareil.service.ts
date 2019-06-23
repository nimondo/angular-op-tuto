import { Injectable } from '@angular/core';
import { Appareil } from './appareil';
import { APPAREILS } from './appareils';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppareilService {
  appareils: Appareil[];
  appareilsSubject = new Subject<Appareil[]>();
  constructor(private httpClient: HttpClient) { }
  saveAppareilsToServer() {
    this.httpClient
      .post('https://op-training.firebaseio.com/appareils.json', this.getAppareils())
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getAppareilsFromServer() {
    this.httpClient
      .get<Appareil[]>('https://op-training.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
		  this.appareils = this.getAppareils();
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getAppareils(): Appareil[] {
  return APPAREILS;
  }
  getAppareilById(id: number) {
    const appareil = this.getAppareils().find(
      (s) => {
        return s.id === id;
      }
    );
    return appareil;
  }
  emitAppareilSubject() {
    this.appareilsSubject.next(this.getAppareils().slice());
  }
  switchOnAll() {
    for(let appareil of this.getAppareils()) {
      appareil.status = 'allumé';
    }
  }
  switchOffAll() {
    for(let appareil of this.getAppareils()) {
       appareil.status = 'éteint';
    }
  }
  switchOnOne(i: number) {
    this.getAppareils()[i].status = 'allumé';
  }

  switchOffOne(i: number) {
    this.getAppareils()[i].status = 'éteint';
	this.emitAppareilSubject();
  }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.getAppareils()[(this.getAppareils().length - 1)].id + 1;
    this.getAppareils().push(appareilObject);
    this.emitAppareilSubject();
}
}
