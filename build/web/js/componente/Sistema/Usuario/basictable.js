


function Usuario_tabla_registro( tabla )
{

    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.linea_id;     
                location.href= getRutaAbsoluta()+"/Sistema/Usuario/Registro.jspx?id="+linea_id;                
        };       
    }
   
};




function usuario_descripcion_Json(id)
{      
    var path = getRutaAbsoluta()+"/Usuario/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    var retornar = "";    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse); 
        retornar = VJson( json, "cuenta");
    }
    return retornar;
}



