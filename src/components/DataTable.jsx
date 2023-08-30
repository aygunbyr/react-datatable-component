import { useState, useMemo, useEffect } from 'react';

const DataTable = ({ columns, data, perPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  // Filtreleme işlemi için kullanılan veri
  const filteredData = useMemo(() => {
    console.log('filteredData değişti');
    return data?.filter((item) =>
      item.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  useEffect(() => {
    console.log('DataTable render oldu');
  });

  // Sayfalama işlemi için kullanılan veri
  const paginatedData = useMemo(() => {
    console.log('paginatedData değişti');
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredData?.slice(startIndex, endIndex);
  }, [currentPage, perPage, filteredData]);

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(filteredData?.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col}>{item[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
