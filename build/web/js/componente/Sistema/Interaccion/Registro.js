var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
        
    Interaccion_basicform_Json(id);            
    
    Interaccion_basicform_disabled();
    document.getElementById('interf_modulo_buscar').style.display = 'none';
    Interaccion_Tabulaciones();
    
    
    var interr_agregar = document.getElementById('interr_agregar');
    interr_agregar.addEventListener('click',
        function()
        {
            window.location= getRutaAbsoluta()+"/Sistema/Interaccion/Agregar.jspx";
        },
        false
    );        


    var interr_editar = document.getElementById('interr_editar');
    interr_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Editar.jspx?id="+id;
        },
        false
    );        


    var interr_borrar = document.getElementById('interr_borrar');
    interr_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var interr_listar = document.getElementById('interr_listar');
    interr_listar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Interaccion/Lista.jspx";
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




            
function Interaccion_Tabulaciones() {
    
    var tab_roles = document.getElementById('tab_roles');
    var tab_recursos = document.getElementById('tab_recursos');
    
    
    
    
    var fxDesmarcar = function () {
        tab_roles.classList.remove('select');          
        tab_recursos.classList.remove('select');          
    }
    
    
    
    

    tab_roles.addEventListener('click',
        function()
        {          
            fxDesmarcar();
            tab_roles.setAttribute("class", "select");      
      
            AjaxPeticion( getRutaAbsoluta()+'/RolInteraccion/Coleccion/Rol?interaccion='
                + document.getElementById('interf_interaccion').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');       
            
            RolInteraccion_tabla_registro_Rol("rolinteraccion_rol_tabla");
            
            var rira_agregar_roles = document.getElementById('rira_agregar_roles');
            rira_agregar_roles.addEventListener('click',
                function()
                {                                                           
                    RolInteraccion_modal_agregar_Rol(  document.getElementById('interf_interaccion').value );                                
                },
                false
            );                       
        },
        false
    );      
    
    
    
    
    tab_recursos.addEventListener('click',
        function()
        {          
            fxDesmarcar();
            tab_recursos.setAttribute("class", "select");      
            
            
            AjaxPeticion( getRutaAbsoluta()+'/InteraccionRecurso/Coleccion/Recurso?interaccion='
                + document.getElementById('interf_interaccion').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');       

      
            InteraccionRecurso_tabla_registro_Recurso("interaccionRecurso_recurso_tabla");
            
            var irra_agregar_recurso = document.getElementById('irra_agregar_recurso');
            irra_agregar_recurso.addEventListener('click',
                function()
                {                                
                    InteraccionRecurso_modal_agregar_Recurso(  document.getElementById('interf_interaccion').value );                                                    
                },
                false
            );                       
        },
        false
    );      
    
    
     
    tab_roles.click();
    
}

