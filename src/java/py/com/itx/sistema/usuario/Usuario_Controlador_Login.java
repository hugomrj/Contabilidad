/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.sistema.usuario;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.sistema.modulo.Modulo;
import py.com.itx.sistema.modulo.ModuloDAO;
import py.com.itx.sistema.recurso.Recurso;



@WebServlet(name = "Usuario_Controlador_Login", 
        urlPatterns = {
            "/Usuario/Login"           
        })




public class Usuario_Controlador_Login extends HttpServlet {
 
    protected void processRequest(HttpServletRequest request, HttpServletResponse response) 
            throws IOException, Exception  {
                
        
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");        
                
        if (request.getHeader("referer") == null) {
            response.sendRedirect("../login.jspx");    
        }

        
        String strCuenta = (String) request.getParameter("cuenta");
        String strClave = (String) request.getParameter("clave");

        Usuario usuario = new Usuario();
        usuario = Usuario.existeUsuario(strCuenta, strClave);
            
 

        if (usuario == null) 
        {           
            
            //Mensaje mensaje = new Mensaje();
            //mensaje.setEtiqueta("loginNOT");
            //mensaje.setTipo("error");             
            //mensaje.guardarInformacion();
            
            //request.getSession().setAttribute("SessionMensajes", mensaje);
            
            response.sendRedirect("../login.jspx");      
          
        }        
        else
        {            

            // modulos
            ModuloDAO moduloDAO = new ModuloDAO();            
            //List<Modulo> ListaModulos = moduloDAO.ModuloListar(usuario);
            
            List<Map<String, Object>> ListaModulos = moduloDAO.ModuloListar(usuario);            
            
            request.getSession().setAttribute("SessionModulos", ListaModulos);                   
            
            request.getSession().setAttribute(
                    new UsuarioSession().getSessionNombre()
                    ,usuario);  
            
            
            List<Recurso> listaRecurso = new ArrayList<Recurso>();  
            
            
            Recurso r1 = new Recurso();
            r1.setUrl("/Menu/Indice.jspx");            
            listaRecurso.add(r1);
            
            Recurso r2 = new Recurso();
            r2.setUrl("/Menu/Mostrar.jspx");            
            listaRecurso.add(r2);            
            
            
            request.getSession().setAttribute("SessionRecursos", listaRecurso);                   
            
            
            
            
            
            // si esta relacionado a contador 
            ContadorDAO contadorDAO = new ContadorDAO();            
            request.getSession().setAttribute("SessionContador", usuario);  
            
            
            
            
            
            
            
            response.sendRedirect("../Menu/Indice.jspx");                     
            
        }            

     
    }
 
    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(Usuario_Controlador_Login.class.getName()).log(Level.SEVERE, null, ex);
        }
    } 
 
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(Usuario_Controlador_Login.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    
    
}