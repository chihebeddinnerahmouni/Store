

const PageTitle = ({text}: {text: string}) => {
  return (
    <div className="pt-3 w-full lg:pt-6">
      <h3 className=" text-[25px] font-light">
      {text}
      </h3>
      <hr className="w-full mt-3 mb-5 lg:mt-6 lg:mb-7"/>
    </div>
      
  )
}

export default PageTitle
