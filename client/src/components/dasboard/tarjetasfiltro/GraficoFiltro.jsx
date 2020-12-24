import React, { Component } from "react";
import { Input, Label, CardBody, Card } from "reactstrap";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment";
import TableModal from "../tablemodal/TableModal";
import { Row, Col } from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export class GraficoFiltro extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      equipo: "",
      prioridad: "",
      colorHex: "#EAA842",
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
    if (e.target.name === "color" && e.target.value === "Azul") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#007bff",
      });
    } else if (e.target.name === "color" && e.target.value === "Roja") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#dc3545",
      });
    } else if (e.target.name === "color" && e.target.value === "Verde") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#28a745",
      });
    } else if (e.target.name === "color" && e.target.value === "Amarilla") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#F7E91B",
      });
    } else if (e.target.name !== "color") {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "color" && e.target.value === "") {
      this.setState({
        [e.target.name]: e.target.value,
        colorHex: "#EAA842",
      });
    }
  };

  render() {
    const { tarjetas } = this.props;

    var filter = {
      color: this.state.color && this.state.color,
      equipo: this.state.equipo && this.state.equipo,
      prioridad: this.state.prioridad && this.state.prioridad,
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

    // Formulas para "Filtro acumuladas abiertas"

    // Filtro todos los meses en el que hay tarjetas abiertas Filtro
    const fechasTarjetasFiltro = newFilter.map(({ fecha }) =>
      fecha.substr(0, 7)
    );

    // Filtro todos los meses en el que hay tarjetas cerradas Filtro
    const fechasTarjetasFiltroCerradas = newFilter
      .filter(({ estado, color, equipo }) => estado === "Cerrada")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasFiltro1 = new Set(fechasTarjetasFiltro);
    const fechasTarjetasFiltroUnicas = [...fechasTarjetasFiltro1];

    // Borro todos los meses repetidos
    let fechasTarjetasFiltro1Cerradas = new Set(fechasTarjetasFiltroCerradas);
    const fechasTarjetasFiltroUnicasCerradas = [
      ...fechasTarjetasFiltro1Cerradas,
    ];

    var c = fechasTarjetasFiltroUnicas.concat(
      fechasTarjetasFiltroUnicasCerradas
    );
    var fechastarjetasUnicas = c.filter((item, pos) => c.indexOf(item) === pos);

    const startDate = moment(fechastarjetasUnicas.sort()[0]);
    const endDate = moment(fechastarjetasUnicas.sort().slice(-1)[1]);

    const fechastarjetasUnicasRango = [];

    if (endDate.isBefore(startDate)) {
      throw "End date must be greated than start date.";
    }

    while (startDate.isBefore(endDate)) {
      fechastarjetasUnicasRango.push(startDate.format("YYYY-MM"));
      startDate.add(1, "month");
    }

    // Numero total de tarjetas de cada mes (no acumulado)
    let array = fechastarjetasUnicasRango.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, fecha, color, equipo }) =>
          fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    const arrTarjetasFiltroAcumuladas = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Datos para el grafico
    const FiltroAcumuladasAbiertasData = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasFiltroAcumuladas[index],
        };
      }),
    ];

    // Formulas para "Filtro acumuladas cerradas"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradas = fechastarjetasUnicasRango.sort().map((item, index) => {
      return newFilter.filter(
        ({ estado, finReparacion, color, equipo }) =>
          estado === "Cerrada" && finReparacion.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const arrTarjetasFiltroAcumuladasCerradas = arrayCerradas.map(
      (elem, index) =>
        arrayCerradas.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );

    // Datos para el grafico
    const FiltroAcumuladasAbiertasDataCerradas = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasFiltroAcumuladasCerradas[index],
        };
      }),
    ];

    // Formulas para "Porcentaje acumuladas cerradas porcentaje"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradasPorcentaje = fechastarjetasUnicasRango
      .sort()
      .map((item, index) => {
        return newFilter.filter(
          ({ estado, finReparacion, color, equipo }) =>
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasFiltroAcumuladasCerradasPorcentaje = arrayCerradasPorcentaje.map(
      (elem, index) =>
        arrayCerradasPorcentaje.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );
    // Datos para el grafico de cerradas porcentaje

    const FiltroAcumuladasAbiertasDataCerradasPorcentaje = [
      fechastarjetasUnicasRango.map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y:
            (arrTarjetasFiltroAcumuladasCerradasPorcentaje[index] /
              arrTarjetasFiltroAcumuladas[index]) *
            100,
        };
      }),
    ];

    CanvasJS.addCultureInfo("es", {
      decimalSeparator: ",", // Observe ToolTip Number Format
      digitGroupSeparator: ".", // Observe axisY labels

      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
    });
    const options = {
      animationEnabled: true,
      culture: "es",
      axisX: {
        valueFormatString: "MMMM",

        interval: 1,
        intervalType: "month",
      },
      axisY: {
        title: "Cantidad de tarjetas",
        lineColor: "#000000",
        tickColor: "#000000",
        labelFontColor: "#000000",
      },
      axisY2: {
        title: "% de Cierre",
        suffix: "%",
        lineColor: "#000000",
        tickColor: "#000000",
        labelFontColor: "#000000",
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
        verticalAlign: "top",
      },
      data: [
        {
          color: this.state.colorHex,
          type: "column",
          name: "Tarjetas acumuladas (abiertas)",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: FiltroAcumuladasAbiertasData[0],
        },
        {
          type: "line",
          name: "Tarjetas acumuladas (cerradas)",
          showInLegend: true,
          dataPoints: FiltroAcumuladasAbiertasDataCerradas[0],
        },
        {
          type: "line",
          color: "#121212",
          name: "Porcentaje Tarjetas Cerradas",
          showInLegend: true,
          axisYType: "secondary",
          yValueFormatString: "#,##0",
          dataPoints: FiltroAcumuladasAbiertasDataCerradasPorcentaje[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={5} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3 className="mb-3">Grafico personalizado</h3>
                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={7} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Tabla</h3>
                <TableModal
                  tarjetasFiltro1={arrTarjetasFiltroAcumuladas}
                  tarjetasFiltro2={arrTarjetasFiltroAcumuladasCerradas}
                  tarjetasFiltro3={
                    arrTarjetasFiltroAcumuladasCerradasPorcentaje
                  }
                  tarjetasmesabiertas={array}
                  tarjetasmescerradas={arrayCerradas}
                  color={this.state.color}
                  fechas={fechastarjetasUnicasRango}
                ></TableModal>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                {" "}
                <h3>Filtros</h3>
                <Label for="color">Color</Label>
                <Input
                  type="select"
                  name="color"
                  id="color"
                  onChange={this.onChange}
                >
                  <option></option>
                  <option>Azul</option>
                  <option>Roja</option>
                  <option>Amarilla</option>
                  <option>Verde</option>
                </Input>
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
                <Label for="prioridad">Prioridad</Label>
                <Input
                  type="select"
                  name="prioridad"
                  id="prioridad"
                  onChange={this.onChange}
                >
                  <option></option>
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </Input>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoFiltro;
