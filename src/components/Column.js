import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faSortAmountDownAlt, faSortAmountDown } from "@fortawesome/free-solid-svg-icons";

const Column = props => {
    const [header, setHeader] = useState(props.header?props.header:false);
    const [filterable, setFilterable] = useState(props.filterable?props.filterable:false);
    const [filterInput, setFilterInput] = useState(props.filterInput?props.filterInput:"");
    const [enableSort, setEnableSort] = useState(props.enableSort?props.enableSort:false);
    const [isSorted, setIsSorted] = useState(props.isSorted?props.isSorted:false);
    const [isSortedDesc, setIsSortedDesc] = useState(props.isSortedDesc?props.isSortedDesc:false);
    const [content, setContent] = useState(props.content?props.content:null);
    const [columnName, setColumnName] = useState(props.columnName?props.columnName:"");
    const [disabled, setDisabled] = useState(props.disabled?props.disabled:false);
    let iconSort = null;
    let iconFilter = null;

    useEffect(() => {                       
        setContent(props.content?props.content:null);    
        setEnableSort(props.enableSort?props.enableSort:false);
        setIsSorted(props.isSorted?props.isSorted:false);
        setIsSortedDesc(props.isSortedDesc?props.isSortedDesc:false);
        setColumnName(props.columnName?props.columnName:"");
        setDisabled(props.disabled?props.disabled:false);
    }, [props]);       
    
    //onClick = {dispatch(allActions.tableActions.sortElementsBy({columnName: columnName, directionSort: isSorted ? isSortedDesc ? "asc" : "desc" : ""}))}

    function renderButtonSort(){
      if(enableSort){
        if(isSorted){
          iconSort = <i>{<FontAwesomeIcon icon={faSortAmountDownAlt}/>}</i>;
        }else if(isSortedDesc){
         iconSort = <i>{<FontAwesomeIcon icon={faSortAmountDown}/>}</i>;
        }else{
          iconSort = <i>{<FontAwesomeIcon icon={faSort}/>}</i>;
        }
      }
      
      return (<button type="button" className="btn btn-primary">{iconSort}</button>);
    }

    function renderButtonFilter(){
      iconFilter = <i>{<FontAwesomeIcon icon={faFilter}/>}</i>
      return (<button type="button" className="btn btn-primary">{iconFilter}</button>);
    }    
    
    //onClick={dispatch(allActions.tableActions.filterItemsBy({columnName: columnName, value: filterInput}))}
    const columnMarkup = header ? (
        <th className="column column-header">
          <div className="d-flex align-items-center justify-content-between">
            {
              <span>
                {content}
              </span>                   
            }               
            {
              filterable && (!enableSort) ? <div className="d-flex justify-content-end">
                {renderButtonFilter()}
              </div>: filterable && enableSort?<div className="d-flex justify-content-end">
                {renderButtonFilter()}&nbsp;&nbsp;{renderButtonSort()}
              </div> : 
                !filterable && enableSort ? <div className="d-flex justify-content-end">
                {renderButtonSort()}
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