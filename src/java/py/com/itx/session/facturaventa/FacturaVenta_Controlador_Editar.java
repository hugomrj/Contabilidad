/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturaventa;



import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import nebuleuse.ORM.Persistencia;
import py.com.itx.aplicacion.contador.Contador;
import py.com.itx.aplicacion.contador.ContadorDAO;
import py.com.itx.session.facturaventadetalle.FacturaVentaDetalle;
import py.com.itx.session.facturaventadetalle.FacturaVentaDetalleDAO;
import py.com.itx.session.facturaventadetalle.FacturaVentaDetalle_Transaccion;
import py.com.itx.sistema.usuario.Usuario;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;
import py.com.itx.sistema.usuario.UsuarioSession;


@WebServlet(name = "FacturaVenta_Controlador_Editar",
        urlPatterns = {"/FacturaVenta/Controlador/Editar"})


public class FacturaVenta_Controlador_Editar extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
            response.setContentType("text/html;charset=UTF-8");    
            
            PrintWriter out = response.getWriter();            
            
        try
        {

            // controlusuario
            if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
                request.getRequestDispatcher("/error403.jspx").include(request, response);                
                return;
            }              
                             
                        
            Usuario usuario =new UsuarioSession().getUsuario(request);            
            
            
            //controlar si existe contador 
            Contador contador = new Contador();
            contador = new ContadorDAO().getContador(request);                
                        
            
            
            FacturaVentaDetalle_Transaccion transaccion = new FacturaVentaDetalle_Transaccion();                                  
            transaccion.setListaObjeto(  
                    (List<FacturaVentaDetalle>) 
                            request.getSession().getAttribute(transaccion.getNombre())
                );                   
            


            // cabecera            
            FacturaVenta factura_venta = new FacturaVenta();
            Persistencia persistencia = new Persistencia();            
            factura_venta = (FacturaVenta) persistencia.extraerRegistro(request, factura_venta);
            
            factura_venta.setUsuario(usuario.getUsuario());            
            
        
            
            if (factura_venta.getContador().getContador() ==  contador.getContador())
            {
            
                // datos de pie
                factura_venta.setMonto_total(transaccion.getMontoTotal() );
                factura_venta.setGravada0( transaccion.getGravada0() );
                factura_venta.setGravada5( transaccion.getGravada5() );
                factura_venta.setGravada10( transaccion.getGravada10() );
                factura_venta.setIva5( transaccion.getIva5()  );
                factura_venta.setIva10(  transaccion.getIva10() );
                factura_venta.setTotal_iva( (factura_venta.getIva5() + factura_venta.getIva10()) );

                factura_venta = (FacturaVenta) persistencia.update(factura_venta);            
                
                
                // hay que borrar primero todo los detalles de la factura
                Boolean res = new FacturaVentaDetalleDAO().BorrarFacturaDetalle( factura_venta.getFactura() );
                
                
                // cargar detalles        
                for (FacturaVentaDetalle fv_det : transaccion.getListaObjeto()) {
                    fv_det.setFactura(factura_venta);                
                    fv_det.setVenta_detalle(0);
                    persistencia.insert(fv_det);
                }                          
                
               
                request.getSession().removeAttribute(transaccion.getNombre());
                out.println(factura_venta.getFactura());    
               
            
            }
            else
            {
                out.println("error403");  
                return;                                    
            }
            

              
        }
        
        catch (Exception ex) {
            //Logger.getLogger(Persona_Controlador_Agregar.class.getName()).log(Level.SEVERE, null, ex);            
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
        processRequest(request, response);
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
        processRequest(request, response);
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
