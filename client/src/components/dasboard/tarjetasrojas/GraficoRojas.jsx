import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment";
import { Row, Col, Card, CardBody } from "reactstrap";
import TableModal from "../tablemodal/TableModal";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export class GraficoRojas extends Component {
  constructor() {
    super();
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

  render() {
    const { tarjetas } = this.props;

    // Formulas para "Rojas acumuladas abiertas"

    // Filtro todos los meses en el que hay tarjetas abiertas Rojas
    const fechasTarjetasRojas = tarjetas
      .filter(({ estado, color }) => color === "Roja")
      .map(({ fecha }) => fecha.substr(0, 7));

    // Filtro todos los meses en el que hay tarjetas cerradas Rojas
    const fechasTarjetasRojasCerradas = tarjetas
      .filter(({ estado, color }) => estado === "Cerrada" && color === "Roja")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasRojas1 = new Set(fechasTarjetasRojas);
    const fechasTarjetasRojasUnicas = [...fechasTarjetasRojas1];

    // Borro todos los meses repetidos
    let fechasTarjetasRojas1Cerradas = new Set(fechasTarjetasRojasCerradas);
    const fechasTarjetasRojasUnicasCerradas = [...fechasTarjetasRojas1Cerradas];

    var c = fechasTarjetasRojasUnicas.concat(fechasTarjetasRojasUnicasCerradas);
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
      return tarjetas.filter(
        ({ estado, fecha, color }) =>
          color === "Roja" && fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    const arrTarjetasRojasAcumuladas = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Datos para el grafico
    const RojasAcumuladasAbiertasData = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasRojasAcumuladas[index],
        };
      }),
    ];

    // Formulas para "Rojas acumuladas cerradas"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradas = fechastarjetasUnicasRango.sort().map((item, index) => {
      return tarjetas.filter(
        ({ estado, finReparacion, color }) =>
          color === "Roja" &&
          estado === "Cerrada" &&
          finReparacion.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const arrTarjetasRojasAcumuladasCerradas = arrayCerradas.map(
      (elem, index) =>
        arrayCerradas.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );

    // Datos para el grafico
    const RojasAcumuladasAbiertasDataCerradas = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasRojasAcumuladasCerradas[index],
        };
      }),
    ];

    // Formulas para "Porcentaje acumuladas cerradas porcentaje"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradasPorcentaje = fechastarjetasUnicasRango
      .sort()
      .map((item, index) => {
        return tarjetas.filter(
          ({ estado, finReparacion, color }) =>
            color === "Roja" &&
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasRojasAcumuladasCerradasPorcentaje = arrayCerradasPorcentaje.map(
      (elem, index) =>
        arrayCerradasPorcentaje.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );
    // Datos para el grafico de cerradas porcentaje

    const RojasAcumuladasAbiertasDataCerradasPorcentaje = [
      fechastarjetasUnicasRango.map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y:
            (arrTarjetasRojasAcumuladasCerradasPorcentaje[index] /
              arrTarjetasRojasAcumuladas[index]) *
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
          color: "#dc3545",
          type: "column",
          name: "Rojas acumuladas (abiertas)",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: RojasAcumuladasAbiertasData[0],
        },
        {
          type: "line",
          color: "ffffff",
          name: "Rojas acumuladas (cerradas)",
          showInLegend: true,
          dataPoints: RojasAcumuladasAbiertasDataCerradas[0],
        },
        {
          type: "line",
          color: "#121212",
          name: "Porcentaje Rojas Cerradas",
          showInLegend: true,
          axisYType: "secondary",
          yValueFormatString: "#,##0",
          dataPoints: RojasAcumuladasAbiertasDataCerradasPorcentaje[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={4} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3 className="mb-3">Evolucion de Tarjetas Rojas</h3>
                <CanvasJSChart
                  culture="en"
                  options={options}
                  onRef={(ref) => (this.chart = ref)}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={8} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3>Tabla</h3>
                <TableModal
                  tarjetasFiltro1={arrTarjetasRojasAcumuladas}
                  tarjetasFiltro2={arrTarjetasRojasAcumuladasCerradas}
                  tarjetasFiltro3={arrTarjetasRojasAcumuladasCerradasPorcentaje}
                  tarjetasmesabiertas={array}
                  tarjetasmescerradas={arrayCerradas}
                  color="Rojas"
                  fechas={fechastarjetasUnicasRango}
                ></TableModal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GraficoRojas;
