import { RowDataPacket } from "mysql2";

export interface InstiRowArticle extends RowDataPacket {
    schoolId: number,
    provincia: string,
    localidad: string,
    NameSchool: string,
    type: string,
    horary: string,
    nivel: string,
    desc: string,
    address: string,
    creationAt: Date,
}

interface ManagersAsigns {
  cargo: string;
  nombre: string;
}

export interface InstiRow extends RowDataPacket {
    schoolId: number;
    userId: number;
    provincia: string;
    localidad: string;
    address: string;
    nameSchool: string;
    type: string;
    cue: number;
    nivel: string;
    horary: string;
    desc: string;
    requirement: string;
    phone?: string;
    email: string;
    web?: string;
    creationAt: Date;

    team_ori: boolean;
    center_st: boolean;
    library: boolean;
    yard: boolean;
    dining_room: boolean;
    food_sr: boolean;

    socialMedia: Social[];

    modalities: Modalities[];
}

interface Social {
    icon: string;
    type: string;
    link: string;
}

interface Modalities{
    icon: string;
    name: string;
}