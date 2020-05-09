import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FormControl, InputGroup} from 'react-bootstrap';
import tail from 'tail.select/js/tail.select';
import './SelectBoxFilter.scss';

function SelectBoxFilter(props){
    const [data, setData] = useState([]);
    const [key, setKey] = useState("select1");
    const [filterdValues, setFilterdValues] = useState([]);

    useEffect(() => {                       

        
    }, []);

    const filter = (valueToFilter) => {
        // if(data){
        //     if(data.lenght > 0){
        //         let result = data.filter(item => {
        //             if(item.toString().includes(valueToFilter)) return data;
        //         }); 
        //         setFilterdValues(result);
        //     }
        // }
    }

    return (               
        <div className="container mt-12">
            <div className="row">
                <div className = "col-md-12 text-left">
                    <input type="text" className="form-control mySearch" key={`mySearch-${key}`} onKeyUp={(e) => filter(e.target.value)} placeholder="Search..."/>
                    <ul key={`options-${key}`} className="myOptions">
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                        <li><a href="#">JavaScript</a></li>
                        <li><a href="#">PHP</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">jQuery</a></li>
                        <li><a href="#">SQL</a></li>
                        <li><a href="#">Bootstrap</a></li>
                        <li><a href="#">Node.js</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SelectBoxFilter;