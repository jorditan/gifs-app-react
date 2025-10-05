
interface Props {
  title: string,
  description?: string;
}

export const CustomHeader = (props: Props) => {
  return (
    <>
      <div className="w-[100%] justify-between flex">

      </div>
      <div className="content-center pb-4 pt-4 w-[100%]">
        <h2 className="text-3xl font-bold">{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </>
  )
}
