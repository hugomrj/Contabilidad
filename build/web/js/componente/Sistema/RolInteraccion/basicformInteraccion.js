
function RolInteraccion_modal_agregar_Interaccion ( rol )
{
        
    VentanaModal("subrii",  getRutaAbsoluta()+'/Sistema/RolInteraccion/jspf/agregarInteraccion.jspx', 600 );        
    document.getElementById( 'subriibf_rol').value = rol ;


    var subriibf_interaccion = document.getElementById( 'subriibf_interaccion');
    subriibf_interaccion.onblur  = function() {                
        subriibf_interaccion.value  = fmtNum(subriibf_interaccion.value);              

        document.getElementById( 'subriibf_interaccion_descripcion').innerHTML 
                = Interaccion_descripcion_Json( subriibf_interaccion.value );         
        
    };     




    var subriibf_interaccion_buscar = document.getElementById( 'subriibf_interaccion_buscar');
    subriibf_interaccion_buscar.addEventListener('click',
        function()
        {  
            VentanaModalBusqueda('interq',  
                getRutaAbsoluta()+'/Sistema/Interaccion/jspf/busqueda.jspx', 
                "Interaccion", 
                "subriibf_interaccion" , 
                "interacciones_tabla", 
                700 );                                        
                
        },
        false
    );    
      



    var subriia_guardar = document.getElementById('subriia_guardar');
    subriia_guardar.addEventListener('click',
        function() 
        {
                        
            if (RolInteraccion_AgregarEditar_validacion())
            {                
                var form = document.getElementById("subriia_form");     
                var accion =  getRutaAbsoluta()+"/RolInteraccion/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                               
                    document.getElementById('tab_interaccion').click();                     
                    subriia_cerrar.click();                     
                }
                else{                    
                    alerta_error(control);
                }
            }           
            
        }, 
        false
    );  
    




    var subriia_cerrar = document.getElementById('subriia_cerrar');   
    subriia_cerrar.addEventListener('click',
        function()
        {            
            VentanaModalCerrar("subrii");
        },
        false
    );




}






function RolInteraccion_AgregarEditar_validacion (  ){

    var subriibf_interaccion_descripcion = document.getElementById('subriibf_interaccion_descripcion');       
    var subriibf_interaccion = document.getElementById('subriibf_interaccion');       
    
    if ( (subriibf_interaccion_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Interaccion");
        subriibf_interaccion.focus();
        subriibf_interaccion.select();
        return false;
    }

    return true;
}





             

function RolInteraccion_modal_registro_Interaccion ( linea_id )
{
    
    VentanaModal("subrir",  getRutaAbsoluta()+'/Sistema/RolInteraccion/jspf/registroInteraccion.jspx', 600 );        
    
    RolInteraccion_basicform_disabled();
    RolInteraccion_basicform_Json(linea_id);
    
        document.getElementById( 'subriibf_interaccion_descripcion').innerHTML 
            = Interaccion_descripcion_Json( subriibf_interaccion.value );       

    
    var subriir_borrar = document.getElementById('subriir_borrar');
    subriir_borrar.addEventListener('click',
        function() 
        {
            
            var form = document.getElementById("subriir_form");                            
            var accion =  getRutaAbsoluta()+"/RolInteraccion/Controlador/Borrar"; 

            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "DeleteOK") 
            {                                                       
                document.getElementById('tab_interaccion').click();   
                subriir_cerrar.click();          
            }
            else
            {    
                alerta_error(control);
            }
        }, 
        false
    );  


    var subriir_cerrar = document.getElementById('subriir_cerrar');   
    subriir_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("subrir");
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
        
        document.getElementById('subriibf_rol').value = json[0]["rol"]["rol"];                
        document.getElementById('subriibf_interaccion').value = json[0]["interaccion"]["interaccion"];        
        document.getElementById('subriibf_id').value = json[0]["id"];        
    }
    else
    {
        document.getElementById('subriibf_rol').value = "0";   
        document.getElementById('subriibf_interaccion').value = "0";   
        document.getElementById('subriibf_id').value = "0";
    }
    
}




function RolInteraccion_basicform_disabled (   )
{        
    document.getElementById( 'subriibf_rol').disabled = true;
    document.getElementById('subriibf_interaccion_buscar').style.display = 'none';    
}