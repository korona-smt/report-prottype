import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const titles = [
  "劇場版　MOZU",
  "スター・ウォーズ",
  "００７　スペクター",
  "春子超常現象研究所",
  "妖怪ウォッチ２",
  "ブリッジ・オブ・スパイ",
  "人生の約束",
];

const shops: string[] = [
  "小牧",
  "春日井",
  "平田",
  "江南",
  "太田",
  "青森",
  "福井",
  "大垣",
  "泉",
  "小倉",
  "金沢",
];

export default function Confirm() {
  return (
    <Fragment>
      <Typography variant="h5">
        確認
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            期間
          </Typography>
          <Typography>楽日</Typography>
          <Typography>2023/mm/dd ～ 2023/mm/dd</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            作品
          </Typography>
          <List dense>
            {titles.map((title) => (
              <ListItem key={title}>
                <ListItemText primary={title}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            店舗
          </Typography>
          <List dense>
            {shops.map((shop) => (
              <ListItem key={shop}>
                <ListItemText primary={shop}></ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Fragment>
  );
}
