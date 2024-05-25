"use strict";

var _datosLibros;

function eliminarExitoso(resultado, e, elemento) {
  $("#eliminarLibro").modal("hide");

  if (resultado.Success) {
    $(e.currentTarget).closest('tr').remove();

    _datosLibros.remove(elemento);

    toastr.success("El Libro'" + elemento.titulo + " '   se ha eliminado satisfactoriamente");
  } else {
    toastr.error(resultado.Mensaje);
  }
}

function confirmarEliminar(e, elemento) {
  var url = "/EliminarLibro";
  var tipo = 'POST';
  var datos = {
    id: elemento.id
  };
  var tipoDatos = 'JSON';
  solicitudAjax(url, function (response) {
    eliminarExitoso(response, e, elemento);
  }, datos, tipoDatos, tipo);
}

function mostrarEliminarLibro(e, elemento) {
  var modal = '#eliminarLibro';
  $(modal).find(".modal-title").html('Eliminar Libro');
  $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Libro ' + "'" + elemento.titulo + "'    ?");
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

function guardarLibroExitoso(respuesta, elemento) {
  if (respuesta.Success) {
    $("#agregarLibro").modal("hide");

    if (elemento) {
      elemento.titulo = $("#txtTitulo").val();
      elemento.autor = $("#txtAutor").val();
      elemento.isbn = $("#txtIsbn").val();
      elemento.idioma = $("#txtIdioma").val();
      elemento.fechapublicacion = $("#txtFechaPublicacion").val();
      elemento.cantpaginas = $("#txtCantPaginas").val();
    } else {
      var libro = {
        id: parseInt(respuesta.Data),
        titulo: $("#txtTitulo").val(),
        autor: $("#txtAutor").val(),
        isbn: $("#txtIsbn").val(),
        idioma: $("#txtIdioma").val(),
        fechapublicacion: $("#txtFechaPublicacion").val(),
        cantpaginas: $("#txtCantPaginas").val()
      };

      _datosLibros.push(libro);
    }

    mostrarDatosLibros();
    toastr.success("El Libro se ha guardado satisfactoriamente ");
  } else {
    toastr.error(respuesta.Mensaje);
  }
}

function guardarLibro(id, elemento) {
  var url = "/GuardarLibro";
  var tipo = 'POST';
  var datos = {
    id: id,
    titulo: $("#txtTitulo").val(),
    autor: $("#txtAutor").val(),
    isbn: $("#txtIsbn").val(),
    idioma: $("#txtIdioma").val(),
    fechapublicacion: $("#txtFechaPublicacion").val(),
    cantpaginas: $("#txtCantPaginas").val()
  };
  var tipoDatos = 'JSON';
  solicitudAjax(url, function (response) {
    guardarLibroExitoso(response, elemento);
  }, datos, tipoDatos, tipo);
}

function limpiarDatos() {
  $("#txtTitulo").val("");
  $("#txtAutor").val("");
  $("#txtIsbn").val("");
  $("#txtIdioma").val("");
  $("#txtFechaPublicacion").val("");
  $("#txtCantPaginas").val("");
  $("#btnEditar").hide();
  $("#btnGuardar").show();
}

function mostrarModalLibro() {
  limpiarDatos();
  var modal = '#agregarLibro';
  $(modal).find(".modal-title").html("Adicionar Libro");
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
  $("#txtTitulo").val(elemento.titulo);
  $("#txtAutor").val(elemento.autor);
  $("#txtIsbn").val(elemento.isbn);
  $("#txtIdioma").val(elemento.idioma);
  $("#txtFechaPublicacion").val(elemento.fechapublicacion);
  $("#txtCantPaginas").val(elemento.cantpaginas);
  $("#btnEditar").show();
  $("#btnGuardar").hide();
}

function eventoActualizarLibro(input, elemento) {
  $(input).unbind('click').click(function () {
    var modal = '#agregarLibro';
    editarDatos(elemento);
    $(modal).find(".modal-title").html('Editar Libro : ' + "'" + elemento.titulo + "'");
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
      guardarLibro(elemento.id, elemento);
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

function mostrarDatosLibros() {
  limpiarTabla('tblLibro');
  $.each(_datosLibros, function (index, elemento) {
    var fila = $('<tr>').attr('id', elemento.id);
    fila.append(col(elemento.id).addClass("alinearCentro")); //fila.append(col(elemento.nombre));

    var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.titulo);
    eventoActualizarLibro(input, elemento);
    fila.append(col(input));
    fila.append(col(elemento.autor));
    fila.append(col(elemento.isbn));
    fila.append(col(elemento.idioma));
    fila.append(col(formatDate(elemento.fechapublicacion)));
    fila.append(col(elemento.cantpaginas));
    fila.append(col(AccionColumna(function (e) {
      mostrarEliminarLibro(e, elemento);
    }, 'trash', 'Eliminar')).addClass("alinearCentro"));
    $('#tblLibro tbody').append(fila);
  });
}

function getLibrosExitoso(resultado) {
  if (resultado.Success) {
    toastr.success("Cargado Exitoso");
    _datosLibros = resultado.Data;
    mostrarDatosLibros();
  } else {
    toastr.error(resultado.Mensaje);
  }
}

function init() {
  var url = "/obtenerLibros";
  var tipo = 'GET';
  var datos = {};
  var tipoDatos = 'JSON';
  solicitudAjax(url, getLibrosExitoso, datos, tipoDatos, tipo);
}

$(document).ready(function () {
  init();
  $('#btnAdicionar').click(function () {
    mostrarModalLibro();
  });
  $('#btnCancelar').click(function () {
    $('#agregarLibro').modal("hide");
  });
  $("#btnGuardar").click(function () {
    guardarLibro(0);
  });
  $('#btnCancelarEliminar').click(function () {
    $("#eliminarLibro").modal("hide");
  });
});
//# sourceMappingURL=libro.dev.js.map
