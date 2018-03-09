

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.facturacompradetalle;




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
import nebuleuse.ORM.Secuencia;
import nebuleuse.util.Lista;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;




@WebServlet(name = "FacturaCompraDetalle_Transaccion_Lista",
        urlPatterns = {"/FacturaCompraDetalle/Transaccion/Lista"})


public class FacturaCompraDetalle_Transaccion_Lista extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        
        
        
            // controlusuario
            if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
                request.getRequestDispatcher("/error403.jspx").include(request, response);                
                return;
            }        

        
        
            FacturaCompraDetalle_Transaccion transaccion = new FacturaCompraDetalle_Transaccion();                    
                                          
//            List<FacturaCompraDetalle> comprasDetalles = new ArrayList<FacturaCompraDetalle>(); 

            
            if ( request.getSession().getAttribute(transaccion.getNombre()) != null) 
            {                
                transaccion.setListaObjeto(  
                        (List<FacturaCompraDetalle>) 
                                request.getSession().getAttribute(transaccion.getNombre())
                    );
            }

            
            request.getSession().setAttribute( 
                    transaccion.getNombre(), 
                    transaccion.getListaObjeto()
            );            
                        
            request.getRequestDispatcher("/Session/FacturaCompraDetalle/jspf/basictable.jspx").include(request, response);        
                    
                
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
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
            Logger.getLogger(FacturaCompraDetalle_Transaccion_Lista.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
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
            Logger.getLogger(FacturaCompraDetalle_Transaccion_Lista.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
