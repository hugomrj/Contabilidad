

function CabeceraFV (cliente ){

        AjaxPeticion( getRutaAbsoluta()+'/Session/FacturaVenta/jspf/cabeceraFV.jspx'
                ,'form_cabecera');           

        var path = getRutaAbsoluta()+"/Cliente/Linea.json?id="+cliente 
        var jsonResponse = AjaxUrl( path );    

    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {        
        var json = JSON.parse(jsonResponse);  
        
        document.getElementById('clic_cliente').value = VJson( json, "cliente", "N");
        
        var tipocli = VJson( json, "tipo").toString().trim();
        if (tipocli === "F"){            
            document.getElementById('cliente_descripcion').value =    
                    VJson( json, "nombre") + " " + VJson( json, "apellido");                        
        }
        if (tipocli === "J"){
            document.getElementById('cliente_descripcion').value =    
                    VJson( json, "razon_social") ;            
        }        
    }
    else
    {       
        document.getElementById('clic_cliente').value = 0;
        document.getElementById('cliente_descripcion').value = "";
    }
    
}





function CabeceraFV_disabled ( ){

    document.getElementById( 'numero_factura').disabled = true;
    document.getElementById( 'fecha_factura').disabled = true;
    document.getElementById( 'opt_CO').disabled = true;
    document.getElementById( 'opt_CR').disabled = true;
    document.getElementById( 'emisor_descripcion').disabled = true;

}





function CabeceraFV_json ( id ){

    var path = getRutaAbsoluta()+"/FacturaVenta/Linea.json?id="+id 
    var jsonResponse = AjaxUrl( path );    
    
    if ( (jsonResponse.toString().trim() != "[]") && (jsonResponse.toString().trim() != "error403") )           
    {        
        var json = JSON.parse(jsonResponse);  
        
        document.getElementById('clic_factura').value =  getJson(0, json, "factura", "N");        
        
        document.getElementById('clic_usuario').value =   getJson(0, json, "usuario", "N");        
        
        document.getElementById('clic_cliente').value =  json[0]["cliente"]["cliente"] ;
        document.getElementById('clic_contador').value =  json[0]["contador"]["contador"] ;
        
        var tipofun = json[0]["cliente"]["tipo"].toString().trim();
        
        if (tipofun === "F"){
             document.getElementById('cliente_descripcion').value =  
                      json[0]["cliente"]["nombre"].toString().trim() 
                      + " " + json[0]["cliente"]["apellido"].toString().trim() ;
        }
        if (tipofun === "J"){            
            document.getElementById('cliente_descripcion').value =  
                    json[0]["cliente"]["razon_social"].toString().trim() ;
        }        
        
        document.getElementById('numero_factura').value = VJson( json, "numero_factura");
        document.getElementById('fecha_factura').value = VJson( json, "fecha_factura", "D");
               
        
        var formapago = VJson( json, "forma_pago");
        if (formapago === "CO"){            
            document.getElementById("opt_CO").checked = true;  
            document.getElementById( 'opt_CR').checked = false;  
        }
        if (formapago === "CR"){            
            document.getElementById("opt_CO").checked = false;  
            document.getElementById( 'opt_CR').checked = true;  
        }
        
        document.getElementById('emisor_descripcion').value = VJson( json, "emisor_descripcion");
        
    }
    else
    {        
        
    }        


}
