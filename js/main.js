
document.addEventListener('DOMContentLoaded', () => {
  const selectorOperacion = document.getElementById('operacion');
  const botonCalcular = document.getElementById('botoncalcular');
  const botonBorrarHistorial = document.getElementById('botonborrarHistorial');
  const campoFiltro = document.getElementById('filtro');
  const seccionInputs = document.getElementById('inputs');
  const cartelResultado = document.getElementById('resultado');
  const contenedorHistorial = document.getElementById('historico');

  // Muestra campos dinámicos según operación
  function mostrarCampos() {
    seccionInputs.innerHTML = '';
    const tipo = selectorOperacion.value;

    const crearLabelYInput = (texto, id) => {
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = texto;

      const input = document.createElement('input');
      input.type = 'number';
      input.step = 'any'; // permite decimales
      input.id = id;

      seccionInputs.appendChild(label);
      seccionInputs.appendChild(input);
    };

    if (tipo === 'resistencia') {
      crearLabelYInput('Voltaje (V):', 'voltaje');
      crearLabelYInput('Corriente (A):', 'corriente');
    } else if (tipo === 'voltaje') {
      crearLabelYInput('Corriente (A):', 'corriente');
      crearLabelYInput('Resistencia (Ω):', 'resistencia');
    } else if (tipo === 'corriente') {
      crearLabelYInput('Voltaje (V):', 'voltaje');
      crearLabelYInput('Resistencia (Ω):', 'resistencia');
    }
  }

  // Validaciones
  function validarCampos() {
    const tipo = selectorOperacion.value;
    let esValido = true;
    cartelResultado.textContent = '';

    // Limpiar errores anteriores
    document.querySelectorAll('#inputs input').forEach(input => input.classList.remove('input-error'));

    const marcarError = (input, mensaje) => {
      input.classList.add('input-error');
      cartelResultado.textContent = mensaje;
      esValido = false;
    };

    const validarCampo = (id, nombre) => {
      const input = document.getElementById(id);
      const valor = parseFloat(input.value);
      if (!input.value) {
        marcarError(input, `Por favor, ingresá el valor de ${nombre}.`);
      } else if (isNaN(valor) || valor <= 0) {
        marcarError(input, `${nombre} debe ser un número mayor que 0.`);
      }
    };

    if (tipo === 'resistencia') {
      validarCampo('voltaje', 'Voltaje');
      validarCampo('corriente', 'Corriente');
    } else if (tipo === 'voltaje') {
      validarCampo('corriente', 'Corriente');
      validarCampo('resistencia', 'Resistencia');
    } else if (tipo === 'corriente') {
      validarCampo('voltaje', 'Voltaje');
      validarCampo('resistencia', 'Resistencia');
    }

    return esValido;
  }

  // Cálculos físicos
  function calcularResistencia() {
    const voltaje = parseFloat(document.getElementById('voltaje').value);
    const corriente = parseFloat(document.getElementById('corriente').value);
    guardarResultado('Resistencia', voltaje / corriente, 'Ω');
  }

  function calcularVoltaje() {
    const corriente = parseFloat(document.getElementById('corriente').value);
    const resistencia = parseFloat(document.getElementById('resistencia').value);
    guardarResultado('Voltaje', corriente * resistencia, 'V');
  }

  function calcularCorriente() {
    const voltaje = parseFloat(document.getElementById('voltaje').value);
    const resistencia = parseFloat(document.getElementById('resistencia').value);
    guardarResultado('Corriente', voltaje / resistencia, 'A');
  }

  // Guardar resultado en localStorage
  function guardarResultado(tipo, valor, unidad) {
    document.querySelectorAll('#inputs input').forEach(input => input.classList.remove('input-error'));

    const texto = `${tipo}: ${valor.toFixed(2)} ${unidad}`;
    cartelResultado.textContent = texto;

    const calculo = {
      magnitud: tipo,
      valor: `${valor.toFixed(2)} ${unidad}`,
      timestamp: new Date().toLocaleString()
    };

    const historial = JSON.parse(localStorage.getItem('historico')) || [];
    historial.push(calculo);
    localStorage.setItem('historico', JSON.stringify(historial));

    mostrarHistorial(historial);
  }

  // Mostrar historial en pantalla
  function mostrarHistorial(lista) {
    contenedorHistorial.innerHTML = '';

    const titulo = document.createElement('h3');
    titulo.textContent = 'Historial:';
    contenedorHistorial.appendChild(titulo);

    if (lista.length === 0) {
      const mensaje = document.createElement('p');
      mensaje.textContent = 'No hay cálculos todavía.';
      contenedorHistorial.appendChild(mensaje);
      return;
    }

    lista.forEach((item) => {
      const parrafo = document.createElement('p');

      const magnitud = document.createElement('strong');
      magnitud.textContent = `${item.magnitud}: ${item.valor}`;

      const salto = document.createElement('div');
      salto.style.height = '4px';

      const fecha = document.createElement('small');
      fecha.textContent = item.timestamp;

      parrafo.appendChild(magnitud);
      parrafo.appendChild(salto);
      parrafo.appendChild(fecha);

      contenedorHistorial.appendChild(parrafo);
    });
  }

  // Borrar historial
  function borrarHistorial() {
    localStorage.removeItem('historico');
    mostrarHistorial([]);
    cartelResultado.textContent = 'Historial eliminado correctamente.';
  }

  // Filtrar historial
  function filtrarHistorial() {
    const texto = campoFiltro.value.trim().toLowerCase();
    const historial = JSON.parse(localStorage.getItem('historico')) || [];
    const filtrados = historial.filter(item =>
      item.magnitud.toLowerCase().includes(texto)
    );
    mostrarHistorial(filtrados);
  }

  // Eventos principales
  selectorOperacion.addEventListener('change', mostrarCampos);

  botonCalcular.addEventListener('click', () => {
    if (validarCampos()) {
      const operacion = selectorOperacion.value;
      if (operacion === 'resistencia') calcularResistencia();
      if (operacion === 'voltaje') calcularVoltaje();
      if (operacion === 'corriente') calcularCorriente();
    }
  });

  botonBorrarHistorial.addEventListener('click', borrarHistorial);
  campoFiltro.addEventListener('input', filtrarHistorial);

  // Inicializar
  mostrarCampos();
  const historialInicial = JSON.parse(localStorage.getItem('historico')) || [];
  mostrarHistorial(historialInicial);
});











