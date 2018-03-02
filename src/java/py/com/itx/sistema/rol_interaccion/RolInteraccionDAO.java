/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.rol_interaccion;


import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Conexion;
import nebuleuse.ORM.xml.Global;
import nebuleuse.util.Lista;
import py.com.itx.sistema.interaccion.Interaccion;
import py.com.itx.sistema.rol.Rol;



/**
 *
 * @author hugom_000
 */

public class RolInteraccionDAO  {
        
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
        Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
        Integer sublineas = Integer.parseInt(new Global().getValue("lineasSub"));
        public Integer totalRegistros = 0;
        
    
    public RolInteraccionDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }

        
    
    public List<Map<String, Object>>  SubLista ( Object objeto )
            throws Exception {    
                
            String sql = "";
            RolInteraccionSQL rolInteraccionSql = new RolInteraccionSQL();


                if (objeto.getClass() ==  Rol.class){        
                    Rol rol = new Rol();
                    rol = (Rol) objeto;
                    sql = rolInteraccionSql.SubLista(rol);            
                }


                if (objeto.getClass() ==  Interaccion.class){        
                    Interaccion interaccion = new Interaccion();
                    interaccion = (Interaccion) objeto;
                    sql = rolInteraccionSql.SubLista(interaccion);                
                }                
                
                
                
            statement = conexion.getConexion().createStatement();  
            
            resultset = statement.executeQuery(sql);     

            return lista.resultsetToList(resultset ) ;
             
    }                          
    
    
    
    
    
    
    public List<Map<String, Object>>  Lista ( String buscar, Integer page )
            throws Exception {
            
            page = (page==0) ? 1 : page;
        
            page = (lineas * page) - lineas ;        
            String limite_offset = "  limit " + lineas + " "+ 
                    " offset " + page  ;
            
            statement = conexion.getConexion().createStatement();  
            
            //String sql = new RolSQL().Lista(buscar);
            String sql = "";
               
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
        


    
}
