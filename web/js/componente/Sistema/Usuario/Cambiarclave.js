


window.onload = function() {


/*

    var sessionusuario = AjaxUrl ("../Usuario/Session");
    
    if (sessionusuario !== null){
        
        var ucc_usuario = document.getElementById('ucc_usuario');
        ucc_usuario.value = sessionusuario;        
        
        var jsonResponse = AjaxUrl( "../Usuario/Linea.json?idregistro="+ucc_usuario.value );    
        if (jsonResponse.toString().trim() != "[]")
        {
            var objetoJson = JSON.parse(jsonResponse);    
            var ucc_cuenta = document.getElementById('ucc_cuenta');
            ucc_cuenta.value = objetoJson[0].cuenta ; 
        }
        
    }
*/

    
    
    



    var ucc_aceptar = document.getElementById('ucc_aceptar');
    ucc_aceptar.addEventListener('click',
        function()
        {  
            var form = document.getElementById("ucc_form");            
            var accion =  form.getAttribute('action') ; 
            var control = AjaxPeticionURL( accion, getDataForm(form) );                

            if (control.toString().trim() == "UpdateOK"){                
                window.location = "../login.jspx";
            }
            else{                    
                alerta_error(control);
            }   
        },
        false
    );


    var ucc_cancelar = document.getElementById('ucc_cancelar');
    ucc_cancelar.addEventListener('click',
        function()
        {
            window.location = "../login.jspx";
        },
        false
    );    


};
