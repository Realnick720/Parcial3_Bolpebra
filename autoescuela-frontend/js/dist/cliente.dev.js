"use strict";

var _datosClientes;

function eliminarExitoso(resultado, e, elemento) {
  $("#eliminarCliente").modal("hide");

  if (resultado.Success) {
    $(e.currentTarget).closest('tr').remove();

    _datosClientes.remove(elemento);

    toastr.success("El Cliente'" + elemento.nombres + " '   se ha eliminado satisfactoriamente");
  } else {
    toastr.error(resultado.Mensaje);
  }
}

function confirmarEliminar(e, elemento) {
  var url = "cliente/EliminarCliente";
  var tipo = 'POST';
  var datos = {
    idcliente: elemento.idcliente
  };
  var tipoDatos = 'JSON';
  solicitudAjax(url, function (response) {
    eliminarExitoso(response, e, elemento);
  }, datos, tipoDatos, tipo);
}

function mostrarEliminarCliente(e, elemento) {
  var modal = '#eliminarCliente';
  $(modal).find(".modal-title").html('Eliminar Cliente');
  $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Cliente ' + "'" + elemento.nombre + "'    ?");
  $(modal).find(".modal-body").css({
    'min-height': 100 + "px"
  });
  $(modal).modal({
    backdrop: 'static',
    keyboard: false
  });
  $(modal).modal("show");
  $("#btnConfirmarEliminar").unbind('click').click(function () {
    confirmarEliminar(e, elemento);
  });
}

function guardarClienteExitoso(respuesta, elemento) {
  if (respuesta.Success) {
    $("#agregarCliente").modal("hide");

    if (elemento) {
      elemento.ci = $("#txtCI").val();
      elemento.nombres = $("#txtNombres").val();
      elemento.apellidos = $("#txtApellidos").val();
      elemento.direccion = $("#txtDireccion").val();
      elemento.telefono = $("#txtTelefono").val();
      elemento.correo = $("#txtCorreo").val();
      elemento.fechanacimiento = $("#txtFechaNacimiento").val();
    } else {
      var tipo = {
        idcliente: parseInt(respuesta.Data),
        ci: $("#txtCI").val(),
        nombres: $("#txtNombres").val(),
        apellidos: $("#txtApellidos").val(),
        direccion: $("#txtDireccion").val(),
        telefono: $("#txtTelefono").val(),
        correo: $("#txtCorreo").val(),
        fechanacimiento: $("#txtFechaNacimiento").val()
      };

      _datosClientes.push(tipo);
    }

    mostrarDatosClientes();
    toastr.success("El Cliente se ha guardado satisfactoriamente ");
  } else {
    toastr.error(respuesta.Mensaje);
  }
}

function guardarCliente(idCliente, elemento) {
  var url = "cliente/GuardarCliente";
  var tipo = 'POST';
  var datos = {
    idcliente: idCliente,
    ci: $("#txtCI").val(),
    nombres: $("#txtNombres").val(),
    apellidos: $("#txtApellidos").val(),
    direccion: $("#txtDireccion").val(),
    telefono: $("#txtTelefono").val(),
    correo: $("#txtCorreo").val(),
    fechanacimiento: $("#txtFechaNacimiento").val()
  };
  var tipoDatos = 'JSON';
  solicitudAjax(url, function (response) {
    guardarClienteExitoso(response, elemento);
  }, datos, tipoDatos, tipo);
}

function limpiarDatos() {
  $("#txtCI").val("");
  $("#txtNombres").val("");
  $("#txtApellidos").val("");
  $("#txtDireccion").val("");
  $("#txtTelefono").val("");
  $("#txtCorreo").val("");
  $("#txtFechaNacimiento").val("");
  $("#btnEditar").hide();
  $("#btnGuardar").show();
}

function mostrarModalCliente() {
  limpiarDatos();
  var modal = '#agregarCliente';
  $(modal).find(".modal-title").html("Adicionar Cliente");
  $(modal).find(".modal-dialog").css({
    "width": 700 + "px"
  });
  $(modal).find(".modal-body").css({
    'min-height': 150 + "px"
  });
  $(modal).modal({
    backdrop: 'static',
    keyboard: false
  });
  $(modal).modal("show");
}

function editarDatos(elemento) {
  $("#txtCI").val(elemento.ci);
  $("#txtNombres").val(elemento.nombres);
  $("#txtApellidos").val(elemento.apellidos);
  $("#txtDireccion").val(elemento.direccion);
  $("#txtTelefono").val(elemento.telefono);
  $("#txtCorreo").val(elemento.correo);
  $("#txtFechaNacimiento").val(elemento.fechanacimiento);
  $("#btnEditar").show();
  $("#btnGuardar").hide();
}

function eventoActualizarCliente(input, elemento) {
  $(input).unbind('click').click(function () {
    var modal = '#agregarCliente';
    editarDatos(elemento);
    $(modal).find(".modal-title").html('Editar Cliente : ' + "'" + elemento.nombre + "'");
    $(modal).find(".modal-dialog").css({
      'width': 700 + "px"
    });
    $(modal).modal({
      backdrop: 'static',
      keyboard: false
    });
    $(modal).modal("show");
    $("#btnEditar").unbind('click').click(function (event) {
      event.preventDefault();
      guardarCliente(elemento.idcliente, elemento);
    });
  });
}

function formatDate(dateString) {
  var date = new Date(dateString);
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return "".concat(day, "/").concat(month, "/").concat(year);
}

function mostrarDatosClientes() {
  limpiarTabla('tblCliente');
  $.each(_datosClientes, function (index, elemento) {
    var fila = $('<tr>').attr('id', elemento.idcliente);
    fila.append(col(elemento.idcliente).addClass("alinearCentro")); //fila.append(col(elemento.nombre));

    var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.ci);
    eventoActualizarCliente(input, elemento);
    fila.append(col(input));
    fila.append(col(elemento.nombres));
    fila.append(col(elemento.apellidos));
    fila.append(col(elemento.direccion));
    fila.append(col(elemento.telefono));
    fila.append(col(elemento.correo));
    fila.append(col(formatDate(elemento.fechanacimiento)));
    fila.append(col(AccionColumna(function (e) {
      mostrarEliminarCliente(e, elemento);
    }, 'trash', 'Eliminar')).addClass("alinearCentro"));
    $('#tblCliente tbody').append(fila);
  });
}

function getClienteExitoso(resultado) {
  if (resultado.Success) {
    toastr.success("Cargado Exitoso");
    _datosClientes = resultado.Data;
    mostrarDatosClientes();
  } else {
    toastr.error(resultado.Mensaje);
  }
}

function init() {
  var url = "cliente/obtenerClientes";
  var tipo = 'GET';
  var datos = {};
  var tipoDatos = 'JSON';
  solicitudAjax(url, getClienteExitoso, datos, tipoDatos, tipo);
}

$(document).ready(function () {
  init();
  $('#btnAdicionar').click(function () {
    mostrarModalCliente();
  });
  $('#btnCancelar').click(function () {
    $('#agregarCliente').modal("hide");
  });
  $("#btnGuardar").click(function () {
    guardarCliente(0);
  });
  $('#btnCancelarEliminar').click(function () {
    $("#eliminarCliente").modal("hide");
  });
});
//# sourceMappingURL=cliente.dev.js.map
