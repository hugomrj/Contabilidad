/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.modulo;


import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Conexion;
import nebuleuse.util.Lista;
import py.com.itx.sistema.usuario.Usuario;

public class ModuloDAO {
    
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
    
    
    
    public ModuloDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }

    
    public List<Map<String, Object>>  ModuloListar ( Usuario usuario )
            throws Exception {        
        
        statement = conexion.getConexion().createStatement(); 
        
                           
            String strSQL = 
            "	    SELECT \n" +
            "                  modulos.modulo, modulos.descripcion \n" +
            "                  FROM \n" +
            "                  administracion.modulos, administracion.interacciones, \n" +
            "                  administracion.roles_x_interacciones, administracion.roles, \n" +
            "                  administracion.usuarios_x_roles, administracion.usuarios \n" +
            "                  WHERE \n" +
            "                  modulos.modulo = interacciones.modulo AND \n" +
            "                  interacciones.interaccion = roles_x_interacciones.interaccion AND \n" +
            "                  roles_x_interacciones.rol = roles.rol AND \n" +
            "                  roles.rol = usuarios_x_roles.rol AND \n" +
            "                  usuarios_x_roles.usuario = usuarios.usuario \n" +
            "                  and usuarios.usuario =   " + usuario.getUsuario().toString() +
            "                  group by   modulos.modulo,  modulos.descripcion \n" +
            "                  order by modulos.modulo;   " ;

            
        
        resultset = statement.executeQuery(strSQL);     
        
         return lista.resultsetToList(resultset ) ;
        
    }
    
    
    
    
    
    
    public List<Map<String, Object>>  ListaSimple (  )
            throws Exception {
   
            statement = conexion.getConexion().createStatement();  
            
            String sql = 
                    " SELECT modulo, descripcion\n" +
                    "  FROM administracion.modulos\n" +
                    "  order by modulo";
    
            
            resultset = statement.executeQuery(sql);     

            return lista.resultsetToList(resultset ) ;
             
    }              
    
    
    
    
}
