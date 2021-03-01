import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";

const VersionControlModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <p
        className="text-primary"
        onClick={toggle}
        style={{ cursor: "pointer" }}
      >
        v. 1.2.3
      </p>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Control de Versión</ModalHeader>
        <ModalBody>
          <ListGroup>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.3 | 28/02/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>&#9642; Planificacion de tarjeta agregada.</p>
                      <p>
                        &#9642; Tipo de riesgo cambiado a Tipo de R / FC / LDA.
                      </p>
                      <p>
                        &#9642; Tipo de acción cambiado a Tipo de acción a
                        realizar.
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.2 | 22/01/21
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Login ahora requerido cuando se accede a una
                        tarjeta por qr.
                      </p>
                      <p>
                        &#9642; Cambio de ubicacion de Exportar tarjetas para
                        permitir acceso de Jefe de area.
                      </p>
                      <p>
                        &#9642; Filtrar tarjetas cambiado a Exportar tarjetas
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
            <h6 style={{ fontWeight: "bold" }} className="mb-3">
              Versión 1.2.0 | 20/12/20
            </h6>
            <div class="row">
              <div class="span12">
                <div class="inside">
                  <Container>
                    <div class="entry-content">
                      <p>
                        &#9642; Posibilidad de adjuntar imagen a cada tarjeta.
                      </p>
                      <p>&#9642; Tabla de mapas de riesgo agregada.</p>
                      <p>
                        &#9642; Campos dinamicos agregado, los admin pueden
                        elegir que opciones poner en los siguientes campos:
                        Maquina, Parte de maquina, Tipo, Equipo, Riesgo inicial,
                        Riesgo final.
                      </p>
                      <p>
                        &#9642; Redireccionamiento al agregar usuario corregido.
                      </p>
                      <p>&#9642; Error en graficos corregido.</p>
                      <p>
                        &#9642; Redireccionamiento al agregar usuario corregido
                      </p>
                    </div>
                  </Container>
                </div>
              </div>
            </div>
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default VersionControlModal;
