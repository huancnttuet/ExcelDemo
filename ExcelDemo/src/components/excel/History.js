import React, { useState, useGlobal } from "reactn";
import { excelServices } from "../../services";
import { Table, Container, Row, Col } from "react-bootstrap";

function History(props) {
  const [once, setOnce] = useState(true);
  const [id, setId] = useGlobal("id");
  const [data, setData] = useState([]);
  if (once) {
    console.log(id);
    excelServices.getTableHistoryByIdUser({ id: id }).then(res => {
      setData(res.data);
      console.log(res.data);
      console.log(data);
      setOnce(false);
    });
  }

  return (
    <div>
      <Container>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Result</th>
                <th>Gravity</th>
                <th>Viscosity</th>
                <th>Porosity</th>
                <th>Oil Saturation</th>
                <th>Formation Type</th>
                <th>Permeability</th>
                <th>Net Thinkness</th>
                <th>Depth</th>
                <th>Temperature</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                switch (e.formation_type) {
                  case "1":
                    e.formation_type = "SandStone or Carbonat";
                    break;
                  case "2":
                    e.formation_type = "SandStone";
                    break;
                  case "3":
                    e.formation_type =
                      "Sandstone or Carbonate[PreferablyCarbonate]";
                    break;
                  default:
                    break;
                }
                switch (e.net_thinkness) {
                  case "1":
                    e.net_thinkness = "Wide Range";
                    break;
                  case "2":
                    e.net_thinkness = "Thin unless dipping";
                    break;
                  case "3":
                    e.net_thinkness = "NC";
                    break;
                  case "4":
                    e.net_thinkness = "10";
                    break;
                  case "5":
                    e.net_thinkness = "20";
                    break;
                  default:
                    break;
                }
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{e.result}</td>
                    <td>{e.gravity}</td>
                    <td>{e.viscosity}</td>
                    <td>{e.porosity}</td>
                    <td>{e.oil_saturation}</td>
                    <td>{e.formation_type}</td>
                    <td>{e.permeability}</td>
                    <td>{e.net_thinkness}</td>
                    <td>{e.depth}</td>
                    <td>{e.temperature}</td>
                    <td>{e.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default History;
