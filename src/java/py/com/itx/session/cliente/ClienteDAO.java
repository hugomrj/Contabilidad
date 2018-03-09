/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.cliente;


import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import nebuleuse.ORM.Conexion;
import nebuleuse.ORM.xml.Global;
import nebuleuse.util.Lista;
import py.com.itx.aplicacion.contador.Contador;

/**
 *
 * @author hugom_000
 */


public class ClienteDAO  {
        
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
        Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
        public Integer totalRegistros = 0;
        
    
    public ClienteDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }

    
    public List<Map<String, Object>>  Lista ( String buscar, Integer page, Contador contador )
            throws Exception {

                    
            page = (page==0) ? 1 : page;
        
            page = (lineas * page) - lineas ;        
            String limite_offset = "  limit " + lineas + " "+ 
                    " offset " + page  ;
            
            statement = conexion.getConexion().createStatement();
    

            String sql = ""    ;        
            if (contador == null){
                sql = new ClienteSQL().Lista(buscar, 0);
            }
            else{
                sql = new ClienteSQL().Lista(buscar, contador.getContador());
            }

        
               
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
  
    
    
    public Boolean IsPerteneceContador(Integer cliente, Integer contador){
    
            try {
                
                statement = conexion.getConexion().createStatement();
                resultset = statement.executeQuery(new ClienteSQL().PerteneceContador(cliente, contador) );
                
                if (resultset.next() == false) {
                    return false ;
                }
                else{
                    return true ;
                }   
            
            } catch (Exception ex) {
                return false ;
            }
    }
    
    
    
    
}
















