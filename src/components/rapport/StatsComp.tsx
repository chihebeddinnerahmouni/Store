
interface ButtonTopProps {
  title: string;
  Icon: any;
  value: string;
}

const StatsComp = ({ title, Icon, value }: ButtonTopProps) => {
  return (
    <div className="cardCss flex items-center gap-2 transition-transform duration-300  whitespace-nowrap flex-grow lg:gap-5">
      <Icon className="text-[30px] object-cover text-main lg:text-[50px]" />
      <div className="text">
        <p className="text-xs text-writingGrey lg:text-base">{title}</p>
        <p className="text-lg font-semibold lg:text-2xl">{value}</p>
      </div>
    </div>
  );
};


export default StatsComp;
