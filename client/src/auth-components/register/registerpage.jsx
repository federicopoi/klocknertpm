import React, { Component } from "react";
import { Card } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../store/actions/authActions";
import { clearErrors } from "../../store/actions/errorActions";
import { Label, Input, Alert } from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

export class RegisterPage extends Component {
  state = {
    legajo: null,
    pin: null,
    role: "",
    msg: null,
    errors: {
      legajo: "",
      pin: "",
    },
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
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "legajo":
        errors.legajo =
          value.length > 6 ? "Se permite un maximo de 6 caracteres" : "";
        break;
      case "pin":
        errors.pin =
          value.length !== 6 ? "Pin tiene que ser de 6 caracteres" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  // onSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password, role, acceso } = this.state;

  //   // Create usre object
  //   const newUser = {
  //     email,
  //     password,
  //     role,
  //   };

  //   // Atempt to register
  //   // this.props.register(newUser);
  //   console.log(newUser);
  // };
  handleSubmit = (event) => {
    event.preventDefault();
    const { legajo, pin, role } = this.state;

    // Create usre object
    const newUser = {
      email: legajo,
      password: pin,
      role,
    };

    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
      if ((legajo !== null) & (pin !== null)) {
        // Atempt to register
        this.props.register(newUser);
        console.log(newUser);
      }
    } else {
      console.error("Invalid Form");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container h-100">
        <div className="row align-items-center h-100">
          <div className="col-6 mx-auto">
            {this.props.user && this.props.user.role === "Admin" && (
              <Card className="px-5 py-5">
                <form onSubmit={this.handleSubmit}>
                  <h3>Registrar Usuario</h3>
                  <div className="form-group">
                    <Label for="pin">N° Legajo</Label>
                    <Input
                      type="number"
                      name="legajo"
                      id="legajo"
                      placeholder="Legajo"
                      className="mb-3"
                      onChange={this.handleChange}
                    />
                    {errors.legajo.length > 0 && (
                      <span className="error text-danger">{errors.legajo}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <Label for="pin">Pin</Label>
                    <Input
                      type="number"
                      name="pin"
                      id="pin"
                      placeholder="Pin"
                      className="mb-3"
                      onChange={this.handleChange}
                    />
                    {errors.pin.length > 0 && (
                      <span className="error text-danger">{errors.pin}</span>
                    )}
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
                  {/* {this.state.msg ? (
                    <Alert color="danger" className="mt-3">
                      {this.state.msg}
                    </Alert>
                  ) : null} */}
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
