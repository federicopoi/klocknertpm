import React, { Component } from "react";
import { Card } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Label, Input, Alert } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";

export class RegisterPage extends Component {
  state = {
    email: "",
    password: "",
    role: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (this.props.success) {
      this.props.history.push("/admin");
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, role, acceso } = this.state;

    // Create usre object
    const newUser = {
      email,
      password,
      role,
    };

    // Atempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            {this.props.user && this.props.user.role === "Admin" && (
              <Card className="px-5 py-5">
                <form onSubmit={this.onSubmit}>
                  <h3>Registrar Usuario</h3>

                  <div className="form-group">
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <Label for="password">Contraseña</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                  </div>
                  <Label for="color">Role</Label>
                  <Input
                    type="select"
                    name="role"
                    id="role"
                    onChange={this.onChange}
                  >
                    <option>Seleccionar</option>
                    <option>Admin</option>
                    <option>Jefe de area</option>
                    <option>Operario</option>
                  </Input>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-3"
                  >
                    Subir
                  </button>
                  {this.state.msg ? (
                    <Alert color="danger" className="mt-3">
                      {this.state.msg}
                    </Alert>
                  ) : null}
                </form>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  success: state.auth.success,
  error: state.error,
  user: state.auth.user,
  users: state.users,
});
export default withRouter(
  connect(mapStateToProps, { register, clearErrors })(RegisterPage)
);
