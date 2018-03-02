/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.rol_interaccion;

import py.com.itx.sistema.interaccion.Interaccion;
import py.com.itx.sistema.rol.Rol;
import py.com.itx.sistema.usuario.Usuario;





/**
 *
 * @author hugo
 */
public class RolInteraccionSQL {
    
    
public String  SubLista ( Object objeto) {
    
        String sql = "";        
        String andwhere = "";        
        
        

        if (objeto.getClass() ==  Rol.class){        
            Rol rol = new Rol();
            rol = (Rol) objeto;
            andwhere = " and roles.rol = " + rol.getRol();
        }
        
        if (objeto.getClass() ==  Interaccion.class){        
            Interaccion interaccion = new Interaccion();
            interaccion =  (Interaccion) objeto;
            andwhere = " and interacciones.interaccion = " + interaccion.getInteraccion();
        }
        
        
        sql = 
                "           SELECT \n" +
                "	  roles_x_interacciones.id, \n" +                
                "	  roles.rol, \n" +
                "	  roles.nombre_rol, \n" +
                "	  interacciones.interaccion, \n" +
                "	  interacciones.nombre_interaccion, \n" +
                "	  interacciones.modulo, \n" +
                "	  interacciones.orden\n" +
                "	FROM \n" +
                "	  administracion.roles_x_interacciones, \n" +
                "	  administracion.roles, \n" +
                "	  administracion.interacciones\n" +
                "	WHERE \n" +
                "	  roles.rol = roles_x_interacciones.rol AND\n" +
                "	  interacciones.interaccion = roles_x_interacciones.interaccion\n" 
                             + andwhere;       


        
        return sql ;
             
    }              




    
}
