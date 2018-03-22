/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package py.com.itx.session.facturaventadetalle;



import py.com.itx.session.facturaventa.FacturaVenta;




/**
 *
 * @author hugo
 */



public class FacturaVentaDetalle {
    
    private Integer venta_detalle;    
    private FacturaVenta factura;
    private String descripcion;
    private Float  cantidad;
    private Long precio_unitario;
    private Long impuesto0;
    private Long impuesto5;
    private Long impuesto10;
    private Long sub_total;
    private Integer impuesto_porcentaje;




    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getCantidad() {
        return cantidad;
    }

    public void setCantidad(Float cantidad) {
        this.cantidad = cantidad;
    }

    public Long getPrecio_unitario() {
        return precio_unitario;
    }

    public void setPrecio_unitario(Long precio_unitario) {
        this.precio_unitario = precio_unitario;
    }

    public Long getImpuesto0() {
        return impuesto0;
    }

    public void setImpuesto0(Long impuesto0) {
        this.impuesto0 = impuesto0;
    }

    public Long getImpuesto5() {
        return impuesto5;
    }

    public void setImpuesto5(Long impuesto5) {
        this.impuesto5 = impuesto5;
    }

    public Long getImpuesto10() {
        return impuesto10;
    }

    public void setImpuesto10(Long impuesto10) {
        this.impuesto10 = impuesto10;
    }


    public Long getSub_total() {
        return sub_total;
    }

    public void setSub_total(Long sub_total) {
        this.sub_total = sub_total;
    }

    public Integer getVenta_detalle() {
        return venta_detalle;
    }

    public void setVenta_detalle(Integer venta_detalle) {
        this.venta_detalle = venta_detalle;
    }

    public Integer getImpuesto_porcentaje() {
        return impuesto_porcentaje;
    }

    public void setImpuesto_porcentaje(Integer impuesto_porcentaje) {
        this.impuesto_porcentaje = impuesto_porcentaje;
    }

    public FacturaVenta getFactura() {
        return factura;
    }

    public void setFactura(FacturaVenta factura) {
        this.factura = factura;
    }



}

