



function InteraccionRecurso_tabla_registro_Recurso( tabla )
{


    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
            var linea_id = this.dataset.linea_id;             
            
            InteraccionRecurso_modal_registro_Recurso(linea_id);
            
        };       
    }
   
};





            
function InteraccionRecurso_tabla_registro_Interaccion ( tabla )
{

    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
            var linea_id = this.dataset.linea_id;             
            
            InteraccionRecurso_modal_registro_Interaccion(linea_id);
            
        };       
    }
   
};




