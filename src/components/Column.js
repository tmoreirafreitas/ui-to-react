import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
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
  const thEl = useRef(null);
  let iconSort = null;
  let iconFilter = null;

  useEffect(() => {                       
      setContent(props.content?props.content:null);    
      setEnableSort(props.enableSort?props.enableSort:false);
      setDisabled(props.disabled?props.disabled:false);
  }, [props]);

  function sortClickHandle(e){
    let order = 'asc';
    if((!isSorted && !isSortedDesc) || (!isSorted && isSortedDesc)){
      setIsSorted(true);
      setIsSortedDesc(false)
      order = 'asc';
    }else if(isSorted && !isSortedDesc){
      setIsSorted(false);
      setIsSortedDesc(true)
      order = 'desc'
    }
    props.onClickSort(e, {columnName, order})

    const btnClicked = thEl.current.querySelector('button[data-type="sort"]');
    const iClicked = btnClicked.querySelector('i');
    btnClicked.removeChild(iClicked);
    const newIClicked = document.createElement('i');
    if(order === 'asc'){            
      newIClicked.innerHTML = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faSortAmountDownAlt}/>);      
    }else{
      newIClicked.innerHTML = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faSortAmountDown}/>);   
    }
    btnClicked.appendChild(newIClicked);
    
    let thNext = thEl.current.nextElementSibling;
    let thPrev = thEl.current.previousElementSibling;

    while(thPrev !== null){
      for(let thChild of thPrev.children){
        let btn = thChild.querySelector('button[data-type="sort"]');
        let i = btn.querySelector('i');
        btn.removeChild(i);
        const newI = document.createElement('i');
        newI.innerHTML = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faSort}/>);
        btn.appendChild(newI);
      }
      thPrev = thPrev.previousElementSibling;
    }
 
    while(thNext !== null) {      
      for(let thChild of thNext.children){
        let btn = thChild.querySelector('button[data-type="sort"]');
        let i = btn.querySelector('i');
        btn.removeChild(i);
        const newI = document.createElement('i');
        newI.innerHTML = ReactDOMServer.renderToStaticMarkup(<FontAwesomeIcon icon={faSort}/>);
        btn.appendChild(newI);
      }
      thNext = thNext.nextElementSibling;
    }    
  }

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
    return (<button type="button" className="btn btn-primary" name={columnName} data-type="sort" onClick = {(e) => sortClickHandle(e)}>{iconSort}</button>);
  }

  function renderButtonFilter(){
    iconFilter = <i>{<FontAwesomeIcon icon={faFilter}/>}</i>
    return (<button type="button" className="btn btn-primary">{iconFilter}</button>);
  }    
  
  const columnMarkup = header ? (
      <th className="column column-header" ref={thEl}>
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