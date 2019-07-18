import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { excelServices } from "../../services";

function Details(props) {
  var pathname = props.location.pathname.split("/", 3)[2];
  console.log(pathname);

  const [once, setOnce] = useState(true);
  const [nameMethod, setNameMethod] = useState([]);
  const [gravity, setGravity] = useState([]);
  const [viscosity, setViscosity] = useState([]);
  const [porosity, setPorosity] = useState([]);
  const [oilSaturation, setOilSaturation] = useState([]);
  const [formationType, setFormationType] = useState([]);
  const [permeability, setPermeability] = useState([]);
  const [netThinkness, setNetThinkness] = useState([]);
  const [depth, setDepth] = useState([]);
  const [temperature, setTemperature] = useState([]);

  if (once) {
    excelServices.getTable().then(res => {
      var data = res.data;
      setNameMethod(data.name_method);
      setGravity(data.gravity);
      setViscosity(data.viscosity);
      setPorosity(data.porosity);
      setOilSaturation(data.oil_saturation);
      setFormationType(data.formation_type);
      setPermeability(data.permeability);
      setNetThinkness(data.net_thinkness);
      setDepth(data.depth);
      setTemperature(data.temperature);
      setOnce(false);
    });
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
          {nameMethod.map((e, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{e}</td>
                <td>{gravity[i]}</td>
                <td>{viscosity[i]}</td>
                <td>{porosity[i]}</td>
                <td>{oilSaturation[i]}</td>
                <td>{formationType[i]}</td>
                <td>{permeability[i]}</td>
                <td>{netThinkness[i]}</td>
                <td>{depth[i]}</td>
                <td>{temperature[i]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Details;
