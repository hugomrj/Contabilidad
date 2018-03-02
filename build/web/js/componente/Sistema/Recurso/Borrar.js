var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
        
    
    Recurso_basicform_Json(id);    
    Recurso_basicform();
    Recurso_basicform_disabled();
    
    
    
    var recurb_aceptar = document.getElementById('recurb_aceptar');
    recurb_aceptar.addEventListener('click',
        function() 
        {            
                
                var form = document.getElementById("recurb_form");                            
                var accion =  getRutaAbsoluta()+"/Recurso/Controlador/Borrar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                       
                    window.location = getRutaAbsoluta()+"/Sistema/Recurso/Lista.jspx";                    
                }
                else
                {    
                    alerta_error(control);
                }

        }, 
        false
    );  
        





    
    var recurb_cancelar = document.getElementById('recurb_cancelar');
    recurb_cancelar.addEventListener('click',
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


