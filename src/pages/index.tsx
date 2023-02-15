import type { GetServerSidePropsResult } from 'next';
import Alert from '@mui/material/Alert';
import Layout from '../components/layouts/admin/layout';

type Props = {
  ip: string | null;
}

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  const ip = data.ip;

  return { props: { ip } };
}

export default function Home({ ip }: Props) {
  return (
    <Layout title={"Dashboard"}>
      <Alert severity="success"><strong>{ip}</strong>からの接続に成功しました！</Alert>
    </Layout>
  );
}
