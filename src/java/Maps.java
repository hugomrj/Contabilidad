
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Persistencia;
import nebuleuse.ORM.RegistroMap;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.session.cliente.Cliente;
import py.com.itx.session.cliente.ClienteDAO;
import py.com.itx.session.facturacompra.FacturaCompra;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle;

import py.com.itx.session.facturacompradetalle.FacturaCompraDetalleDAO;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle_Transaccion;
import py.com.itx.sistema.usuario.Usuario;


public class Maps {
    
    
    public static  void main(String[] args) throws Exception   {

        Persistencia persistencia = new Persistencia();
        FacturaCompra factura_compra = new FacturaCompra();

        factura_compra = (FacturaCompra) persistencia.filtrarId(factura_compra, 22);

            

Boolean res = new FacturaCompraDetalleDAO().BorrarFacturaDetalle( factura_compra.getFactura() );

System.out.println(res);

    }


    
    
    
}


