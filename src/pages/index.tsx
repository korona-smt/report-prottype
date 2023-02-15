import Alert from '@mui/material/Alert';
import Layout from '../components/layouts/admin/layout';

export default function Home() {
  return (
    <Layout title={"Dashboard"}>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Layout>
  );
}
