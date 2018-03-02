

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
          
    Contador_basicform();


    var contaa_guardar = document.getElementById('contaa_guardar');
    contaa_guardar.addEventListener('click',
        function() 
        {
            
            if (Contador_AgregarEditar_validacion())
            {               
                
                var form = document.getElementById("contaa_form");                            
                var accion =  getRutaAbsoluta()+"/Contador/Controlador/Agregar"; 
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                
                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Aplicacion/Contador/Registro.jspx?id="+control.toString().trim();                        
                 }
                else{                    
                    alerta_error(control);
                }
                
            }
        }, 
        false
    );  

    
    

    var contaa_cancelar = document.getElementById('contaa_cancelar');
    contaa_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Aplicacion/Contador/Lista.jspx";
        },
        false
    );        


    document.getElementById('contaf_cedula').focus();       
    document.getElementById('contaf_cedula').select();       


};




window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

}


