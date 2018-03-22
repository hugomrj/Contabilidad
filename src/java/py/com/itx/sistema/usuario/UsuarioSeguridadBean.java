/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
 
package py.com.itx.sistema.usuario;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import py.com.itx.sistema.recurso.Recurso;




public class UsuarioSeguridadBean {
    
    private Usuario usuario;
    private List<Recurso> recursos = new ArrayList<Recurso>();   
    private String urlActual;
    private String context;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Recurso> getRecursos() {
        return recursos;
    }

    public void setRecursos(List<Recurso> recursos) {
        this.recursos = recursos;
    }
    
    

    public boolean getPermitirAcceso () throws IOException, Exception {
        
        
        urlActual = urlActual.replace(context, "");
        
        for (Recurso recu: recursos) {            
            if ( urlActual.equals(recu.getUrl())){                                
                return true;
            } 
        }
        
        
        UsuarioDAO usuarioDao = new UsuarioDAO();
        
        if (usuarioDao.isPermitidoRecurso(usuario, urlActual))
        {
            Recurso recu2 = new Recurso();
            recu2.setUrl(urlActual);
            recursos.add(recu2);
            return true;
        }
        else
        {
            return false;
        }
        
    }


    public String getUrlActual() {
        return urlActual;
    }

    public void setUrlActual(String urlActual) {
        this.urlActual = urlActual;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String Context) {
        this.context = Context;
    }
    
    
    
    /*
    public String getRecorrer() {

        System.out.println("----");
        for (Recurso recu: recursos) {                                                   
                System.out.println(recu.getUrl());
        }                
        return "";

    } 
    */
    
    
    public void setRecursosSession(HttpServletRequest request ) {      
        request.getSession().setAttribute("SessionRecursos", recursos);             
    }    
    
    
    
    
    
    
    public boolean isAccesoServlet (HttpServletRequest request ) throws Exception {
      
        
        this.usuario = (Usuario) new UsuarioSession().getUsuario(request);
        
        if (this.usuario == null){
            return false;
        }
          
        
        this.recursos = (List<Recurso>) request.getSession().getAttribute("SessionRecursos");        
        this.urlActual = request.getRequestURI();        
        this.context = request.getContextPath();
        
        
        
        if (this.getPermitirAcceso() )
        {                 
            request.getSession().setAttribute("SessionRecursos", recursos);     
            return true;
        }
        else        
        {
            return false;
        }

        
    }    
    
    
    
}
