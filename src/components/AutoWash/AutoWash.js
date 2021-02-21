import React from 'react';
import OwnTable from '../layout/OwnTable';

const AutoWash = (props) => {

    const titles = ["Марка", "номер Машины", "Место", 'владелец', "status"]
    const data = [
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: true},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: true},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: false},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: true},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: false},  
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: true},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},
        {marka:"mersedes", numer:"41232", place:"23", vl:"Король", status: false},
        {marka:"Remno", numer:"5477", place:"3", vl:"DEpo", status: true},

    ]


    return (
        <div>
            <OwnTable titles={titles} data={data}  statusComppnent={true}/>
        </div>
    );  
};



export default AutoWash;