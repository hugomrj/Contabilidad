/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompra;



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
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalleDAO;
import py.com.itx.session.facturacompradetalle.FacturaCompraDetalle_Transaccion;
import py.com.itx.sistema.usuario.Usuario;
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;
import py.com.itx.sistema.usuario.UsuarioSession;


@WebServlet(name = "FacturaCompra_Controlador_Editar",
        urlPatterns = {"/FacturaCompra/Controlador/Editar"})


public class FacturaCompra_Controlador_Editar extends HttpServlet {

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
                        
            
            
            FacturaCompraDetalle_Transaccion transaccion = new FacturaCompraDetalle_Transaccion();                                  
            transaccion.setListaObjeto(  
                    (List<FacturaCompraDetalle>) 
                            request.getSession().getAttribute(transaccion.getNombre())
                );                   
            


            // cabecera            
            FacturaCompra  factura_compra = new FacturaCompra();
            Persistencia persistencia = new Persistencia();            
            factura_compra = (FacturaCompra) persistencia.extraerRegistro(request, factura_compra);
            
            factura_compra.setUsuario(usuario.getUsuario());            
            
        
            
            if (factura_compra.getContador().getContador() ==  contador.getContador())
            {
            
                // datos de pie
                factura_compra.setMonto_total(transaccion.getMontoTotal() );
                factura_compra.setGravada0( transaccion.getGravada0() );
                factura_compra.setGravada5( transaccion.getGravada5() );
                factura_compra.setGravada10( transaccion.getGravada10() );
                factura_compra.setIva5( transaccion.getIva5()  );
                factura_compra.setIva10(  transaccion.getIva10() );
                factura_compra.setTotal_iva( (factura_compra.getIva5() + factura_compra.getIva10()) );

                factura_compra = (FacturaCompra) persistencia.update(factura_compra);            
                
                
                // hay que borrar primero todo los detalles de la factura
                Boolean res = new FacturaCompraDetalleDAO().BorrarFacturaDetalle( factura_compra.getFactura() );
                
                
                // cargar detalles        
                for (FacturaCompraDetalle fc_det : transaccion.getListaObjeto()) {
                    fc_det.setFactura(factura_compra);                
                    fc_det.setCompra_detalle(0);
                    persistencia.insert(fc_det);
                }                          
                
               
                request.getSession().removeAttribute(transaccion.getNombre());
                out.println(factura_compra.getFactura());    
               
            
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
