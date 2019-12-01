import React, {Component} from 'react';
import './App.css';
import DataTable from './components/dataTable';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      columns: ["Nome", "Idade", "Altura"],
      data: [
        {"Nome": "Thiago Gabriel", "Idade" : 31, "Altura": "1.69m"},
        {"Nome": "Danila Domingues", "Idade" : 35, "Altura": "1.71m"},
        {"Nome": "Marta Helena", "Idade" : 53, "Altura": "1.65m"},
        {"Nome": "Leonardo Alexandre", "Idade" : 27, "Altura": "1.72m"},
        {"Nome": "Bruno", "Idade" : 37, "Altura": "1.72m"},
        {"Nome": "Julio Domingues", "Idade" : 76, "Altura": "1.73m"},
        {"Nome": "Mário do Armário", "Idade" : 42, "Altura": "1.75m"}
      ],
    }
  }

  render() {
    const {columns, data} = this.state;
    return(
      <div className="App">
        <DataTable columns={columns} data={data} items_per_page = {10} title="Registro de Pacientes"/>
      </div>
    );
  }
}

