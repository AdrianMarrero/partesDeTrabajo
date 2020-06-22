import { AngularFireDatabaseModule, AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { PartesModel } from './../model/partes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartesService {


  private url = 'https://pepeapp-e6fc3.firebaseio.com/';
  partes;

  constructor(private http: HttpClient,
              private af: AngularFireDatabase) {
                this.partes = this.af.list('/partes_de_trabajo');
               }


  crearParte( parte: PartesModel) {
    return this.af.object('partes_de_trabajo/' + parte.parteNumero)
    .set({
			fecha: parte.fecha,
			cliente: parte.cliente,
			mailCliente: parte.mailCliente,
			tipoDeTrabajo: parte.tipoDeTrabajo,
			lugar: parte.lugar,
			trabajo_realizado: parte.trabajoRealizado,
			horaEntrada: parte.horaEntrada,
			horaSalida: parte.horaSalida,
			totalHoras: parte.totalHoras,
			firma: parte.firma,
			firmante: parte.firmante,
			//checkEmail: parte.checkEmail

    });

    //return this.http.post(`${ this.url}/partes_de_trabajo.json/356`, parte);

  }

  getTrabajos() {
    return this.http.get('/assets/trabajos.json');
  }

  getNumPartes(){
    return this.http.get(`${ this.url}/partes_de_trabajo.json`)
      .pipe(
        map( resp => this.getNum(resp) )
      );
  }

  getPartes() {
    return this.http.get(`${ this.url}/partes_de_trabajo.json`)
      .pipe(
        map( resp => this.crearArray(resp) )
      );
  }

  private crearArray(partesObj: object) {

    const partes: PartesModel[] = [];

    if (partesObj === null ) {
      return [];
    }

    Object.keys(partesObj).forEach(key => {
      const parte: PartesModel = partesObj[key];
      if (key !== '0') {
        partes.push(parte);
      }
    });

    return partes;
  }

  private getNum(partesObj: object) {

    const num = Object.keys(partesObj).length;

    return num;
  }

  borrarParte(id: string) {
    return this.http.delete(this.url + 'partes_de_trabajo/' +  id + '.json');
  }

  getParte(id: string) {
    return this.http.get(this.url + 'partes_de_trabajo/' +  id + '.json');
  }


}
