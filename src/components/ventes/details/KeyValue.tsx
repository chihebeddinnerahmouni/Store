// import React from 'react'

// const KeyValue = () => {
//   return (
//     <div className=''>
//           <span>chiheb:</span>
//           {" "}
//           <span>rahmouni</span>
//     </div>
//   )
// }

// export default KeyValue

interface Props {
    title: string;
    value: string;
}

const KeyValue = ({title, value}:Props) => {
    return (
      <div className="flex items-center font-sans">
        <span className="font-bold text-gray-800 mr-2 lg:text-lg">
          {title}:
        </span>
        <span className="font-normal text-gray-600 lg:text-lg">
          {value}
        </span>
      </div>
    );
}

export default KeyValue;