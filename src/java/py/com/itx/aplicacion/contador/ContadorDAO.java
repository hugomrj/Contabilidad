/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.aplicacion.contador;




import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import nebuleuse.ORM.Conexion;
import nebuleuse.ORM.Persistencia;
import nebuleuse.ORM.xml.Global;
import nebuleuse.util.Lista;
import py.com.itx.sistema.usuario.Usuario;


/**
 *
 * @author hugom_000
 */

public class ContadorDAO  {
        
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
        Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
        public Integer totalRegistros = 0;
        
    
    public ContadorDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }

        
    
    public List<Map<String, Object>>  Lista ( String buscar, Integer page )
            throws Exception {

            
            page = (page==0) ? 1 : page;
        
            page = (lineas * page) - lineas ;        
            String limite_offset = "  limit " + lineas + " "+ 
                    " offset " + page  ;
            
            statement = conexion.getConexion().createStatement();  
            
            String sql = new ContadorSQL().Lista(buscar);
                    
               
            String sqlCount = " select count(*) as rows from ( "
                    + sql 
                    + " ) as C ";
               
            resultset = statement.executeQuery(sqlCount);                 
            if (resultset.next()){
                this.totalRegistros =  Integer.parseInt(resultset.getString(1));
            }
                
                
            sql = sql + limite_offset ;
            resultset = statement.executeQuery(sql);     

            return lista.resultsetToList(resultset ) ;
             
    }                  
        
 

    
    
      public Contador getContador(Usuario usuario) throws Exception {      

          Contador contador = new Contador();  
          
          Persistencia persistencia = new Persistencia();         
          
          String sql = persistencia.selectSQL(contador, usuario ) ; 
          
          contador = (Contador) persistencia.sqlToObject(sql, contador);
          
          return contador;          
          
      }
     
          
      public Contador getContador(HttpServletRequest request)              
              throws Exception {      

                Usuario usuario = new Usuario();
              
                usuario = (Usuario) request.getSession().getAttribute("SessionUsuario");
                
                return this.getContador(usuario);
          
      }
     
    
    
    
    
    
}
