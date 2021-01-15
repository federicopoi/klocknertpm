import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import { Label, Input } from "reactstrap";
import { Row, Col, Card, CardBody, Table } from "reactstrap";
import moment from "moment";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
export class GraficoRiesgo extends Component {
  constructor() {
    super();
    this.state = {
      equipo: "",
      familia: "",
    };
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }

    this.chart.render();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      equipo: this.state.equipo && this.state.equipo,
      familia: this.state.familia && this.state.familia,
    };

    const multiFilter = (arr, filters) => {
      const filterKeys = Object.keys(filters);
      return arr.filter((eachObj) => {
        return filterKeys.every((eachKey) => {
          if (!filters[eachKey].length) {
            return true; // passing an empty filter means that filter is ignored.
          }
          return filters[eachKey].includes(eachObj[eachKey]);
        });
      });
    };
    const newFilter = multiFilter(tarjetas, filter);

    const arrEquipos = tarjetas.map(({ equipo }) => equipo);
    const unicosEquipos = Array.from(new Set(arrEquipos));

    const arrFamilias = tarjetas.map(({ familia }) => familia);
    const unicosFamilias = Array.from(new Set(arrFamilias));

    // Formulas para "Mapas de Riesgo"

    // Cantidad de tarjetas abiertas de newFilter

    const arrAbiertas = newFilter.filter(({ estado }) => {
      return estado === "Abierta";
    });

    const arrCerradas = newFilter.filter(({ estado }) => {
      return estado === "Cerrada";
    });

    // Porcentaje de puntos tratados

    const arrPorcentajePuntos = (arrAbiertas.length / newFilter.length) * 100;

    // Nivel Riesgo Inicial

    // No significativo
    const RI1 = newFilter.filter(({ riesgoInicial }) =>
      riesgoInicial.includes("NS: No Significativo")
    ).length;

    // Poco significativo
    const RI2 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.includes("PS: Poco Significativo")
      ).length * 2;

    // Moderado
    const RI3 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.includes("MO: Moderado")
      ).length * 3;

    // Sigfificativo
    const RI4 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.includes("SI: Significativo")
      ).length * 4;

    // Intolerable
    const RI5 =
      newFilter.filter(({ riesgoInicial }) =>
        riesgoInicial.includes("IN: Intolerable")
      ).length * 5;

    const nivelRiesgoInicial = RI1 + RI2 + RI3 + RI4 + RI5;

    // Nivel Riesgo Final

    // No significativo
    const RI1A = arrCerradas.filter(
      ({ riesgoFinal }) =>
        riesgoFinal.toLowerCase() === "NS: No Significativo".toLowerCase()
    ).length;

    // Poco significativo
    const RI2A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "PS: Poco Significativo".toLowerCase()
      ).length * 2;

    // Moderado
    const RI3A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "MO: Moderado".toLowerCase()
      ).length * 3;

    // Sigfificativo
    const RI4A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "SI: Significativo".toLowerCase()
      ).length * 4;

    // Intolerable
    const RI5A =
      arrCerradas.filter(
        ({ riesgoFinal }) =>
          riesgoFinal.toLowerCase() === "IN: Intolerable".toLowerCase()
      ).length * 5;

    const nivelRiesgoFinal = RI1A + RI2A + RI3A + RI4A + RI5A;

    const reduccionRiesgo =
      ((nivelRiesgoInicial - nivelRiesgoFinal) / nivelRiesgoInicial) * 100;

    return (
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Tabla Mapas de riesgo</h3>
                <Table className="no-wrap v-middle" responsive>
                  <thead>
                    <tr className="border-0">
                      <th className="border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total de Puntos</td>
                      <td>
                        {newFilter.length} | | {arrAbiertas.length}
                      </td>
                    </tr>
                    <tr>
                      <td>Porcentaje de puntos tratados</td>
                      <td>{100 - arrPorcentajePuntos.toFixed(2)} %</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Inicial</td>
                      <td>{nivelRiesgoInicial}</td>
                    </tr>
                    <tr>
                      <td>Nivel Riesgo Final</td>
                      <td>{nivelRiesgoFinal}</td>
                    </tr>
                    <tr>
                      <td>% de Reducción de Riesgo </td>
                      <td>{reduccionRiesgo.toFixed(2)} %</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Filtros</h3>
                <Label for="equipo">Equipo</Label>
                <Input
                  type="select"
                  name="equipo"
                  id="equipo"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosEquipos.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
                <Label for="equipo" className="mt-3">
                  Familia
                </Label>
                <Input
                  type="select"
                  name="familia"
                  id="familia"
                  onChange={this.onChange}
                >
                  <option></option>
                  {unicosFamilias.map((item, index) => {
                    return <option key={index}>{item}</option>;
                  })}
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoRiesgo;
