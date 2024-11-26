export interface Provincia {
    id: number;
    provincia: string;
}

export interface Localidad {
    id: number;
    localidad: string;
    id_provincia: number;
}

export interface Offert {
    id: number;
    icon: string;
    modalidad: string;
}

export interface Modalidad {
    id_modalidad: number;
}

export interface FormData {
    id_provincia: number,
    id_localidad: number,
    address: string,
    cue: number,
    nivel: string,
    horary: string,
}