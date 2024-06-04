const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const temperaturaSchema = new Schema(
  {
    temperatura: {
      type: Number,
      required: true,
    },
    horario: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Temperatura = mongoose.model("Temperatura", temperaturaSchema);
module.exports = Temperatura;
