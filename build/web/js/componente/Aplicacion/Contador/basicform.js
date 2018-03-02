
function Contador_basicform (   )
{

    

    var contaf_usuario = document.getElementById( 'contaf_usuario');
    contaf_usuario.onblur  = function() {                
        contaf_usuario.value  = fmtNum(contaf_usuario.value);           
        var idvalor = contaf_usuario.value;                
        document.getElementById( 'usuario_descripcion').innerHTML = Usuario_cuenta_Json( idvalor );         
    };     
    contaf_usuario.onblur();
        
    
    var contaf_usuario_buscar = document.getElementById( 'contaf_usuario_buscar');
    contaf_usuario_buscar.addEventListener('click',
        function()
        {                         
            VentanaModalBusqueda('Usub',  
                getRutaAbsoluta()+'/Sistema/Usuario/jspf/busqueda.jspx', 
                "Usuario", 
                "contaf_usuario" , 
                "usuarios_tabla", 
                700 );                  
        },
        false
    );   
    

}




function Contador_AgregarEditar_validacion() {
    
   
/*
    var modulo_descripcion = document.getElementById('modulo_descripcion');       
    var interf_modulo = document.getElementById('interf_modulo');       
    
    if ( (modulo_descripcion.innerHTML).toString().trim().length == 0 ) 
    {
        alerta_error("Falta seleccionar Modulo");
        interf_modulo.focus();
        interf_modulo.select();
        return false;
    }

*/
   
    return true;
    
}





function Contador_basicform_Json(id)
{      
    
    var path = getRutaAbsoluta()+"/Contador/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )             
    {        
        var json = JSON.parse(jsonResponse);  

        
        document.getElementById('contaf_contador').value = VJson( json, "contador", "N");
        document.getElementById('contaf_cedula').value = VJson( json, "cedula", "N");
        document.getElementById('contaf_nombre').value = VJson( json, "nombre");  
        document.getElementById('contaf_apellido').value = VJson( json, "apellido");  
        

        if (!(json[0]["usuario"] === undefined)){        
            document.getElementById('contaf_usuario').value =  json[0]["usuario"]["usuario"] ;                  
            document.getElementById('usuario_descripcion').value =  json[0]["usuario"]["cuenta"] ;  
        }
    }
    else
    {

        document.getElementById('contaf_contador').value = "0";
        document.getElementById('contaf_cedula').value = "0";
        document.getElementById('contaf_nombre').value = "";  
        document.getElementById('contaf_apellido').value = "";  

        
        document.getElementById('contaf_usuario').value = "0";  
        document.getElementById('usuario_descripcion').value = "";  

    }
}



function Contador_basicform_disabled (   )
{    
    
        document.getElementById('contaf_contador').disabled = true;
        document.getElementById('contaf_cedula').disabled = true;
        document.getElementById('contaf_nombre').disabled = true;
        document.getElementById('contaf_apellido').disabled = true;
        
        
        document.getElementById('contaf_usuario').disabled = true;
        document.getElementById('contaf_usuario_buscar').style.display = 'none';
        
    
}




