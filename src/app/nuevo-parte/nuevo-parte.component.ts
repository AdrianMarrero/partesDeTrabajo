import { PartesService } from './../services/partes.service';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { NgForm } from '@angular/forms';
import { PartesModel } from '../model/partes.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-parte',
  templateUrl: './nuevo-parte.component.html',
  styleUrls: ['./nuevo-parte.component.css']
})
export class NuevoParteComponent implements OnInit {

  parte: PartesModel = {};
  parteNumero;

  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 400,
    'canvasHeight': 300,
    'backgroundColor': "rgb(192,192,192)",
    'dotSize': 0.1,
  };

  constructor(private parteService: PartesService, private router: Router) {
    const n = Date.now();



    this.parteService.getNumPartes().subscribe( resp => {
      console.log(resp);
      this.parte.parteNumero = resp;
    });
    //this.parte.archivado;
    this.parte.cliente = 'Desnudos';
    this.parte.fecha = n;
    this.parte.firma = '';
    this.parte.firmante = '';
    this.parte.horaEntrada = '';
    this.parte.horaSalida = '';
    this.parte.lugar = '';
    this.parte.mailCliente = 'teresa@desnudos.es';
    this.parte.tipoDeTrabajo = 'Mantenimiento';
    this.parte.totalHoras = '';
    this.parte.trabajoRealizado = '';
  }

  ngOnInit() {

  }


  onOptionsSelected(event){
    const value = event.target.value;
    const arrTrabajos = [];
    this.parte.lugar = value;
    this.parteService.getTrabajos().subscribe( resp => {
      arrTrabajos.push(resp);
      arrTrabajos[0].forEach(item => {
        if (item.lugar === value) {
          this.parte.trabajoRealizado = item.trabajo;
        }
      });
    });

  }

  milliseconds = (h, m, s) => ((h * 60 * 60 + m * 60 + s) * 1000);

  calcularHoras(){
    let entradaMiliseg = 0;
    let salidaMiliseg = 0;
    if (this.parte.horaEntrada) {
      const entradaPart = this.parte.horaEntrada.split(':');
      entradaMiliseg = this.milliseconds(entradaPart[0], entradaPart[1], 0);
    }

    if (this.parte.horaSalida) {
      const salidaPart = this.parte.horaSalida.split(':');
      salidaMiliseg = this.milliseconds(salidaPart[0], salidaPart[1], 0);
    }
    this.parte.totalHoras = new Date(salidaMiliseg - entradaMiliseg).toISOString().slice(11, 19);
    console.log(new Date(salidaMiliseg - entradaMiliseg).toISOString().slice(11, 19));
    console.log(salidaMiliseg - entradaMiliseg );

  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    //console.log(this.signaturePad.toDataURL());
    this.parte.firma = this.signaturePad.toDataURL();
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    //console.log('begin drawing');
  }

  borrarFirma() {
    this.signaturePad.clear();
  }


  camposVacios = [];

  checkForm(){
    this.camposVacios = [];

    if (this.parte.cliente === '') {
      this.camposVacios.push('cliente');
    }
    if (this.parte.tipoDeTrabajo === '') {
      this.camposVacios.push('tipo de trabajo');
    }
    if (this.parte.lugar === '') {
      this.camposVacios.push('lugar de trabajo');
    }
    if (this.parte.trabajoRealizado === '') {
      this.camposVacios.push('Trabajo realizado');
    }
    if (this.parte.horaEntrada === '') {
      this.camposVacios.push('Hora de entrada');
    }
    if (this.parte.horaSalida === '' ) {
      this.camposVacios.push('Hora de Salida');
    }
    if (this.parte.firmante === '' ) {
      this.camposVacios.push('Quien firma');
    }
    if (this.parte.firma === ''){
      this.camposVacios.push('Firma');
    }

  }

  guardar( form: NgForm) {
    console.log(form);
    console.log(this.parte);
    console.log(this.signaturePad.isEmpty());

    this.checkForm();




    if (this.camposVacios.length) {

      let errores = '';
      this.camposVacios.forEach(element => {
        console.log(element);
        errores += element + '-';
      });

      Swal.fire({
        title: 'Error!',
        text: 'Campos vacios: ' + errores,
        icon: 'error',
        confirmButtonText: 'Volver'
      });
      return false;
    }

    this.parteService.crearParte( this.parte )
      .then( resp => {
        console.log(resp);

        this.router.navigate(['/list']);

      });



  }

}
