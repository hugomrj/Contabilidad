
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
    
    
    
    
    var fvr_nuevo = document.getElementById('fvr_nuevo');
    fvr_nuevo.addEventListener('click',
        function(event) {
            location.href="../FacturaVenta/Nuevo.jspx";
        },
        false
    );    

    
    
    var fvr_eliminar = document.getElementById('fvr_eliminar');
    fvr_eliminar.addEventListener('click',
        function(event) {            
            location.href="../FacturaVenta/Borrar.jspx?id="+id;
        },
        false
    );    
    
    
    
    

    var fvr_listar = document.getElementById('fvr_listar');
    fvr_listar.addEventListener('click',
        function(event) {
            location.href="../FacturaVenta/Lista.jspx";
        },
        false
    );    







    var fvr_reporte = document.getElementById('fvr_reporte');
    fvr_reporte.addEventListener('click',
        function(event) {
                        
                 window.open(
                  "../FacturaVenta/Reporte?codigo="+id+"&mtotal=" 
                    +qcoma(document.getElementById('fvdlt_monto_total').innerHTML),
                  "_blank" );
        
            
            
            
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





