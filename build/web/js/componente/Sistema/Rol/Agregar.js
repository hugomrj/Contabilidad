

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
          
    Rol_basicform();
    
    
    var rolf_nombre = document.getElementById( 'rolf_nombre');    
    rolf_nombre.focus();
    rolf_nombre.select();



    var rola_guardar = document.getElementById('rola_guardar');
    rola_guardar.addEventListener('click',
        function() 
        {
            
            if (Rol_AgregarEditar_validacion())
            {
                                
                var form = document.getElementById("rola_form");                            
                var accion =  getRutaAbsoluta()+"/Rol/Controlador/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Sistema/Rol/Registro.jspx?id="+control.toString().trim();        
                }
                else{                    
                    alerta_error(control);
                }
                
                
            }
        }, 
        false
    );  
    
    
    
    
    var rola_cancelar = document.getElementById('rola_cancelar');
    rola_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Rol/Lista.jspx";
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


