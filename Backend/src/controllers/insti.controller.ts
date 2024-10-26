import { Request, Response } from "express";
import { InstiRow, InstiRowArticle } from "../interface/insti.interface";

export const getSchools = async (req: Request, res: Response): Promise<void> => {
    //Paginacion dei instituciones
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    //buscador
    const { search = '' } = req.query as { search: string };
    
    //obtiene los filtros
    const horario = req.query.horario as string | string[];
    const nivel = req.query.nivel as string | string[];
    const tipo = req.query.tipo as string | string[];
    console.log(search)

    // guarda arrays para las cláusulas WHERE y los parámetros de la consulta
    const whereClauses: string[] = [];
    const queryParams: (string | number)[] = [];

    const addFilter = (field: string, values: string | string[]) => { //field obtinene el campo(insti) y values el valor o array de valores
        const arrayFilter = Array.isArray(values) ? values : [values];//si el valor no es un array osea un string lo convierte en un array
        arrayFilter.forEach(value => queryParams.push(`%${value}%`));//para cada valor de la array se agrega % para buscar coincidencias

        const conditions = arrayFilter.map(() => `${field} LIKE ?`); //para cada valor de la array se genera condicion "LIKE ?". [institucion.horary, institucion.type] -> (institucion.horary LIKE ? OR institucion.type LIKE ?)
        whereClauses.push(`(${conditions.join(' OR ')})`);// despues de la condicion LIKE ? se agrega el OR
    };
    
    // aplica filtros si estan presentes
    if (horario) addFilter('institucion.horary', horario);
    if (nivel) addFilter('institucion.nivel', nivel);
    if (tipo) addFilter('institucion.type', tipo);

    if (search) {
        queryParams.push(`%${search}%`, `%${search}%`);
        whereClauses.push(`(institucion.name_insti LIKE ? OR institucion.descrip LIKE ?)`);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''; //si hay clausulas se agrega WHERE y separa con AND si hay mas de una clausula

    try {
        // Construye la consulta SQL con filtros y paginación
        const [sql] = await req.db!.query<InstiRowArticle[]>(
            `SELECT 
                institucion.id, 
                provincias.provincia, 
                institucion.id_provincia, 
                localidades.localidad, 
                institucion.id_localidad, 
                institucion.name_insti, 
                institucion.type, 
                institucion.horary, 
                institucion.nivel, 
                institucion.descrip, 
                institucion.address, 
                institucion.createdAt
            FROM
                institucion
            INNER JOIN
                provincias ON provincias.id = institucion.id_provincia
            INNER JOIN
                localidades ON localidades.id = institucion.id_localidad
            ${whereClause}
            ORDER BY 
                institucion.createdAt DESC
            LIMIT ? OFFSET ?
            `, [...queryParams, limit, offset]);

        if (sql.length === 0) {
            res.status(404).json({ message: 'No se encontraron instituciones' });
            return
        }

        // Formatea los resultados
        const insti = sql.map(row => {
            return {
                schoolId: row.id,
                provincia: row.provincia,
                localidad: row.localidad,
                NameSchool: row.name_insti,
                type: row.type,
                horary: row.horary,
                nivel: row.nivel,
                desc: row.descrip,
                address: row.address,
                creationAt: row.createdAt,
            }
        });

        res.status(200).json(insti);
    } catch (error) {
        console.error('Error al traer las escuelas:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las escuelas' });
    }
}

export const getSchool = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const [sql] = await req.db!.query<InstiRow[]>(
            `SELECT 
                institucion.id, 
                institucion.id_user, 
                provincias.provincia, 
                institucion.id_provincia, 
                localidades.localidad, 
                institucion.id_localidad, 
                institucion.address, 
                institucion.name_insti, 
                institucion.type, 
                institucion.cue, 
                institucion.nivel, 
                institucion.horary, 
                institucion.descrip,
                institucion.director,  
                institucion.subdirector,  
                institucion.secretario,  
                institucion.requirements,
                institucion.phone,
                institucion.email,
                institucion.website,
                institucion.createdAt,

                insti_have.team_ori,
                insti_have.center_st,
                insti_have.library,
                insti_have.yard,
                insti_have.dining_room,
                insti_have.food_sr,

        GROUP_CONCAT(DISTINCT type_redsocial.icon ORDER BY type_redsocial.id) AS iconRed,
        GROUP_CONCAT(DISTINCT type_redsocial.type ORDER BY type_redsocial.id) AS typeRed,
        GROUP_CONCAT(DISTINCT insti_social.link ORDER BY insti_social.id) AS link,


        GROUP_CONCAT(DISTINCT modalidades.icon ORDER BY modalidades.id) AS iconMod,
        GROUP_CONCAT(DISTINCT modalidades.modalidad ORDER BY modalidades.id) AS modalidad


            FROM
                institucion
            INNER JOIN
                provincias ON provincias.id = institucion.id_provincia
            INNER JOIN
                localidades ON localidades.id = institucion.id_localidad
            LEFT JOIN
                insti_have ON insti_have.id_insti = institucion.id
            LEFT JOIN
                insti_social ON insti_social.id_insti = institucion.id
            LEFT JOIN
                type_redsocial ON type_redsocial.id = insti_social.id_social
            LEFT JOIN
                insti_mod ON insti_mod.id_insti = institucion.id
            LEFT JOIN
                modalidades ON modalidades.id = insti_mod.id_modalidad
            WHERE
                institucion.id = ?
            `, [id])

        if (sql.length === 0) {
            res.status(404).json({ message: 'No se encontro la escuela' });
            return
        }

        const instiMap = sql.map(row => ({
            schoolId: row.id,
            userId: row.id_user,
            provincia: row.provincia,
            localidad: row.localidad,
            address: row.address,
            nameSchool: row.name_insti,
            type: row.type,
            cue: row.cue,
            nivel: row.nivel,
            horary: row.horary,
            desc: row.descrip,
            director: row.director,
            subdirector: row.subdirector,
            secretario: row.secretario,
            requirement: row.requirements,
            phone: row.phone,
            email: row.email,
            web: row.website,
            creationAt: row.createdAt,

            team_ori: Boolean(row.team_ori),
            center_st: Boolean(row.center_st),
            library: Boolean(row.library),
            yard: Boolean(row.yard),
            dining_room: Boolean(row.dining_room),
            food_sr: Boolean(row.food_sr),

            socialMedia: row.iconRed ? row.iconRed.split(',').map((icon: string, i: number) => ({
                icon,
                type: row.typeRed.split(',')[i],
                link: row.link.split(',')[i]
            })) : [],

            modalities: row.iconMod ? row.iconMod.split(',').map((icon: string, i: number) => ({
                icon,
                name: row.modalidad.split(',')[i]
            })) : []
        }))

        res.status(200).json(instiMap);
    } catch (error) {
        console.error('Error al traer las escuelas:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las escuelas' });
    }
}