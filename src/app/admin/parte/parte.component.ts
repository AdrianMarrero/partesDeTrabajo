import { NgForm } from '@angular/forms';
import { PartesModel } from 'src/app/model/partes.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PartesService } from 'src/app/services/partes.service';
import { ActivatedRoute } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-parte',
  templateUrl: './parte.component.html',
  styleUrls: ['./parte.component.css']
})
export class ParteComponent implements OnInit {

  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;

  parteNumero: string;
  parte;

  constructor(private partesService: PartesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.parteNumero = id;

    this.partesService.getParte(id)
      .subscribe( resp => {
        console.log(resp);
        this.parte = resp;
      });

  }

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 400,
    'canvasHeight': 300,
    'backgroundColor': 'rgb(192,192,192)',
    'dotSize': 0.1,
  };

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.fromDataURL(this.parte.firma);
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  borrarFirma() {
    this.signaturePad.clear();
  }

  actualizar( form: NgForm) {
    console.log(form);
    console.log(this.parte);
    console.log(this.signaturePad.isEmpty());
  }

  stopPropagation(){

  }

}
