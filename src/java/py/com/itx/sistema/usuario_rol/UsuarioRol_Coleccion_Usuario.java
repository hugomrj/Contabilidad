/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.sistema.usuario_rol;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import nebuleuse.ORM.web.HttpRequest;
import py.com.itx.sistema.rol.Rol;


/**
 * @author hugo
 */


@WebServlet(name = "UsuarioRol_Coleccion_Usuario", 
        urlPatterns = {"/UsuarioRol/Coleccion/Usuario"})


public class UsuarioRol_Coleccion_Usuario extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
                
        response.setContentType("text/html;charset=UTF-8");        

        // falta controlar usuario
        Rol rolObj = new Rol();
        Integer rol = 0;
        if ( request.getParameter("rol") != null) 
        {
            rol = Integer.parseInt(request.getParameter("rol")) ;    
        }               
        rolObj.setRol(rol);
      

        // pagina        
        HttpRequest httpRequest = new HttpRequest();
        Integer page = httpRequest.getPage(request);
        // busqueda
        String strBuscar = httpRequest.getBuscar(request);
        
        
        
        
        UsuarioRolDAO dao = new UsuarioRolDAO();        
        List<Map<String, Object>> rows = dao.SubLista(rolObj);    

        
        request.setAttribute("lista", rows);            
        request.setAttribute("totalRegistros", dao.totalRegistros);

 
        request.getRequestDispatcher("/Sistema/UsuarioRol/jspf/basictableUsuario.jspx").include(request, response);    
        
        
        
    }

    
    
    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(UsuarioRol_Coleccion_Usuario.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (Exception ex) {
            Logger.getLogger(UsuarioRol_Coleccion_Usuario.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
