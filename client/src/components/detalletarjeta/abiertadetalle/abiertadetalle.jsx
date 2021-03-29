import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import moment from "moment";

export class AbiertaDetalle extends Component {
  render() {
    const { tarjetas, link_id } = this.props;
    const fecha =
      tarjetas &&
      tarjetas.filter(({ _id }) => _id === link_id).map(({ fecha }) => fecha);

    const timeDiferrence = moment().diff(fecha[0], "days");

    return (
      <div>
        {tarjetas &&
          tarjetas
            .filter(({ _id }) => _id === link_id)
            .map(
              ({
                estado,
                color,
                detecto,
                numero,
                descripcion,
                prioridad,
                familia,
                fecha,
                maquina,
                parteMaquina,
                equipo,
                sugerencia,
                tipodeRiesgo,
                riesgoInicial,
                sustoExperimentado,
                sustoObservado,
                impactoAmbiente,
              }) => {
                return (
                  <div>
                    {color === "Azul" && <div class="trapezoidAzul"></div>}
                    {color === "Verde" && <div class="trapezoidVerde"></div>}
                    {color === "Roja" && <div class="trapezoidRojo"></div>}
                    {color === "Amarilla" && (
                      <div class="trapezoidAmarilla"></div>
                    )}

                    <Card className="card">
                      <CardBody>
                        <Row className="ml-2 my-1">
                          <h5
                            className="font-16 font-medium mr-2"
                            style={{ display: "block" }}
                          >
                            Maquina / Instalación:
                          </h5>
                          <div>&nbsp;</div>
                          <h5 className="font-16 font-weight-normal">
                            {maquina}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5
                            className="font-16 font-medium mr-2"
                            style={{ display: "block" }}
                          >
                            Parte de maquina:
                          </h5>
                          <div>&nbsp;</div>
                          <h5 className="font-16 font-weight-normal">
                            {parteMaquina}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">
                            Equipo Autonomo:
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {equipo}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">
                            Fecha apertura:
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {moment(fecha).format("DD/MM/YYYY LTS ")}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">
                            Detecto:{" "}
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {detecto}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">
                            Prioridad:{" "}
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {prioridad}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">Familia:</h5>
                          <h5 className="font-14 font-weight-normal">
                            {familia}
                          </h5>
                        </Row>
                        <Row className="ml-2 my-1">
                          {color === "Amarilla" ? (
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de R / FC / LDA:
                            </h5>
                          ) : (
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de R / FC / LDA:
                            </h5>
                          )}
                          <h5 className="font-14 font-weight-normal">
                            {tipodeRiesgo}
                          </h5>
                        </Row>

                        <Row className="ml-2 my-1">
                          <h5 className="font-16 font-medium mr-2">
                            Riesgo Inicial:
                          </h5>
                          <h5 className="font-14 font-weight-normal">
                            {riesgoInicial}
                          </h5>
                        </Row>
                        {color === "Amarilla" && (
                          <Row className="ml-2 my-1">
                            <h5 className="font-16 font-medium mr-2">
                              Sugerencia para que no se repita:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {sugerencia}
                            </h5>
                          </Row>
                        )}

                        {color === "Amarilla" && (
                          <div>
                            <Row className="ml-2 my-1">
                              <h5 className="font-16 font-medium mr-2">
                                Reporte de Incidente "Susto" experimentado:
                              </h5>
                              {sustoExperimentado ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Row>
                            <Row className="ml-2 my-1">
                              <h5 className="font-16 font-medium mr-2">
                                Reporte de Incidente "Susto" observado
                              </h5>
                              {sustoObservado ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Row>
                            <Row className="ml-2 my-1">
                              <h5 className="font-16 font-medium mr-2">
                                El incidente puede afectar al Medio Ambiente
                              </h5>
                              {impactoAmbiente ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </Row>

                            <Row className="ml-2 my-1">
                              {estado === "Abierta" && (
                                <div>
                                  <h5 className="font-16 font-medium">
                                    Alerta
                                  </h5>
                                  {prioridad === "Alta" &&
                                    timeDiferrence <= 15 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Faltan {-timeDiferrence + 15} dias
                                      </h5>
                                    )}
                                  {prioridad === "Alta" &&
                                    timeDiferrence >= 15 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Excedido {timeDiferrence - 15} dias
                                      </h5>
                                    )}
                                  {prioridad === "Media" &&
                                    timeDiferrence <= 30 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Faltan {-timeDiferrence + 30} dias
                                      </h5>
                                    )}
                                  {prioridad === "Media" &&
                                    timeDiferrence >= 30 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Excedido {timeDiferrence - 30} dias
                                      </h5>
                                    )}
                                  {prioridad === "Baja" &&
                                    timeDiferrence <= 60 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Faltan {-timeDiferrence + 60} dias
                                      </h5>
                                    )}
                                  {prioridad === "Baja" &&
                                    timeDiferrence >= 60 && (
                                      <h5 className="font-14 font-weight-normal">
                                        Excedido {-timeDiferrence - 60} dias
                                      </h5>
                                    )}
                                </div>
                              )}
                            </Row>
                          </div>
                        )}
                        {color !== "Amarilla" && (
                          <Row className="ml-2 my-1">
                            {estado === "Abierta" && (
                              <div>
                                <h5 className="font-16 font-medium">Alerta</h5>
                                {prioridad === "Alta" &&
                                  timeDiferrence <= 15 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 15} dias
                                    </h5>
                                  )}
                                {prioridad === "Alta" &&
                                  timeDiferrence >= 15 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {timeDiferrence - 15} dias
                                    </h5>
                                  )}
                                {prioridad === "Media" &&
                                  timeDiferrence <= 30 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 30} dias
                                    </h5>
                                  )}
                                {prioridad === "Media" &&
                                  timeDiferrence >= 30 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {timeDiferrence - 30} dias
                                    </h5>
                                  )}
                                {prioridad === "Baja" &&
                                  timeDiferrence <= 60 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Faltan {-timeDiferrence + 60} dias
                                    </h5>
                                  )}
                                {prioridad === "Baja" &&
                                  timeDiferrence >= 60 && (
                                    <h5 className="font-14 font-weight-normal">
                                      Excedido {-timeDiferrence - 60} dias
                                    </h5>
                                  )}
                              </div>
                            )}
                          </Row>
                        )}
                        <Row className="my-3 text-center">
                          <Col>
                            <h5 className="font-16 font-medium text-center">
                              Descripción:
                            </h5>
                          </Col>
                        </Row>

                        <Row className="text-center">
                          <Col>
                            <h5 className="font-14 font-weight-normal">
                              {descripcion}
                            </h5>
                          </Col>
                        </Row>
                      </CardBody>
                      {color === "Azul" && <div class="rectangleAzul"></div>}
                      {color === "Verde" && (
                        <div class="rectangleVerde text-center"></div>
                      )}
                      {color === "Roja" && <div class="rectangleRojo"></div>}
                      {color === "Amarilla" && (
                        <div class="rectangleAmarilla"></div>
                      )}
                    </Card>
                  </div>
                );
              }
            )}
      </div>
    );
  }
}

export default AbiertaDetalle;
