/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturacompradetalle;

import java.util.ArrayList;
import java.util.List;
import py.com.itx.sistema.recurso.Recurso;




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
        

    public Integer getIva5() {
        
        Long resultado = this.getGravada5(); 
        return  Math.round(resultado / 21);
    }   

    public Integer getIva10() {
        
        Long resultado = this.getGravada10(); 
        return  Math.round(resultado / 11);
    }       
    
    
    public Integer getIvaTotal() {                
        return  this.getIva5() + this.getIva10();
    }           
    
}

