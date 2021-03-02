import React, { Component } from "react";
import "./App.css";
import AñadirTarjeta from "./components/añadirtarjeta/AñadirTarjeta";
import DashBoard from "./components/dasboard/Dashboard";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/footer";
import MisTarjetas from "./components/tarjetas/MisTarjetas";
import LoginPage from "./auth-components/login/loginpage";
import RegisterPage from "./auth-components/register/registerpage";
import LayoutDetalle from "./components/detalletarjeta/layout";
import { loadUser } from "./store/actions/authActions";
import { connect } from "react-redux";
import SearchBy from "./search/SearchBy";
import AdminUsuarios from "./components/admin/AdminUsuarios";
import MisTarjetasFiltro from "./components/tarjetas/MisTarjetasFiltro";

class App extends Component {
  componentDidMount() {
    this.props.store.dispatch(loadUser());
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="App">
            <NavBar></NavBar>
            <Route exact path="/" component={DashBoard}></Route>
            <Route path="/agregartarjeta" component={AñadirTarjeta}></Route>
            <Route path="/buscar" component={SearchBy}></Route>
            <Route path="/admin" component={AdminUsuarios}></Route>
            <Route path="/tarjetas" component={MisTarjetas}></Route>
            <Route path="/tarjetasfiltro" component={MisTarjetasFiltro}></Route>
            <Route path="/tarjeta/:id" component={LayoutDetalle}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Footer></Footer>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps)(App);
