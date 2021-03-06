/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.cliente;


import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
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


@WebServlet(name = "ClienteJSON", 
        urlPatterns = {"/Cliente/Linea.json"})


public class ClienteJSON extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
                        
        PrintWriter out = response.getWriter();          

        if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
            out.println("error403");  
            return;
        }
        
        try 
        {            
            //controlar si existe contador 
            Contador contador = new Contador();
            contador = new ContadorDAO().getContador(request);            

            
            if ( ( request.getParameter("id") != null)  && (contador != null))
            {                
                Integer codigo = Integer.parseInt(request.getParameter("id")) ;                       
                
                Cliente instancia = new Cliente();               
                Persistencia persistencia = new Persistencia();
                instancia = (Cliente) persistencia.filtrarId(instancia, codigo);

                // controlar si contador es igual al codigo de session       
                if (instancia.getContador() != null){
                    if (!(contador.getContador() == instancia.getContador().getContador())){
                        out.println("error403");  
                        return;                                    
                    }                
                }else{
                    out.println("error403");  
                    return;
                }

                Gson gson = new Gson ();                
                String formatoJSON = gson.toJson( instancia );
                                
                if (formatoJSON.trim().endsWith("null") ) {
                    formatoJSON = "[]";
                }
                else{
                    formatoJSON = "["+formatoJSON+"]";
                }
                
                out.println(formatoJSON);            

            }            
        } 
        catch (Exception ex) 
        {
            out.println("[]");  
        }
        
        finally 
        {
            out.close();
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
            Logger.getLogger(ClienteJSON.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(ClienteJSON.class.getName()).log(Level.SEVERE, null, ex);
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
