import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SOValueService {

    // Valores para incluir/excluir valores individuales
    private valuesSOInd: ValuesSOInterface[] = [
        {
            sign: '='    // Igual
        },
        {
            sign: '>'    // Mayor
        },
        {
            sign: '<'    // Menor
        },
        {
            sign: '<>'    // Diferente
        },
        {
            sign: '>='    // Mayor igual
        },
        {
            sign: '<='    // Menor igual
        }
    ];
    
    // Método para retornar valores para incluir/excluir valores individuales
    getValuesForInd() {
        return this.valuesSOInd;
    }

    private valuesSORange: ValuesSOInterface[] = [
        {
            sign: '[ ]'    // Incluir intervalo
        },
        {
            sign: '] ['    // Excluir intervalo
        }
    ];

    // Método para retornar valores incluir/excluir rangos
    getValuesForRange() {
        return this.valuesSORange;
    }
}

export interface ValuesSOInterface {
    sign: string;
}