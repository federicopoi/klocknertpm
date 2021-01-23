import React, { Component } from "react";
import { Container, Input, Label, Button, Row, Col } from "reactstrap";
import { getTarjetas } from "../store/actions/tarjetaActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class SearchBy extends Component {
  componentDidMount() {
    this.props.getTarjetas();
  }
  state = {
    color: "",
    numero: "",
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (!localStorage.token) return <Redirect to="/login" />;

    const { tarjetas } = this.props.tarjetas;

    const tarjetaFinal = tarjetas
      .filter(({ color, numero }) => {
        return color === this.state.color && numero === this.state.numero;
      })
      .map((item) => {
        return item._id;
      });

    const test = tarjetas
      .filter(({ color, numero }) => {
        return numero === "1" && color === "Roja";
      })
      .map((item) => {
        return item._id;
      });

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container>
              <Row>
                <Col>
                  <div className="d-sm-flex align-items-center">
                    <div className="">
                      <div>
                        <h2 className="mb-3">Buscar por color y numero</h2>
                      </div>
                    </div>

                    <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                      <Col>
                        <Link to="/tarjetasfiltro">
                          <Button color="secondary" className="btn">
                            Exportar Tarjetas
                          </Button>
                        </Link>
                      </Col>
                    </div>
                  </div>
                </Col>
              </Row>

              <Label for="color">Color *</Label>
              <Input
                type="select"
                name="color"
                id="color"
                className="mb-3"
                onChange={this.onChange}
              >
                <option>Seleccionar</option>
                <option>Roja</option>
                <option>Azul</option>
                <option>Verde</option>
                <option>Amarilla</option>
              </Input>
              <Label for="color">Numero *</Label>
              <Input
                type="number"
                name="numero"
                id="numero"
                onChange={this.onChange}
              ></Input>
              <Link to={{ pathname: `/tarjeta/${tarjetaFinal[0]}` }}>
                <Button color="secondary" className="btn mt-3">
                  Buscar
                </Button>
              </Link>
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
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps, { getTarjetas })(SearchBy);
