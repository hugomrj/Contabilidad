

window.onload = function() {
            

    var cuenta = document.getElementById('cuenta');        
    cuenta.addEventListener('keyup',
        function(event) {                
            if(event.keyCode == 13)
            {                   
                ingresar.click();            
            }            
        },
        false
    );
    cuenta.focus();
    
    
    var clave = document.getElementById('clave');        

    clave.addEventListener('keyup',
        function(event) {                
            if(event.keyCode == 13)
            {                   
                ingresar.click();            
            }            
        },
        false
    );

        
    
    var ingresar = document.getElementById('ingresar');
    ingresar.addEventListener('click',
        function() 
        {
            
            /*
            session = AjaxUrl ("../Usuario/Session") ;
            if (session == null){
                window.location = "../";    
                return;
            }
            else{
                
            }
           */
          
            javascript:document.form_login.submit(); 
            
            
        }, 
        false
    );  

     
                                        
};



































