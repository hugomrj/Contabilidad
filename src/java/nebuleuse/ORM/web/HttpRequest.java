/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nebuleuse.ORM.web;
import javax.servlet.http.HttpServletRequest;



public  class HttpRequest {
    
    
    
    public Integer getPage (HttpServletRequest request)
    {
        
        Integer page = 1;
        try {            
            if (request.getParameter("page") != null){
                page = Integer.parseInt( request.getParameter("page") );
            }
        } catch (NumberFormatException nfe){
          page =  1;
        }  
        return page;
        
    }
    
    
    
    
    
    public String getBuscar (HttpServletRequest request)
    {
        String retornar = null;
        
        if ( request.getParameter("buscar") != null) 
        {
            retornar = (String) request.getParameter("buscar");
            retornar = retornar.toString().trim();
        }
                
        return retornar;
    }
    
   


    
    
}
