var _datosInscripciones;
var _datosCursos;
var _datosVehiculos;
var _datosInstuctores;
var _datosAlumnos;

function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarInscripcion").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosInscripciones.remove(elemento);
        toastr.success("La inscripcion'" + elemento.fecha + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}

function confirmarEliminar(e, elemento) {
    var url = "inscripcion/EliminarInscripcion";
    var tipo = 'POST';
    var datos = { id_inscripcion: elemento.id_inscripcion };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}

function editarDatos(elemento) {
    $("#txtFecha").val(elemento.fecha);
    $("#txtTipoCurso").val(elemento.tipocurso);
    $("#txtEstado").val(elemento.estado);
    $("#cmbCurso").val(elemento.id_curso);
    $("#cmbVehiculo").val(elemento.id_vehiculo);
    $("#cmbInstuctor").val(elemento.id_instructor);
    $("#cmbAlumno").val(elemento.id_alumno);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}

function eventoActualizarInscripcion(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarInscripcion';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Inscripcion : ' + "'" + 
            elemento.fecha + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarInscripcion(elemento.id_inscripcion, elemento);
        });
    });
}

function mostrarEliminarInscripcion(e, elemento) {
    var modal = '#eliminarInscripcion';
    $(modal).find(".modal-title").html('Eliminar Inscripcion');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar la Inscripcion '
        + "'" + elemento.fecha + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}

function guardarInscripcionExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarInscripcion").modal("hide");
        if (elemento) {
            elemento.fecha = $("#txtfecha").val();
            elemento.tipocurso = $("#txtTipoCurso").val();
            elemento.estado = $("#txtEstado").val();
            elemento.id_curso = $("#cmbCurso").val();
            elemento.curso = $("#cmbCurso option:selected").html();
            elemento.id_vehiculo = $("#cmbVehiculo").val();
            elemento.vehiculo = $("#cmbVehiculo option:selected").html();
            elemento.id_instructor = $("#cmbInstructor").val();
            elemento.instructor = $("#cmbInstructor option:selected").html();
            elemento.id_alumno = $("#cmbAlumno").val();
            elemento.alumno = $("#cmbAlumno option:selected").html();
        } else {
            var inscripcion = {
                id_inscripcion: parseInt(respuesta.Data),
                fecha: $("#txtFecha").val(),
                tipocurso: $("#txtTipoCurso").val(),
                estado: $("#txtEstado").val(),
                id_curso: $("#cmbCurso").val(),
                curso: $("#cmbCurso option:selected").html(),
                id_vehiculo: $("#cmbVehiculo").val(),
                vehiculo: $("#cmbVehiculo option:selected").html(),
                id_instructor: $("#cmbInstructor").val(),
                instructor: $("#cmbInsctructor option:selected").html(),
                id_alumno: $("#cmbAlumno").val(),
                alumno: $("#cmbAlumno option:selected").html(),
            };
            _datosInscripciones.push(inscripcion);
        }            
        mostrarDatosInscripciones();
        toastr.success("La inscripcion se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}

function guardarInscripcion(id_inscripcion, elemento) {
    var url = "inscripcion/GuardarInscripcion";
    var tipo = 'POST';
    var datos = {
        id_inscripcion: id_inscripcion,
        fecha: $("#txtFecha").val(),
        tipocurso: $("#txtTipoCurso").val(),
        estado: $("#txtEstado").val(),
        id_curso: $("#cmbCurso").val(),
        id_vehiculo: $("#cmbVehiculo").val(),
        id_instructor: $("#cmbInstructor").val(),
        id_alumno: $("#cmbAlumno").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarInscripcionExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}

function limpiarDatos() {
    $("#txtFecha").val("");
    $("#txtTipoCurso").val("");
    $("#txtEstado").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalInscripcion() {
    limpiarDatos();
    var modal = '#agregarInscripcion';    
    $(modal).find(".modal-title").html("Adicionar Inscripcion");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function mostrarDatosInscripciones() {
    limpiarTabla('tblInscripcion');
    $.each(_datosInscripciones, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_inscripcion);
        fila.append(col(elemento.id_inscripcion).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.fecha);
        eventoActualizarInscripcion(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.tipocurso ));
        fila.append(col(elemento.estado ));
        fila.append(col(elemento.curso ));
        fila.append(col(elemento.vehiculo ));
        fila.append(col(elemento.instructor ));
        fila.append(col(elemento.alumno ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarInscripcion(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblInscripcion tbody').append(fila);
    });
}

function cargarComboCursos(){
    var prop = {id: 'id_curso', value: 'nombre'};
    adicionarOpcionesCombo($("#cmbCurso"), _datosCursos, null,prop);
}

function cargarComboVehiculos(){
    var prop = {id: 'id_vehiculo', value: 'marca'};
    adicionarOpcionesCombo($("#cmbVehiculo"), _datosVehiculos, null,prop);
}

function cargarComboInstructores(){
    var prop = {id: 'id_persona', value: 'nombres'};
    adicionarOpcionesCombo($("#cmbInstructor"), _datosInstuctores, null,prop);
}

function cargarComboAlumnos(){
    var prop = {id: 'id_persona', value: 'nombres'};
    adicionarOpcionesCombo($("#cmbAlumno"), _datosAlumnos, null,prop);
}

function getInscripcionExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosInscripciones = resultado.Data.Inscripciones;
        _datosCursos = resultado.Data.Cursos;
        _datosVehiculos = resultado.Data.Vehiculos;
        _datosInstuctores = resultado.Data.Instructores;
        _datosAlumnos = resultado.Data.Alumnos;
        mostrarDatosInscripciones();    
        cargarComboCursos();    
        cargarComboVehiculos();  
        cargarComboInstructores();  
        cargarComboAlumnos();  
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "inscripcion/obtenerInscripciones";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getInscripcionExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalInscripcion(); });  
    $('#btnCancelar').click(function () { $('#agregarInscripcion').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarInscripcion(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarInscripcion").modal("hide"); });    
});