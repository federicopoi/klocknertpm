import React from "react";

import { Card, CardBody, Col, Row } from "reactstrap";

const CerradaDetalle = (props) => {
  const { tarjetas, link_id } = props;
  return (
    <div>
      {tarjetas &&
        tarjetas
          .filter(({ _id }) => _id === link_id)
          .map(
            ({
              _id,
              inicioReparacion,
              finReparacion,
              responsable,
              tiempoEmpleado,
              causa,
              tareaRealizada,
              materialUtilizado,
              convertida,
              riesgoFinal,
              verificacion,
              accionesComplementarias,
              color,
              tipoAccion,
            }) => {
              return (
                <div>
                  {color === "Azul" && <div class="trapezoidAzul"></div>}
                  {color === "Verde" && <div class="trapezoidVerde"></div>}
                  {color === "Roja" && <div class="trapezoidRojo"></div>}
                  {color === "Amarilla" && (
                    <div class="trapezoidAmarilla"></div>
                  )}
                  <Card>
                    <CardBody key={_id}>
                      {color !== "Amarilla" ? (
                        <div>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Inicio de la reparacion:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {inicioReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Fin de la reparacion:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {finReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Responsable:{" "}
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {responsable}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tiemplo empleado:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tiempoEmpleado} horas
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de Acción realizada:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tipoAccion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Riesgo Final:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {riesgoFinal}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tarjeta convertida
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {convertida ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </h5>
                          </Row>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Causa de la anomalia:
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {causa}
                              </h5>
                            </Col>
                          </Row>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Tarea realizada:
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {tareaRealizada}
                              </h5>
                            </Col>
                          </Row>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Material utilizado
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {materialUtilizado}
                              </h5>
                            </Col>
                          </Row>
                        </div>
                      ) : (
                        <div>
                          <Row className="my-3 text-center">
                            <Col>
                              <h5 className="font-16 font-medium text-center">
                                Acción realizada
                              </h5>
                            </Col>
                          </Row>
                          <Row className="text-center">
                            <Col>
                              <h5 className="font-14 font-weight-normal">
                                {tareaRealizada}
                              </h5>
                            </Col>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Responsable:{" "}
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {responsable}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">Causa:</h5>
                            <h5 className="font-14 font-weight-normal">
                              {causa}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Fin de terminación:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {finReparacion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Verificacion (Resp. Pilar de seguridad)
                            </h5>
                            {verificacion ? (
                              <h5 className="font-14 font-weight-normal">Si</h5>
                            ) : (
                              <h5 className="font-14 font-weight-normal">No</h5>
                            )}
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Riesgo Final:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {riesgoFinal}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Acciones complementarias:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {accionesComplementarias}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tipo de Acción realizada:
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {tipoAccion}
                            </h5>
                          </Row>
                          <Row className="my-1 ml-2">
                            <h5 className="font-16 font-medium mr-2">
                              Tarjeta convertida
                            </h5>
                            <h5 className="font-14 font-weight-normal">
                              {convertida ? (
                                <h5 className="font-14 font-weight-normal">
                                  Si
                                </h5>
                              ) : (
                                <h5 className="font-14 font-weight-normal">
                                  No
                                </h5>
                              )}
                            </h5>
                          </Row>
                        </div>
                      )}
                    </CardBody>
                    {color === "Azul" && <div class="rectangleAzul"></div>}
                    {color === "Verde" && <div class="rectangleVerde"></div>}
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
};

export default CerradaDetalle;
