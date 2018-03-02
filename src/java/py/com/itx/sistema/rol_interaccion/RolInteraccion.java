/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.rol_interaccion;

import py.com.itx.sistema.interaccion.Interaccion;
import py.com.itx.sistema.rol.Rol;



public class RolInteraccion {
    
    private Integer id;
    private Rol rol = new Rol();
    private Interaccion interaccion = new Interaccion();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public Interaccion getInteraccion() {
        return interaccion;
    }

    public void setInteraccion(Interaccion interaccion) {
        this.interaccion = interaccion;
    }

    
    
}
