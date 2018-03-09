/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompra;



import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
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
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle_Transaccion;
import py.com.itx.sistema.usuario.Usuario;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;
import py.com.itx.sistema.usuario.UsuarioSession;




@WebServlet(name = "FacturaCompra_Transaccion_Fin",
        urlPatterns = {"/FacturaCompra/Transaccion/Fin"})


public class FacturaCompra_Transaccion_Fin extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        
        
            response.setContentType("text/html;charset=UTF-8");        
            response.setCharacterEncoding("UTF-8");
            PrintWriter out = response.getWriter();

            // controlusuario
            if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
                request.getRequestDispatcher("/error403.jspx").include(request, response);                
                return;
            }               


            
            
            
            
        try
        {

            Usuario usuario =new UsuarioSession().getUsuario(request);            
            
            //controlar si existe contador
            Contador contador = new Contador();
            contador = new ContadorDAO().getContador(request);            
            
            
            FacturaCompraDetalle_Transaccion transaccion = new FacturaCompraDetalle_Transaccion();                    
            
            //List<FacturaCompraDetalle> comprasDetalles = new ArrayList<FacturaCompraDetalle>(); 
            
            
            transaccion.setListaObjeto(  
                    (List<FacturaCompraDetalle>) 
                            request.getSession().getAttribute(transaccion.getNombre())
                );            

            
            /*            
            // detalles
            String transaccionFacturaVenta_Detalles = "facturaDetalles";
            List<FacturaVentaDetalle> facturaDetalles = new ArrayList<FacturaVentaDetalle>();                         
            facturaDetalles = (List<FacturaVentaDetalle>) request.getSession().getAttribute(
                    transaccionFacturaVenta_Detalles);            
            */
            

            
            
            // cabecera            
            FacturaCompra  factura_compra = new FacturaCompra();
            Persistencia persistencia = new Persistencia();            
            factura_compra = (FacturaCompra) persistencia.extraerRegistro(request, factura_compra);
            
            factura_compra.setUsuario(usuario.getUsuario());            
            factura_compra.setContador(contador);
            
            factura_compra = (FacturaCompra) persistencia.insert(factura_compra);
            
            
            
            
            // cargar detalles   
            // cargas las cuadriculas con for            
            for (FacturaCompraDetalle fc_det : transaccion.getListaObjeto()) {      
                
                
                fc_det.setFactura(factura_compra.getFactura());
                fc_det.setCompra_detalle(0);
                persistencia.insert(fc_det);
                
            }
      
            
    
            
            request.getSession().removeAttribute(transaccion.getNombre());
            out.println(factura_compra.getFactura());      
            
            
            
            
        }
        
        
        
        catch (Exception ex) {            
            System.out.println(ex.getMessage());     
            out.println(ex.getMessage());      
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
            Logger.getLogger(FacturaCompra_Transaccion_Fin.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(FacturaCompra_Transaccion_Fin.class.getName()).log(Level.SEVERE, null, ex);
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
