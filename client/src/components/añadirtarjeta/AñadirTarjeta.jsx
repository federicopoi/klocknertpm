import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { connect } from "react-redux";
import RIModal from "./RIModal";
import { Redirect } from "react-router-dom";
import FileUpload from "./FileUpload";
import {
  agregarTarjeta,
  agregarTarjetaAmarilla,
} from "../../store/actions/tarjetaActions";

class AñadirTarjeta extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  state = {
    numero: "",
    descripcion: "",
    color: "",
    detecto: "",
    prioridad: "",
    familia: "",
    maquina: "",
    equipo: "",
    riesgoInicial: "",
    tipodeRiesgo: "",
    sugerencia: "false",
    sustoExperimentado: false,
    sustoObservado: false,
    impactoAmbiente: false,
    image: "",
    url: "",
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check login error
      console.log(error.msg.msg);
      if (error.id === "AGREGAR_TARJETA_ERROR") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChangeColor = (e) => {
    const numeroTarjeta = this.props.tarjetas.tarjetas.filter(
      ({ color }) => color === e.target.value
    );
    this.setState({
      [e.target.name]: e.target.value,
      numero: numeroTarjeta.length + 1,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      numero,
      descripcion,
      color,
      detecto,
      prioridad,
      maquina,
      familia,
      equipo,
      sustoExperimentado,
      sustoObservado,
      impactoAmbiente,
      sugerencia,
      tipodeRiesgo,
      riesgoInicial,
      url,
    } = this.state;

    // Crear Tarjeta
    const nuevaTarjeta = {
      numero,
      descripcion,
      color,
      detecto,
      prioridad,
      familia,
      maquina,
      equipo,
      riesgoInicial,
      tipodeRiesgo,
      url,
    };

    // Crear Tarjeta Amarilla
    const nuevaTarjetaAmarilla = {
      numero,
      descripcion,
      color,
      detecto,
      prioridad,
      maquina,
      equipo,
      sustoExperimentado,
      sustoObservado,
      impactoAmbiente,
      familia,
      sugerencia,
      tipodeRiesgo,
      riesgoInicial,
      url,
    };
    this.state.color !== "Amarilla"
      ? this.props.agregarTarjeta(nuevaTarjeta)
      : this.props.agregarTarjetaAmarilla(nuevaTarjetaAmarilla);
  };
  render() {
    if (this.props.tarjetas.agregarsuccess) {
      return this.props.user && this.props.user.role !== "Operario" ? (
        <Redirect to="/tarjetas" />
      ) : (
        <Redirect to="/" />
      );
    }
    if (!localStorage.token) return <Redirect to="/login" />;

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <h2 className="my-2">Añadir nueva tarjeta</h2>

              <Form
                className="mt-4"
                onSubmit={this.onSubmit}
                id="agregartarjeta"
              >
                <FormGroup>
                  <Label for="color">Color *</Label>
                  <Input
                    type="select"
                    name="color"
                    id="color"
                    onChange={this.onChangeColor}
                  >
                    <option>Seleccionar</option>
                    <option>Roja</option>
                    <option>Azul</option>
                    <option>Verde</option>
                    <option>Amarilla</option>
                  </Input>
                </FormGroup>

                {this.state.color === "Amarilla" && (
                  <Row className="my-4">
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="sustoExperimentado"
                            name="sustoExperimentado"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Reporte de Incidente "Susto" experimentado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="sustoObservado"
                            name="sustoObservado"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          Reporte de Incidente "Susto" observado
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            id="impactoAmbiente"
                            name="impactoAmbiente"
                            onChange={(e) => {
                              this.onChange({
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              });
                            }}
                          />
                          El incidente puede afectar al Medio Ambiente
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                )}

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="maquina">Maquina / Instalación *</Label>
                      <Input
                        type="select"
                        name="maquina"
                        id="maquina"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Row>
                        <Col>
                          <Label for="detecto">Riesgo Inicial *</Label>
                        </Col>
                        <RIModal></RIModal>
                      </Row>

                      <Input
                        type="text"
                        name="riesgoInicial"
                        id="riesgoInicial"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="detecto">Detectó *</Label>
                      <Input
                        type="text"
                        name="detecto"
                        id="detecto"
                        onChange={this.onChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      {this.state.color !== "Amarilla" ? (
                        <Label for="descripcion">Descripción *</Label>
                      ) : (
                        <Label for="descripcion">
                          Descripcion del incidente "SUSTO" experimentado u
                          observado *
                        </Label>
                      )}
                      <Input
                        type="textarea"
                        name="descripcion"
                        id="descripcion"
                        onChange={this.onChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="equipo">Equipo Autonomo*</Label>
                      <Input
                        type="select"
                        name="equipo"
                        id="equipo"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </Input>
                    </FormGroup>

                    {this.state.color !== "Amarilla" && (
                      <FormGroup>
                        <Label for="familia">Familia de anomalias *</Label>
                        <Input
                          type="select"
                          name="familia"
                          id="familia"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>1 - Pequeñas Deficiencia</option>
                          <option>2 - Condiciones basicas</option>
                          <option>3 - Puntos inaccesibles</option>
                          <option>4 - Focos de contaminacion</option>
                          <option>5 - Defecto de Calidad</option>
                          <option>6 - Elementos Innecesarios</option>
                          <option>7 - Lugares Inseguros</option>
                        </Input>
                      </FormGroup>
                    )}
                    {this.state.color === "Amarilla" && (
                      <FormGroup>
                        <Label for="familia">Familia de anomalias *</Label>
                        <Input
                          type="select"
                          name="familia"
                          id="familia"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>8 - Actos Inseguros</option>
                        </Input>
                      </FormGroup>
                    )}
                    {this.state.color === "Amarilla" && (
                      <FormGroup>
                        <Label for="detecto">
                          ¿Que sugiere para que no se repita?*
                        </Label>
                        <Input
                          type="text"
                          name="sugerencia"
                          id="sugerencia"
                          onChange={this.onChange}
                        />
                      </FormGroup>
                    )}

                    {this.state.color !== "Amarilla" ? (
                      <FormGroup>
                        <Label for="detecto">Tipo *</Label>
                        <Input
                          type="select"
                          name="tipodeRiesgo"
                          id="tipodeRiesgo"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>Atrapamiento</option>
                          <option>Corte</option>
                          <option>Quemadura</option>
                          <option>Deslizamiento</option>
                          <option>Salpicadura</option>
                          <option>Otros</option>
                        </Input>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Label for="detecto">Tipo de riesgo *</Label>
                        <Input
                          type="select"
                          name="tipodeRiesgo"
                          id="tipodeRiesgo"
                          onChange={this.onChange}
                        >
                          <option>Seleccionar</option>
                          <option>Atrapamiento</option>
                          <option>Corte</option>
                          <option>Quemadura</option>
                          <option>Deslizamiento</option>
                          <option>Salpicadura</option>
                          <option>Otros</option>
                          <option>Aire comprimido</option>
                          <option>Agua</option>
                          <option>Aceite</option>
                          <option>Vapor</option>
                          <option>Materia prima</option>
                          <option>Polvo</option>
                          <option>No tocar</option>
                          <option>No subir</option>
                          <option>No bajar</option>
                          <option>No detenerse</option>
                          <option>No acercarse</option>
                          <option>No esforzarse</option>
                          <option>No prejuzgar</option>
                          <option>No equivocarse</option>
                          <option>No exponer al hombre</option>
                          <option>No usar registros</option>
                        </Input>
                      </FormGroup>
                    )}
                    <FormGroup>
                      <Label for="prioridad">Prioridad *</Label>
                      <Input
                        type="select"
                        name="prioridad"
                        id="prioridad"
                        onChange={this.onChange}
                      >
                        <option>Seleccionar</option>
                        <option>Alta</option>
                        <option>Media</option>
                        <option>Baja</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {this.state.color !== "Seleccionar" &&
                  this.state.color !== "" && (
                    <FileUpload
                      id={this.state.color + this.state.numero}
                    ></FileUpload>
                  )}

                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}

                <Row className="mt-3">
                  <Col>
                    <Button>Subir</Button>
                  </Col>
                </Row>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    error: state.error,
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps, {
  agregarTarjeta,
  agregarTarjetaAmarilla,
  getTarjetas,
})(AñadirTarjeta);
