import { useState } from 'react';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import InstructionsCont from './InstructionsCont';

const ImageCont = () => {

  const [image, setImage] = useState<string | null>(null);
    const mainColor = "#006233";


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
      <section className="flex flex-col gap-5 lg:gap-8 lg:col-span-3">
        <div className="photo cardCss flex flex-col items-center">
          <h1 className="text-[20px] mb-5">Ajouter une image de produit</h1>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              aria-label="upload picture"
              component="span"
              sx={{
                color: mainColor,
              }}
            >
              {image ? (
                <img src={image} className="rounded" alt="image" />
              ) : (
                <PhotoCamera sx={{ fontSize: 50 }} />
              )}
            </IconButton>
          </label>
        </div>

        <div className="lg:col-span-3 hidden lg:block">
          <InstructionsCont />
        </div>
      </section>
    );
};

export default ImageCont;