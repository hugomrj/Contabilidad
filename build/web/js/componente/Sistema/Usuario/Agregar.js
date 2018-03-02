

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
          
    Usuario_basicform();
    
    
    var usuf_cuenta = document.getElementById( 'usuf_cuenta');    
    usuf_cuenta.focus();
    usuf_cuenta.select();



    var usua_guardar = document.getElementById('usua_guardar');
    usua_guardar.addEventListener('click',
        function() 
        {
            
            if (Usuario_AgregarEditar_validacion())
            {
                
                
                var form = document.getElementById("usua_form");            
                //var accion =  form.getAttribute('action') ; 
                var accion =  getRutaAbsoluta()+"/Usuario/Controlador/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Sistema/Usuario/Registro.jspx?id="+control.toString().trim();        
                }
                else{                    
                    alerta_error(control);
                }
                
                
            }
        }, 
        false
    );  
    
    
    
    
    var usua_cancelar = document.getElementById('usua_cancelar');
    usua_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Usuario/Lista.jspx";
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


