
function FacturaVenta_form( )
{
    
    var facvenf_buscar_ordentrabajo = document.getElementById( 'facvenf_buscar_ordentrabajo');
    facvenf_buscar_ordentrabajo.addEventListener('click',
        function()
        {   
            
            VentanaModalBusqueda('3',  '../OrdenTrabajo/jspf/busqueda.jspx', 
                                "OrdenTrabajo", 
                                "facvenf_orden_trabajo" , 
                                "ordentra_tabla", 
                                850 );                  
                                
        },
        false
    );    




    var facvenf_orden_trabajo = document.getElementById( 'facvenf_orden_trabajo');
        facvenf_orden_trabajo.onblur  = function() {        
            
            facvenf_orden_trabajo.value  = fmtNum(facvenf_orden_trabajo.value);    
            OrdenTrabajo_factura_orden(this.value);
    };     

    
    facvenf_orden_trabajo.focus();
    facvenf_orden_trabajo.select();
    

};




function OrdenTrabajo_Orden_Json(id)
{
           
            
    var path = "../OrdenTrabajo/Orden.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
   
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);    

        document.getElementById('facvenf_orden_trabajo').value = VJson( json, "orden_trabajo","N");        
        document.getElementById('facvenf_cliente').value = VJson( json, "cliente","N");
        document.getElementById('facvenf_cliente_ou').value = VJson( json, "cliente","N");
        document.getElementById('facvenf_ClienteDescripcion').value = VJson( json, "nombre") + " " + VJson( json, "apellido");                
        document.getElementById('facvenf_factura').value = VJson( json, "factura" ,"N") ;        
        document.getElementById('facvenf_Ruc').value = VJson( json, "ruc" ) ;        
        document.getElementById('facvenf_Tel').value = VJson( json, "tel" ) ;        
        document.getElementById('facvenf_Direccion').value = VJson( json, "direccion" ) ;        
        
    }  
    else    
    {
        
        document.getElementById('facvenf_cliente').value ="0";
        document.getElementById('facvenf_cliente_ou').value ="0";
        document.getElementById('facvenf_ClienteDescripcion').value = "";                  
        document.getElementById('facvenf_factura').value = "0";         
        document.getElementById('facvenf_Ruc').value = "";
        document.getElementById('facvenf_Tel').value = "";     
        document.getElementById('facvenf_Direccion').value = "";        
    }  
    
    
}    


function Factura_pie(path)
{

            
    //var path = "../OrdenTrabajoDetalle/FacturaPie.json?orden="+id 
    var jsonResponse = AjaxUrl( path );    
   
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);    

        document.getElementById('fvdlt_gravada0').innerHTML = fmtNum( VJson( json, "gravada0","N"));        
        document.getElementById('fvdlt_gravada5').innerHTML = fmtNum( VJson( json, "gravada5","N"));
        document.getElementById('fvdlt_gravada10').innerHTML = fmtNum( VJson( json, "gravada10","N"));        
        document.getElementById('fvdlt_monto_total').innerHTML = fmtNum( VJson( json, "monto_total","N"));
        
        document.getElementById('fvdlt_iva5').innerHTML = fmtNum( VJson( json, "iva5","N") );
        document.getElementById('fvdlt_iva10').innerHTML = fmtNum(VJson( json, "iva10","N"));
        document.getElementById('fvdlt_total_iva').innerHTML = fmtNum(VJson( json, "total_iva","N"));

        
        document.getElementById('fvdlt_numeroletras').innerHTML 
                = AjaxUrl('../NumeroaLetras.do?numero=' 
                + VJson( json, "monto_total","N") );
        

        
    }  
    else    
    {

        document.getElementById('fvdlt_gravada0').innerHTML = "";        
        document.getElementById('fvdlt_gravada5').innerHTML = "";
        document.getElementById('fvdlt_gravada10').innerHTML = "";        
        document.getElementById('fvdlt_monto_total').innerHTML = ""; 
        
        document.getElementById('fvdlt_iva5').innerHTML = ""; 
        document.getElementById('fvdlt_iva10').innerHTML = ""; 
        document.getElementById('fvdlt_total_iva').innerHTML = ""; 
        
        document.getElementById('fvdlt_numeroletras').innerHTML = "";
        
        
    }  
    
    //document.getElementById('fvdlt_numeroletras').style = "font-weight: 100;";
    
