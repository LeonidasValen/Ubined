export interface School {
    schoolId: number;
    userId: number;
    NameSchool: string;
    type: string;
    nivel: string;
    desc: string;
    provincia: string;
    localidad: string;
    address: string;
}

export interface DetailSchool {
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
    director: string;
    subdirector: string;
    secretario: string;
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