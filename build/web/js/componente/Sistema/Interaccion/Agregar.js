

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
          
    Interaccion_basicform();


    var intera_guardar = document.getElementById('intera_guardar');
    intera_guardar.addEventListener('click',
        function() 
        {
            
            if (Interaccion_AgregarEditar_validacion())
            {               
                
                var form = document.getElementById("intera_form");                            
                var accion =  getRutaAbsoluta()+"/Interaccion/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                
                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Registro.jspx?id="+control.toString().trim();                        
                 }
                else{                    
                    alerta_error(control);
                }
                
            }
        }, 
        false
    );  

    
    

    var intera_cancelar = document.getElementById('intera_cancelar');
    intera_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Lista.jspx";
        },
        false
    );        



    document.getElementById('interf_nombre').focus();       
    document.getElementById('interf_nombre').select();       


};

window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

}


