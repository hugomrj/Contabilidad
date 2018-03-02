
var id = 0;
var id = getParametroValor("id");    

window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
    
    Usuario_basicform_Json(id);    
    Usuario_basicform();
 

    var usue_aceptar = document.getElementById('usue_aceptar');
    usue_aceptar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            
            if (Usuario_AgregarEditar_validacion())
            {
                
                var form = document.getElementById("usue_form");            
                var accion =  getRutaAbsoluta()+"/Usuario/Controlador/Editar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control)))
                {   
                    usue_cancelar.click();
                }
                else
                {    
                    alerta_error(control);
                }                
            }  
        },
        false
    );        

    
    
    
    
    var usue_cancelar = document.getElementById('usue_cancelar');
    usue_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");                
            window.location = getRutaAbsoluta()+"/Sistema/Usuario/Registro.jspx?id="+ id ;                        
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


