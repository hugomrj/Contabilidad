var id = getParametroValor("id");    

window.onload = function() {


    AjaxPeticion( getRutaAbsoluta()+ '/MenuPrincipal','nav');   

    Cliente_basicform_disabled();  
    Cliente_basicform_Json(id);    
    
    // controlador de existe contador
    if (document.getElementById('cli_contador').value == "0"){
        window.location = getRutaAbsoluta()+"/Session/Cliente/Lista.jspx";
    }        
          

    Cliente_basicform();

    
    var clir_agregar = document.getElementById('clir_agregar');
    clir_agregar.addEventListener('click',
        function()
        {
            window.location=  getRutaAbsoluta()+ "/Session/Cliente/Agregar.jspx";
        },
        false
    );        


    var clir_editar = document.getElementById('clir_editar');
    clir_editar.addEventListener('click',
        function()
        {
            window.location = getRutaAbsoluta()+"/Session/Cliente/Editar.jspx?id="+id;
        },
        false
    );        




    var clir_borrar = document.getElementById('clir_borrar');
    clir_borrar.addEventListener('click',
        function()
        {
            var id = getParametroValor("id");    
            window.location = getRutaAbsoluta()+"/Session/Cliente/Borrar.jspx?id="+id;
        },
        false
    );        
    
    
    var clir_listar = document.getElementById('clir_listar');
    clir_listar.addEventListener('click',
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


