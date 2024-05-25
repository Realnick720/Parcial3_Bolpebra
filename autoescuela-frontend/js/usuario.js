var _datosUsuarios;
var _datosPersonas;

function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarUsuario").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosUsuarios.remove(elemento);
        toastr.success("El Usuario'" + elemento.usuario + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}

function confirmarEliminar(e, elemento) {
    var url = "usuario/EliminarUsuario";
    var tipo = 'POST';
    var datos = { id_usuario: elemento.id_usuario };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}

function editarDatos(elemento) {
    $("#txtUsuario").val(elemento.usuario);
    $("#txtContrasena").val(elemento.contrasena);
    $("#cmbPersona").val(elemento.id_persona);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}

function eventoActualizarUsuario(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarUsuario';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Usuario : ' + "'" + 
            elemento.usuario + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarUsuario(elemento.id_usuario, elemento);
        });
    });
}

function mostrarEliminarUsuario(e, elemento) {
    var modal = '#eliminarUsuario';
    $(modal).find(".modal-title").html('Eliminar Usuario');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Usuario '
        + "'" + elemento.usuario + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}

function guardarUsuarioExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarUsuario").modal("hide");
        if (elemento) {
            elemento.usuario = $("#txtUsuario").val();
            elemento.contrasena = $("#txtContrasena").val();
            elemento.id_persona = $("#cmbPersona").val();
            elemento.persona = $("#cmbPersona option:selected").html();
        } else {
            var usuario = {
                id_usuario: parseInt(respuesta.Data),
                usuario: $("#txtUsuario").val(),
                contrasena: $("#txtContrasena").val(),
                id_persona: $("#cmbPersona").val(),
                persona: $("#cmbPersona option:selected").html()
            };
            _datosUsuarios.push(usuario);
        }            
        mostrarDatosUsuarios();
        toastr.success("El Usuario se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}

function guardarUsuario(id_usuario, elemento) {
    var url = "usuario/GuardarUsuario";
    var tipo = 'POST';
    var datos = {
        id_usuario: id_usuario,
        usuario: $("#txtUsuario").val(),
        contrasena: $("#txtContrasena").val(),
        id_persona: $("#cmbPersona").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarUsuarioExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}

function limpiarDatos() {
    $("#txtUsuario").val("");
    $("#txtContrasena").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalUsuario() {
    limpiarDatos();
    var modal = '#agregarUsuario';    
    $(modal).find(".modal-title").html("Adicionar Usuario");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function mostrarDatosUsuarios() {
    limpiarTabla('tblUsuario');
    $.each(_datosUsuarios, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_usuario);
        fila.append(col(elemento.id_usuario).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.usuario);
        eventoActualizarUsuario(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.contrasena ));
        fila.append(col(elemento.persona ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarUsuario(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblUsuario tbody').append(fila);
    });
}

function cargarComboPersonas(){
    var prop = {id: 'id_persona', value: 'nombres'};
    adicionarOpcionesCombo($("#cmbPersona"), _datosPersonas, null,prop);
}

function getUsuariosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosUsuarios = resultado.Data.Usuarios;
        _datosPersonas = resultado.Data.Personas;
        mostrarDatosUsuarios();    
        cargarComboPersonas();    
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "usuario/obtenerUsuarios";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getUsuariosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalUsuario(); });  
    $('#btnCancelar').click(function () { $('#agregarUsuario').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarUsuario(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarUsuario").modal("hide"); });    
});