
var id = 0;
var id = getParametroValor("id");    

window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
    
    Rol_basicform_Json(id);    
    Rol_basicform();
     

    var role_aceptar = document.getElementById('role_aceptar');
    role_aceptar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            
            if (Rol_AgregarEditar_validacion())
            {
                
                var form = document.getElementById("role_form");            
                var accion =  getRutaAbsoluta()+"/Rol/Controlador/Editar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control)))
                {   
                    role_cancelar.click();
                }
                else
                {    
                    alerta_error(control);
                }                
            }  
        },
        false
    );        

    
    
    
    
    var role_cancelar = document.getElementById('role_cancelar');
    role_cancelar.addEventListener('click',
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


