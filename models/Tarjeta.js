const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TarjetaSchema = new Schema(
  {
    numero: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      default: "Abierta",
    },
    photo: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
    detecto: {
      type: String,
      required: true,
    },
    prioridad: {
      type: String,
      required: true,
    },
    // No en amarilla
    familia: {
      type: String,
    },
    //
    maquina: {
      type: String,
      required: true,
    },
    parteMaquina: {
      type: String,
      required: true,
    },
    equipo: {
      type: String,
      required: true,
    },
    riesgoInicial: {
      type: String,
    },
    tipodeRiesgo: {
      type: String,
    },
    imagenUrl: {
      type: String,
    },
    // Solo en Tarjeta amarilla
    sustoExperimentado: {
      type: Boolean,
    },
    imagenUrl: {
      type: String,
    },
    sustoObservado: {
      type: Boolean,
    },
    impactoAmbiente: {
      type: Boolean,
    },
    sugerencia: {
      type: String,
    },

    // Tarjeta Cerrada

    inicioReparacion: {
      type: String,
    },
    finReparacion: {
      type: String,
    },
    responsable: {
      type: String,
    },
    tiempoEmpleado: {
      type: String,
    },
    causa: {
      type: String,
    },
    tareaRealizada: {
      type: String,
    },
    materialUtilizado: {
      type: String,
    },
    convertida: {
      type: Boolean,
    },
    riesgoFinal: {
      type: String,
    },
    tipoAccion: {
      type: String,
    },

    // Solo en Amarillas

    verificacion: {
      type: Boolean,
    },
    accionesComplementarias: {
      type: String,
    },

    // Global

    fecha: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: "tarjetas",
  }
);

module.exports = Tarjeta = mongoose.model("tarjeta", TarjetaSchema);