// "width: 20rem;font-weight: 100;" 
                                
        
    
}    



    
function OrdenTrabajo_factura_orden(numero_orden)
{
            
        numero_orden = numero_orden.replace(new RegExp(",","g") ,"") ;

        OrdenTrabajo_Orden_Json( numero_orden );
        
        AjaxPeticion('../FacturaVentaDetalle/Transaccion/Listar?orden='+numero_orden
            ,'tabla_factura_venta_detalle');   
            
        FacturaVentaDetalles_tabla_formato("fvdlt_transaccion_tabla");
        
        
        
        Factura_pie( "../OrdenTrabajoDetalle/FacturaPie.json?orden="+numero_orden );
       
        
}    
    
    
    
    
    
    

function FacturaVenta_form_registro( id)
{   
    document.getElementById('facvenf_buscar_ordentrabajo').style.display = 'none';
    //facvenf_buscar_ordentrabajo
    
    document.getElementById('opt_CO').checked = false;
    document.getElementById('opt_CO').disabled = true;
    
    document.getElementById('opt_CR').checked = false;
    document.getElementById('opt_CR').disabled = true;
    
    
    document.getElementById('facvenf_orden_trabajo').disabled = true;
    document.getElementById('facvenf_fecha').disabled = true;
    
    
    FacturaVenta_Cabecera_Json(id)
    

};




function FacturaVenta_Cabecera_Json(id)
{
                      
            
    var path = "../FacturaVenta/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
   
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);    

        document.getElementById('facvenf_orden_trabajo').value = VJson( json, "orden_trabajo","N");    
        document.getElementById('facvenf_numero_factura').value = VJson( json, "numero_factura","N");    
        
        
        document.getElementById('facvenf_cliente').value = VJson( json, "cliente","N");
        document.getElementById('facvenf_cliente_ou').value = VJson( json, "cliente","N");
        document.getElementById('facvenf_ClienteDescripcion').value = VJson( json, "nombre") + " " + VJson( json, "apellido");                
        document.getElementById('facvenf_factura').value = VJson( json, "factura" ,"N") ;        
        document.getElementById('facvenf_Ruc').value = VJson( json, "ruc" ) ;        
        document.getElementById('facvenf_Tel').value = VJson( json, "tel" ) ;        
        document.getElementById('facvenf_Direccion').value = VJson( json, "direccion" ) ;        
        
        
        document.getElementById('opt_CO').checked = false;
        document.getElementById('opt_CR').checked = false;
        
        var forma_pago =  VJson( json, "forma_pago" ) ;       
        
        if (forma_pago.toString().trim() == "CO"){
            document.getElementById('opt_CO').checked = true;
        }
        
        if (forma_pago.toString().trim() == "CR"){
            document.getElementById('opt_CR').checked = true;
        }
        
        
        document.getElementById('facvenf_fecha').type = 'TEXT';
        document.getElementById('facvenf_fecha').value = VJson( json, "fecha_factura","D");        
        
        
        
    }  
    else    
    {
        
        document.getElementById('facvenf_cliente').value ="0";
        document.getElementById('facvenf_numero_factura').value ="0";    
        document.getElementById('facvenf_cliente_ou').value ="0";
        document.getElementById('facvenf_ClienteDescripcion').value = "";                  
        document.getElementById('facvenf_factura').value = "0";         
        document.getElementById('facvenf_Ruc').value = "";
        document.getElementById('facvenf_Tel').value = "";     
        document.getElementById('facvenf_Direccion').value = "";        
        
        document.getElementById('fecha_factura').type = 'TEXT';
        document.getElementById('fecha_factura').value = "";              
        
    }  
    
    
}    





//FacturaVentaDetalles_tabla_formato("fvdlt_transaccion_tabla");

function  FacturaVentaDetalles_tabla_formato ( tabla ){
    

        var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');

        for (var i=0 ; i < rows.length; i++)
        {

            cell = table.rows[i].cells[0] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML); 
           
            cell = table.rows[i].cells[2] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            

            cell = table.rows[i].cells[3] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            
            
            cell = table.rows[i].cells[4] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            

            cell = table.rows[i].cells[5] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML); 

        }
        
    
}

