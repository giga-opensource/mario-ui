var Modal = require('react-modal');

var modalElement = document.getElementById('modalElement');

Modal.setAppElement(modalElement);
Modal.injectCSS();

module.exports = Modal