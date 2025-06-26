
function calculoOhm() {

    let seguircalculando = true;

    while (seguircalculando) {

    const opciones = prompt(`
    ¿Qué magnitud deseas calcular?
    1 - Resistencia (Ohm)
    2 - Voltaje (Volt)
    3 - Corriente (Amp)
    4 - Salir

    Ingresá el número de la opción deseada:
`);

    switch (opciones) {

        case "1":
        calculoResistencia();
        break;

        case "2":
        calculoVoltaje();
        break;

        case "3":
        calculoCorriente();
        break;

        case "4":
        alert("Gracias por usar la calculadora. ¡Hasta la próxima!");
        seguircalculando = false;
        break;

        default:
        alert("Opción inválida. Por favor, elegí 1, 2, 3 o 4.");
        break;

    }
    }
}

function calculoResistencia() {

    alert("Vamos a calcular la Resistencia (Ohm)");

    let voltaje = parseFloat(prompt("Ingresá el voltaje (V):"));
    let corriente = parseFloat(prompt("Ingresá la corriente (I):"));

    //validaciones//

    if (isNaN(voltaje) || isNaN(corriente)) {
        alert("Error: Debés ingresar números válidos.");
        return;
    }
    if (corriente === 0) {
        alert("Error: La corriente no puede ser 0 (división por cero).");
        return;
    }

    //calculo//

    let resistencia = voltaje / corriente;

    //validacion de resultado//

    if (resistencia <= 0) {
        alert("Error: La resistencia calculada no puede ser menor o igual a 0.");
        return;
    }

    //resultado//

    console.log(`La resistencia es ${resistencia.toFixed(2)} Ohm`);
}

function calculoVoltaje() {

    alert("Vamos a calcular el Voltaje (Volt)");

    let corriente = parseFloat(prompt("Ingresá la corriente (I):"));
    let resistencia = parseFloat(prompt("Ingresá la resistencia (R):"));

    //validaciones//

    if (isNaN(corriente) || isNaN(resistencia)) {
        alert("Error: Debés ingresar números válidos.");
        return;
    }

    //calculo//

    let voltaje = corriente * resistencia;

    //validacion de resultado//

    if (voltaje < 0) {
        alert("Error: El voltaje calculado no puede ser menor que 0.");
        return;
    }

    //resultado//

    console.log(`El voltaje es ${voltaje.toFixed(2)} Volt`);
}

function calculoCorriente() {

    alert("Vamos a calcular la Corriente (Amp)");

    let voltaje = parseFloat(prompt("Ingresá el voltaje (V):"));
    let resistencia = parseFloat(prompt("Ingresá la resistencia (R):"));

    //validaciones//

    if (isNaN(voltaje) || isNaN(resistencia)) {
        alert("Error: Debés ingresar números válidos.");
        return;
    }
    if (resistencia === 0) {
        alert("Error: La resistencia no puede ser 0 (división por cero).");
        return;
    }

    //calculo//

    let corriente = voltaje / resistencia;

    //validacion de resultado//

    if (corriente <= 0) {
        alert("Error: La corriente no puede ser menor o igual a 0.");
        return;
    }

    //resultado//

    console.log(`La corriente es ${corriente.toFixed(2)} Amp`);
}

calculoOhm();




