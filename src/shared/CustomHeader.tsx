interface Props {
  title: string,
  description?: string;
}

export const CustomHeader = (props: Props) => {
  return (
    <>
      <div className="content-center">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    </>
  )
}
