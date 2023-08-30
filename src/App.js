import { useEffect, useState } from 'react';
import DataTable from './components/DataTable';

function App() {
  const columns = [
    'firstName',
    'lastName',
    'maidenName',
    'age',
    'email',
    'phone',
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://dummyjson.com/users');
      const json = await res.json();

      setData(json.users);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data} perPage={6} />
    </div>
  );
}

export default App;
