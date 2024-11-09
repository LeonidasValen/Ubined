import { Request, Response } from "express"
import { RowDataPacket } from "mysql2";

export interface ModalitiesRow extends RowDataPacket {
    id: number;
    icon: string;
    modalidad: string;
}

export interface ProvinciasRow extends RowDataPacket {
    id: number;
    provincia: string;
}

export interface LocalidadesRow extends RowDataPacket {
    id: number;
    localidad: string;
    id_provincia: number;
}

export const getModalities = async (req: Request, res: Response): Promise<ModalitiesRow[] | null> => {
    try {
        const [modalities] = await req.db!.query<ModalitiesRow[]>(`SELECT * FROM modalidades ORDER BY modalidad ASC`);

        if (modalities.length === 0) {
            res.status(404).json({ message: 'No se encontró la escuela' });
            return null;
        }

        res.status(200).json(modalities);
        return modalities as ModalitiesRow[];
    } catch (error) {
        console.error('Error al traer las modalidades:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las modalidades' });
        return null;
    }
};

export const getProvincias = async (req: Request, res: Response): Promise<ProvinciasRow[] | null> => {
    try {
        const [modalities] = await req.db!.query<ProvinciasRow[]>(`SELECT * FROM provincias`);

        if (modalities.length === 0) {
            res.status(404).json({ message: 'No se encontró la escuela' });
            return null;
        }

        res.status(200).json(modalities);
        return modalities as ProvinciasRow[];
    } catch (error) {
        console.error('Error al traer las provinicias:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las provinicias' });
        return null;
    }
};

export const getLocalidades = async (req: Request, res: Response): Promise<LocalidadesRow[] | null> => {
    try {
        const id = Number(req.params.id);

        const [modalities] = await req.db!.query<LocalidadesRow[]>(`SELECT * FROM localidades WHERE id_provincia = ?`, [id]);

        if (modalities.length === 0) {
            res.status(404).json({ message: 'No se encontró la escuela' });
            return null;
        }

        res.status(200).json(modalities);
        return modalities as LocalidadesRow[];
    } catch (error) {
        console.error('Error al traer las localidades:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las localidades' });
        return null;
    }
};