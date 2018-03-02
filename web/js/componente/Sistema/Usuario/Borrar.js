var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
        
    
    Usuario_basicform_Json(id);    
    Usuario_basicform();
    Usuario_basicform_disabled();
    
    
    
    var usub_aceptar = document.getElementById('usub_aceptar');
    usub_aceptar.addEventListener('click',
        function() 
        {            
                
                var form = document.getElementById("usub_form");                            
                var accion =  getRutaAbsoluta()+"/Usuario/Controlador/Borrar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                       
                    window.location = getRutaAbsoluta()+"/Sistema/Usuario/Lista.jspx";                    
                }
                else
                {    
                    alerta_error(control);
                }

        }, 
        false
    );  
        








    
    var usub_cancelar = document.getElementById('usub_cancelar');
    usub_cancelar.addEventListener('click',
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


