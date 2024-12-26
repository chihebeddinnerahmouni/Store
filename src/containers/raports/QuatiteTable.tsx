
interface Props {
  data: { entrepot_name: string; quantity: number }[];
}

const QuatiteTable = ({ data }: Props) => {
    return (
        <div className='mt-5 max-h-[200px] overflow-auto lg:mt-10'>
            <table className='w-full border-collapse'>
                <thead>
                    <tr>
                        <th className='text-left font-bold border-b border-writingGrey py-2'>Magasin</th>
                        <th className='text-left font-bold border-b border-writingGrey py-2'>Quantité</th>
                    </tr>
                </thead>
                <tbody className="text-black/70">
                    {data.map((item, index) => (
                        <tr key={index} className='hover:bg-gray-200'>
                            <td className='text-left border-b border-writingGrey/30 py-2'>{item.entrepot_name}</td>
                            <td className='text-left border-b border-writingGrey/30 py-2'>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default QuatiteTable;