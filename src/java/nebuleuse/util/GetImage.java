/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package nebuleuse.util;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nebuleuse.ORM.Conexion;

/**
 *
 * @author hugom_000
 */
@WebServlet(name = "GetImage", 
        urlPatterns = {"/GetImage.do"})


public class GetImage extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     * @throws java.sql.SQLException
     */
    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException {
   
        
           
            Conexion conexion = new Conexion();
            conexion.conectar();
            
            String sql = ""
                    + "SELECT articulo, descripcion, imagen" +
                    "  FROM articulos "
                    +   "  where articulo = 3";
           
                       
            Statement st = conexion.getConexion().createStatement();
        
            ResultSet rs = st.executeQuery(sql);
            
            if (rs.next() ){                       
                
                byte[] image = rs.getBytes("imagen");
                
                if (image == null)
                {
                    System.out.println("no existe image");
                }
                else
                {
                    InputStream inStream = rs.getBinaryStream("imagen");
                    int size = (int) image.length;
                    byte[] buffer = new byte[size];
                    
                    response.setContentType("image/jpeg");
                    response.setContentLength(size);
                    ServletOutputStream out = response.getOutputStream();               
                    
                    int length = -1;
                    while ((length = inStream.read(buffer)) != -1)
                    {
                        out.write(buffer, 0, length );
                    }

                    out.flush();
                    out.close();   
                
                }
                
                //out.write(image, 0, image.length);
                        
            }
            
 
            conexion.desconectar();

       
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
        } catch (SQLException ex) {
            Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
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
        } catch (SQLException ex) {
            Logger.getLogger(GetImage.class.getName()).log(Level.SEVERE, null, ex);
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
