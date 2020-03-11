import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PartesModel } from 'src/app/model/partes.model';

@Injectable({
  providedIn: 'root'
})
export class PartesService {

  private url = 'https://pepeapp-e6fc3.firebaseio.com/';

  constructor(private http: HttpClient) { }



  getPartes(){
    return this.http.get(`${ this.url}/partes_de_trabajo.json`)
      .pipe(
        map( resp => this.crearArray(resp) )
      )
  }

  private crearArray(partesObj: object){

    const partes: PartesModel[] = [];

    if(partesObj === null){
      return [];
    }

    Object.keys(partesObj).forEach(key =>{
      const parte: PartesModel = partesObj[key];
      if(key !== '0'){
        partes.push(parte);
      }
    });

    return partes;
  }


}
