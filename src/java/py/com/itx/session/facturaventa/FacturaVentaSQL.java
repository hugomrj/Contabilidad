/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturaventa;




/**
 *
 * @author hugo
 */
public class FacturaVentaSQL {
    
    
public String  Lista ( Integer cliente, Integer contador,  String buscar)
            throws Exception {

    
        String sql = "";        
    
        String condicionBusqueda = "";


        if (!(buscar.equals("")))
        {
            buscar = "%"+buscar+"%";
            buscar = buscar.replaceAll(" ", "%");

            condicionBusqueda = " and ( CAST ( numero_factura AS text) ||"
                    + "fecha_factura ||  emisor_descripcion ) ilike '%" + buscar+ "%' ";

        }            


        sql = " "+
            "	SELECT \n" +
            "	  factura, numero_factura, fecha_factura, emisor_descripcion, cliente, monto_total,\n" +
            "	  factura_ventas.contador\n" +
            "	FROM \n" +
            "	  aplicacion.contadores, \n" +
            "	  aplicacion.factura_ventas\n" +
            "	WHERE \n" +
            "	  contadores.contador = factura_ventas.contador\n" +
            "	  and  contadores.contador = " + contador +
            "	  and cliente = " + cliente +            
            "\n" 
            + condicionBusqueda +
            "	  \n" +
            "	order by fecha_factura desc" +
            "" ;


        return sql ;

    }              




    
}
