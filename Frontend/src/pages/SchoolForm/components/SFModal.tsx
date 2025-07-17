import { useRef } from "react";
import { IconArchive } from "@/assets/Icons";

interface SFModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export function SFModal({ setModal, images, setImages }: SFModalProps) {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (images.length + files.length > 5) {
            alert("No puedes subir más de 5 fotos");
            return;
        }
        setImages((prev) => [...prev, ...files]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
        if (images.length + files.length > 5) {
            alert('Máximo 5 imágenes.');
            return;
        }
        setImages((prev) => [...prev, ...files]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <section className="photoModalContainer">
            <div className="bgPModal" onClick={() => setModal(false)}></div>
            <div className="modalContent">
                <button className="closeModal" onClick={() => setModal(false)}>X</button>
                {
                    images.map((image, index) => (
                        <div className="multipleImage" key={`image${index}`}>
                            <img src={URL.createObjectURL(image)} alt="" />
                            <button onClick={() => removeImage(index)} className="deleteImage">X</button>
                        </div>
                    ))
                }
                {
                    images.length < 5 && (
                        <div className="uploadPhotos" onDrop={handleDrop} onDragOver={handleDragOver}>
                            <input type="file" multiple accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} disabled={images.length >= 5} ref={fileInputRef}/>
                            <IconArchive />
                            <p>Sube fotos o arrastralas aquí</p>
                            <p>Máximo de 5 fotos</p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
