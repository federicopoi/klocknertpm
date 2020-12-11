import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Table, Button, Container } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { getUsers, borrarUser } from "../../store/actions/usersActions";
export class AdminUsuarios extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  onDeleteClick = (id) => {
    this.props.borrarUser(id);
    this.props.history.push("/admin");
  };
  render() {
    const { users } = this.props.users;
    if (this.props.isAuthenticated === false && this.props.isLoading === false)
      return <Redirect to="/login" />;

    return (
      <div>
        <div className="page-wrapper d-block">
          <div className="page-content container-fluid">
            {this.props.user && this.props.user.role === "Admin" && (
              <Container>
                <Row>
                  <Col>
                    <div className="d-sm-flex align-items-center">
                      <div className="">
                        <div>
                          <h2 className="mb-3">Administrar usuarios</h2>
                        </div>
                      </div>
                      <div className="ml-auto d-sm-flex no-block align-items-center mb-3">
                        <Link to="/register">
                          <Button color="success" className="btn">
                            Agregar usuario
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Card>
                  <CardBody>
                    <Table className="no-wrap v-middle" responsive>
                      <thead>
                        <tr className="border-0">
                          <th className="border-0">Email</th>
                          <th className="border-0">Role</th>
                          <th className="border-0">Acciones</th>
                        </tr>
                      </thead>
                      {users &&
                        users.map(({ name, email, role, _id }) => {
                          return (
                            <tbody key={_id}>
                              <tr>
                                <td>{email}</td>
                                <td>{role}</td>
                                <td>
                                  <Button
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    className="bg-danger border-danger"
                                  >
                                    Borrar
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                    </Table>
                  </CardBody>
                </Card>
              </Container>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
  };
};
export default connect(mapStateToProps, { getUsers, borrarUser })(
  AdminUsuarios
);
