// import { useForm, SubmitHandler } from 'react-hook-form';
import Designation from '../../../components/products/add products/1st section/Designation';
import CodeBarre from '../../../components/products/add products/1st section/CodeBarre';
// type FormValues = {
//     productName: string;
// };

interface ProductStContProps {
    designation: string;
    setDesignation: (value: string) => void;
    codeBarre: string;
    setCodeBarre: (value: string) => void;
}

const ProductStCont = ({designation, setDesignation, codeBarre, setCodeBarre}: ProductStContProps) => {
    // const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    // const onSubmit: SubmitHandler<FormValues> = data => console.log(data);


    return (
      <section className='cardCss grid grid-cols-1 gap-5'>
          <Designation
            // register={register}
            // errors={errors}
            id={"designation"}
            setDesignation={setDesignation}
            designation={designation}
            />
            
            <CodeBarre
                id={"codeBarre"}
                value={codeBarre}
                setValue={setCodeBarre}
            />
      </section>
    );
};

export default ProductStCont;