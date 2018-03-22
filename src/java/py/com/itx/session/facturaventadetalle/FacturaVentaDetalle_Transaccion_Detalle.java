/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.facturaventadetalle;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import nebuleuse.ORM.Persistencia;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;

 

/**
 * @author hugo
 */


@WebServlet(name = "FacturaVentaDetalle_Transaccion_Detalle", 
        urlPatterns = {"/FacturaVentaDetalle/Transaccion/Detalle"})


public class FacturaVentaDetalle_Transaccion_Detalle extends HttpServlet {

    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
                
        response.setContentType("text/html;charset=UTF-8");        

        
        PrintWriter out = response.getWriter();   
        
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
            
            FacturaVentaDetalleDAO dao = new FacturaVentaDetalleDAO();              
            List<Map<String, Object>> rows = dao.FacturaDetalle(id, contador);    
                        
            FacturaVentaDetalle_Transaccion transaccion = new FacturaVentaDetalle_Transaccion();                                
            
            transaccion.setListaObjeto(  
                    (List<FacturaVentaDetalle>) 
                            request.getSession().getAttribute(transaccion.getNombre())
                );            
            

            Persistencia persistencia = new Persistencia();
            FacturaVentaDetalle instancia = new FacturaVentaDetalle();


            // recorrer list            
            for (Map<String, Object> map : rows) {
                   instancia = (FacturaVentaDetalle) persistencia.extraerRegistro(map, instancia);                   
                   transaccion.getListaObjeto().add(instancia);
            }

            request.getSession().setAttribute( 
                    transaccion.getNombre(), 
                    transaccion.getListaObjeto()
            );  

            out.println(transaccion.getListaObjeto().size());               
            
            
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
            Logger.getLogger(FacturaVentaDetalle_Transaccion_Detalle.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(FacturaVentaDetalle_Transaccion_Detalle.class.getName()).log(Level.SEVERE, null, ex);
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
