import React, {useState} from 'react';
import Table from 'react-bootstrap/Table'
import axios from 'axios'


function Details(props) {
    console.log(props);
    
    const [once, setOnce] = useState(true)
    
    if(once) {
        axios.post('http://localhost:8000/getTable', {filename: ''}).then((res) => {
            console.log(res.data)
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
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Details;