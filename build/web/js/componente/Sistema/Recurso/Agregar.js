

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
          
    Recurso_basicform();
    
    
    var recurf_url = document.getElementById( 'recurf_url');    
    recurf_url.focus();
    recurf_url.select();
 


    var recura_guardar = document.getElementById('recura_guardar');
    recura_guardar.addEventListener('click',
        function() 
        {
            
            if (Recurso_AgregarEditar_validacion())
            {
                                
                var form = document.getElementById("recura_form");                            
                var accion =  getRutaAbsoluta()+"/Recurso/Controlador/Agregar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Sistema/Recurso/Registro.jspx?id="+control.toString().trim();        
                }
                else{                    
                    alerta_error(control);
                }
                
                
            }
        }, 
        false
    );  
    
    
    
    
    var recura_cancelar = document.getElementById('recura_cancelar');
    recura_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Recurso/Lista.jspx";
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


