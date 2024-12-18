

const Label = ({id, text}: {id: string, text: string}) => {
  return (
    <label htmlFor={id}>{text}*:</label>
  )
}

export default Label
