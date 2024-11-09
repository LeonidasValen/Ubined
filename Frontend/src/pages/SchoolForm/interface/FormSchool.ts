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