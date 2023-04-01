 
import { useEffect, useState } from "react";

const HeaderCell=({column, sorting, sortTable})=>{
  const isDescSorting=sorting.column===column && sorting.order=="desc";
  const isAscSorting=sorting.column===column && sorting.order=="asc";
 const futureSortOrder=isDescSorting ?'asc':'desc';
  return(
      <th key={column} className="users-table-cell" onClick={()=>sortTable({column, order: futureSortOrder})}>
        {column}
        {isDescSorting && <span>▼</span>}
        {isAscSorting && <span>▲</span>}
        </th>
  );
};


const Header =({columns, sorting, sortTable})=> {
  return(
    <thead>
      <tr>
        {columns.map((column)=>(
        <HeaderCell column={column} sorting={sorting} key={column} sortTable={sortTable}/>
        ))}
      </tr>
    </thead>
  );
};

const Content=({entries, columns})=> {
  return (
    <tbody>
      {entries.map(entry=>(
        <tr key={entry.id}>
          {columns.map((column)=>(
            <td key={column} className="users-table-cell">
              {entry[column]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default function Table(){
  const [error, setError]=useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [sorting, setSorting]=useState({column: "id", order:"asc"});
    const columns=["id", "name", "username", "email", "website"];
    const sortTable=(newSorting)=>{
      setSorting(newSorting)
    }
      
    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/users?_sort=${sorting.column}&_order=${sorting.order}`)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // желательно обрабатывать ошибки именно здесь, а не в блоке catch(),
          // чтобы не перехватывать исключения из ошибок в самих компонентах.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [sorting])
  
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
           return (
        <div>
          Search bar
          <table className="users-table">
            <Header columns={columns} sorting={sorting} sortTable={sortTable}/>
            <Content entries={items} columns={columns}/>

          </table>
        </div>
      )}}