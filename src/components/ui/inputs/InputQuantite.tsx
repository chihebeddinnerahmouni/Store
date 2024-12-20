
interface IInputQuantite {
  row: any;
  handleDecrement: (e: any) => void;
  handleQuantityChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  handleIncrement: (e: any) => void;
}

const InputQuantite = ({
  row,
  handleDecrement,
  handleQuantityChange,
  handleIncrement,
}: IInputQuantite) => {
  const mainColor = "#006233";

  return (
    <div className="rounded-[5px] overflow-hidden flex justify-between items-center bg-gray-200 gap-2">
      <button
        style={{
          backgroundColor: mainColor,
          color: "white",
          width: "20px",
        }}
        // onClick={()=> handleDecrement()}
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="number"
        value={row.quantite}
        onChange={(e) => handleQuantityChange(e, row.id)}
        className="text-center quentiteInputCss"
        style={{
          width: "50px",
          border: "none",
          outline: "none",
        }}
      />
      <button
        style={{
          backgroundColor: mainColor,
          color: "white",
          width: "20px",
        }}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default InputQuantite;
