
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

