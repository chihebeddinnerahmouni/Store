import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";

interface IProps {
  loading: boolean;
}

const SubmitCont = ({ loading }: IProps) => {
  return (
    <div className="button mt-5">
      <FullShiningButton text="Soumettre" loading={loading} type="submit" />
    </div>
  );
};

export default SubmitCont;
