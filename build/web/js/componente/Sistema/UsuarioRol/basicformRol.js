
function UsuarioRol_modal_agregar_Rol ( usuario )
{
    
    
    VentanaModal("'suburra",  getRutaAbsoluta()+'/Sistema/UsuarioRol/jspf/agregarRol.jspx', 600 );        

    document.getElementById( 'suburra_usuario').value = usuario ;

    var suburra_rol = document.getElementById( 'suburra_rol');
    suburra_rol.onblur  = function() {                
        suburra_rol.value  = fmtNum(suburra_rol.value);              
        document.getElementById( 'vicRolDescripcion').innerHTML = rol_descripcion_Json( suburra_rol.value );         
    };     



    var suburra_rol_buscar = document.getElementById( 'suburra_rol_buscar');
    suburra_rol_buscar.addEventListener('click',
        function()
        {   
            VentanaModalBusqueda('rolq',  
                getRutaAbsoluta()+'/Sistema/Rol/jspf/busqueda.jspx', 
                "Rol", 
                "suburra_rol" , 
                "roles_tabla", 
                700 );                                        
        },
        false
    );    
      


    var suburra_form_guardar = document.getElementById('suburra_form_guardar');
    suburra_form_guardar.addEventListener('click',
        function() 
        {
                            
            if (UsuarioRol_AgregarEditar_validacion())
            {                
                var form = document.getElementById("suburra_form");     
                var accion =  getRutaAbsoluta()+"/UsuarioRol/Controlador/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                      
                    
                    Usuario_Tabulaciones();
                    suburra_form_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    




    var suburra_form_cerrar = document.getElementById('suburra_form_cerrar');   
    suburra_form_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'suburra");
        },
        false
    );


}






function UsuarioRol_AgregarEditar_validacion (  ){

    var vicRolDescripcion = document.getElementById('vicRolDescripcion');       
    var suburra_rol = document.getElementById('suburra_rol');       
    
    if ( (vicRolDescripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Rol");
        suburra_rol.focus();
        suburra_rol.select();
        return false;
    }

    return true;
}





 

function UsuarioRol_modal_registro_Rol ( linea_id )
{
    
    VentanaModal("'suburrr",  getRutaAbsoluta()+'/Sistema/UsuarioRol/jspf/registroRol.jspx', 600 );        
    UsuarioRol_basicform_disabled();
    
    
    var suburra_rol = document.getElementById( 'suburra_rol');
    suburra_rol.onblur  = function() {                
        suburra_rol.value  = fmtNum(suburra_rol.value);              
        document.getElementById( 'vicRolDescripcion').innerHTML = rol_descripcion_Json( suburra_rol.value );         
    };     


    UsuarioRol_basicform_Json(linea_id);
    suburra_rol.onblur();


    var suburrr_form_borrar = document.getElementById('suburrr_form_borrar');
    suburrr_form_borrar.addEventListener('click',
        function() 
        {
            

            
            var form = document.getElementById("suburrr_form");                            
            var accion =  getRutaAbsoluta()+"/UsuarioRol/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") {                                           
                Usuario_Tabulaciones();
                suburrr_form_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  


    var suburrr_form_cerrar = document.getElementById('suburrr_form_cerrar');   
    suburrr_form_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'suburrr");
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
        
        document.getElementById('suburra_rol').value = json[0]["rol"]["rol"];                
        document.getElementById('suburra_usuario').value = json[0]["usuario"]["usuario"];        
        document.getElementById('suburra_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('suburra_rol').value = "0";   
        document.getElementById('suburra_usuario').value = "0";   
        document.getElementById('suburra_id').value = "0";
    }
    
}


function UsuarioRol_basicform_disabled (   )
{        
    document.getElementById( 'suburra_rol').disabled = true;
    document.getElementById('suburra_rol_buscar').style.display = 'none';    
}
