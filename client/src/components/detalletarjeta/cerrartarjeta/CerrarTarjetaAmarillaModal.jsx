import React, { Component } from "react";
import { connect } from "react-redux";
import { clearErrors } from "../../../store/actions/errorActions";
import { cerrarTarjetaAmarilla } from "../../../store/actions/tarjetaActions";
import { getCampos } from "../../../store/actions/camposActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";
export class CerrarTarjetaAmarillaModal extends Component {
  state = {
    modal: false,
    _id: this.props._id,
    finReparacionDia: "",
    finReparacionHora: "",
    responsable: "",
    tareaRealizada: "",
    riesgoFinal: "",
    verificacion: false,
    accionesComplementarias: "",
    tipoAccion: "",
    convertida: false,
    msg: null,
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "CERRAR_TARJETA_AMARILLA_ERROR") {
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
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const {
      _id,
      finReparacionDia,
      finReparacionHora,
      responsable,
      tareaRealizada,
      convertida,
      riesgoFinal,
      causa,
      tipoAccion,
      verificacion,
      accionesComplementarias,
    } = this.state;

    // Cerrar Tarjeta
    const tarjetaActualizada = {
      _id,
      finReparacion: finReparacionDia + " " + finReparacionHora,
      responsable,
      tareaRealizada,
      riesgoFinal,
      verificacion,
      causa,
      tipoAccion,
      accionesComplementarias,
      convertida,
    };

    this.props.cerrarTarjetaAmarilla(tarjetaActualizada);
    if (
      !_id ||
      !riesgoFinal ||
      !finReparacionDia ||
      !finReparacionHora ||
      !responsable ||
      !tipoAccion ||
      !causa ||
      !accionesComplementarias ||
      !tareaRealizada
    ) {
      return null;
    } else {
      return this.toggle();
    }
  };
  componentDidMount() {
    this.props.getCampos();
  }
  render() {
    const { campos } = this.props.campos;
    return (
      <div>
        <p onClick={this.toggle} style={{ cursor: "pointer" }} className="my-3">
          Cerrar Tarjeta
        </p>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Cerrar Tarjeta</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="accionRealizada">Acción Realizada</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="tareaRealizada"
                  id="tareaRealizada"
                  className="mb-2"
                ></Input>
                <Label for="tipoAccion">Tipo de Acción realizada *</Label>
                <Input
                  type="select"
                  name="tipoAccion"
                  id="tipoAccion"
                  className="mb-2"
                  onChange={this.onChange}
                >
                  <option>Seleccionar</option>
                  <option>Eliminar</option>
                  <option>Contener</option>
                  <option>Reemplazar</option>
                  <option>Simplificar</option>
                </Input>
                <Label for="responsable">Responsable</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="responsable"
                  id="responsable"
                  className="mb-2"
                ></Input>
                <Label for="responsable">Causa</Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="causa"
                  id="causa"
                  className="mb-2"
                ></Input>
                <Label for="updaters">Fecha de terminacion</Label>
                <Input
                  onChange={this.onChange}
                  type="date"
                  name="finReparacionDia"
                  id="finReparacionDia"
                  className="mb-2"
                ></Input>
                <Input
                  onChange={this.onChange}
                  type="time"
                  name="finReparacionHora"
                  id="finReparacionHora"
                  className="mb-2"
                ></Input>

                <Label for="detecto">Riesgo Final</Label>
                <Input
                  type="select"
                  name="riesgoFinal"
                  id="riesgoFinal"
                  onChange={this.onChange}
                >
                  <option>Seleccionar</option>
                  {campos &&
                    campos
                      .filter(({ name, value }) => {
                        return name === "riesgoFinal";
                      })
                      .map(({ name, value, _id }, index) => {
                        return (
                          <option key={index} _id={_id}>
                            {value}
                          </option>
                        );
                      })}
                </Input>

                <Label for="updaters" className="mt-3">
                  Acciones Complementarias
                </Label>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="accionesComplementarias"
                  id="accionesComplementarias"
                  className="mb-2"
                ></Input>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="verificacion"
                      name="verificacion"
                      onChange={(e) => {
                        this.onChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        });
                      }}
                    />
                    Verificación: (Resp. Pilar de seguridad)
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="convertida"
                      name="convertida"
                      onChange={(e) => {
                        this.onChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        });
                      }}
                    />
                    Tarjeta Convertida
                  </Label>
                </FormGroup>

                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <Button color="dark" block style={{ marginTop: "2rem" }}>
                  Subir
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  campos: state.campos,
});
export default connect(mapStateToProps, {
  clearErrors,
  cerrarTarjetaAmarilla,
  getCampos,
})(CerrarTarjetaAmarillaModal);
