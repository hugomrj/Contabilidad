

var id = getParametroValor("id");    



window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
        
    Recurso_basicform_Json(id);        
    Recurso_basicform();    
    Recurso_basicform_disabled();
    Recursos_Tabulaciones();

    
    var recurr_agregar = document.getElementById('recurr_agregar');
    recurr_agregar.addEventListener('click',
        function()
        {
            window.location= getRutaAbsoluta()+"/Sistema/Recurso/Agregar.jspx";
        },
        false
    );        


    var recurr_editar = document.getElementById('recurr_editar');
    recurr_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Sistema/Recurso/Editar.jspx?id="+id;
        },
        false
    );        




    var recurr_borrar = document.getElementById('recurr_borrar');
    recurr_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Sistema/Recurso/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var recurr_listar = document.getElementById('recurr_listar');
    recurr_listar.addEventListener('click',
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







function Recursos_Tabulaciones() {
    
    
    var tab_interaccion = document.getElementById('tab_interaccion');
    
    var fxDesmarcar = function () {        
        tab_interaccion.classList.remove('select');  
    }
    
    
    tab_interaccion.addEventListener('click',
        function()
        {         
            
            fxDesmarcar();
            tab_interaccion.setAttribute("class", "select");    
            
            AjaxPeticion( getRutaAbsoluta()+'/InteraccionRecurso/Coleccion/Interaccion?recurso='
                + document.getElementById('recurf_recurso').value 
                +""  
                +"&page="+"1"
                ,'tab_contenido');                                 
    
            InteraccionRecurso_tabla_registro_Interaccion ("interaccionRecurso_recurso_tabla");
    
            var irra_agregar_interaccion = document.getElementById('irra_agregar_interaccion');
            irra_agregar_interaccion.addEventListener('click',
                function()
                {     
                    InteraccionRecurso_modal_agregar_Interaccion(  document.getElementById('recurf_recurso').value );            
                },
                false
            );                                        
    
        },
        false
    );      
            
    tab_interaccion.click();

}






