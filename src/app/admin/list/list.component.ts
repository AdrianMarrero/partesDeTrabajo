import { PartesService } from './../../services/partes.service';
import { Component, OnInit } from '@angular/core';
import { PartesModel } from 'src/app/model/partes.model';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pipe = new DatePipe('es-ES');
  dateStart: number = Date.now();
  dateEnd: number = Date.now();

  partesList: PartesModel [] = [];
  partesListCopy: PartesModel [] = [];

  editmode: boolean = false;

  constructor(private partes: PartesService) { }

  ngOnInit() {
    this.listAll();
  }

  listAll(){
    this.partes.getPartes()
    .subscribe( resp => {
      console.log(resp);
      this.partesList = resp;
      this.partesListCopy = resp;
    })
  }

  habilitarEdicion(){
    this.editmode = this.editmode ? false : true;
  }

}
