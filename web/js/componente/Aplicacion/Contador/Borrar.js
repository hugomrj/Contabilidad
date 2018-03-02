var id = getParametroValor("id");    
var Clase = "Contador";



window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
    
    Contador_basicform_Json(id);                
    Contador_basicform_disabled();
    
    
    var contab_aceptar = document.getElementById('contab_aceptar');
    contab_aceptar.addEventListener('click',
        function() 
        {      
                var form = document.getElementById("contab_form");                            
                var accion =  getRutaAbsoluta()+"/"+Clase+"/Controlador/Borrar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                                           
                    window.location = getRutaAbsoluta()+"/Aplicacion/"+Clase+"/Lista.jspx" ;                        
                }
                else
                {    
                    alerta_error(control);
                }

        }, 
        false
    );  
        

    
    var contab_cancelar = document.getElementById('contab_cancelar');
    contab_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");                
            window.location = getRutaAbsoluta()+"/Aplicacion/"+Clase+"/Registro.jspx?id="+id ;                                    
        },
        false
    );        

    


};

window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

}


