

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
                    
    document.getElementById('grupoFisico').style.display = 'block' ;
    document.getElementById('grupoJuridico').style.display = 'none' ;          
                              
    Cliente_basicform();
    
    
    
    /*
    var cli_cedula = document.getElementById( 'cli_cedula');
    cli_cedula.focus();
    cli_cedula.select();
    */



    var clia_guardar = document.getElementById('clia_guardar');
    clia_guardar.addEventListener('click',
        function() 
        {
            
            if (Clientes_AgregarEditar_validacion())
            {
                var form = document.getElementById("clia_form");            
                           
                var accion =  getRutaAbsoluta()+"/Cliente/Controlador/Agregar"; 
                
                FuncionacionCamposOcultos();
                
                var control = AjaxPeticionURL( accion, getDataForm(form) );                

                if (!(isNaN(control))){                                          
                     window.location = getRutaAbsoluta()+"/Session/Cliente/Registro.jspx?id="+control.toString().trim();        
                }
                else{                    
                    alerta_error(control);
                }
            }
        }, 
        false
    );  
    
    
    var clia_cancelar = document.getElementById('clia_cancelar');
    clia_cancelar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Session/Cliente/Lista.jspx";
        },
        false
    );        






};

window.onresize = function() {
    
    var nodeList = document.querySelectorAll('.fondo_oscuro');
    for (var i = 0; i < nodeList.length; ++i) {
        document.getElementById(nodeList[i].id).style.height = document.body.scrollHeight;        
    }

};


