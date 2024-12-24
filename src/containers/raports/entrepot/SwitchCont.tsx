interface Props {
    selected: "achats" | "ventes";
    setSelected: (selected: "achats" | "ventes") => void;
}

const SwitchCont = ({ selected, setSelected }: Props) => {
    return (
        <section className="flex mt-5 lg:mt-10">
            <div
                onClick={() => setSelected("achats")}
                className={`p-3 cursor-pointer rounded-t-md text-center flex-1  ${
                    selected === "achats" 
                        ? 'text-whit shadow-sm bg-white border-l-2 border-r-2 border-t-2 border-main ' 
                        : 'text-gray-700 border-b-2 border-main'
                }`}
            >
                Achats
            </div>
            <div
                onClick={() => setSelected("ventes")}
                className={`p-3 cursor-pointer rounded-t-md text-center flex-1  ${
                    selected === "ventes" 
                        ? 'text-whit shadow-sm bg-white border-l-2 border-r-2 border-t-2 border-main ' 
                        : 'text-gray-700 border-b-2 border-main'
                }`}
            >
                Ventes
            </div>
        </section>
    );
}

export default SwitchCont;