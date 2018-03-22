/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package py.com.itx.session.facturaventa;



import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle_Transaccion;
import py.com.itx.session.facturaventadetalle.FacturaVentaDetalle_Transaccion;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;


@WebServlet(name = "FacturaVenta_Transaccion_Inicio",
        urlPatterns = {"/FacturaVenta/Transaccion/Inicio"})


public class FacturaVenta_Transaccion_Inicio extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
               
                
            // controlusuario
            if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
                request.getRequestDispatcher("/error403.jspx").include(request, response);                
                return;
            }                 
        
        
        try 
        {                    
                FacturaVentaDetalle_Transaccion transaccion = new FacturaVentaDetalle_Transaccion();
            
                request.getSession().setAttribute( 
                        transaccion.getNombre(), 
                        transaccion.getListaObjeto()
                );
       
        
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
            Logger.getLogger(FacturaVenta_Transaccion_Inicio.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(FacturaVenta_Transaccion_Inicio.class.getName()).log(Level.SEVERE, null, ex);
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
