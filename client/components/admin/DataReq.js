
export default function DataReq({data}) {
  
  return (
    
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Beneficiary ID
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Others
          </th>
          <th className="px-6 py-3 bg-gray-50"></th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, i) => (

          <tr key={i}>
          <td className="px-6 py-4 whitespace-no-wrap">
            <div className="text-sm leading-5 text-gray-900">{row.beneficiaryID_beneficiaryID}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
              {"To "+row.status}
            </span>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap">
            <p>{row.other != "null" ? row.other : "None" }</p>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
          </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}