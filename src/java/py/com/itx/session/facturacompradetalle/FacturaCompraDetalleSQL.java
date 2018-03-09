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
    
    
public String  Lista ( Integer factura )
            throws Exception {

    
        String sql = "";        
    
        


        sql = " "+
            "           SELECT \n" +
            "	compra_detalle, factura, \n" +
            "	cantidad, descripcion, precio_unitario,\n" +
            "	impuesto0, impuesto5, impuesto10, sub_total	       \n" +
            "	  FROM aplicacion.factura_compras_detalle\n" +
            "	  where factura = " + factura +
            "" ;


        return sql ;

    }              




    
}
