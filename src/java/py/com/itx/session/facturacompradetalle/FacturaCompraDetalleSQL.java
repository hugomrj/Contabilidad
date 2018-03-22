/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompradetalle;

/**
 *
 * @author hugo
 */
public class FacturaCompraDetalleSQL {
    
    
public String  FacturaDetalle ( Integer factura, Integer contador )
            throws Exception {

    
        String sql = "";        
    
        sql = " "+
        "	SELECT \n" +
        "	  factura_compras_detalle.compra_detalle, \n" +
        "	  factura_compras_detalle.factura, \n" +
        "	  factura_compras_detalle.descripcion, \n" +
        "	  factura_compras_detalle.cantidad, \n" +
        "	  factura_compras_detalle.precio_unitario, \n" +
        "	  factura_compras_detalle.sub_total, \n" +
        "	  factura_compras_detalle.impuesto0, \n" +
        "	  factura_compras_detalle.impuesto5, \n" +
        "	  factura_compras_detalle.impuesto10, \n" +
        "	  factura_compras_detalle.impuesto_porcentaje\n" +
        "	FROM \n" +
        "	  aplicacion.factura_compras, \n" +
        "	  aplicacion.factura_compras_detalle\n" +
        "	WHERE \n" +
        "	  factura_compras.factura = factura_compras_detalle.factura\n" +
        "	  and factura_compras.factura = " + factura +
        "	  and factura_compras.contador = " + contador ;



        
        
        return sql ;

    }              




    
}
