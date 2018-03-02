var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
        
    Usuario_basicform_Json(id);        
    Usuario_basicform();    
    Usuario_basicform_disabled();
    Usuario_Tabulaciones();

    

    
    var usur_agregar = document.getElementById('usur_agregar');
    usur_agregar.addEventListener('click',
        function()
        {
            window.location= getRutaAbsoluta()+"/Sistema/Usuario/Agregar.jspx";
        },
        false
    );        


    var usur_editar = document.getElementById('usur_editar');
    usur_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Usuario/Editar.jspx?id="+id;
        },
        false
    );        




    var usur_borrar = document.getElementById('usur_borrar');
    usur_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Sistema/Usuario/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var usur_listar = document.getElementById('usur_listar');
    usur_listar.addEventListener('click',
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





function Usuario_Tabulaciones() {
    
    var tab_roles = document.getElementById('tab_roles');
        
    var fxDesmarcar = function () {
        tab_roles.classList.remove('select');          
    }
    

    tab_roles.addEventListener('click',
        function()
        {          
            fxDesmarcar();
            tab_roles.setAttribute("class", "select");      
            
            // pestaña usuarios
            
            AjaxPeticion( getRutaAbsoluta()+'/UsuarioRol/Coleccion/Rol?usuario='
                + document.getElementById('usuf_usuario').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');                     
            
            UsuarioRol_tabla_registro_Rol("usuarioro_rol_tabla");
                        
            
            
            
            var usur_agregar_roles = document.getElementById('usur_agregar_roles');
            
            
            
            
            usur_agregar_roles.addEventListener('click',
                function()
                {                    
                    UsuarioRol_modal_agregar_Rol(  document.getElementById('usuf_usuario').value );            
                },
                false
            );                
                       
            
        },
        false
    );      
    
    tab_roles.click();
    
    
}

