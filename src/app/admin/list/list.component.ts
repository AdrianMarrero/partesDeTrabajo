import { PartesService } from './../../services/partes.service';
import { Component, OnInit } from '@angular/core';
import { PartesModel } from 'src/app/model/partes.model';
import { formatDate, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pipe = new DatePipe('es-ES');
  dateStart: number = Date.now();
  dateEnd: number = Date.now();

  partesList: PartesModel [] = new Array();
  partesListCopy: PartesModel [] = [];

  editmode: boolean = false;
  horasObra: number = 0;
  horasAveria: number = 0;


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
    });
    this.sumarHoras();
  }

  habilitarEdicion(){
    this.editmode = this.editmode ? false : true;
  }

  sumarHoras(){

    for (let p of this.partesList) {
      console.log(p);
      if(p.tipoDeTrabajo === 'Obra'){
        this.horasObra = this.horasObra + Number(p.totalHoras.substring(0, 2));
      }
      if(p.tipoDeTrabajo === 'Avería'){
        this.horasAveria = this.horasAveria + Number(p.totalHoras.substring(0, 2));
      }
    }
    console.log(this.horasObra);
    console.log(this.horasAveria);
  }

  consultar(){
    const day = 86399000;
    this.dateStart = new Date(this.dateStart).getTime();
    this.dateEnd = new Date(this.dateEnd).getTime() + day;

    let idexFilter: any;
    const partesFilter = [];

    for(idexFilter in this.partesList) {
      if((this.partesList[idexFilter].fecha >= this.dateStart) && (this.partesList[idexFilter].fecha <= this.dateEnd)){
        partesFilter.push(this.partesList[idexFilter]);
      }
    }
    this.partesList = [];

    this.partesList = partesFilter;
    this.sumarHoras();
  }

  borrarParte(i) {

    Swal.fire({
      title: '¿Estas seguro que quieres eliminar este parte',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {

      if (resp.value) {
        this.partesList.splice(i - 1, 1);
        this.partes.borrarParte(i).subscribe();
      }
    });


  }

}
