


function FacturaCompraDetalle_tabla( dom )
{
    
    document.getElementById( dom ).innerHTML 
        =  AjaxUrl( getRutaAbsoluta()+'/FacturaCompraDetalle/Transaccion/Lista');    



    var path = getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Pie.json"
    var jsonResponse = AjaxUrl( path );    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {  
        var json = JSON.parse(jsonResponse); 
        document.getElementById('fcdlt_monto_total').innerHTML = VJson( json, "montototal", "N");        
        document.getElementById('fcdlt_monto_letras').innerHTML = VJson( json, "montoletras");
        
        document.getElementById('fcdlt_gravada0').innerHTML = VJson( json, "gravada0", "N");        
        document.getElementById('fcdlt_gravada5').innerHTML = VJson( json, "gravada5", "N");        
        document.getElementById('fcdlt_gravada10').innerHTML = VJson( json, "gravada10", "N");        
        
        document.getElementById('fcdlt_iva5').innerHTML = VJson( json, "iva5", "N");        
        document.getElementById('fcdlt_iva10').innerHTML = VJson( json, "iva10", "N");        
        document.getElementById('fcdlt_total_iva').innerHTML = VJson( json, "ivatotal", "N");                
        

    }
/*
    // sumas de subtotales
    var fcdlt_monto_total = document.getElementById('fcdlt_monto_total');    
    AjaxPeticion ("../CompraDetalle/Suma/Cantidad.do", "cdtl_suma_cantidad") ;
    cdtl_suma_cantidad.innerHTML = formatoNumero(cdtl_suma_cantidad.innerHTML);    
 */   
    
    /*
    var cdtl_suma_subtotal = document.getElementById('cdtl_suma_subtotal');    
    AjaxPeticion ("../CompraDetalle/Suma/Subtotal.do", "cdtl_suma_subtotal") ;
    cdtl_suma_subtotal.innerHTML = formatoNumero(cdtl_suma_subtotal.innerHTML);    
    */


};





/*

function FacturaVenta_tabla_registro( tabla )
{
    
    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.linea_id;     
                location.href="../FacturaVenta/Registro.jspx?id="+linea_id;
                
                //location.href="../OrdenTrabajo/Registro.jspx?id="+linea_id;
                
        };       
    }
   FacturaVenta_tabla_formato(tabla);

};



function  FacturaVenta_tabla_formato ( tabla ){
    

        var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');

        for (var i=0 ; i < rows.length; i++)
        {


            cell = table.rows[i].cells[0] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML); 
           
            cell = table.rows[i].cells[2] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            

            cell = table.rows[i].cells[5] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML); 

        }
        
    
}

*/