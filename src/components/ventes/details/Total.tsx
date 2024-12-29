
interface Props {
  data: string;
}

const Total = ({ data }: Props) => {
  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2 text-main">Total</h2>
          <p className="text-xl font-semibold lg:text-2xl">
              {data} DA
      </p>
    </div>
  );
};


export default Total;
