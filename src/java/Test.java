
import java.util.List;
import java.util.Map;
import nebuleuse.ORM.Persistencia;
import nebuleuse.ORM.web.HttpRequest;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.session.cliente.Cliente;
import py.com.itx.session.cliente.ClienteDAO;
import py.com.itx.sistema.modulo.ModuloDAO;
import py.com.itx.sistema.usuario.Usuario;


public class Test {
    
    
    public static  void main(String[] args) throws Exception   {

        
        


                
                
                
            Usuario usuario = Usuario.existeUsuario("admin", "");    
            
            
            
        Contador contador = new Contador();
        contador = new ContadorDAO().getContador(usuario);
        
            
System.out.println(contador);
                

                Cliente instancia = new Cliente();               
                Persistencia persistencia = new Persistencia();
                instancia = (Cliente) persistencia.filtrarId(instancia, 6);

                
System.out.println(instancia);                
System.out.println(instancia.getContador());                

    }
    
    
    
    
}


