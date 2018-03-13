
function RolInteraccion_modal_agregar_Rol ( interaccion )
{
    

    VentanaModal("subrira",  getRutaAbsoluta()+'/Sistema/RolInteraccion/jspf/agregarRol.jspx', 600 );        
    document.getElementById( 'subribf_interaccion').value = interaccion ;
    
    
    
                                        



    var subribf_rol = document.getElementById( 'subribf_rol');
    subribf_rol.onblur  = function() {                
        subribf_rol.value  = fmtNum(subribf_rol.value);              
        document.getElementById( 'subribf_rol_descripcion').innerHTML = rol_descripcion_Json( subribf_rol.value );         
    };     



    var subribf_rol_buscar = document.getElementById( 'subribf_rol_buscar');
    subribf_rol_buscar.addEventListener('click',
        function()
        {   
            VentanaModalBusqueda('rolq',  
                getRutaAbsoluta()+'/Sistema/Rol/jspf/busqueda.jspx', 
                "Rol", 
                "subribf_rol" , 
                "roles_tabla", 
                700 );                                        
        },
        false
    );    
      


    var subria_guardar = document.getElementById('subria_guardar');
    subria_guardar.addEventListener('click',
        function() 
        {
                            
            if (RolInteraccion_AgregarEditar_validacion())
            {                
                var form = document.getElementById("subria_form");     
                var accion =  getRutaAbsoluta()+"/RolInteraccion/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                      
                    
                    document.getElementById('tab_roles').click();                     
                    
                    subria_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    




    var subria_cerrar = document.getElementById('subria_cerrar');   
    subria_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("subrira");
        },
        false
    );


}






function RolInteraccion_AgregarEditar_validacion (  ){

    var subribf_rol_descripcion = document.getElementById('subribf_rol_descripcion');       
    var suburra_rol = document.getElementById('suburra_rol');       
    
    if ( (subribf_rol_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Rol");
        suburra_rol.focus();
        suburra_rol.select();
        return false;
    }

    return true;
}





 

function RolInteraccion_modal_registro_Rol ( linea_id )
{
    
    
    VentanaModal("'subrirr",  getRutaAbsoluta()+'/Sistema/RolInteraccion/jspf/registroRol.jspx', 600 );        
    RolInteraccion_basicform_disabled();
    
    
    var subribf_rol = document.getElementById( 'subribf_rol');
    
    RolInteraccion_basicform_Json(linea_id);
    
    
    document.getElementById( 'subribf_rol_descripcion').innerHTML 
            = rol_descripcion_Json( subribf_rol.value );       


    
    var subrirr_borrar = document.getElementById('subrirr_borrar');
    subrirr_borrar.addEventListener('click',
        function() 
        {
            

            
            var form = document.getElementById("subrirr_form");                            
            var accion =  getRutaAbsoluta()+"/RolInteraccion/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") {                                           

                document.getElementById('tab_roles').click();       
                subrirr_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  


    var subrirr_cerrar = document.getElementById('subrirr_cerrar');   
    subrirr_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'subrirr");
        },
        false
    );

}



function RolInteraccion_basicform_Json(id)
{      

    var path = getRutaAbsoluta()+"/RolInteraccion/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
        
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )         
    {        
        var json = JSON.parse(jsonResponse);          
        
        
        document.getElementById('subribf_rol').value = json[0]["rol"]["rol"];                
        document.getElementById('subribf_interaccion').value = json[0]["interaccion"]["interaccion"];        
        document.getElementById('subribf_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('subribf_rol').value = "0";   
        document.getElementById('subribf_interaccion').value = "0";   
        document.getElementById('subribf_id').value = "0";
    }
    
}


function RolInteraccion_basicform_disabled (   )
{        
    document.getElementById( 'subribf_rol').disabled = true;
    document.getElementById('subribf_rol_buscar').style.display = 'none';    
}
