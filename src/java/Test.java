
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Persistencia;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.session.cliente.Cliente;
import py.com.itx.session.cliente.ClienteDAO;

import py.com.itx.session.facturacompradetalle.FacturaCompraDetalleDAO;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle_Transaccion;
import py.com.itx.session.facturaventa.FacturaVentaDAO;
import py.com.itx.sistema.usuario.Usuario;


public class Test {
    
    
    public static  void main(String[] args) throws Exception   {

        
        
Persistencia p = new Persistencia();
Cliente cli = new Cliente();


System.out.println(new FacturaCompraDetalle_Transaccion().getListaObjeto().size() );



FacturaVentaDAO dao = new FacturaVentaDAO();            
                 
List<Map<String, Object>> rows = dao.Lista(1, 2, "", 1);    
            
            
            
            
    }
    
    
    
    
}


