var _datosCursos;

function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarCurso").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosCursos.remove(elemento);
        toastr.success("El Curso'" + elemento.nombre + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function confirmarEliminar(e, elemento) {
    var url = "curso/EliminarCurso";
    var tipo = 'POST';
    var datos = { id_curso: elemento.id_curso };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}
function mostrarEliminarCurso(e, elemento) {
    var modal = '#eliminarCurso';
    $(modal).find(".modal-title").html('Eliminar Curso');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Curso '
        + "'" + elemento.nombre + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}
function guardarCursoExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarCurso").modal("hide");
        if (elemento) {
            elemento.nombre = $("#txtNombre").val();
            elemento.descripcion = $("#txtDescripcion").val();
            elemento.costo = $("#txtCosto").val();
            elemento.duracionhoras = $("#txtDuracionHoras").val();
        } else {
            var curso = {
                id_curso: parseInt(respuesta.Data),
                nombre: $("#txtNombre").val(),
                descripcion: $("#txtDescripcion").val(),
                costo: $("#txtCosto").val(),
                duracionhoras: $("#txtDuracionHoras").val(),
            };
            _datosCursos.push(curso);
        }            
        mostrarDatosCursos();
        toastr.success("El Curso se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function guardarCurso(id_curso, elemento) {
    var url = "curso/GuardarCurso";
    var tipo = 'POST';
    var datos = {
        id_curso: id_curso,
        nombre: $("#txtNombre").val(),
        descripcion: $("#txtDescripcion").val(),
        costo: $("#txtCosto").val(),
        duracionhoras: $("#txtDuracionHoras").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarCursoExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}
function limpiarDatos() {
    $("#txtNombre").val("");
    $("#txtDescripcion").val("");
    $("#txtCosto").val("");
    $("#txtDuracionHoras").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalCurso() {
    limpiarDatos();
    var modal = '#agregarCurso';    
    $(modal).find(".modal-title").html("Adicionar Curso");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function editarDatos(elemento) {
    $("#txtNombre").val(elemento.nombre);
    $("#txtDescripcion").val(elemento.descripcion);
    $("#txtCosto").val(elemento.costo);
    $("#txtDuracionHoras").val(elemento.duracionhoras);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}
function eventoActualizarCurso(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarCurso';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Curso : ' + "'" + 
            elemento.nombre + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarCurso(elemento.id_curso, elemento);
        });
    });
}
function mostrarDatosCursos() {
    limpiarTabla('tblCurso');
    $.each(_datosCursos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_curso);
        fila.append(col(elemento.id_curso).addClass("alinearCentro"));
        //fila.append(col(elemento.nombre));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.nombre);
        eventoActualizarCurso(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.descripcion ));
        fila.append(col(elemento.costo ));
        fila.append(col(elemento.duracionhoras ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarCurso(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblCurso tbody').append(fila);
    });
}
function getCursosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosCursos = resultado.Data;
        mostrarDatosCursos();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "curso/obtenerCursos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getCursosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalCurso(); });  
    $('#btnCancelar').click(function () { $('#agregarCurso').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarCurso(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarCurso").modal("hide"); });    
});