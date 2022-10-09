// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: "TEST-5589228011651963-091314-8177d26f6836d3ef7fa9102dca227685-133610682"
});
const mercadopagoCtrl = {};
mercadopagoCtrl.makecheckout = (preference, res) => {
console.log(preference);
return mercadopago.preferences.create(preference);
}
module.exports = mercadopagoCtrl;