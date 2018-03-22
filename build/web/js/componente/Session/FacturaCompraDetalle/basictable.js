


function FacturaCompraDetalle_tabla( dom )
{
    
    document.getElementById( dom ).innerHTML 
        =  AjaxUrl( getRutaAbsoluta()+'/FacturaCompraDetalle/Transaccion/Lista');    

    var path = getRutaAbsoluta()+"/FacturaCompraDetalle/Transaccion/Pie.json"
    FacturaCompraDetalle_pie_json( path );
    
    FacturaCompraDetalle_tabla_registro("compradetalle_transaccion_tabla");

};






function FacturaCompraDetalle_pie_json( path )
{

    var jsonResponse = AjaxUrl( path );    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {  
        var json = JSON.parse(jsonResponse); 
        document.getElementById('fcdlt_monto_total').innerHTML = VJson( json, "montototal", "N");        
        
        
        document.getElementById('fcdlt_gravada0').innerHTML = VJson( json, "gravada0", "N");        
        document.getElementById('fcdlt_gravada5').innerHTML = VJson( json, "gravada5", "N");        
        document.getElementById('fcdlt_gravada10').innerHTML = VJson( json, "gravada10", "N");        
        
        document.getElementById('fcdlt_iva5').innerHTML = VJson( json, "iva5", "N");        
        document.getElementById('fcdlt_iva10').innerHTML = VJson( json, "iva10", "N");        
        document.getElementById('fcdlt_total_iva').innerHTML = VJson( json, "total_iva", "N");                
       
       document.getElementById('fcdlt_monto_letras').innerHTML = getJson(1, json, "montoletras");

    }

}






function FacturaCompraDetalle_tabla_registro( tabla )
{
    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.orden;                     
                var id_transaccion = this.dataset.id_transaccion;     
                
                CompraDetalle_modal_EditarBorrar( id_transaccion );
        };       
    }
};



function FacturaCompraDetalle_tabla_registro_consulta( tabla )
{
    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.orden;     
                CompraDetalle_modal_Consulta(linea_id);
                FacturaCompraDetalle_form_disabled();
                FacturaCompraDetalle_form_formato();
                
        };       
    }
};








function  FacturaCompraDetalle_table_formato (  ){
        
        var tabla = "compradetalle_transaccion_tabla";

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
        
        
        var fcdlt_gravada0 = document.getElementById('fcdlt_gravada0');    
        fcdlt_gravada0.innerHTML = fmtNum(fcdlt_gravada0.innerHTML);         

        var fcdlt_gravada5 = document.getElementById('fcdlt_gravada5');    
        fcdlt_gravada5.innerHTML = fmtNum(fcdlt_gravada5.innerHTML);             
        
        var fcdlt_gravada10 = document.getElementById('fcdlt_gravada10');    
        fcdlt_gravada10.innerHTML = fmtNum(fcdlt_gravada10.innerHTML);             
        
        var fcdlt_monto_total = document.getElementById('fcdlt_monto_total');    
        fcdlt_monto_total.innerHTML = fmtNum(fcdlt_monto_total.innerHTML);             
        
        var fcdlt_iva5 = document.getElementById('fcdlt_iva5');    
        fcdlt_iva5.innerHTML = fmtNum(fcdlt_iva5.innerHTML);             
        
        var fcdlt_iva10 = document.getElementById('fcdlt_iva10');    
        fcdlt_iva10.innerHTML = fmtNum(fcdlt_iva10.innerHTML);             
        
        var fcdlt_total_iva = document.getElementById('fcdlt_total_iva');    
        fcdlt_total_iva.innerHTML = fmtNum(fcdlt_total_iva.innerHTML);             
        
        
}





