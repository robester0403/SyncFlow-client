import "./TablesHeader.scss"

interface Props{
    title : string
    searchField : string;
    onChangeHandler : (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const TablesHeader: React.FC<Props> = ({title,searchField,onChangeHandler}) => {
  return (
    <div className="table-headers__header">
        <h1 className="table-headers__title">{title}</h1>
        <div className="table-headers__cta">
          <div className="table-headers__search">
            <input
              type="text"
              name="search"
              id="search"
              className="table-headers__search-input"
              placeholder="Search..."
              value={searchField}
              onChange={onChangeHandler}
            />
          </div>
        </div>
      </div>  
  )
}

export default TablesHeader
