

var id = getParametroValor("id");    

window.onload = function() {

    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   
        
    Contador_basicform_Json(id);            
    Contador_basicform_disabled();
    
    
    
    var contar_agregar = document.getElementById('contar_agregar');
    contar_agregar.addEventListener('click',
        function()
        {
            window.location= getRutaAbsoluta()+"/Aplicacion/Contador/Agregar.jspx";
        },
        false
    );        


    var contar_editar = document.getElementById('contar_editar');
    contar_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Aplicacion/Contador/Editar.jspx?id="+id;
        },
        false
    );        


    var contar_borrar = document.getElementById('contar_borrar');
    contar_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Aplicacion/Contador/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var contar_listar = document.getElementById('contar_listar');
    contar_listar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Aplicacion/Contador/Lista.jspx";
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


