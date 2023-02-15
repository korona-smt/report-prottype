import { CardHeader } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InfoIcon from '@mui/icons-material/Info';
import TableViewIcon from '@mui/icons-material/TableView';
import * as mssql from 'mssql';
import type { GetServerSidePropsResult } from 'next';
import Layout from '../components/layouts/admin/layout';

type Props = {
  host: string;
  database: string | undefined;
  tables: string[];
}

const config: mssql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST ?? '',
  options: {
    trustServerCertificate: true,
  },
};

export async function getServerSideProps(): Promise<GetServerSidePropsResult<Props>> {
  const connection = await mssql.connect(config);
  const result = await connection.request().query("SELECT * FROM sys.tables");
  const tables: string[] = [];
  result.recordset.forEach((row) => {
    tables.push(row.name);
  })
  return {
    props: {
      host: config.server,
      database: config.database,
      tables,
    }
  };
}

export default function Database({ host, database, tables }: Props) {
  return (
    <Layout title="Database" current="database">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="接続情報" avatar={<InfoIcon />} />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText primary="Host" secondary={host} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Database" secondary={database} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="テーブル一覧" avatar={<TableViewIcon />} />
            <CardContent>
              <List>
                {tables.map((table) => (
                  <ListItem>
                    <ListItemText primary={table} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
