

function InteraccionRecurso_modal_agregar_Recurso ( interaccion )
{
    
    
    VentanaModal("subIRaa",  getRutaAbsoluta()+'/Sistema/InteraccionRecurso/jspf/agregarRecurso.jspx', 800 );    
    document.getElementById( 'subIRaf_interaccion').value = interaccion ;
    


    var subIRaf_recurso = document.getElementById( 'subIRaf_recurso');
    subIRaf_recurso.onblur  = function() {                
        subIRaf_recurso.value  = fmtNum(subIRaf_recurso.value);              
        document.getElementById( 'subIRaf_recurso_url').innerHTML = recurso_url_Json ( subIRaf_recurso.value );         
    };     
                                                                                  
   
    

    var subIRaf_recurso_buscar = document.getElementById( 'subIRaf_recurso_buscar');
    subIRaf_recurso_buscar.addEventListener('click',
        function()
        {   
            VentanaModalBusqueda('recuq',  
                getRutaAbsoluta()+'/Sistema/Recurso/jspf/busqueda.jspx', 
                "Recurso", 
                "subIRaf_recurso" , 
                "recursos_tabla", 
                700 );                                        

        },
        false
    );    
      
    
    
    
    var subIRaf_recurso_agregar = document.getElementById( 'subIRaf_recurso_agregar');
    subIRaf_recurso_agregar.addEventListener('click',
        function()
        {   
            Recurso_modal_agregar( "subIRaf_recurso" );
        },
        false
    );    
      
    
    
    

    var subIRa_guardar = document.getElementById('subIRa_guardar');
    subIRa_guardar.addEventListener('click',
        function() 
        {
                            
            if (InteraccionRecurso_AgregarEditar_validacion())
            {                
                var form = document.getElementById("subIRa_form");     
                var accion =  getRutaAbsoluta()+"/InteraccionRecurso/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                      
                    
                    document.getElementById('tab_recursos').click();                    
                    
                    subIRa_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    



    var subIRa_cerrar = document.getElementById('subIRa_cerrar');   
    subIRa_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("subIRaa");
        },
        false
    );



}






function InteraccionRecurso_modal_agregar_Interaccion ( recurso )
{
    

    
    VentanaModal("subIRIa",  getRutaAbsoluta()+'/Sistema/InteraccionRecurso/jspf/agregarInteraccion.jspx', 800 );    
    document.getElementById( 'subIRIaf_recurso').value = recurso ;
    


    var subIRIaf_interaccion = document.getElementById( 'subIRIaf_interaccion');
    subIRIaf_interaccion.onblur  = function() {                
        subIRIaf_interaccion.value  = fmtNum(subIRIaf_interaccion.value);              
        document.getElementById( 'subIRIaf_interaccion_nombre').innerHTML 
                = Interaccion_descripcion_Json ( subIRIaf_interaccion.value );         
    };     
                                                                                  
   


    var subIRIaf_interaccion_buscar = document.getElementById( 'subIRIaf_interaccion_buscar');
    subIRIaf_interaccion_buscar.addEventListener('click',
        function()
        {   
            VentanaModalBusqueda('InterQ',  
                getRutaAbsoluta()+'/Sistema/Interaccion/jspf/busqueda.jspx', 
                "Interaccion", 
                "subIRIaf_interaccion" , 
                "interacciones_tabla", 
                700 );                                        

        },
        false
    );    
      

    
    
    var subIRIa_guardar = document.getElementById('subIRIa_guardar');
    subIRIa_guardar.addEventListener('click',
        function() 
        {
                            
            if (InteraccionRecurso_AgregarEditar_validacion())
            {                
                var form = document.getElementById("subIRIa_form");     
                var accion =  getRutaAbsoluta()+"/InteraccionRecurso/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                      
                    
                    document.getElementById('tab_interaccion').click();                    
                    
                    subIRIa_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    



    var subIRIa_cerrar = document.getElementById('subIRIa_cerrar');   
    subIRIa_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("subIRIa");
        },
        false
    );



}










function InteraccionRecurso_AgregarEditar_validacion (  ){


/*
    var subribf_rol_descripcion = document.getElementById('subribf_rol_descripcion');       
    var suburra_rol = document.getElementById('suburra_rol');       
    
    if ( (subribf_rol_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Rol");
        suburra_rol.focus();
        suburra_rol.select();
        return false;
    }
    
    */
    return true;
}





 

function InteraccionRecurso_modal_registro_Recurso ( linea_id )
{    
    
    VentanaModal("'subRecuR",  getRutaAbsoluta()+'/Sistema/InteraccionRecurso/jspf/registroRecurso.jspx', 800 );        
    
    InteraccionRecurso_basicform_disabled();
    
    var subIRaf_recurso = document.getElementById( 'subIRaf_recurso');
    
    InteraccionRecurso_basicform_Json(linea_id);
    
    
    document.getElementById( 'subIRaf_recurso_url').innerHTML 
            = recurso_url_Json( subIRaf_recurso.value );       

    
    var subIRr_borrar = document.getElementById('subIRr_borrar');
    subIRr_borrar.addEventListener('click',
        function() 
        {
            
            var form = document.getElementById("subIRr_form");                            
            var accion =  getRutaAbsoluta()+"/InteraccionRecurso/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") {                                           

                document.getElementById('tab_recursos').click();       
                subIRr_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  


    var subIRr_cerrar = document.getElementById('subIRr_cerrar');   
    subIRr_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'subRecuR");
        },
        false
    );


}






function InteraccionRecurso_modal_registro_Interaccion ( linea_id )
{    
    

    
    
    VentanaModal("'subInterR",  getRutaAbsoluta()+'/Sistema/InteraccionRecurso/jspf/registroInteraccion.jspx', 800 );        
        
    InteraccionRecurso_basicform_Interaccion_disabled();
    
    InteraccionRecurso_basicform_Interaccion_Json(linea_id);
    
    
    var subIRIaf_interaccion = document.getElementById( 'subIRIaf_interaccion');    
        document.getElementById( 'subIRIaf_interaccion_nombre').innerHTML 
            = Interaccion_descripcion_Json( subIRIaf_interaccion.value );      
    
    

    
    var subIRIr_borrar = document.getElementById('subIRIr_borrar');
    subIRIr_borrar.addEventListener('click',
        function() 
        {
            
            var form = document.getElementById("subIRIr_form");                            
            var accion =  getRutaAbsoluta()+"/InteraccionRecurso/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") {                                           
                document.getElementById('tab_interaccion').click();       
                subIRIr_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  





    var subIRIr_cerrar = document.getElementById('subIRIr_cerrar');   
    subIRIr_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("'subInterR");
        },
        false
    );






}











function InteraccionRecurso_basicform_Json(id)
{      

    var path = getRutaAbsoluta()+"/InteraccionRecurso/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
        
 
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);          
                
        document.getElementById('subIRaf_recurso').value = json[0]["recurso"]["recurso"];                
        document.getElementById('subIRaf_interaccion').value = json[0]["interaccion"]["interaccion"];        
        document.getElementById('subIRaf_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('subIRaf_recurso').value = "0";   
        document.getElementById('subIRaf_interaccion').value = "0";   
        document.getElementById('subIRaf_id').value = "0";
    }
    
}



function InteraccionRecurso_basicform_Interaccion_Json(id)
{      

    var path = getRutaAbsoluta()+"/InteraccionRecurso/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
        
 
    if (jsonResponse.toString().trim() != "[]")
    {        
        var json = JSON.parse(jsonResponse);          
                
        document.getElementById('subIRIaf_recurso').value = json[0]["recurso"]["recurso"];                
        document.getElementById('subIRIaf_interaccion').value = json[0]["interaccion"]["interaccion"];        
        document.getElementById('subIRIaf_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('subIRIaf_recurso').value = "0";   
        document.getElementById('subIRIaf_interaccion').value = "0";   
        document.getElementById('subIRIaf_id').value = "0";
    }
    
}










function InteraccionRecurso_basicform_disabled (   )
{        
    document.getElementById( 'subIRaf_recurso').disabled = true;
    document.getElementById('subIRaf_recurso_buscar').style.display = 'none';    
    document.getElementById('subIRaf_recurso_agregar').style.display = 'none';    
    
}



function InteraccionRecurso_basicform_Interaccion_disabled (   )
{        
    document.getElementById( 'subIRIaf_interaccion').disabled = true;
    document.getElementById('subIRIaf_interaccion_buscar').style.display = 'none';    
     
    
}
