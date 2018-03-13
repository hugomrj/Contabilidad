/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompradetalle;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;





/**
 *
 * @author hugo
 */



public class FacturaCompraDetalle_Transaccion {
    
    private String nombre = "transaccionCompra_Detalles";                
    private List<FacturaCompraDetalle> listaObjeto = new ArrayList<FacturaCompraDetalle>(); 

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<FacturaCompraDetalle> getListaObjeto() {
        return listaObjeto;
    }

    public void setListaObjeto(List<FacturaCompraDetalle> listaObjeto) {
        this.listaObjeto = listaObjeto;
    }

    
    public Long getMontoTotal() {
        
        Long resultado = 0L;        
        for (FacturaCompraDetalle fcd: this.listaObjeto) {                        
            resultado = resultado + fcd.getSub_total();
        }        
        return resultado ;
        
    }        
    
    
    public Long getGravada0() {
        
        Long resultado = 0L;        
        for (FacturaCompraDetalle fcd: this.listaObjeto) {                        
            resultado = resultado + fcd.getImpuesto0();
        }        
        return resultado ;
        
    }        

    
    public Long getGravada5() {
        
        Long resultado = 0L;        
        for (FacturaCompraDetalle fcd: this.listaObjeto) {                        
            resultado = resultado + fcd.getImpuesto5();
        }        
        return resultado ;
        
    }        
    
    public Long getGravada10() {
        
        Long resultado = 0L;        
        for (FacturaCompraDetalle fcd: this.listaObjeto) {                        
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
    
        

    public FacturaCompraDetalle  getCompraDetalle( Integer id) {       
        
        for (FacturaCompraDetalle fcd: this.listaObjeto) {                                                
            if (fcd.getCompra_detalle() ==  id){
                return fcd;                
            }
        }        
        return null ;
    }       
   
    

    public void Indexar( ) {       
        
        for(int i = 0; i < this.listaObjeto.size(); i++) {            
            this.listaObjeto.get(i).setCompra_detalle(i);
        }        
    }       
            
    

    
    
}

      
        