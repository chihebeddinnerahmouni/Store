import { useState } from 'react';
import { IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const ImageCont = () => {
    const [image, setImage] = useState<string | null>(null);

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
      // <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <section className="cardCss flex flex-col items-center lg:col-span-3">
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
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            {image ? (
              <img src={image} className="rounded" alt="image" />
            ) : (
              <PhotoCamera sx={{ fontSize: 50 }} />
            )}
          </IconButton>
        </label>
      </section>
    );
};

export default ImageCont;