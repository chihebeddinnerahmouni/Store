import {
    Box,
    // Typography
} from '@mui/material';


const InstructionsCont = () => {
    return (
      <section className="cardCss flex flex-col gap-2">
        {instructions.map((instruction, index) => (
          <Box key={index}>
            {/* <Typography
              sx={{
                fontFamily: "Changa, sans-serif",
              }}
              variant="h6"
              component="div"
            >
              {instruction.key}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Changa, sans-serif",
              }}
              variant="body1"
              component="div"
            >
              {instruction.value}
            </Typography> */}
                <p>
                    <span className="font-semibold">{instruction.key}:</span> {instruction.value}.
                </p>
          </Box>
        ))}
      </section>
    );
}

export default InstructionsCont;



    const instructions = [
      {
        key: "Désignation",
        value: "Le nom du produit"
      },
        {
            key: "Code Produit",
            value: "Le code barre du produit"
        },
        {
            key: "Categorie",
            value: "La catégorie du produit"
        },
        {
            key: "Marque",
            value: "La marque du produit"
        },
        {
            key: "Tax de commande",
            value: "La taxe de commande du produit"
        },
    ];