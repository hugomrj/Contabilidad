



function Recurso_basicform (   )
{


}





function Recurso_basicform_focus (   )
{
    var recurf_url = document.getElementById( 'recurf_url');    
    recurf_url.focus();
    recurf_url.select();

}





function Recurso_AgregarEditar_validacion() {
    
    var recurf_url = document.getElementById('recurf_url');       
    if ( (recurf_url.value).toString().trim().length == 0 ) 
    {
        alerta_error("Falta url");
        recurf_url.focus();
        recurf_url.select();
        return false;
    }


    // controlar si existe url valida
    var fullpath = getRutaAbsoluta()+recurf_url.value;    
    if ( existeUrl( fullpath ) == false){
        
        alerta_error("Url incorrecta");
        recurf_url.focus();
        recurf_url.select();
        return false;
        
    }
    
    return true;
    
}





function Recurso_basicform_Json(id)
{      
    var path = getRutaAbsoluta()+"/Recurso/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )   
    {        
        var json = JSON.parse(jsonResponse);  

        document.getElementById('recurf_recurso').value = VJson( json, "recurso", "N");
        document.getElementById('recurf_url').value = VJson( json, "url");        
    }
    else
    {
        document.getElementById('recurf_recurso').value = "0";
        document.getElementById('recurf_url').value = "";
    }
}






function Recurso_basicform_disabled (   )
{    
    
    document.getElementById( 'recurf_recurso').disabled = true;
    document.getElementById( 'recurf_url').disabled = true;
    

}








function Recurso_modal_agregar ( dom )
{
    
    VentanaModal("subA4",  getRutaAbsoluta()+'/Sistema/Recurso/jspf/agregarRecurso.jspx', 800 );        
    Recurso_basicform();
    

    var reca_guardar = document.getElementById('reca_guardar');
    reca_guardar.addEventListener('click',
        function() 
        {
                      
            if (Recurso_AgregarEditar_validacion())
            {
                var form = document.getElementById("reca_form");            
                
                var accion =  getRutaAbsoluta()+"/Recurso/Controlador/Agregar";                           
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                    
                    linea_id = control;    
                    asignarValor(  dom , linea_id );
                    document.getElementById( dom ).onblur();  
                    reca_cerrar.click();
                     
                }
                else{                    
                    alerta_error(control);
                }
            }
        }, 
        false
    );  
    




    var reca_cerrar = document.getElementById('reca_cerrar');   
    reca_cerrar.addEventListener('click',
        function()
        {
            VentanaModalCerrar("subA4");
        },
        false
    );


}




