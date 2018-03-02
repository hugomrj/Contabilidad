/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.usuario;


import nebuleuse.ORM.Persistencia;




/**
 *
 * @author hugo
 */
public class UsuarioSQL {
    
    
public String  Lista ( String buscar)
            throws Exception {
    
            String sql = "";        

            Persistencia persistencia = new Persistencia();
            sql =  persistencia.selectSQL(new Usuario(), buscar)  ;

            return sql ;
             
    }              



    
public String  UsuarioRecurso ( Usuario usuario, String url) {
    
        String sql = "";        
        
        sql = 
        "	SELECT \n" +
        "	  usuarios.usuario, \n" +
        "	  usuarios.cuenta, \n" +
        "	  recursos.url\n" +
        "	FROM \n" +
        "	  administracion.recursos, \n" +
        "	  administracion.usuarios, \n" +
        "	  administracion.interacciones_x_recursos, \n" +
        "	  administracion.roles_x_interacciones, \n" +
        "	  administracion.usuarios_x_roles\n" +
        "	WHERE \n" +
        "	  interacciones_x_recursos.recurso = recursos.recurso AND\n" +
        "	  interacciones_x_recursos.interaccion = roles_x_interacciones.interaccion AND\n" +
        "	  roles_x_interacciones.rol = usuarios_x_roles.rol AND\n" +
        "	  usuarios_x_roles.usuario = usuarios.usuario\n" +
        "	  and url like '"+url+"'\n" +
        "	  and usuarios.usuario = " + usuario.getUsuario() +
        "	  group by \n" +
        "		usuarios.usuario, \n" +
        "		usuarios.cuenta, \n" +
        "		recursos.url "  ;
             
        return sql ;
             
    }      






    
}
