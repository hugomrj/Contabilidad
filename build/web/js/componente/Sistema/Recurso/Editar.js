
var id = 0;
var id = getParametroValor("id");    

window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
    
    Recurso_basicform_Json(id);    
    Recurso_basicform();
    Recurso_basicform_focus();
     

    var recure_aceptar = document.getElementById('recure_aceptar');
    recure_aceptar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            
            if (Recurso_AgregarEditar_validacion())
            {
                
                var form = document.getElementById("recure_form");            
                var accion =  getRutaAbsoluta()+"/Recurso/Controlador/Editar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control)))
                {   
                    recure_cancelar.click();
                }
                else
                {    
                    alerta_error(control);
                }                
            }  
        },
        false
    );        

    
    
    
    
    var recure_cancelar = document.getElementById('recure_cancelar');
    recure_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");                
            window.location = getRutaAbsoluta()+"/Sistema/Recurso/Registro.jspx?id="+ id ;                        
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


