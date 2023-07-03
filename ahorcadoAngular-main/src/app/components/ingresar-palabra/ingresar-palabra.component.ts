import { Component } from '@angular/core';
import { Palabra } from 'src/app/models/palabra';
import { PalabraService } from 'src/app/providers/palabra.service';

@Component({
  selector: 'app-ingresar-palabra',
  templateUrl: './ingresar-palabra.component.html',
  styleUrls: ['./ingresar-palabra.component.css']
})
export class IngresarPalabraComponent {

  arrCoincidencias: string[] = []; // esto es para corregir!
  arrAdivinar: string[] = [];
  intentos: string[] = [];
  title = 'ahorcadoAngular';
  palabraAdivinar= '';
  letra = '';
  idx = 0;
  input = true;
  juegoTerminado = false;
  juegoGanado = false;
  respuesta: any;

  constructor(private db: PalabraService){
    this.db.getConexion().then( ()=>{
      console.log('conexion exitosa!');
      this.setPalabra(this.db.getPalabraAleatoria());
    }).catch( (err)=>{
      console.log(err);
    });
  }

  setPalabra(palabra: string){
    this.palabraAdivinar = palabra;
    this.arrAdivinar = palabra.split('');
    console.log(this.arrAdivinar);
    this.setArrAdivinar();
  }

  setArrAdivinar(){
    this.arrAdivinar.forEach( (letra)=>{
      this.arrCoincidencias.push('_');
    });
  }

  revisarPalabra(){
    let aciertos = 0;
    this.intentos.push(this.letra);
    this.arrAdivinar.forEach((letra, index: number)=>{
      if(this.letra === letra){
        this.arrCoincidencias[index] = letra;
        aciertos++;
      }
    });
    if(aciertos == 0){
      this.vidas();
    }
    this.reset();
    this.gameOver();
  }

  vidas(){
    this.idx ++;
    console.log(this.idx);
  }

  reset(){
    setTimeout( ()=>{
      this.letra = '';
    },50);
  }

  gameOver(){
    if(this.idx > 5){
      this.juegoTerminado = true;
      this.input = false;
    }else{
      this.ganarJuego();
    }
  }

  ganarJuego(){
    let ganar = 0;
    this.arrCoincidencias.forEach( (letra) => {
      if(letra == "_"){
        ganar++;
      }
    });
    if(ganar < 1){
      this.input = false;
      this.juegoGanado = true;
    }
  }


  imagenSrc() {
    let respuesta = 0;
    this.respuesta = this.idx;
    switch (this.respuesta) {
      case 0:
        return '../../../assets/images/G.png';
      case 1:
        return '../../../assets/images/F.png';
      case 2:
        return '../../../assets/images/E.png';
      case 3:
        return '../../../assets/images/D.png';
      case 4:
        return '../../../assets/images/C.png';
      case 5:
        return '../../../assets/images/B.png';
      case 6:
        return '../../../assets/images/A.png';
      default:
        return '';
    }
  }
  
}
