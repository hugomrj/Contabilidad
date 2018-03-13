



function UsuarioRol_tabla_registro_Usuario( tabla )
{



    var table = document.getElementById( tabla ).getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');

    for (var i=0 ; i < rows.length; i++)
    {
        rows[i].onclick = function()
        {
            var linea_id = this.dataset.linea_id; 
            //UsuarioRol_modal_registro_Rol(linea_id);
            UsuarioRol_modal_registro_Usuario(linea_id);
        };       
    }
   
};





