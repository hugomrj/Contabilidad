/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.facturacompradetalle;


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
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;

 

/**
 * @author hugo
 */


@WebServlet(name = "FacturaCompraDetalle_Coleccion_Detalle", 
        urlPatterns = {"/FacturaCompraDetalle/Coleccion/Detalle"})


public class FacturaCompraDetalle_Coleccion_Detalle extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
                
        response.setContentType("text/html;charset=UTF-8");        

        
        // controlusuario
        if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
            request.getRequestDispatcher("/error403.jspx").include(request, response);                
            return;
        }        
                   
        
        try 
        {

            Integer id = Integer.parseInt(request.getParameter("id"));    
            
            
            //controlar si existe contador para filtrar
            Contador contador = new Contador();
            contador = new ContadorDAO().getContador(request);

            /*
            // controlar cliente
            Integer cliente = 0;             
            if (request.getParameter("cliente") != null){
                cliente = Integer.parseInt( request.getParameter("cliente") );
            }
            */
        
            
            FacturaCompraDetalleDAO dao = new FacturaCompraDetalleDAO();              
            List<Map<String, Object>> rows = dao.FacturaDetalle(id, contador);    
            
            request.setAttribute("lista", rows);                     
            
            request.getRequestDispatcher("/Session/FacturaCompraDetalle/jspf/basictable.jspx").include(request, response);                  
        
        }
        catch (Exception ex) 
        {
            request.getRequestDispatcher("/error500.jspx").include(request, response);                       
            System.out.println(ex.getMessage());              
        }
        
        
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
            Logger.getLogger(FacturaCompraDetalle_Coleccion_Detalle.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(FacturaCompraDetalle_Coleccion_Detalle.class.getName()).log(Level.SEVERE, null, ex);
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
