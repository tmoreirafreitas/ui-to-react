import React, { useState, useEffect } from 'react';

const Column = props => {
    // const [state, setState] = useState(props);
    const [header, setHeader] = useState(props.header?props.header:false);
    const [filterable, setFilterable] = useState(props.filterable?props.filterable:false);
    const [filterInput, setFilterInput] = useState(props.filterInput?props.filterInput:"");
    const [isSorted, setIsSorted] = useState(props.isSorted?props.isSorted:false);
    const [isSortedDesc, setIsSortedDesc] = useState(props.isSortedDesc?props.isSortedDesc:false);
    const [content, setContent] = useState(props.content?props.content:null);
    const [columnName, setColumnName] = useState(props.columnName?props.columnName:"");
    const [disabled, setDisabled] = useState(props.disabled?props.disabled:false);    
    let iconSort = "";

    useEffect(() => {                       
        setContent(props.content?props.content:null);
    }, [props]);
    
    if(isSorted){
      iconSort = <i className='fa fa-sort-amount-asc'></i>;
    }else if(isSortedDesc){
      iconSort = <i className='fa fa-sort-amount-desc'></i>;
    }   
    
    //onClick = {dispatch(allActions.tableActions.sortElementsBy({columnName: columnName, directionSort: isSorted ? isSortedDesc ? "asc" : "desc" : ""}))}
    const btnSort =  (<button type="button" className="btn btn-primary">{iconSort}</button>);

    let iconFilter = "";
    if(filterable){
      iconFilter = <i className='fa fa-filter'></i>;
    }
    
    //onClick={dispatch(allActions.tableActions.filterItemsBy({columnName: columnName, value: filterInput}))}
    const btnFilter = (<button type="button" className="btn btn-primary">{iconFilter}</button>);
    const columnMarkup = header ? (
        <th className="column column-header">
          <div className="d-flex align-items-center justify-content-between">
            {
              <span>
                {content}
              </span>                   
            }               
            {
              filterable && (!isSorted && !isSortedDesc) ? <div className="d-flex justify-content-end">
                {btnFilter}
              </div>: filterable && (isSorted || isSortedDesc)?<div className="d-flex justify-content-end">
                {btnFilter}&nbsp;&nbsp;{btnSort}
              </div> : 
                !filterable && (isSorted || isSortedDesc) ? <div className="d-flex justify-content-end">
                {btnSort}
              </div>:""
            }
          </div>    
        </th>
      ) : (
        <td className="Column">
          {content}
        </td>
      );
    return (columnMarkup);
}

export default Column