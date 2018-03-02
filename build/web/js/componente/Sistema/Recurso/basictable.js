


function Recurso_tabla_registro( tabla )
{

    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
                var linea_id = this.dataset.linea_id;     
                location.href= getRutaAbsoluta()+"/Sistema/Recurso/Registro.jspx?id="+linea_id;                
        };       
    }
   
};


            
function recurso_url_Json(id)
{      
    var path = getRutaAbsoluta()+"/Recurso/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    var retornar = "";    
    
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse); 
        retornar = VJson( json, "url");
    }
    return retornar;
}

