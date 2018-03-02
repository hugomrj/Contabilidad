/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.interaccion;

import nebuleuse.ORM.Persistencia;



/**
 *
 * @author hugo
 */
public class InteraccionSQL {
    

    
    public String  ElementosModulo (Integer usuario, Integer modulo)
            throws Exception {
        
                
                String sql = " "+                        
                "                      SELECT interacciones.interaccion, nombre_interaccion, url \n" +
                "                      FROM administracion.interacciones, \n" +
                "                      ( \n" +
                "                          SELECT interaccion \n" +
                "                          FROM administracion.usuarios_x_roles, administracion.roles_x_interacciones \n" +
                "                          where usuarios_x_roles.rol = roles_x_interacciones.rol \n" +
                "                          and usuarios_x_roles.usuario =  " +  usuario +
                "                      ) as t \n" +
                "                      WHERE t.interaccion = interacciones.interaccion \n" +
                "                      and interacciones.modulo = " + modulo +
                "                      group by interacciones.interaccion, nombre_interaccion, url, orden  \n" +
                "                      order by interacciones.orden ;\n" +
                "\n" +
                "" ;
                
                return sql ;
             
    }              
    
    
    
    public String  Lista ( String buscar)
            throws Exception {
                
            
            if (buscar != ""){
                buscar = buscar.replaceAll(" ", "%");
            }
        
            String sql = "";        
            //Persistencia persistencia = new Persistencia();
            
            //sql =  persistencia.selectSQL(new Interaccion(), buscar)  ;

            sql =
                "	SELECT \n" +
                "	  interacciones.interaccion, \n" +
                "	  interacciones.nombre_interaccion, \n" +
                "	  interacciones.modulo, \n" +
                "	  interacciones.orden, \n" +
                "	  interacciones.url, \n" +
                "	  modulos.descripcion modulo_descripcion\n" +
                "	FROM \n" +
                "	  administracion.interacciones, \n" +
                "	  administracion.modulos\n" +
                "	WHERE \n" +
                "	  modulos.modulo = interacciones.modulo\n" +
                "		  and    \n" +
                "		  (  \n" +
                "		  cast(nombre_interaccion as text) ilike '%"+buscar+"%' \n" +
                "		  or cast(modulos.descripcion as text) ilike '%"+buscar+"%' \n" +
                "		  )       \n" +
                "	  \n" +
                "";


            
            return sql ;
             
    }              


    
    
    
    
}
