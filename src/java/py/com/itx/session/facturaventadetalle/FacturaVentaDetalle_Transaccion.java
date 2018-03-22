/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package py.com.itx.session.facturaventadetalle;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


/**
 *
 * @author hugo
 */


public class FacturaVentaDetalle_Transaccion {
    
    private String nombre = "transaccionVenta_Detalles";                
    private List<FacturaVentaDetalle> listaObjeto = new ArrayList<FacturaVentaDetalle>(); 

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<FacturaVentaDetalle> getListaObjeto() {
        return listaObjeto;
    }

    public void setListaObjeto(List<FacturaVentaDetalle> listaObjeto) {
        this.listaObjeto = listaObjeto;
    }

    
    public Long getMontoTotal() {        
        
        Long resultado = 0L;        
        for (FacturaVentaDetalle fvd: this.listaObjeto) {                        
            resultado = resultado + fvd.getSub_total();
        }        
        return resultado ;        
    }        
    
    
    public Long getGravada0() {        
        
        Long resultado = 0L;        
        for (FacturaVentaDetalle fvd: this.listaObjeto) {                        
            resultado = resultado + fvd.getImpuesto0();
        }        
        return resultado ;        
    }        

    
    public Long getGravada5() {
        
        Long resultado = 0L;        
        for (FacturaVentaDetalle fcd: this.listaObjeto) {                        
            resultado = resultado + fcd.getImpuesto5();
        }        
        return resultado ;
        
    }        
    
    
    public Long getGravada10() {
        
        Long resultado = 0L;        
        for (FacturaVentaDetalle fcd: this.listaObjeto) {                        
            resultado = resultado + fcd.getImpuesto10();
        }        
        return resultado ;
        
    }        
        

    public Long getIva5() {
        
        Long resultado = this.getGravada5();         
        Integer formula = Math.round(resultado / 21);
        
        return  Long.parseLong(formula.toString())  ;
    }   

    public Long getIva10() {
        
        Long resultado = this.getGravada10(); 
        Integer formula = Math.round(resultado / 11);
        
        return  Long.parseLong(formula.toString())  ;                
    }       
    
    
    public Long getIvaTotal() {                
        return  this.getIva5() + this.getIva10();
    }           
    
        

    public FacturaVentaDetalle  getVentaDetalle( Integer id) {       
        
        for (FacturaVentaDetalle fdd: this.listaObjeto) {                                                
            if (fdd.getVenta_detalle() ==  id){
                return fdd;                
            }
        }        
        return null ;
    }       
   
    

    public FacturaVentaDetalle  getVentaDetalleTransaccion ( Integer id) {       
        
        for(int i = 0; i < this.listaObjeto.size(); i++) {            
            if (i ==  id){
                return this.listaObjeto.get(i);                
            }
        }          
        return null ;
    }       
    
    
    
    public void Indexar( ) {               
        for(int i = 0; i < this.listaObjeto.size(); i++) {            
            this.listaObjeto.get(i).setVenta_detalle(i);
        }        
    }       
            
    

    
    
}

      
        