import React, {Component} from 'react';
import '../css/App.css';
import Header from './Header';
import Formulario from './Formulario';
import Listado from './Listado';
import {validarPresupuesto} from '../helper';
import ControlPresupuesto from './ControPresupuesto';

class App extends Component {

  //inicializacion el state con los propiedades a usar
  state = {
    presupuesto: '',
    restante: '',
    gastos: {}
  }

  //Se ejecuta cuando el componente principal se ve en pantalla
  componentDidMount(){
    this.obtenerPresupuesto();
  }

  obtenerPresupuesto = () =>{
    let presupuesto = prompt('Cual es el presupuesto?');
    let resultado = validarPresupuesto(presupuesto);
    if(resultado){
      this.setState({
        presupuesto: presupuesto,
        restante: presupuesto
      });
    }
    else{
      this.obtenerPresupuesto();
    }
  }

  //Agregar un nuevo gasto al state
  agregarGasto = gasto => {
    //tomar una copia del state actual
    const gastos = {...this.state.gastos};
    //agregar al gasto al objeto del state
    gastos[`gasto${Date.now()}`] = gasto;
    
    //restar al presupuesto
    this.restarPresupuesto(gasto.cantidadGasto);

    //ponerlo en state
    this.setState({
      gastos
    });
  }

  //Restar del presupuesto cuando un gasto se crea
  restarPresupuesto = cantidad =>{
    //leer el gasto
    //convertir a number
    let restar = Number(cantidad);

    //Tomar un copia del state actual
    //obtenemos el state sin el spread operation porque no es un objeto con muchas propiedades
    let restante = this.state.restante;

    //lo restamos
    restante -= restar;
    //convertir a string
    restante = String(restante);

    //agregamos el nuevo state
    this.setState({
      restante
    });
  }

  render(){
    return (
      <div className="App container">
        <Header 
        titulo='Gasto Semanal'/>
        <div className="contenido-principal contenido">
          <div className="row">
            <div className="one-half column">
              <Formulario 
                agregarGasto = {this.agregarGasto}
              />
            </div>
            <div className="one-half column">
              <Listado 
              gastos = {this.state.gastos}
              />
              <ControlPresupuesto
                presupuesto = {this.state.presupuesto}
                restante = {this.state.restante}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
