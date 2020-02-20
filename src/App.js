import React from 'react';
import './App.css';
import DataTable from './components/DataTable';

const App = () =>{
  // const columns = ["Nome", "Idade", "Altura"];
  const columns = [
    // {
    //   columName: "Action",
    //   content: "Action",
    //   filterable: false,
    //   isSorted: false,
    //   isSortedDesc: false,
    //   disabled: false
    // },
    {
      columName: "Nome",
      content: "Nome",
      filterable: false,
      isSorted: false,
      isSortedDesc: false,
      disabled: false
    },
    {
      columName: "Idade",
      content: "Idade",
      filterable: false,
      isSorted: false,
      isSortedDesc: false,
      disabled: false
    },
    {
      columName: "Altura",
      content: "Altura",
      filterable: false,
      isSorted: false,
      isSortedDesc: false,
      disabled: false
    },
  ]
  const data = [
    {"Nome": "Thiago Gabriel", "Idade" : 31, "Altura": "1.69m"},
    {"Nome": "Danila Domingues", "Idade" : 35, "Altura": "1.71m"},
    {"Nome": "Marta Helena", "Idade" : 53, "Altura": "1.65m"},
    {"Nome": "Leonardo Alexandre", "Idade" : 27, "Altura": "1.72m"},
    {"Nome": "Bruno", "Idade" : 37, "Altura": "1.72m"},
    {"Nome": "Julio Domingues", "Idade" : 76, "Altura": "1.73m"},
    {"Nome": "Mário do Armário", "Idade" : 42, "Altura": "1.75m"}
  ];

  return(
    <div className="App">              
      <DataTable dataColumns={columns} dataRows={data} items_per_page = {4} title="Registros"/>
    </div>
  );
}

export default App;