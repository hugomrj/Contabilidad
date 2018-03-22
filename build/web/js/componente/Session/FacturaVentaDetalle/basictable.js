


function FacturaVentaDetalle_tabla( dom )
{
    
    document.getElementById( dom ).innerHTML 
        =  AjaxUrl( getRutaAbsoluta()+'/FacturaVentaDetalle/Transaccion/Lista');    

    var path = getRutaAbsoluta()+"/FacturaVentaDetalle/Transaccion/Pie.json"
    FacturaVentaDetalle_pie_json( path );
    
    FacturaVentaDetalle_tabla_registro("ventadetalle_transaccion_tabla");

};






function FacturaVentaDetalle_pie_json( path )
{

    var jsonResponse = AjaxUrl( path );    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {  
        var json = JSON.parse(jsonResponse); 
        document.getElementById('fvdlt_monto_total').innerHTML = VJson( json, "montototal", "N");        
        
        
        document.getElementById('fvdlt_gravada0').innerHTML = VJson( json, "gravada0", "N");        
        document.getElementById('fvdlt_gravada5').innerHTML = VJson( json, "gravada5", "N");        
        document.getElementById('fvdlt_gravada10').innerHTML = VJson( json, "gravada10", "N");        
        
        document.getElementById('fvdlt_iva5').innerHTML = VJson( json, "iva5", "N");        
        document.getElementById('fvdlt_iva10').innerHTML = VJson( json, "iva10", "N");        
        document.getElementById('fvdlt_total_iva').innerHTML = VJson( json, "total_iva", "N");                
       
       document.getElementById('fvdlt_monto_letras').innerHTML = getJson(1, json, "montoletras");

    }

}






function FacturaVentaDetalle_tabla_registro( tabla )
{
    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.orden;                     
                var id_transaccion = this.dataset.id_transaccion;     
                
                VentaDetalle_modal_EditarBorrar( id_transaccion );
        };       
    }
};



function FacturaVentaDetalle_tabla_registro_consulta( tabla )
{
    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.orden;     
                VentaDetalle_modal_Consulta(linea_id);
                FacturaVentaDetalle_form_disabled();
                FacturaVentaDetalle_registro_formato();
                
        };       
    }
};








function  FacturaVentaDetalle_table_formato (  ){
        
        var tabla = "ventadetalle_transaccion_tabla";

        var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
        var rows = table.getElementsByTagName('tr');

        for (var i=0 ; i < rows.length; i++)
        {
          
            cell = table.rows[i].cells[2] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);            
            
            cell = table.rows[i].cells[3] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                        
            
            cell = table.rows[i].cells[4] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                 
            
            cell = table.rows[i].cells[5] ;                                  
            cell.innerHTML = fmtNum(cell.innerHTML);                 
            
        }
        
        
        var fvdlt_gravada0 = document.getElementById('fvdlt_gravada0');    
        fvdlt_gravada0.innerHTML = fmtNum(fvdlt_gravada0.innerHTML);         

        var fvdlt_gravada5 = document.getElementById('fvdlt_gravada5');    
        fvdlt_gravada5.innerHTML = fmtNum(fvdlt_gravada5.innerHTML);             
        
        var fvdlt_gravada10 = document.getElementById('fvdlt_gravada10');    
        fvdlt_gravada10.innerHTML = fmtNum(fvdlt_gravada10.innerHTML);             
        
        var fvdlt_monto_total = document.getElementById('fvdlt_monto_total');    
        fvdlt_monto_total.innerHTML = fmtNum(fvdlt_monto_total.innerHTML);             
        
        var fvdlt_iva5 = document.getElementById('fvdlt_iva5');    
        fvdlt_iva5.innerHTML = fmtNum(fvdlt_iva5.innerHTML);             
        
        var fvdlt_iva10 = document.getElementById('fvdlt_iva10');    
        fvdlt_iva10.innerHTML = fmtNum(fvdlt_iva10.innerHTML);             
        
        var fvdlt_total_iva = document.getElementById('fvdlt_total_iva');    
        fvdlt_total_iva.innerHTML = fmtNum(fvdlt_total_iva.innerHTML);             
        
        
}





