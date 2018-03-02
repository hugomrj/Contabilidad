/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package py.com.itx.sistema.interaccion;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.Statement;


import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Conexion;
import nebuleuse.ORM.xml.Global;

import nebuleuse.util.Lista;


/**
 *
 * @author hugo
 */

public class InteraccionDAO {
    
        
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
        Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
        public Integer totalRegistros = 0;        
    
    
    public InteraccionDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }
    

    public List<Map<String, Object>>  ElementosModulo (Integer usuario, Integer modulo)
            throws Exception {
               
                statement = conexion.getConexion().createStatement();         
                
                String sql =  new InteraccionSQL().ElementosModulo(usuario, modulo);
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
            
            String sql = new InteraccionSQL().Lista(buscar);
                    
               
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
