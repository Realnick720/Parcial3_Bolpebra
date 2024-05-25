var _datosPersonas;
function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarPersona").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosPersonas.remove(elemento);
        toastr.success("La Persona'" + elemento.nombres + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function confirmarEliminar(e, elemento) {
    var url = "persona/EliminarPersona";
    var tipo = 'POST';
    var datos = { id_persona: elemento.id_persona };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}
function mostrarEliminarPersona(e, elemento) {
    var modal = '#eliminarPersona';
    $(modal).find(".modal-title").html('Eliminar Persona');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar la Persona '
        + "'" + elemento.nombres + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}
function guardarPersonaExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarPersona").modal("hide");
        if (elemento) {
            elemento.nombres= $("#txtNombres").val();
            elemento.apellidos= $("#txtApellidos").val();
            elemento.fechanacimiento= $("#txtFechaNacimiento").val();
            elemento.ci= $("#txtCI").val();
            elemento.telefono= $("#txtTelefono").val();
        } else {
            var persona = {
                id_persona: parseInt(respuesta.Data),
                nombres: $("#txtNombres").val(),
                apellidos: $("#txtApellidos").val(),
                fechanacimiento: $("#txtFechaNacimiento").val(),
                ci: $("#txtCI").val(),
                telefono: $("#txtTelefono").val(),
            };
            _datosPersonas.push(persona);
        }            
        mostrarDatosPersonas();
        toastr.success("La Persona se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function guardarPersona(id_persona, elemento) {
    var url = "persona/GuardarPersona";
    var tipo = 'POST';
    var datos = {
        id_persona: id_persona,       
        nombres: $("#txtNombres").val(),
        apellidos: $("#txtApellidos").val(),
        fechanacimiento: $("#txtFechaNacimiento").val(),
        ci: $("#txtCI").val(),
        telefono: $("#txtTelefono").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarPersonaExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}
function limpiarDatos() {
    $("#txtNombres").val("");
    $("#txtApellidos").val("");
    $("#txtFechaNacimiento").val("");
    $("#txtCI").val("");
    $("#txtTelefono").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalPersona() {
    limpiarDatos();
    var modal = '#agregarPersona';    
    $(modal).find(".modal-title").html("Adicionar Persona");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function editarDatos(elemento) {
    $("#txtNombres").val(elemento.nombres);
    $("#txtApellidos").val(elemento.apellidos);
    var fecArr = elemento.fechanacimiento.split('/');
    var fecNac = fecArr[2] + '-' + fecArr[0] + '-' + fecArr[1];    
    // 'aaaa-mm-dd'
    $("#txtFechaNacimiento").val(fecNac);
    $("#txtCI").val(elemento.ci);
    $("#txtTelefono").val(elemento.telefono);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}
function eventoActualizarPersona(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarPersona';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Persona : ' + "'" + 
            elemento.nombres + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarPersona(elemento.id_persona, elemento);
        });
    });
}
function mostrarDatosPersonas() {
    limpiarTabla('tblPersona');
    $.each(_datosPersonas, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_persona);
        fila.append(col(elemento.id_persona).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.nombres);
        eventoActualizarPersona(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.apellidos ));     
        if(elemento.fechanacimiento.includes('-'))
        {
            var fecArr = elemento.fechanacimiento.substring(0,10).split('-');
            elemento.fechanacimiento = fecArr[1] + '/' + fecArr[2] + '/' + fecArr[0];    
        }
        fila.append(col(elemento.fechanacimiento));
        fila.append(col(elemento.ci ));
        fila.append(col(elemento.telefono )); 
        fila.append(col(AccionColumna(function (e) { mostrarEliminarPersona(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblPersona tbody').append(fila);
    });
}
function getPersonasExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosPersonas = resultado.Data;
        mostrarDatosPersonas();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "persona/obtenerPersonas";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getPersonasExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalPersona(); });  
    $('#btnCancelar').click(function () { $('#agregarPersona').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarPersona(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarPersona").modal("hide"); });    
});