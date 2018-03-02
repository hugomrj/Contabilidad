/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nebuleuse.ORM.web;


import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import nebuleuse.ORM.xml.Global;


/**
 *
 * @author hugo
 */
@WebServlet(name = "Paginacion", 
        urlPatterns = {"/Paginacion"})




public class Paginacion extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, Exception {
        
        
            response.setContentType("text/html;charset=UTF-8");
//            PrintWriter out = response.getWriter();
            
            Integer pagina = 1;
            try {            
                if (request.getParameter("page") != null){
                    pagina = Integer.parseInt( request.getParameter("page") );                    
                    if (pagina == 0 ){
                        pagina = 1;
                    }
                }
            } catch (NumberFormatException nfe){
              pagina =  1;
            }                

            Integer totalRegistros = 0;
            try {            
                if (request.getParameter("totalregistros") != null){
                    totalRegistros = Integer.parseInt( request.getParameter("totalregistros") );                    
                }
            } catch (NumberFormatException nfe){
              totalRegistros =  0;
            }                    
    
            Integer lineas = Integer.parseInt(new Global().getValue("lineasLista"));
            try {            
                if (request.getParameter("lineas") != null){
                    lineas = Integer.parseInt( request.getParameter("lineas") );
                }
            } catch (NumberFormatException nfe){
              lineas =  1;
            }            


//

            // este poner por configuracion
            final Integer BLOQUES = 12;
            Integer cantidadPaginas = totalRegistros / lineas ;            
            
            if ((cantidadPaginas * lineas ) < totalRegistros)
            {
                cantidadPaginas++;
            }

            Integer paginaInicio = 1;
            Integer paginaFin = 0;

            if (BLOQUES > cantidadPaginas) 
            {
                paginaInicio = 1;
                paginaFin = cantidadPaginas;
            }

            else if (BLOQUES == cantidadPaginas) 
            {
                paginaInicio = 1;
                paginaFin = BLOQUES;
            }    

            else if (BLOQUES < cantidadPaginas) 
            {

                if (pagina - (BLOQUES / 2) < 1) {
                    paginaInicio = 1;
                    paginaFin = pagina + BLOQUES;
                }
                else
                {
                    paginaInicio = pagina - (BLOQUES / 2);
                }

                if (pagina + (BLOQUES / 2) > cantidadPaginas )
                {
                    paginaInicio = cantidadPaginas - BLOQUES;
                    paginaFin = cantidadPaginas;
                }
                else
                {
                    paginaFin =  pagina + (BLOQUES / 2);
                }                
            }    
                                               
                        
            request.setAttribute("pagina", pagina);
            request.setAttribute("paginaInicio", paginaInicio);
            request.setAttribute("paginaFin", paginaFin);
            request.setAttribute("cantidadPaginas", cantidadPaginas);
            request.setAttribute("totalRegistros", totalRegistros);
            
            
            request.getRequestDispatcher("/WEB-INF/jspf/paginacion.jspx").include(request, response);        
            
            
            
    
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
            Logger.getLogger(Paginacion.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(Paginacion.class.getName()).log(Level.SEVERE, null, ex);
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
