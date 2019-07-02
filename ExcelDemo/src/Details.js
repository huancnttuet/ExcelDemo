import React, {useState} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios'


function Details(props) {
    var pathname = props.location.pathname.split('/',3)[2];
    console.log(pathname);
    
    const [once, setOnce] = useState(true)
    const [nameMethod, setNameMethod] = useState<Array<Array>>([[]])
    const [rule, setRule] = useState([])

    function chunkArray(myArray, chunk_size){
        var results = [];
     
        while (myArray.length) {
            results.push(myArray.splice(0, chunk_size));
        }
     
        return results;
    }

    if(once) {
        axios.post('http://localhost:8000/getTable', {filename: pathname}).then((res) => {
            console.log(res.data)
            var r = res.data.rs1
            setNameMethod(res.data.rs2)
            console.log(r)
            r.sort((a,b) => {
                if(a[2] === b[2]){
                    if(a[1] === b[1]){
                        return 0;
                    } else {
                        return (a[1] < b[1]) ? -1 : 1
                    }
                } else {
                    return (a[2] < b[2]) ? -1 : 1
                }
            })
            console.log(r)
            var result = chunkArray(r, 9);
            console.log(result);
            setRule(result)
            console.log(result[0][0][0])
            setOnce(false)
        })
    }
    
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name method</th>
                    <th>Gravity</th>
                    <th>Viscosity</th>
                    <th>Porosity</th>
                    <th>Oil Saturation</th>
                    <th>Formation Type</th>
                    <th>Permeability</th>
                    <th>Net Thinkness</th>
                    <th>Depth</th>
                    <th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        nameMethod.map((e,i) => {
                            return(
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{e}</td>
                                    <td>{rule[i]}</td>
                                    <td>{rule[i]}</td>
                                    <td>{rule[i]}</td>
                                    
                                   
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Details;