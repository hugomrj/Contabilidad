/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompra;






/**
 *
 * @author hugo
 */
public class FacturaCompraSQL {
    
    
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
            "	  factura_compras.contador\n" +
            "	FROM \n" +
            "	  aplicacion.contadores, \n" +
            "	  aplicacion.factura_compras\n" +
            "	WHERE \n" +
            "	  contadores.contador = factura_compras.contador\n" +
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
