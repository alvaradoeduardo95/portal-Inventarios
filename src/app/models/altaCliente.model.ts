export class AltaClienteModel {
    id: string = '';
    nombre1: string  = '';
    nombre2: string  = '';
    apellido1: string  = '';
    apellido2: string  = '';
    telefono: string  = '';
    correo: string  = '';
    calle: string  = '';
    numExt: string  = '';
    numInt: string  = '';
    delMun: string  = '';
    colonia: string  = '';
    cp: string  = '';
    estado: string  = '';
    pais: string  = '';
    entreCalle: string = '';
    yCalle: string = '';
    // Datos de facturación
    persona: string = '';
    razonSocial: string = '';
    rfc: string = '';
    usoCFDI: string = '';
    correoFact: string = '';
    dirCorreoIgualContacto: string = '';
    // Datos de dirección de facturación
    calleFact: string = '';
    numExtFact: string = '';
    numIntFact: string = '';
    coloniaFact: string = '';
    delMunFact: string = '';
    cpFact: string = '';
    estadoFact: string = '';
    paisFact: string = '';
    entreCalleFact: string = '';
    yCalleFact: string = '';
    position?: number;
    // Estatus del cliente (Bloqueado/Desbloqueado/Vacío)
    flag_bloqueo: string;
}