import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { InstiRow, InstiRowArticle } from "../interface/insti.interface";
import { UserIdInterface } from "../interface/user.interface";
import { RowDataPacket } from "mysql2";

interface ExistingUser extends RowDataPacket {
    id: number;
}

export const getSchools = async (req: Request, res: Response): Promise<InstiRowArticle[] | null> => {
    //Paginacion dei instituciones
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    //buscador
    const { search = '' } = req.query as { search: string };

    const { provincia } = req.query as { provincia: string };
    const { localidad } = req.query as { localidad: string };
    console.log(provincia, localidad)

    //obtiene los filtros
    const horario = req.query.horario as string | string[];
    const nivel = req.query.nivel as string | string[];
    const tipo = req.query.tipo as string | string[];

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
    if (provincia) {
        queryParams.push(provincia);
        whereClauses.push(`provincias.provincia = ?`);
    }
    if (localidad) {
        queryParams.push(localidad);
        whereClauses.push(`localidades.localidad = ?`);
    }

    if (search) {
        queryParams.push(`%${search}%`);
        whereClauses.push(`institucion.name_insti LIKE ?`);
    }

    const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''; //si hay clausulas se agrega WHERE y separa con AND si hay mas de una clausula

    try {
        // Construye la consulta SQL con filtros y paginación
        const [sql] = await req.db!.query<InstiRowArticle[]>(
            `SELECT 
                institucion.id,
                institucion.id_user, 
                institucion.id_provincia, 
                institucion.id_localidad, 
                institucion.name_insti, 
                institucion.type, 
                institucion.horary, 
                institucion.nivel, 
                institucion.descrip, 
                institucion.address, 
                institucion.createdAt,
                
                provincias.provincia, 
                localidades.localidad, 

                GROUP_CONCAT(DISTINCT insti_img.img_url SEPARATOR '||') AS img_url

            FROM
                institucion
            INNER JOIN
                provincias ON provincias.id = institucion.id_provincia
            INNER JOIN
                localidades ON localidades.id = institucion.id_localidad
            LEFT JOIN 
                insti_img ON insti_img.id_insti = institucion.id

            ${whereClause}
            GROUP BY institucion.id
            ORDER BY 
                institucion.createdAt DESC
            LIMIT ? OFFSET ?
            `, [...queryParams, limit, offset]);

        if (sql.length === 0) {
            res.status(404).json({ message: 'No se encontraron instituciones' });
            return null
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
                img_url: row.img_url ? row.img_url.split('||') : []
            }
        });

        res.status(200).json(insti);
        return insti as InstiRowArticle[];
    } catch (error) {
        console.error('Error al traer las escuelas:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las escuelas' });
        return null;
    }
}

