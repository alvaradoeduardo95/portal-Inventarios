import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CatalogoCFDIService {

    private catalogo: CatalogoCFDIInterface[] = [
        {
            cfdi_code:"G01",
            descripcion:"Adquisición de mercancias"
        },
        {
            cfdi_code:"G02",
            descripcion:"Devoluciones, descuentos o bonificaciones"
        },
        {
            cfdi_code:"G03",
            descripcion:"Gastos en general"
        },
        {
            cfdi_code:"I01",
            descripcion:"Construcciones"
        },
        {
            cfdi_code:"I02",
            descripcion:"Mobilario y equipo de oficina por inversiones"
        },
        {
            cfdi_code:"I03",
            descripcion:"Equipo de trasnporte"
        },
        {
            cfdi_code:"I04",
            descripcion:"Equipo de computo y acesorios"
        },
        {
            cfdi_code:"I05",
            descripcion:"Dados, troqueles, moldes, matrices y herramental"
        },
        {
            cfdi_code:"I06",
            descripcion:"Comunicaciones telefónicas"
        },
        {
            cfdi_code:"I07",
            descripcion:"Comunicaciones satelitales"
        },
        {
            cfdi_code:"I08",
            descripcion:"Otra maquinaria y equipo"
        },
        {
            cfdi_code:"D01",
            descripcion:"Honorarios médicos, dentales y gastos hospitalarios"
        },
        {
            cfdi_code:"D02",
            descripcion:"Gastos médicos por incapacidad o discapacidad"
        },
        {
            cfdi_code:"D03",
            descripcion:"Gastos funerales"
        },
        {
            cfdi_code:"D04",
            descripcion:"Donativos"
        },
        {
            cfdi_code:"D05",
            descripcion:"Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación)"
        },
        {
            cfdi_code:"D06",
            descripcion:"Aportaciones voluntarias al SAR"
        },
        {
            cfdi_code:"D07",
            descripcion:"Primas por seguros de gastos médicos"
        },
        {
            cfdi_code:"D08",
            descripcion:"Gastos de transportación escolar obligatoria"
        },
        {
            cfdi_code:"D09",
            descripcion:"Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones"
        },
        {
            cfdi_code:"D10",
            descripcion:"Pagos por servicios educativos (colegiaturas)"
        },
        {
            cfdi_code:"P01",
            descripcion:"Por definir"
        }
        ];
        

    constructor(){ }

    getCatalogoCFDI() {
        return this.catalogo;
    }
}

export interface CatalogoCFDIInterface {
    cfdi_code: string;
    descripcion: string;
}