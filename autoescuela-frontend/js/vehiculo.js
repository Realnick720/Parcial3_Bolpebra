var _datosVehiculos;
var _datosTipos;

function eliminarExitoso(resultado, e, elemento) {
    $("#eliminarVehiculo").modal("hide");
    if (resultado.Success) {
        $(e.currentTarget).closest('tr').remove();
        _datosVehiculos.remove(elemento);
        toastr.success("El Vehiculo'" + elemento.marca + 
            " '   se ha eliminado satisfactoriamente");
    } else {
        toastr.error(resultado.Mensaje);
    }
}

function confirmarEliminar(e, elemento) {
    var url = "vehiculo/EliminarVehiculo";
    var tipo = 'POST';
    var datos = { id_vehiculo: elemento.id_vehiculo };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { eliminarExitoso(response, e, elemento); }
    , datos, tipoDatos, tipo);
}

function editarDatos(elemento) {
    $("#txtMarca").val(elemento.marca);
    $("#txtModelo").val(elemento.modelo);
    $("#txtColor").val(elemento.color);
    $("#txtPlaca").val(elemento.placa);
    $("#txtAnio").val(elemento.anio);
    $("#txtTransmision").val(elemento.transmision);
    $("#cmbTipo").val(elemento.id_tipovehiculo);
    $("#btnEditar").show();
    $("#btnGuardar").hide();
}

function eventoActualizarVehiculo(input, elemento) {
    $(input).unbind('click').click(function () {
        var modal = '#agregarVehiculo';
        editarDatos(elemento);
        $(modal).find(".modal-title").html('Editar Vehiculo : ' + "'" + 
            elemento.marca + "'");
        $(modal).find(".modal-dialog").css({ 'width': 700 + "px" });
        $(modal).modal({ backdrop: 'static', keyboard: false });
        $(modal).modal("show");
        $("#btnEditar").unbind('click').click(function (event) {
            event.preventDefault();
            guardarVehiculo(elemento.id_vehiculo, elemento);
        });
    });
}

function mostrarEliminarVehiculo(e, elemento) {
    var modal = '#eliminarVehiculo';
    $(modal).find(".modal-title").html('Eliminar Vehiculo');
    $(modal).find(".text-mensaje-modal").html('Esta seguro que desea eliminar el Vehiculo '
        + "'" + elemento.marca + "'    ?");
    $(modal).find(".modal-body").css({ 'min-height': 100 + "px" });    
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
    $("#btnConfirmarEliminar").unbind('click').click(function () {
        confirmarEliminar(e, elemento);
    });    
}

function guardarVehiculoExitoso(respuesta, elemento) {
    if (respuesta.Success) {
        $("#agregarVehiculo").modal("hide");
        if (elemento) {
            elemento.marca = $("#txtMarca").val();
            elemento.modelo = $("#txtModelo").val();
            elemento.color = $("#txtColor").val();
            elemento.placa = $("#txtPlaca").val();
            elemento.anio = $("#txtAnio").val();
            elemento.id_tipovehiculo = $("#cmbTipo").val();
            elemento.tipo = $("#cmbTipo option:selected").html();
        } else {
            var vehiculo = {
                id_vehiculo: parseInt(respuesta.Data),
                marca: $("#txtMarca").val(),
                modelo: $("#txtModelo").val(),
                color: $("#txtColor").val(),
                placa: $("#txtPlaca").val(),
                anio: $("#txtAnio").val(),
                transmision: $("#txtTransmision").val(),
                id_tipovehiculo: $("#cmbTipo").val(),
                tipo: $("#cmbTipo option:selected").html()
            };
            _datosVehiculos.push(vehiculo);
        }            
        mostrarDatosVehiculos();
        toastr.success("El Vehiculo se ha guardado satisfactoriamente ");
    } else {
        toastr.error(respuesta.Mensaje);
    }    
}

function guardarVehiculo(id_vehiculo, elemento) {
    var url = "vehiculo/GuardarVehiculo";
    var tipo = 'POST';
    var datos = {
        id_vehiculo: id_vehiculo,
        marca: $("#txtMarca").val(),
        modelo: $("#txtModelo").val(),
        color: $("#txtColor").val(),
        placa: $("#txtPlaca").val(),
        anio: $("#txtAnio").val(),
        transmision: $("#txtTransmision").val(),
        id_tipovehiculo: $("#cmbTipo").val(),
    };
    var tipoDatos = 'JSON';
    solicitudAjax(url, function (response) { guardarVehiculoExitoso(response, elemento); }
        , datos, tipoDatos, tipo);
}

function limpiarDatos() {
    $("#txtMarca").val("");
    $("#txtModelo").val("");
    $("#txtColor").val("");
    $("#txtPlaca").val("");
    $("#txtAnio").val("");
    $("#txtTransmision").val("");
    $("#cmbTipo").val("");
    $("#btnEditar").hide();
    $("#btnGuardar").show();
}
function mostrarModalVehiculo() {
    limpiarDatos();
    var modal = '#agregarVehiculo';    
    $(modal).find(".modal-title").html("Adicionar Vehiculo");
    $(modal).find(".modal-dialog").css({ "width": 700 + "px" });
    $(modal).find(".modal-body").css({ 'min-height': 150 + "px" });
    $(modal).modal({ backdrop: 'static', keyboard: false });
    $(modal).modal("show");
}
function mostrarDatosVehiculos() {
    limpiarTabla('tblVehiculo');
    $.each(_datosVehiculos, function (index, elemento) {
        var fila = $('<tr>').attr('id', elemento.id_vehiculo);
        fila.append(col(elemento.id_vehiculo).addClass("alinearCentro"));
        var input = crearSpan("lblEdit" + index, "spanHyperLink", elemento.marca);
        eventoActualizarVehiculo(input, elemento);
        fila.append(col(input));
        fila.append(col(elemento.modelo ));
        fila.append(col(elemento.color ));
        fila.append(col(elemento.placa ));
        fila.append(col(elemento.anio ));
        fila.append(col(elemento.transmision ));
        fila.append(col(elemento.tipo ));
        fila.append(col(AccionColumna(function (e) { mostrarEliminarVehiculo(e, elemento) }
            , 'trash', 'Eliminar')).addClass("alinearCentro"));
        $('#tblVehiculo tbody').append(fila);
    });
}

function cargarComboTipos(){
    var prop = {id: 'id_tipovehiculo', value: 'descripcion'};
    adicionarOpcionesCombo($("#cmbTipo"), _datosTipos, null,prop);
}

function getVehiculosExitoso(resultado) {
    if (resultado.Success) {
        toastr.success("Cargado Exitoso");
        _datosVehiculos = resultado.Data.Vehiculos;
        _datosTipos = resultado.Data.Tipos;
        mostrarDatosVehiculos();    
        cargarComboTipos();    
    } else {
        toastr.error(resultado.Mensaje);
    }
}
function init() {
    var url = "vehiculo/obtenerVehiculos";
    var tipo = 'GET';
    var datos = {};
    var tipoDatos = 'JSON';
    solicitudAjax(url, getVehiculosExitoso, datos, tipoDatos, tipo);
}
$(document).ready(function () {
    init();  
    $('#btnAdicionar').click(function () { mostrarModalVehiculo(); });  
    $('#btnCancelar').click(function () { $('#agregarVehiculo').modal("hide"); });  
    $("#btnGuardar").click(function () { guardarVehiculo(0); });
    $('#btnCancelarEliminar').click(function () { $("#eliminarVehiculo").modal("hide"); });    
});