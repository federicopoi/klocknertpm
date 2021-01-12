import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { CerradaDetalle, TextDetail, AbiertaDetalle, ImagenDetalle } from ".";

class LayoutDetalle extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    window.scrollTo(0, 0);
  }
  render() {
    const { tarjetas } = this.props.tarjetas;
    const link_id = this.props.location.pathname.substr(9);
    const estadoTarjeta = tarjetas
      .filter(({ _id }) => _id === link_id)
      .map(({ estado }) => estado);

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            <Container className="container-fluid">
              {estadoTarjeta.toString() === "Abierta" ? (
                <div>
                  <Row>
                    <Col>
                      <TextDetail
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></TextDetail>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6} lg={6} height={400}>
                      <AbiertaDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></AbiertaDetalle>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ImagenDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></ImagenDetalle>
                    </Col>
                  </Row>
                </div>
              ) : (
                <div>
                  <Row>
                    <Col>
                      <TextDetail
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></TextDetail>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} lg={6}>
                      <AbiertaDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></AbiertaDetalle>
                    </Col>

                    <Col sm={6} lg={6}>
                      <CerradaDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></CerradaDetalle>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ImagenDetalle
                        tarjetas={tarjetas}
                        link_id={link_id}
                      ></ImagenDetalle>
                    </Col>
                  </Row>
                </div>
              )}
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
  };
};
export default connect(mapStateToProps, { getTarjetas })(LayoutDetalle);
