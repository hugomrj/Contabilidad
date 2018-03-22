/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturaventadetalle;


/**
 *
 * @author hugo
 */
public class FacturaVentaDetalleSQL {
    
    
public String  FacturaDetalle ( Integer factura, Integer contador )
            throws Exception {

    
        String sql = "";        
    
        sql = " "+
                "           SELECT  \n" +
                "        	  factura_ventas_detalle.venta_detalle,  \n" +
                "        	  factura_ventas_detalle.factura,  \n" +
                "        	  factura_ventas_detalle.descripcion,  \n" +
                "        	  factura_ventas_detalle.cantidad,  \n" +
                "        	  factura_ventas_detalle.precio_unitario,  \n" +
                "        	  factura_ventas_detalle.sub_total,  \n" +
                "        	  factura_ventas_detalle.impuesto0,  \n" +
                "        	  factura_ventas_detalle.impuesto5,  \n" +
                "        	  factura_ventas_detalle.impuesto10,  \n" +
                "        	  factura_ventas_detalle.impuesto_porcentaje \n" +
                "        	FROM  \n" +
                "        	  aplicacion.factura_ventas,  \n" +
                "        	  aplicacion.factura_ventas_detalle \n" +
                "        	WHERE  \n" +
                "        	  factura_ventas.factura = factura_ventas_detalle.factura \n" +
                "        	  and factura_ventas.factura =   " + factura +
                "        	  and factura_ventas.contador =  " + contador ;
        
        
        return sql ;

    }              




    
}
