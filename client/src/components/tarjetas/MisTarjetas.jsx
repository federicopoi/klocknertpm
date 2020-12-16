import React, { Component } from "react";
import { connect } from "react-redux";
import { getTarjetas } from "../../store/actions/tarjetaActions";
import { loadUser } from "../../store/actions/authActions";
import { Card, CardBody, Row, Col, Table, Button, Container } from "reactstrap";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export const TarjetasTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.tarjetas);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

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
                      <h2 className="mb-3">Tarjetas</h2>
                    </div>

                    <div className="ml-auto d-sm-flex no-block align-items-center mb-3 d-sm-flex">
                      <div className="dl">
                        <h5 className="font-weight-normal">
                          Todas las tarjetas en la base de datos
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                    <Col>
                      <Link to="/agregartarjeta">
                        <Button color="success" className="btn">
                          Agregar Tarjeta
                        </Button>
                      </Link>
                    </Col>
                  </div>
                </div>
              </Col>
            </Row>

            <Card>
              <CardBody>
                <Table className="no-wrap v-middle" responsive>
                  <thead>
                    <tr className="border-0">
                      <th className="border-0">
                        N°
                        <Button
                          type="button"
                          onClick={() => requestSort("numero")}
                          className={getClassNamesFor("numero")}
                          color="link"
                        ></Button>
                      </th>
                      <th className="border-0">
                        Color
                        <Button
                          type="button"
                          onClick={() => requestSort("color")}
                          className={getClassNamesFor("color")}
                          color="link"
                        ></Button>
                      </th>
                      <th className="border-0">
                        Equipo autonomo
                        <Button
                          type="button"
                          onClick={() => requestSort("equipo")}
                          className={getClassNamesFor("equipo")}
                          color="link"
                        ></Button>
                      </th>
                      <th className="border-0">
                        Prioridad
                        <Button
                          type="button"
                          onClick={() => requestSort("prioridad")}
                          className={getClassNamesFor("prioridad")}
                          color="link"
                        ></Button>
                      </th>

                      <th className="border-0">
                        Fecha apertura
                        <Button
                          type="button"
                          onClick={() => requestSort("fecha")}
                          color="link"
                          className={getClassNamesFor("fecha")}
                        ></Button>
                      </th>
                      <th className="border-0">
                        Descripcion anomalia
                        <Button
                          type="button"
                          onClick={() => requestSort("descripcion")}
                          color="link"
                          className={getClassNamesFor("descripcion")}
                        ></Button>
                      </th>
                      <th className="border-0">
                        Estado actual
                        <Button
                          type="button"
                          onClick={() => requestSort("estado")}
                          color="link"
                          className={getClassNamesFor("estado")}
                        ></Button>
                      </th>
                    </tr>
                  </thead>
                  {items &&
                    items.map(
                      ({
                        numero,
                        color,
                        prioridad,
                        equipo,
                        fecha,
                        descripcion,
                        estado,
                        _id,
                      }) => {
                        const timeDiferrence = moment().diff(fecha, "days");
                        return (
                          <tbody key={_id}>
                            <tr>
                              <td>
                                <div className="d-flex no-block align-items-center">
                                  <div className="">
                                    <Link to={{ pathname: `/tarjeta/${_id}` }}>
                                      <h5 className="mb-0 font-16 font-medium">
                                        {numero}
                                      </h5>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              {color === "Azul" ? (
                                <td>
                                  <li className="border-0 p-0 text-info list-inline-item">
                                    <i className="fa fa-circle"></i> {color}
                                  </li>
                                </td>
                              ) : null}
                              {color === "Roja" ? (
                                <td>
                                  <li className="border-0 p-0 text-danger list-inline-item">
                                    <i className="fa fa-circle"></i> {color}
                                  </li>
                                </td>
                              ) : null}
                              {color === "Verde" ? (
                                <td>
                                  <li className="border-0 p-0 text-success list-inline-item">
                                    <i className="fa fa-circle"></i> {color}
                                  </li>
                                </td>
                              ) : null}
                              {color === "Amarilla" ? (
                                <td>
                                  <li className="border-0 p-0 text-warning list-inline-item">
                                    <i className="fa fa-circle"></i> {color}
                                  </li>
                                </td>
                              ) : null}
                              <td>{equipo}</td>
                              <td>
                                {prioridad}

                                {prioridad === "Alta" &&
                                  estado === "Abierta" &&
                                  timeDiferrence >= 15 && (
                                    <li className="border-0 p-0 text-danger list-inline-item">
                                      ⚠️
                                    </li>
                                  )}
                                {prioridad === "Media" &&
                                  estado === "Abierta" &&
                                  timeDiferrence >= 30 && (
                                    <li className="border-0 p-0 text-danger list-inline-item">
                                      ⚠️
                                    </li>
                                  )}
                                {prioridad === "Baja" &&
                                  estado === "Abierta" &&
                                  timeDiferrence >= 60 && (
                                    <li className="border-0 p-0 text-danger list-inline-item">
                                      ⚠️
                                    </li>
                                  )}
                              </td>

                              <td>{moment(fecha).format("DD/MM/YYYY LTS")}</td>
                              <td>{descripcion}</td>

                              <td>{estado}</td>
                              <td>
                                <Link to={{ pathname: `/tarjeta/${_id}` }}>
                                  <Button
                                    color="success"
                                    className="btn bg-secondary border border-secondary"
                                  >
                                    Ver detalle
                                  </Button>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        );
                      }
                    )}
                </Table>
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export class MisTarjetas extends Component {
  componentDidMount() {
    this.props.getTarjetas();
    this.props.loadUser();
    window.scrollTo(0, 0);
  }

  render() {
    if (this.props.isAuthenticated === false && this.props.isLoading === false)
      return <Redirect to="/login" />;

    return (
      <div>
        <TarjetasTable
          tarjetas={this.props.tarjetas.tarjetas}
          user={this.props.user}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tarjetas: state.tarjetas,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getTarjetas, loadUser })(MisTarjetas);
