

var id = getParametroValor("id");    



window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
        
    Rol_basicform_Json(id);        
    Rol_basicform();    
    Rol_basicform_disabled();
    Rol_Tabulaciones();

    
    var rolr_agregar = document.getElementById('rolr_agregar');
    rolr_agregar.addEventListener('click',
        function()
        {
            window.location= getRutaAbsoluta()+"/Sistema/Rol/Agregar.jspx";
        },
        false
    );        


    var rolr_editar = document.getElementById('rolr_editar');
    rolr_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Rol/Editar.jspx?id="+id;
        },
        false
    );        




    var rolr_borrar = document.getElementById('rolr_borrar');
    rolr_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Sistema/Rol/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var rolr_listar = document.getElementById('rolr_listar');
    rolr_listar.addEventListener('click',
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





function Rol_Tabulaciones() {
    
    var tab_usuarios = document.getElementById('tab_usuarios');
    var tab_interaccion = document.getElementById('tab_interaccion');
    
    var fxDesmarcar = function () {
        tab_usuarios.classList.remove('select');  
        tab_interaccion.classList.remove('select');  
    }
    

    tab_usuarios.addEventListener('click',
        function()
        {          
            fxDesmarcar();
            tab_usuarios.setAttribute("class", "select");      
            
            AjaxPeticion( getRutaAbsoluta()+'/UsuarioRol/Coleccion/Usuario?rol='
                + document.getElementById('rolf_rol').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');                     
            
            UsuarioRol_tabla_registro_Usuario("usuariorol_usuario_tabla");            
            
            var usuariorol_usuario_agregar = document.getElementById('usuariorol_usuario_agregar');
            usuariorol_usuario_agregar.addEventListener('click',
                function()
                {                                       
                    UsuarioRol_modal_agregar_Usuario(  document.getElementById('rolf_rol').value );            
                },
                false
            );                            
            
        },
        false
    );      
    
    
    tab_interaccion.addEventListener('click',
        function()
        {          
            fxDesmarcar();
            tab_interaccion.setAttribute("class", "select");    
            
            AjaxPeticion( getRutaAbsoluta()+'/RolInteraccion/Coleccion/Interaccion?rol='
                + document.getElementById('rolf_rol').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');                                 
            
            RolInteraccion_tabla_registro_Interaccion("rolinteraccion_interaccion_tabla");
                        
            var riir_agregar_roles = document.getElementById('riir_agregar_roles');
            riir_agregar_roles.addEventListener('click',
                function()
                {                                       
                    RolInteraccion_modal_agregar_Interaccion(  document.getElementById('rolf_rol').value );            
                },
                false
            );                                        
        },
        false
    );      
            
    tab_usuarios.click();
    
}

