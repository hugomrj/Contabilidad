/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturaventadetalle;


import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Conexion;
import nebuleuse.ORM.xml.Global;
import nebuleuse.util.Lista;
import py.com.itx.aplicacion.contador.Contador;



/**
 *
 * @author hugom_000
 */

public class FacturaVentaDetalleDAO  {
        
        Conexion conexion = new Conexion();
        Statement  statement ;
        ResultSet resultset;  
        Lista lista ;
        Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
        public Integer totalRegistros = 0;
        
    
    public FacturaVentaDetalleDAO ( ) throws IOException  {
        conexion.conectar();
        lista = new Lista();
    }

        
    
    public List<Map<String, Object>>  FacturaDetalle ( Integer factura, Contador contador )
            throws Exception {

            statement = conexion.getConexion().createStatement();              
            
            String sql = ""    ;        
            if (contador == null){
                sql = new FacturaVentaDetalleSQL().FacturaDetalle(factura, 0);
            }
            else{
                sql = new FacturaVentaDetalleSQL().FacturaDetalle(factura, 
                        contador.getContador());
            }            
            
            resultset = statement.executeQuery(sql);     

            return lista.resultsetToList(resultset ) ;
             
    }                  
        
    
    
    
    public Boolean BorrarFacturaDetalle ( Integer factura ) 
            throws SQLException{

        Boolean bool = false;   
            
        try
        {
            statement = conexion.getConexion().createStatement();      
            
            String sql = "  delete FROM aplicacion.factura_ventas_detalle \n" +
                            "  where factura =  "  + factura    ;        
            
            statement.execute(sql);    
            bool = true;
        }
        catch (SQLException SqlEx)
        {                              
            bool = false;            
            //System.out.println(SqlEx);
        }                    
            
        return bool;
             
    }                  
        
        
    
    
    
    
}
