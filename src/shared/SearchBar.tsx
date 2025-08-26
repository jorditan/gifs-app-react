interface Props {
  placeholder: string
}

export const SearchBar = (props: Props) => {
  return (
    <>
      <div className="search-container">
        <input type="text" placeholder={props.placeholder} />
        <button>Buscar</button>
      </div>
    </>
  )
}