export const getSchool = async (req: Request, res: Response): Promise<InstiRow[] | null> => {
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
                directors.position,  
                directors.name,   
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

            GROUP_CONCAT(DISTINCT insti_img.img_url SEPARATOR '||') AS img_url,

            GROUP_CONCAT(DISTINCT directors.name ORDER BY directors.id) AS nameDirec,
            GROUP_CONCAT(DISTINCT directors.position ORDER BY directors.id) AS posiDirec,

            GROUP_CONCAT(
                DISTINCT JSON_OBJECT(
                    'icon', type_redsocial.icon,
                    'type', type_redsocial.type,
                    'link', insti_social.link
                ) ORDER BY type_redsocial.id
            ) AS socialMediaJson,

            GROUP_CONCAT(DISTINCT modalidades.icon ORDER BY modalidades.id) AS iconMod,
            GROUP_CONCAT(DISTINCT modalidades.modalidad ORDER BY modalidades.id) AS modalidad

            FROM
                institucion
            LEFT JOIN 
                insti_img ON insti_img.id_insti = institucion.id
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

            LEFT JOIN insti_direc ON insti_direc.id_insti = institucion.id
            LEFT JOIN directors ON directors.id_insti_direc = insti_direc.id

            WHERE
                institucion.id = ?
            GROUP BY 
                institucion.id;
            `, [id])

        if (sql.length === 0) {
            res.status(404).json({ message: 'No se encontro la escuela' });
            return null
        }

        const instiMap = sql.map(row => ({
            schoolId: row.id,
            userId: row.id_user,
            provincia: row.provincia,
            id_provincia: row.id_provincia,
            localidad: row.localidad,
            id_localidad: row.id_localidad,
            address: row.address,
            nameSchool: row.name_insti,
            type: row.type,
            cue: row.cue,
            nivel: row.nivel,
            horary: row.horary,
            desc: row.descrip,
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

            img_url: row.img_url ? row.img_url.split('||') : [],

            cargos: row.nameDirec
                ? row.posiDirec.split(',').map((_: number, i: string) => ({
                    name: row.nameDirec.split(',')[i],
                    position: row.posiDirec.split(',')[i]
                }))
                : [],

            socialMedia: row.socialMediaJson
                ? JSON.parse(`[${row.socialMediaJson}]`)
                : [],

            modalities: row.iconMod ? row.iconMod.split(',').map((icon: string, i: number) => ({
                icon,
                name: row.modalidad.split(',')[i]
            })) : []
        }))

        res.status(200).json(instiMap);
        return instiMap as InstiRow[];
    } catch (error) {
        console.error('Error al traer las escuelas:', error);
        res.status(500).json({ message: 'Error en el servidor al obtener las escuelas' });
        return null;
    }
}

export const postSchool = async (req: UserIdInterface, res: Response) => {

    const userId = req.user?.userId;

    const images = (req as any).uploadedImages as { url: string; public_id: string }[];

    try {

        console.log("userid:", userId)

        //console.log(images)

        const { nameSchool, address, phone, email, nivel, horary, descrip, id_provincia, id_localidad, schoolType, cue, requirement, team_ori, center_st, library, yard, dining_room, food_sr, managers, offerts, web, socialLink } = req.body;

        // console.log(nameSchool, address, phone, email, nivel, horary, descrip, id_provincia, id_localidad, schoolType, cue, requirement, team_ori, center_st, library, yard, dining_room, food_sr, managers, offerts, web, socialLink);


        // Verificar si el usuario existe
        const [userUpdate] = await req.db!.query<ExistingUser[]>("SELECT id FROM users WHERE id = ?", [userId]);
        if (userUpdate.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return
        }

        //throw new Error('Error forzado para testear rollback');
        const [sql] = await req.db!.query<InstiRow[]>(
            `INSERT INTO
                institucion (
                    id_user,
                    name_insti,
                    type,
                    cue,
                    nivel,
                    horary,
                    descrip,
                    requirements,
                    id_provincia,
                    id_localidad,
                    address,
                    phone,
                    email,
                    website
                )
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                nameSchool,
                schoolType,
                cue,
                nivel,
                horary,
                descrip,
                requirement,
                id_provincia,
                id_localidad,
                address,
                phone,
                email,
                web
            ]
        );

        const newSchoolId = (sql as any).insertId;

        // 2. Insertar infraestructura (insti_have)
        await req.db!.query(`
            INSERT INTO insti_have (
            id_insti, team_ori, center_st, library, yard, dining_room, food_sr
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                newSchoolId,
                team_ori,
                center_st,
                library,
                yard,
                dining_room,
                food_sr
            ]);

        // 3. Insertar directores
        for (const manager of managers) {
            const [instiDirecRes] = await req.db!.query(
                `INSERT INTO insti_direc (id_insti) VALUES (?)`,
                [newSchoolId]
            );

            const instiDirecId = (instiDirecRes as any).insertId;

            await req.db!.query(
                `INSERT INTO directors (position, name, id_insti_direc) VALUES (?, ?, ?)`,
                [manager.cargo, manager.nombre, instiDirecId]
            );
        }

        // 4. Insertar redes sociales
        console.log(socialLink)
        for (const social of socialLink) {
            await req.db!.query(
                `INSERT INTO insti_social (id_social, link, id_insti) VALUES (?, ?, ?)`,
                [social.id_social, social.link, newSchoolId]);
        }

        // 5. Insertar modalidades
        for (const mod of offerts) {
            await req.db!.query(
                `INSERT INTO insti_mod (id_modalidad, id_insti) VALUES (?, ?)`,
                [mod.id_modalidad, newSchoolId]);
        }

        for (const img of images) {
            await req.db!.query(
                `INSERT INTO insti_img (img_url, id_img, id_insti ) VALUES (?, ?, ?)`,
                [img.url, img.public_id, newSchoolId]);
        }

        res.status(201).json({ message: 'Escuela creada' });
    } catch (error) {


        // Borra las imagenes subidas cuando haya un error
        if (images && images.length > 0) {
            await Promise.all(
                images.map(img =>
                    cloudinary.uploader.destroy(img.public_id).catch(err =>
                        console.error(`Error al borrar imagen ${img.public_id}:`, err)
                    )
                )
            );
        }

        console.error('Error al crear la escuela:', error);
        res.status(500).json({ message: 'Error al crear la escuela' });
    }
}