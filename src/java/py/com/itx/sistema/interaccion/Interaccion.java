/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package py.com.itx.sistema.interaccion;

import py.com.itx.sistema.modulo.Modulo;




public class Interaccion {
    
    
    private Integer interaccion;    
    private String nombre;    
    private Modulo modulo;
    private String url;



    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Modulo getModulo() {
        return modulo;
    }

    public void setModulo(Modulo modulo) {
        this.modulo = modulo;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    
    public Integer getInteraccion() {
        return interaccion;
    }

    
    public void setInteraccion(Integer interaccion) {
        this.interaccion = interaccion;
    }
   
    
}
