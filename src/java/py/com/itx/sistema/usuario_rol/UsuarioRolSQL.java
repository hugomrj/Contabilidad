/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.usuario_rol;

import py.com.itx.sistema.rol.Rol;
import py.com.itx.sistema.usuario.Usuario;





/**
 *
 * @author hugo
 */
public class UsuarioRolSQL {
    
    
public String  SubLista ( Object objeto) {
    
        String sql = "";        
        String andwhere = "";        
        
        
        if (objeto.getClass() ==  Usuario.class){        
            Usuario usuario = new Usuario();
            usuario = (Usuario) objeto;
            andwhere = " and usuarios.usuario = " + usuario.getUsuario();
        }
        
        if (objeto.getClass() ==  Rol.class){        
            Rol rol = new Rol();
            rol = (Rol) objeto;
            andwhere = " and roles.rol = " + rol.getRol();
        }
        

        
        sql = 
        "	SELECT "+
        "       usuarios_x_roles.id, \n" +
        "	  usuarios.usuario, \n" +
        "	  usuarios.cuenta, \n" +
        "	  roles.rol, \n" +
        "	  roles.nombre_rol\n" +
        "	FROM \n" +
        "	  administracion.usuarios_x_roles, \n" +
        "	  administracion.usuarios, \n" +
        "	  administracion.roles\n" +
        "	WHERE \n" +
        "	  usuarios.usuario = usuarios_x_roles.usuario AND\n" +
        "	  roles.rol = usuarios_x_roles.rol\n" 
             + andwhere;       


        
        return sql ;
             
    }              




    
}
