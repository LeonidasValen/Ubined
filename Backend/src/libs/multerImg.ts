import { v2 as cloudinary } from "cloudinary";
import multer, { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";
import { CLOUD_API_KEY, CLOUD_API_SECRET, CLOUD_NAME } from "../config";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

// Multer en memoria (no guarda en disco)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por archivo
  fileFilter: (req, file, cb) => {

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no permitido. Usa JPG o PNG."));
    }
  },
}).array("images", 5); // nombre del campo = "images", máximo 10 archivos

// Middleware para subir múltiples imágenes
export const uploadImages = (req: Request, res: Response, next: NextFunction) => {

  upload(req, res, async (err) => {
    if (err instanceof MulterError) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: `Error en la carga del archivo: ${err.message}` });
    } else if (err) {
      console.error("Error general:", err);
      return res.status(400).json({ error: err.message || "Error al procesar la imagen." });
    }

    if (!req.files || !(req.files instanceof Array) || req.files.length === 0) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const uploadResults: { url: string; public_id: string }[] = [];

    try {
      const uploadPromises = req.files.map((file: Express.Multer.File) => {
        return new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "ubined",
              resource_type: "image",
            },
            (cloudErr, result) => {
              if (cloudErr || !result) {
                console.error("Cloudinary error:", cloudErr);
                return reject("Error al subir imagen a Cloudinary.");
              }

              uploadResults.push({
                url: result.secure_url,
                public_id: result.public_id,
              });

              resolve();
            }
          );

          stream.end(file.buffer);
        });
      });

      await Promise.all(uploadPromises);

      // Guardamos las URLs en el req para usarlas en el controlador
      (req as any).uploadedImages = uploadResults;
      next();

    } catch (uploadError) {
      console.error("Error durante la subida:", uploadError);
      return res.status(500).json({ error: "Error al subir las imágenes a Cloudinary." });
    }
  });
};
