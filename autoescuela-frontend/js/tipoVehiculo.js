var _datosTiposVehiculos;
function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarTipoVehiculo").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosTiposVehiculos.remove(elemento);
        toastr.success("El Tipo de Vehiculo'" + elemento.descripcion + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function confirmarEliminar(e, elemento) {
    var url = "tipoVehiculo/EliminarTipoVehiculo";
    var tipo = 'POST';
    var datos = { id_tipovehiculo: elemento.id_tipovehiculo };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}
function mostrarEliminarTipoVehiculo(e, elemento) {
    var modal = '#eliminarTipoVehiculo';
    $(modal).find(".modal-title").html('Eliminar Tipo Vehiculo');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Tipo de Vehiculo '
        + "'" + elemento.descripcion + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}
function guardarTipoVehiculoExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarTipoVehiculo").modal("hide");
        if (elemento) {
            elemento.descripcion = $("#txtDescripcion").val();
            elemento.capacidad = $("#txtCapacidad").val();
        } else {
            var tipo = {
                id_tipovehiculo: parseInt(respuesta.Data),
                descripcion: $("#txtDescripcion").val(),
                capacidad: $("#txtCapacidad").val(),
            };
            _datosTiposVehiculos.push(tipo);
        }            
        mostrarDatosTiposVehiculos();
        toastr.success("El Tipo de Vehiculo se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}
function guardarTipoVehiculo(id_tipovehiculo, elemento) {
    var url = "tipoVehiculo/GuardarTipoVehiculo";
    var tipo = 'POST';
    var datos = {
        id_tipovehiculo: id_tipovehiculo,
        descripcion: $("#txtDescripcion").val(),
        capacidad: $("#txtCapacidad").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarTipoVehiculoExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}
function limpiarDatos() {
    $("#txtDescripcion").val("");
    $("#txtCapacidad").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalTipoVehiculo() {
    limpiarDatos();
    var modal = '#agregarTipoVehiculo';    
    $(modal).find(".modal-title").html("Adicionar Tipo Vehiculo");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function editarDatos(elemento) {
    $("#txtDescripcion").val(elemento.descripcion);
    $("#txtCapacidad").val(elemento.capacidad);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}
function eventoActualizarTipoVehiculo(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarTipoVehiculo';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Tipo Vehiculo : ' + "'" + 
            elemento.descripcion + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarTipoVehiculo(elemento.id_tipovehiculo, elemento);
        });
    });
}
function mostrarDatosTiposVehiculos() {
    limpiarTabla('tblTipoVehiculo');
    $.each(_datosTiposVehiculos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_tipovehiculo);
        fila.append(col(elemento.id_tipovehiculo).addClass("alinearCentro"));
        //fila.append(col(elemento.nombre));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.descripcion);
        eventoActualizarTipoVehiculo(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.capacidad ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarTipoVehiculo(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblTipoVehiculo tbody').append(fila);
    });
}
function getTiposVehiculosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosTiposVehiculos = resultado.Data;
        mostrarDatosTiposVehiculos();        
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "tipoVehiculo/obtenerTiposVehiculos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getTiposVehiculosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalTipoVehiculo(); });  
    $('#btnCancelar').click(function () { $('#agregarTipoVehiculo').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarTipoVehiculo(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarTipoVehiculo").modal("hide"); });    
});