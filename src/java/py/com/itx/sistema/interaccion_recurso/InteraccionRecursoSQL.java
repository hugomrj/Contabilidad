/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package py.com.itx.sistema.interaccion_recurso;

import py.com.itx.sistema.interaccion.Interaccion;
import py.com.itx.sistema.recurso.Recurso;


/**
 * @author hugo
 */

public class InteraccionRecursoSQL {
    
    
public String  SubLista ( Object objeto) {
    
        String sql = "";        
        String andwhere = "";        
                

        if (objeto.getClass() ==  Recurso.class){        
            Recurso recurso = new Recurso();
            recurso = (Recurso) objeto;
            andwhere = " and recursos.recurso  = " + recurso.getRecurso();
        }
        
        if (objeto.getClass() ==  Interaccion.class){        
            Interaccion interaccion = new Interaccion();
            interaccion =  (Interaccion) objeto;
            andwhere = " and interacciones.interaccion = " + interaccion.getInteraccion();
        }
        
        
        sql = 
            "          SELECT  \n" +
            "              interacciones_x_recursos.id,  \n" +
            "              recursos.recurso,  \n" +
            "              recursos.url,  \n" +
            "              interacciones.interaccion,  \n" +
            "              interacciones.nombre_interaccion,  \n" +
            "              interacciones.modulo,  modulos.descripcion modulo_descripcion,\n" +
            "              interacciones.orden \n" +
            "             FROM  \n" +
            "              administracion.interacciones_x_recursos,  \n" +
            "              administracion.recursos,  \n" +
            "              administracion.interacciones, \n" +
            "              administracion.modulos\n" +
            "             WHERE  \n" +
            "              interacciones_x_recursos.recurso = recursos.recurso AND \n" +
            "              interacciones.interaccion = interacciones_x_recursos.interaccion  and \n" +
            "              interacciones.modulo = modulos.modulo " 
            + andwhere;       
        
        return sql ;
             
    }              
    
}
