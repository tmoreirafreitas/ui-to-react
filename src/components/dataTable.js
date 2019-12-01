import React, {Component} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './dataTable.css';

export default class DataTable extends Component{    
    constructor(props){
        super(props);
        this.state = {            
            title: "",
            dataColumns: [],
            dataRows: [{}],
            action: {},
            items_per_page: 10,
            itemsPaginations: [],
            paginators: {},
        };
    }    

    componentDidMount(){        
        let items = [];
        let paginators = this.paginator(this.props.data, 1, this.props.items_per_page);
        for (let number = 1; number <= paginators.total_pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === paginators.page} onClick={(e) => this.pageHandleClick(e, number)}>
                    {number}
                </Pagination.Item>,
            );
        }

        this.setState(
            {
                title: this.props.title,
                dataColumns: this.props.columns, 
                dataRows: paginators.data, 
                action:{}, 
                items_per_page: this.props.items_per_page,
                itemsPaginations: items,
                paginators: paginators,
            }
        );
    }

    paginator = (items, page, per_page) =>{
        var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
       
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }

    renderTableHeader =  () => {        
        const {dataColumns} = this.state;
        return dataColumns.map((key, index) =>{
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    renderTableData = () => {
        const {dataColumns, dataRows} = this.state;
        return dataRows.map((data, indexData) =>{
            return (
                <tr key={indexData}>
                    {
                        dataColumns.map((column, indexColumn)=>{
                            return <td key={indexColumn}>{data[column]}</td>
                        })
                    }
                </tr>
            );
        });
    }

    pageHandleClick = (event, index) =>{        
        event.preventDefault();
        let paginators = {};
        switch (index) {
            case "First":      
                if(Number(this.state.paginators.page) !== 1){
                    paginators = this.paginator(this.props.data, 1, this.state.items_per_page);
                    this.setState({paginators, dataRows: paginators.data});
                }          
                break;
        
            case "Prev":     
                if(Number(this.state.paginators.page) !== 1){
                    paginators = this.paginator(this.props.data, this.state.paginators.page - 1, this.state.items_per_page);
                    this.setState({paginators, dataRows: paginators.data});
                }           
                break;

            case "Next":           
                if(this.state.paginators.page !== this.state.paginators.total_pages){
                    paginators = this.paginator(this.props.data, this.state.paginators.page + 1, this.state.items_per_page);
                    this.setState({paginators, dataRows: paginators.data});
                }     
                break;

            case "Last":       
                if(this.state.paginators.page !== this.state.paginators.total_pages){
                    paginators = this.paginator(this.props.data, this.state.paginators.total_pages, this.state.items_per_page);
                    this.setState({paginators, dataRows: paginators.data});
                }
                break;

            default:
                if(this.state.paginators.page !== index){
                    paginators = this.paginator(this.props.data, index, this.state.items_per_page);
                    this.setState({paginators, dataRows: paginators.data});
                }                
                break;
        }

        this.state.itemsPaginations = []; 
        for (let number = 1; number <= paginators.total_pages; number++) {
            this.state.itemsPaginations.push(
                <Pagination.Item key={number} active={number === paginators.page} onClick={(e) => this.pageHandleClick(e, number)}>
                    {number}
                </Pagination.Item>,
            );
        }
    }

    render() {       
        return (
            <div className="box-data-table">
                <h2>{this.state.title}</h2>
                <table className="dataTable">
                    <thead>
                        <tr>{this.renderTableHeader()}</tr>
                    </thead>
                    <tbody>                        
                        {this.renderTableData()}
                    </tbody>
                </table>
                <Pagination>
                    <Pagination.First onClick={(e) => this.pageHandleClick(e, "First")} />
                    <Pagination.Prev onClick={(e) => this.pageHandleClick(e, "Prev")} />
                    {this.state.itemsPaginations}
                    <Pagination.Next onClick={(e) => this.pageHandleClick(e, "Next")} />
                    <Pagination.Last onClick={(e) => this.pageHandleClick(e, "Last")} />
                </Pagination>
            </div>
        );
    }
}