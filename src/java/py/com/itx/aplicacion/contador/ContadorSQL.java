/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.aplicacion.contador;



import nebuleuse.ORM.Persistencia;




/**
 *
 * @author hugo
 */
public class ContadorSQL {
    
    
public String  Lista ( String buscar)
            throws Exception {
    
            String sql = "";        

            Persistencia persistencia = new Persistencia();
            sql =  persistencia.selectSQL(new Contador(), buscar)  ;

            return sql ;
             
    }              




    
}
