/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 
package py.com.itx.sistema.usuario;

import javax.servlet.http.HttpServletRequest;
import nebuleuse.ORM.Persistencia;


public class Usuario {
    
    private Integer usuario;
    private String cuenta;
    private String clave;
    

    public Integer getUsuario() {
        return usuario;
    }

    public void setUsuario(Integer usuario) {
        this.usuario = usuario;
    }

    public String getCuenta() {
        return cuenta;
    }

    public void setCuenta(String cuenta) {
        this.cuenta = cuenta;
    }
    


    public String getClave() {        
        String strRetornar = "md5('"+clave+"')";               
        return strRetornar;      
    }

    public void setClave(String clave) {
        this.clave = clave;
    }
        
    
       
       
    
      public static Usuario existeUsuario(String cuenta, String pass) throws Exception {      

          Usuario objUsuario = new Usuario();  

          String sql = 
                    " SELECT usuario, cuenta, clave "
                    + " FROM administracion.usuarios "
                    + " WHERE cuenta like '"+cuenta+"'  " 
                    + "and clave like md5('"+pass+"')" ;  
          


        
        
          Persistencia persistencia = new Persistencia();            
          objUsuario = (Usuario) persistencia.sqlToObject(sql, objUsuario);
          
          if (objUsuario != null){
            objUsuario.setCuenta("");
          }
          

          return objUsuario;          
          

      }
     
      
      

    public Usuario getSession( HttpServletRequest request) {        
              
        Usuario u = new Usuario();
        u = (Usuario) request.getSession().getAttribute("SessionUsuario");
                
        
        if (u == null)
        {  
            return null;
        }
        else
        {
            return u;
        }

    }      


}
