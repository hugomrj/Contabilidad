

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.facturacompradetalle;



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
import py.com.itx.sistema.usuario.UsuarioSeguridadBean;



@WebServlet(name = "FacturaCompraDetalle_Transaccion_Editar",
        urlPatterns = {"/FacturaCompraDetalle/Transaccion/Editar"})


public class FacturaCompraDetalle_Transaccion_Editar extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {

                
        PrintWriter out = response.getWriter();     
        
        
        /*
        // controlusuario
        if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
            request.getRequestDispatcher("/error403.jspx").include(request, response);                
            return;
        }               
        */
        
        
        try
        {

            Integer id = Integer.parseInt(request.getParameter("id"));        
            
            FacturaCompraDetalle_Transaccion transaccion = new FacturaCompraDetalle_Transaccion();                    
            
            transaccion.setListaObjeto(  
                    (List<FacturaCompraDetalle>) 
                            request.getSession().getAttribute(transaccion.getNombre())
                );            
    
            Persistencia persistencia = new Persistencia();
            FacturaCompraDetalle instancia = new FacturaCompraDetalle();
            instancia = (FacturaCompraDetalle) persistencia.extraerRegistro(request, instancia);
            
            Integer porcentaje = Integer.parseInt( request.getParameter("impuesto_porcentaje") );
            
            
            if (porcentaje == 10){
                instancia.setImpuesto10(instancia.getSub_total());
                instancia.setImpuesto5(0L);
                instancia.setImpuesto0(0L);
            }
            else{
                if (porcentaje == 5){
                    instancia.setImpuesto10(0L);
                    instancia.setImpuesto5(instancia.getSub_total());
                    instancia.setImpuesto0(0L);
                }            
                else{
                    if (porcentaje == 0){
                        instancia.setImpuesto10(0L);
                        instancia.setImpuesto5(0L);
                        instancia.setImpuesto0(instancia.getSub_total());
                    }                            
                }
            }
                        
            transaccion.getListaObjeto().set(id, instancia);
           
                        
            transaccion.Indexar();                       
            request.getSession().setAttribute( 
                    transaccion.getNombre(), 
                    transaccion.getListaObjeto()
            );              
            out.println(transaccion.getListaObjeto().size());              
            
        }
        
        catch (Exception ex) 
        {
            System.out.println(ex.getMessage());
            out.println(ex.getMessage());      
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
            Logger.getLogger(FacturaCompraDetalle_Transaccion_Editar.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(FacturaCompraDetalle_Transaccion_Editar.class.getName()).log(Level.SEVERE, null, ex);
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
