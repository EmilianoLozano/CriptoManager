// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
   access_token: "TEST-8139571457956330-122210-f7ef43d6ece79770dca857008e90823c-208173321"
});
const mercadopagoCtrl = {};
mercadopagoCtrl.makecheckout = (preference, res) => {
console.log(preference);
return mercadopago.preferences.create(preference);
}
module.exports = mercadopagoCtrl;