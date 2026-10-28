import { useEffect, useRef, useState } from "react";
import { useSchool } from "@/context/schoolContext";
import { FormDatas } from "@pages/SchoolForm/interface/FormSchool";
import { useParams } from "react-router-dom";

const SOCIAL_IDS = [1, 2, 3, 4];

const getInitialFormData = (): FormDatas => ({
  id_provincia: 0,
  id_localidad: 0,
  address: "",
  phone: "",
  email: "",
  socialLink: SOCIAL_IDS.map((id) => ({ id_social: id, link: "" })),
  web: "",

  nameSchool: "",
  schoolType: "Pública",
  cue: 0,
  nivel: "Inicial",
  horary: "",
  descrip: "",
  offerts: [],
  managers: [{ cargo: "", nombre: "" }],
  requirement: "",

  schoolHas: {
    team_ori: 0,
    center_st: 0,
    library: 0,
    yard: 0,
    dining_room: 0,
    food_sr: 0,
  },
});

const mapSchoolToForm = (s: any): FormDatas => {
  const base = getInitialFormData();

  return {
    ...base,
    nameSchool: s.nameSchool ?? "",
    descrip: s.desc ?? "",
    cue: s.cue ?? 0,
    nivel: s.nivel ?? "Inicial",
    requirement: s.requirement ?? "",
    schoolType: s.type ?? "Pública",
    id_provincia: s.id_provincia,
    id_localidad: s.id_localidad,
    address: s.address,
    phone: s.phone,
    email: s.email,
    web: s.web,
    horary: s.horary ?? "",

    managers: s.cargos?.length
      ? s.cargos.map((c: any) => ({ cargo: c.position, nombre: c.name }))
      : base.managers,

    schoolHas: {
      team_ori: s.team_ori ? 1 : 0,
      center_st: s.center_st ? 1 : 0,
      library: s.library ? 1 : 0,
      yard: s.yard ? 1 : 0,
      dining_room: s.dining_room ? 1 : 0,
      food_sr: s.food_sr ? 1 : 0,
    },

    offerts: s.modalities?.map((m: any) => ({ id_modalidad: m.id_modalidad })) ?? [],

    // Siempre 4 redes, completando las que falten con link vacío
    socialLink: (base.socialLink ?? []).map(
      (def) =>
        s.socialMedia?.find((sm: any) => sm.id_social === def.id_social)
          ? {
              id_social: def.id_social,
              link: s.socialMedia.find((sm: any) => sm.id_social === def.id_social).link || "",
            }
          : def
    ),
  };
};

export const useSchoolForm = () => {
  const { postSchool, updateSchool, getSchool, school } = useSchool();
  const { schoolId } = useParams<{ schoolId: string }>();

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<{ id_img: number; img_url: string }[]>([]);
  const [formData, setFormData] = useState<FormDatas>(getInitialFormData);
  const [errors, setErrors] = useState({});

  // Guarda para qué escuela ya se cargó el formulario
  const hydratedId = useRef<string | null>(null);

  // 1) Cambia el schoolId: resetear (modo crear) o pedir datos (modo editar)
  useEffect(() => {
    hydratedId.current = null;

    if (!schoolId) {
      setFormData(getInitialFormData());
      setExistingImages([]);
      setImages([]);
      return;
    }

    getSchool(Number(schoolId));
  }, [schoolId]);

  // 2) Llegan los datos: cargar el form UNA sola vez por escuela
  useEffect(() => {
    if (!schoolId || !school?.length) return;
    if (hydratedId.current === schoolId) return; // ya cargado, no pisar lo que el usuario edita

    // Opcional (evita hidratar con datos viejos de otra escuela):
    // if (String(school[0].id_school) !== schoolId) return;

    hydratedId.current = schoolId;
    setExistingImages(school[0].imgSchool ?? []);
    setFormData(mapSchoolToForm(school[0]));
  }, [schoolId, school]);

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    images,
    setImages,
    existingImages,
    setExistingImages,
    postSchool,
    updateSchool,
    schoolId,
  };
};