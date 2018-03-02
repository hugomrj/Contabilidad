
var id = 0;
id = getParametroValor("id");    

window.onload = function() {
    
    AjaxPeticion('../MenuPrincipal','nav');   
    
    document.getElementById("form_body").innerHTML 
            =  AjaxUrl('../FacturaVenta/jspf/form.jspx');
    
    FacturaVenta_form_registro(id);
    
    var facturanro = document.getElementById('facvenf_numero_factura').value;
    document.getElementById("tabla_factura_venta_detalle").innerHTML 
            =  AjaxUrl('../FacturaVentaDetalle/Coleccion/Listar?factura='+facturanro);    
    
    FacturaVentaDetalles_tabla_formato("fvdlt_transaccion_tabla");    
    Factura_pie( "../FacturaVenta/Linea.json?id="+id );
    
    



    var fvb_aceptar = document.getElementById('fvb_aceptar');
    fvb_aceptar.addEventListener('click',
        function(event) {
            
                var form = document.getElementById("facvenf_form");                        
                var accion =  "../FacturaVenta/Controlador/Borrar" ;             

                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK"){                       
                    window.location = "../FacturaVenta/Lista.jspx";
                }
                else
                {    
                    alerta_error(control);
                }
        },
        false
    );    
    
    
    
    

    var fvb_cancelar = document.getElementById('fvb_cancelar');
    fvb_cancelar.addEventListener('click',
        function(event) {
            location.href="../FacturaVenta/Registro.jspx?id="+id;
        },
        false
    );    







};



window.onresize = function() {    
    var nodeList = document.querySelectorAll('.fondo_oscuro');    
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }
}





