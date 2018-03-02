/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.interaccion_recurso;


import py.com.itx.sistema.interaccion.Interaccion;
import py.com.itx.sistema.recurso.Recurso;




public class InteraccionRecurso {
    
    private Integer id;    
    private Interaccion interaccion = new Interaccion();
    private Recurso recurso = new Recurso();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Interaccion getInteraccion() {
        return interaccion;
    }

    public void setInteraccion(Interaccion interaccion) {
        this.interaccion = interaccion;
    }

    public Recurso getRecurso() {
        return recurso;
    }

    public void setRecurso(Recurso recurso) {
        this.recurso = recurso;
    }
    
}
