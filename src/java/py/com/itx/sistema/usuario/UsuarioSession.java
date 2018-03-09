/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.sistema.usuario;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author hugo
 */
public class UsuarioSession {
    
    private String sessionNombre = "SessionUsuario"; 
    private Usuario usuario = new Usuario();

    public String getSessionNombre() {
        return sessionNombre;
    }

    public void setSessionNombre(String sessionNombre) {
        this.sessionNombre = sessionNombre;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public Usuario getUsuario( HttpServletRequest request ) {
        return (Usuario) request.getSession().getAttribute(
                this.sessionNombre);      
    }
    
    
}
