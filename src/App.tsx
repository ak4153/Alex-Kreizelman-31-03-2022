import { Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
function App() {
  return (
    <>
      <Layout title="Sharp - Wheather">
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
