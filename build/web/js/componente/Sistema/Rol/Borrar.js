var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
        
    
    Rol_basicform_Json(id);    
    Rol_basicform();
    Rol_basicform_disabled();
    
    
    
    var rolb_aceptar = document.getElementById('rolb_aceptar');
    rolb_aceptar.addEventListener('click',
        function() 
        {            
                
                var form = document.getElementById("rolb_form");                            
                var accion =  getRutaAbsoluta()+"/Rol/Controlador/Borrar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                       
                    window.location = getRutaAbsoluta()+"/Sistema/Rol/Lista.jspx";                    
                }
                else
                {    
                    alerta_error(control);
                }

        }, 
        false
    );  
        








    
    var rolb_cancelar = document.getElementById('rolb_cancelar');
    rolb_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Sistema/Rol/Registro.jspx?id="+ id ;                        
            
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


