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


@WebServlet(name = "Cliente_Funcion_PerteneceContador", 
        urlPatterns = {"/Cliente/Funcion/PerteneceContador"})


public class Cliente_Funcion_PerteneceContador extends HttpServlet {


    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
                
        PrintWriter out = response.getWriter();          
/*
        if (!( new UsuarioSeguridadBean().isAccesoServlet(request))) {   
            out.println("error403");  
            return;
        }
*/
         
        try 
        {
            
            //controlar si existe contador 
            Contador contador = new Contador();
            contador = new ContadorDAO().getContador(request);            
            
            if ( ( request.getParameter("cliente") != null)  && (contador != null))
            {                
                Integer cliente = Integer.parseInt(request.getParameter("cliente")) ;                       
                
                ClienteDAO dao = new ClienteDAO();                
                
                Boolean res = dao.IsPerteneceContador(cliente, contador.getContador());
                
                out.println(res.toString());

            }
            else{
                out.println("false");  
            }            
        } 
        catch (Exception ex) 
        {
            out.println("false");  
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
            Logger.getLogger(Cliente_Funcion_PerteneceContador.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(Cliente_Funcion_PerteneceContador.class.getName()).log(Level.SEVERE, null, ex);
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
