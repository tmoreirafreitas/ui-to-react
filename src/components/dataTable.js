import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions from '../actions';
import Column from './Column'
import Pagination from 'react-bootstrap/Pagination';
import './DataTable.css';

const DataTable = (props) => {     
    const [title] = useState(props.title?props.title:"");
    const [dataColumns] = useState(props.dataColumns?props.dataColumns:[{}]);    
    const [items_per_page] = useState(props.items_per_page?props.items_per_page:10);       
    const table = useSelector(state => state.table);
    const dispatch = useDispatch();    
    let objToPagination = {items:props.dataRows,page:1,per_page:props.items_per_page};
    
    useEffect(() => {               
        dispatch(allActions.tableActions.paginate(objToPagination));
    }, []);
    
    function renderTablePagination(config){
        let items = [];
        if(config){
            let paginators = config;
            for (let number = 1; number <= paginators.total_pages; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === paginators.page} onClick={(e) => pageHandleClick(e, number)}>
                        {number}
                    </Pagination.Item>
                );
            }             
        }             
        return items;
    }
    function renderTableHeader() {
        return dataColumns.map((_column, columnIndex) =>{
            return (<Column key={columnIndex}
                    header = {true}                                  
                    columnName = {_column.columnName}
                    content = {_column.content}
                    filterable = {_column.filterable?_column.filterable:false}
                    enableSort = {_column.enableSort?_column.enableSort:false}
                    isSorted = {_column.isSorted?_column.isSorted:false}
                    isSortedDesc = {_column.isSortedDesc?_column.isSortedDesc:false}
                    filterInput = {_column.filterInput?_column.filterInput:""}
                    disabled = {_column.disabled?_column.disabled:false}
                    ></Column>);
        });
    }

    function renderTableData () {                
        if(table.payload){            
            return table.payload.data.map((data, rowIndex) =>{
                return (
                    <tr key={`row-${rowIndex}`} tr-index={rowIndex}>
                        {
                            dataColumns.map((_column, columnIndex)=>{                                 
                                return (<Column key = {`${rowIndex}-${columnIndex}`}
                                        header = {false}
                                        content={data[dataColumns[columnIndex].columName]}
                                        disabled = {_column.disabled?_column.disabled:false}>                                                
                                    </Column>)                                                       
                            })
                        }
                    </tr>
                );
            });
        }
    }

    function pageHandleClick(event, index){
        event.preventDefault();
        if(table.payload){                        
            switch (index) {
                case "First":      
                    if(Number(table.payload.page) !== 1){
                        objToPagination = {items: props.dataRows, page: 1, per_page: items_per_page};
                        dispatch(allActions.tableActions.paginate(objToPagination));                        
                    }          
                    break;
            
                case "Prev":     
                    if(Number(table.payload.page) !== 1){
                        objToPagination = {items:props.dataRows, page: table.payload.page - 1, per_page: items_per_page};
                        dispatch(allActions.tableActions.paginate(objToPagination));
                    }           
                    break;

                case "Next":           
                    if(table.payload.page !== table.payload.total_pages){
                        objToPagination = {items: props.dataRows, page: table.payload.page + 1, per_page: items_per_page};
                        dispatch(allActions.tableActions.paginate(objToPagination));
                    }     
                    break;

                case "Last":       
                    if(table.payload.page !== table.payload.total_pages){
                        objToPagination = {items: props.dataRows, page: table.payload.total_pages, per_page: items_per_page};
                        dispatch(allActions.tableActions.paginate(objToPagination));
                    }
                    break;

                default:
                    if(table.payload.page !== index){
                        objToPagination = {items: props.dataRows, page: index, per_page: items_per_page};
                        dispatch(allActions.tableActions.paginate(objToPagination));
                    }                
                    break;
            }            
        }          
    }        
    
    return (        
        <div className="box-data-table">
            <h2>{title}</h2>
            <table className="dataTable">
                <thead>
                    <tr>{renderTableHeader()}</tr>
                </thead>
                <tbody>                        
                    {renderTableData()}
                </tbody>
            </table>
            <Pagination>
                <Pagination.First onClick={(e) => pageHandleClick(e, "First")} />
                <Pagination.Prev onClick={(e) => pageHandleClick(e, "Prev")} />
                {renderTablePagination(table.payload)}
                <Pagination.Next onClick={(e) => {pageHandleClick(e, "Next")}} />
                <Pagination.Last onClick={(e) => pageHandleClick(e, "Last")} />
            </Pagination>
        </div>
    );
}

export default DataTable