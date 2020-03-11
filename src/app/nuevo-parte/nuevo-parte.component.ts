import { Component, OnInit, ViewChild  } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-nuevo-parte',
  templateUrl: './nuevo-parte.component.html',
  styleUrls: ['./nuevo-parte.component.css']
})
export class NuevoParteComponent implements OnInit {

  @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 400,
    'canvasHeight': 300,
    'backgroundColor': "rgb(192,192,192)",
    'dotSize': 0.1,
  };

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
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

}
