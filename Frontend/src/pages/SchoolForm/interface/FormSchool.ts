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

interface Social {
    id_social: number;
    link?: string;
}

interface SchoolHas{
    team_ori: number;
    center_st: number;
    library: number;
    yard: number;
    dining_room: number;
    food_sr: number;
}

export interface ManagersAsigns {
  cargo: string;
  nombre: string;
}

export interface FormDatas {
    id_provincia: number,
    id_localidad: number,
    address: string,
    phone?: string;
    email: string;
    socialLink?: Social[]; 
    web?: string;

    nameSchool: string,
    schoolType: string,
    cue: number,
    nivel: string,
    horary: string,
    descrip: string;
    offerts: { id_modalidad: number }[];
    managers: ManagersAsigns[];
    requirement: string;

    schoolHas: SchoolHas;
}

export interface ErrorSchool {
    images?: string;
    id_provincia?: string,
    id_localidad?: string,
    address?: string,
    phone?: string;
    email?: string;
    linksErrors?: Record<number, string>;
    facebook?: Facebook;
    instagram?: Instagram;
    twitter?: Twitter;
    youtube?: Youtube;
    web?: string;

    nameSchool?: string,
    dataErrors?: string;
    descrip?: string;
    offerts?: string;
    managers?: string;
    requirement?: string;
}

export interface Facebook {
    id_social: number
    link: string
}

export interface Instagram {
    id_social: number
    link: string
}

export interface Twitter {
    id_social: number
    link: string
}

export interface Youtube {
    id_social: number
    link: string
}
