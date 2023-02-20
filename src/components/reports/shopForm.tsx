import { Fragment, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 100;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const shops: string[] = [
  "小牧",
  "春日井",
  "平田",
  "豊川",
  "江南",
  "中川",
  "安城",
  "太田",
  "青森",
  "福井",
  "仙台",
  "小田原",
  "大垣",
  "泉",
  "小倉",
  "金沢",
];

function getStyles(title: string, selectedTitle: string[], theme: Theme) {
  return {
    fontWeight:
      selectedTitle.indexOf(title) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ShopForm() {
  const theme = useTheme();
  const [selectedShop, setSelectedShop] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedShop>) => {
    const {
      target: { value },
    } = event;
    setSelectedShop(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Fragment>
      <Typography variant="h5">
        店舗選択
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Button variant='contained' onClick={() => setSelectedShop(shops)}>全て選択</Button>
            <Button variant='outlined' onClick={() => setSelectedShop([])}>選択解除</Button>
          </Stack>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="title-select-label">店舗</InputLabel>
            <Select
              labelId='title-select-label'
              id='title-select'
              multiple
              value={selectedShop}
              onChange={handleChange}
              input={<OutlinedInput label="店舗" />}
              MenuProps={MenuProps}
            >
              {shops.map((shop) => (
                <MenuItem
                  key={shop}
                  value={shop}
                  style={getStyles(shop, selectedShop, theme)}
                >
                  {shop}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  )
}
