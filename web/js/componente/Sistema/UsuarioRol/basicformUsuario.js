
function UsuarioRol_modal_agregar_Usuario ( rol )
{
    
    VentanaModal("'suburu",  getRutaAbsoluta()+'/Sistema/UsuarioRol/jspf/agregarUsuario.jspx', 600 );        
    document.getElementById( 'suburu_rol').value = rol ;


    var suburu_usuario = document.getElementById( 'suburu_usuario');
    suburu_usuario.onblur  = function() {                
        suburu_usuario.value  = fmtNum(suburu_usuario.value);              

        document.getElementById( 'suburu_usuario_descripcion').innerHTML 
                = usuario_descripcion_Json( suburu_usuario.value );         
        
    };     



    var suburu_usuario_buscar = document.getElementById( 'suburu_usuario_buscar');
    suburu_usuario_buscar.addEventListener('click',
        function()
        {   
            
            VentanaModalBusqueda('usuq',  
                getRutaAbsoluta()+'/Sistema/Rol/jspf/busqueda.jspx', 
                "Usuario", 
                "suburu_usuario" , 
                "usuarios_tabla", 
                700 );                                        
                
        },
        false
    );    
      



    var suburua_guardar = document.getElementById('suburua_guardar');
    suburua_guardar.addEventListener('click',
        function() 
        {
                            
            if (UsuarioRol_AgregarEditar_validacion())
            {                
                var form = document.getElementById("suburua_form");     
                var accion =  getRutaAbsoluta()+"/UsuarioRol/Controlador/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){           
                    
                    var tab_usuarios = document.getElementById('tab_usuarios');
                    tab_usuarios.click();
                    
                    suburua_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    




    var suburua_cerrar = document.getElementById('suburua_cerrar');   
    suburua_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'suburu");
        },
        false
    );




}






function UsuarioRol_AgregarEditar_validacion (  ){

    var suburu_usuario_descripcion = document.getElementById('suburu_usuario_descripcion');       
    var suburu_usuario = document.getElementById('suburu_usuario');       
    
    if ( (suburu_usuario_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Usuarios");
        suburu_usuario.focus();
        suburu_usuario.select();
        return false;
    }

    return true;
}





             

function UsuarioRol_modal_registro_Usuario ( linea_id )
{
    
    VentanaModal("'suburru",  getRutaAbsoluta()+'/Sistema/UsuarioRol/jspf/registroUsuario.jspx', 600 );        
    
    UsuarioRol_basicform_disabled();
    UsuarioRol_basicform_Json(linea_id);
    
        document.getElementById( 'suburu_usuario_descripcion').innerHTML 
            = usuario_descripcion_Json( suburu_usuario.value );       

    

    var suberur_borrar = document.getElementById('suberur_borrar');
    suberur_borrar.addEventListener('click',
        function() 
        {
            
            var form = document.getElementById("suburrr_form");                            
            var accion =  getRutaAbsoluta()+"/UsuarioRol/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") 
            {                                           
            
                var tab_usuarios = document.getElementById('tab_usuarios');
                tab_usuarios.click();                                
                
                suberur_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  


    var suberur_cerrar = document.getElementById('suberur_cerrar');   
    suberur_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'suburru");
        },
        false
    );

}







function UsuarioRol_basicform_Json(id)
{      

    var path = getRutaAbsoluta()+"/UsuarioRol/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
        
 
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);          
        
        document.getElementById('suburu_rol').value = json[0]["rol"]["rol"];                
        document.getElementById('suburu_usuario').value = json[0]["usuario"]["usuario"];        
        document.getElementById('suburu_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('suburu_rol').value = "0";   
        document.getElementById('suburu_usuario').value = "0";   
        document.getElementById('suburu_id').value = "0";
    }
    
}


function UsuarioRol_basicform_disabled (   )
{        
    document.getElementById( 'suburu_usuario').disabled = true;
    document.getElementById('suburu_usuario_buscar').style.display = 'none';    
}
