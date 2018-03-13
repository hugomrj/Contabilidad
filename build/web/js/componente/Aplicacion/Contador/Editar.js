
var id = 0;
var id = getParametroValor("id");    
var Clase = "Contador";

window.onload = function() {
    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
    
    Contador_basicform_Json(id);      
    Contador_basicform();
 

    var contaf_cedula = document.getElementById('contaf_cedula');
    contaf_cedula.focus();
    contaf_cedula.select();

    
    
    var contae_aceptar = document.getElementById('contae_aceptar');
    contae_aceptar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            
            if (Contador_AgregarEditar_validacion())
            {                               
                
                var form = document.getElementById("contae_form");            
                var accion =  getRutaAbsoluta()+"/"+Clase+"/Controlador/Editar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                


                if (!(isNaN(control)))
                {                
                    contae_cancelar.click();
                }
                else
                {    
                    alerta_error(control);
                }                
            }  
        },
        false
    );        

    
    
    
    
    var contae_cancelar = document.getElementById('contae_cancelar');
    contae_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");                
            window.location = getRutaAbsoluta()+"/Aplicacion/"+Clase+"/Registro.jspx?id="+ id ;                        
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


