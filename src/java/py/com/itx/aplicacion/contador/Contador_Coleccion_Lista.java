/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.aplicacion.contador;


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
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;



/**
 * @author hugo
 */


@WebServlet(name = "Contador_Coleccion_Lista", 
        urlPatterns = {"/Contador/Coleccion/Lista"})


public class Contador_Coleccion_Lista extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
                
        response.setContentType("text/html;charset=UTF-8");        

        // controlusuario
        if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
            request.getRequestDispatcher("/error403.jspx").include(request, response);                
            return;
        }        
                              
       

        // pagina        
        HttpRequest httpRequest = new HttpRequest();
        Integer page = httpRequest.getPage(request);
               
        
        // busqueda
        String strBuscar = httpRequest.getBuscar(request);
        
            
            ContadorDAO dao = new ContadorDAO();
            
            List<Map<String, Object>> rows = dao.Lista(strBuscar, page);    
            
          
            request.setAttribute("lista", rows);            
            request.setAttribute("totalRegistros", dao.totalRegistros);
            
        
        request.getRequestDispatcher("/Aplicacion/Contador/jspf/basictable.jspx").include(request, response);                
        
        
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
            Logger.getLogger(Contador_Coleccion_Lista.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(Contador_Coleccion_Lista.class.getName()).log(Level.SEVERE, null, ex);
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
