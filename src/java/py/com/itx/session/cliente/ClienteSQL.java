/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.cliente;





/**
 *
 * @author hugo
 */
public class ClienteSQL {
    
    
public String  Lista ( String buscar, Integer contador)
            throws Exception {
    
            String sql = "";        


            
            if (contador == null){
                contador = 0;
            }
            
            String condicionBusqueda = "";
            
            if (!(buscar.equals("")))
            {
                buscar = "%"+buscar+"%";
                buscar = buscar.replaceAll(" ", "%");
            
                condicionBusqueda = " where ( CAST ( cedula AS text) || tipo || ruc ||  nombres ||  direccion ) ilike '%" + buscar+ "%' ";
 
            }            
                        
            
            sql = " "+
                "	select cliente, tipo, ruc, cedula, nombres, direccion, contador\n" +
                "	 from \n" +
                "	(\n" +
                "	SELECT cliente,  'Fisica' as tipo ,  ruc, cedula,\n" +
                "	(nombre || ' ' || apellido) as  nombres,direccion, contador\n" +
                "	  FROM aplicacion.clientes\n" +
                "	  where cliente_tipo = 'F'\n" +
                "	  and  contador = "+contador+" \n" +
                "	union\n" +
                "\n" +
                "	SELECT cliente, 'Juridica' as tipo , ruc, 0, razon_social, \n" +
                "	       direccion, contador\n" +
                "	  FROM aplicacion.clientes\n" +
                "	 where cliente_tipo = 'J'\n" +
                "	 and  contador = "+contador+" \n" +
                "	) as c\n" +                
                "\n" + condicionBusqueda +
                "	order by cliente\n" +
                "" ;
                        

            return sql ;
             
    }              


public String  PerteneceContador ( Integer cliente, Integer contador)
            throws Exception {
    
            String sql = "";        

            if (contador == null){
                contador = 0;
            }
            
            
            sql = " "+
                " SELECT cliente\n" +
                "  FROM aplicacion.clientes\n" +
                "  where cliente = \n" + cliente +
                "  and contador =" + contador+ 
                "" ;
                        

            return sql ;
             
    }              




    
}
