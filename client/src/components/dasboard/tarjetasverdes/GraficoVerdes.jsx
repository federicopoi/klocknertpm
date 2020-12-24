import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import moment from "moment";
import TableModal from "../tablemodal/TableModal";
import { Row, Col, Card, CardBody } from "reactstrap";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

export class GraficoVerdes extends Component {
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

    // Formulas para "Verdes acumuladas abiertas"

    // Filtro todos los meses en el que hay tarjetas abiertas Verdes
    const fechasTarjetasVerdes = tarjetas
      .filter(({ estado, color }) => color === "Verde")
      .map(({ fecha }) => fecha.substr(0, 7));

    // Filtro todos los meses en el que hay tarjetas cerradas Verdes
    const fechasTarjetasVerdesCerradas = tarjetas
      .filter(({ estado, color }) => estado === "Cerrada" && color === "Verde")
      .map(({ finReparacion }) => finReparacion.substr(0, 7));

    // Borro todos los meses repetidos
    let fechasTarjetasVerdes1 = new Set(fechasTarjetasVerdes);
    const fechasTarjetasVerdesUnicas = [...fechasTarjetasVerdes1];

    // Borro todos los meses repetidos
    let fechasTarjetasVerdes1Cerradas = new Set(fechasTarjetasVerdesCerradas);
    const fechasTarjetasVerdesUnicasCerradas = [
      ...fechasTarjetasVerdes1Cerradas,
    ];

    var c = fechasTarjetasVerdesUnicas.concat(
      fechasTarjetasVerdesUnicasCerradas
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
      return tarjetas.filter(
        ({ estado, fecha, color }) =>
          color === "Verde" && fecha.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    const arrTarjetasVerdesAcumuladas = array.map((elem, index) =>
      array.slice(0, index + 1).reduce((a, b) => a + b)
    );

    // Datos para el grafico
    const VerdesAcumuladasAbiertasData = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasVerdesAcumuladas[index],
        };
      }),
    ];

    // Formulas para "Verdes acumuladas cerradas"

    // Numero total de tarjetas de cada mes (no acumulado)
    let arrayCerradas = fechastarjetasUnicasRango.sort().map((item, index) => {
      return tarjetas.filter(
        ({ estado, finReparacion, color }) =>
          color === "Verde" &&
          estado === "Cerrada" &&
          finReparacion.slice(0, 7) === item.slice(0, 7)
      ).length;
    });

    // Acumulado de tarjetas por mes
    const arrTarjetasVerdesAcumuladasCerradas = arrayCerradas.map(
      (elem, index) =>
        arrayCerradas.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );

    // Datos para el grafico
    const VerdesAcumuladasAbiertasDataCerradas = [
      fechastarjetasUnicasRango.sort().map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y: arrTarjetasVerdesAcumuladasCerradas[index],
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
            color === "Verde" &&
            estado === "Cerrada" &&
            finReparacion.slice(0, 7) === item.slice(0, 7)
        ).length;
      });

    // Acumulado de tarjetas por mes
    const arrTarjetasVerdesAcumuladasCerradasPorcentaje = arrayCerradasPorcentaje.map(
      (elem, index) =>
        arrayCerradasPorcentaje.slice(0, index + 1).reduce((aa, bb) => aa + bb)
    );
    // Datos para el grafico de cerradas porcentaje

    const VerdesAcumuladasAbiertasDataCerradasPorcentaje = [
      fechastarjetasUnicasRango.map((item, index) => {
        return {
          x: new Date(
            parseInt(item.slice(0, 4)),
            parseInt(item.slice(5, 7) - 1)
          ),
          y:
            (arrTarjetasVerdesAcumuladasCerradasPorcentaje[index] /
              arrTarjetasVerdesAcumuladas[index]) *
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
          color: "#28a745",
          type: "column",
          name: "Verdes acumuladas (abiertas)",
          showInLegend: true,
          xValueFormatString: "MMMM YYYY",
          dataPoints: VerdesAcumuladasAbiertasData[0],
        },
        {
          type: "line",
          name: "Verdes acumuladas (cerradas)",
          showInLegend: true,
          dataPoints: VerdesAcumuladasAbiertasDataCerradas[0],
        },
        {
          type: "line",
          color: "#121212",
          name: "Porcentaje Verdes Cerradas",
          showInLegend: true,
          axisYType: "secondary",
          yValueFormatString: "#,##0",
          dataPoints: VerdesAcumuladasAbiertasDataCerradasPorcentaje[0],
        },
      ],
    };

    return (
      <div>
        <Row>
          <Col lg={5} md={12} sm={12}>
            <Card>
              <CardBody>
                <h3 className="mb-3">Evolucion de Tarjetas Verdes</h3>
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
                  tarjetasFiltro1={arrTarjetasVerdesAcumuladas}
                  tarjetasFiltro2={arrTarjetasVerdesAcumuladasCerradas}
                  tarjetasFiltro3={
                    arrTarjetasVerdesAcumuladasCerradasPorcentaje
                  }
                  tarjetasmesabiertas={array}
                  tarjetasmescerradas={arrayCerradas}
                  color="Verdes"
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

export default GraficoVerdes;
