var id = getParametroValor("id");    

window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
    
    Interaccion_basicform_Json(id);                
    Interaccion_basicform_disabled();
    document.getElementById('interf_modulo_buscar').style.display = 'none';
    

    
    var interb_aceptar = document.getElementById('interb_aceptar');
    interb_aceptar.addEventListener('click',
        function() 
        {      
                var form = document.getElementById("interb_form");                            
                var accion =  getRutaAbsoluta()+"/Interaccion/Controlador/Borrar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (control.toString().trim() == "DeleteOK") {                                           
                    window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Lista.jspx" ;                        
                }
                else
                {    
                    alerta_error(control);
                }

        }, 
        false
    );  
        








    
    var interb_cancelar = document.getElementById('interb_cancelar');
    interb_cancelar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");                
            window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Registro.jspx?id="+ id ;                                    
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


