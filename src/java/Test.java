
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Persistencia;
import nebuleuse.ORM.web.HttpRequest;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.session.cliente.Cliente;
import py.com.itx.session.cliente.ClienteDAO;
import py.com.itx.session.facturaventa.FacturaCompraDAO;
import py.com.itx.session.facturaventa.FacturaCompraSQL;
import py.com.itx.sistema.modulo.ModuloDAO;
import py.com.itx.sistema.usuario.Usuario;


public class Test {
    
    
    public static  void main(String[] args) throws Exception   {

        
        


                
                
                
            Usuario usuario = Usuario.existeUsuario("admin", "");    
            
            
            
        Contador contador = new Contador();
        contador = new ContadorDAO().getContador(usuario);
        
            
FacturaCompraSQL f = new FacturaCompraSQL();

        
System.out.println(f.Lista(1, 2, "palabra hola"));


FacturaCompraDAO d = new FacturaCompraDAO();

        
                 

    }
    
    
    
    
}


