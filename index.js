const BASE_URL = 'https://pay-sandbox.increase.app';
// Customize this variables with your own account id and the customer's subscription id.
const accountId = 'YOUR_ACCOUNT_ID';
const subscriptionId = 'CUSTOMER_SUBSCRIPTION_ID';

function setMessage(message) {
  const messageContainer = document.getElementById('message');
  messageContainer.innerHTML = message;
};

function hideElement(id) {
  document.getElementById(id).className = 'hidden';
}

function attachListener() {
  window.addEventListener('message', (e) => {
    if(!e.origin === BASE_URL) return;
    switch (e.data.type) {
      case 'LOAD_SUCCESS':
      break;
      case 'LOAD_ERROR':
        setMessage('Error al cargar los datos');
        hideElement('checkout-lite')
      break
      case 'PAYMENT_SUCCESS':
        setMessage('Pago exitoso, ya puedes disfrutar de tu suscripción.');
        hideElement('checkout-lite')
      break;
      case 'PAYMENT_ERROR':
        setMessage('Error al cobrar la suscripción, por favor intenta de nuevo');
      break;
      case 'PAYMENT_IN_PROCESS':
        setMessage('Procesando el pago, por favor espera.');
      break;
      default:
        break;
    }
  });
}
function createIframe({accountId, subscriptionId, containerClass}) {
  const iframe = document.createElement('iframe');
  iframe.id = 'checkout-lite'
  iframe.width = '100%';
  iframe.height = '700px';
  iframe.style.margin = '0';
  iframe.src = `${BASE_URL}checkout-lite/${accountId}?subscription_id=${subscriptionId}`;
  document.querySelector(containerClass).appendChild(iframe)
};

function init() {
  createIframe({
    accountId,
    subscriptionId,
    containerClass: '.container'
  });
  attachListener();
}
window.addEventListener('DOMContentLoaded', init)
