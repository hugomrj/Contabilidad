
var id = 0;
var id = getParametroValor("id");    

window.onload = function() {

    
    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');       
    
    Interaccion_basicform_Json(id);      
    Interaccion_basicform();
 

    var interf_nombre = document.getElementById('interf_nombre');
    interf_nombre.focus();
    interf_nombre.select();

    
    
    var intere_aceptar = document.getElementById('intere_aceptar');
    intere_aceptar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            
            if (Interaccion_AgregarEditar_validacion())
            {
                
                
                
                var form = document.getElementById("intere_form");            
                var accion =  getRutaAbsoluta()+"/Interaccion/Controlador/Editar"; 
                var control = AjaxPeticionURL( accion, getDataForm(form) );                



                if (!(isNaN(control)))
                {   
                   //alert("es numero");                        
                    //window.location = "../Cliente/Registro.jspx?id="+control.toString().trim();                    
                    intere_cancelar.click();
                }
                else
                {    
                    alerta_error(control);
                }                
            }  
        },
        false
    );        

    
    
    
    
    var intere_cancelar = document.getElementById('intere_cancelar');
    intere_cancelar.addEventListener('click',
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


