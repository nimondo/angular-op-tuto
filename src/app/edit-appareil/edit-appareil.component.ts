import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router  } from '@angular/router';
import { NgForm} from '@angular/forms';
import { AppareilService } from '../appareil.service';
//import { Appareil } from '../appareil';
//import { APPAREILS} from '../appareils';


@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {
  defaultOnOff = 'éteint';
  constructor(private appareilService: AppareilService, 
			  private router: Router) { }
  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const status = form.value['status'];
	this.appareilService.addAppareil(name, status);
    this.router.navigate(['/appareils']);
  }
  ngOnInit() {
  }

}
