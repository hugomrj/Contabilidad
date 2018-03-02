
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.sistema.interaccion_recurso;



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
import py.com.itx.sistema.interaccion.Interaccion;



/**
 * @author hugo
 */



@WebServlet(name = "InteraccionRecurso_Coleccion_Recurso", 
        urlPatterns = {"/InteraccionRecurso/Coleccion/Recurso"})


public class InteraccionRecurso_Coleccion_Recurso extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
                
        response.setContentType("text/html;charset=UTF-8");        

        
        
        // objeto filtro
        Interaccion objetoInteraccion = new Interaccion();
        Integer interaccion = 0;
        if ( request.getParameter("interaccion") != null) 
        {
            interaccion = Integer.parseInt(request.getParameter("interaccion")) ;    
        }                       
        objetoInteraccion.setInteraccion(interaccion);
        

        // pagina        
        HttpRequest httpRequest = new HttpRequest();
        Integer page = httpRequest.getPage(request);
        // busqueda
        String strBuscar = httpRequest.getBuscar(request);
        
               
        
        InteraccionRecursoDAO dao = new InteraccionRecursoDAO();        
        List<Map<String, Object>> rows = dao.SubLista(objetoInteraccion);    

        
        request.setAttribute("lista", rows);            
        request.setAttribute("totalRegistros", dao.totalRegistros);

 
        request.getRequestDispatcher("/Sistema/InteraccionRecurso/jspf/basictableRecurso.jspx").include(request, response);    
        
        
        
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
            Logger.getLogger(InteraccionRecurso_Coleccion_Recurso.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(InteraccionRecurso_Coleccion_Recurso.class.getName()).log(Level.SEVERE, null, ex);
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
