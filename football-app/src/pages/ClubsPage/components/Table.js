export function Table({headers,content}){
    const renderedHeaders = headers.map((h) => {
        return <th>{h.name}</th>
    })

    return (
    <table className="w-full">
    <thead>
      <tr className="bg-gray-500 border-b-4 border-black">
        {renderedHeaders}
      </tr>
    </thead>
    <tbody>{content}</tbody>
  </table>)
}