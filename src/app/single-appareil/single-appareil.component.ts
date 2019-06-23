import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../appareil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  @Input() name: string;
  @Input() status: string;
  //@Input() index: number;
  @Input() id: number;
  

  constructor(private appareilService: AppareilService,
            private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
	this.name = this.appareilService.getAppareilById(+this.id).name;
    this.status = this.appareilService.getAppareilById(+this.id).status;
  }

}
