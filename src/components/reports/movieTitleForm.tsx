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

const titles: string[] = [
  "劇場版　MOZU",
  "黄金のアデーレ",
  "スター・ウォーズ",
  "００７　スペクター",
  "杉原千畝",
  "orange-オレンジ-",
  "母と暮せば",
  "春子超常現象研究所",
  "妖怪ウォッチ２",
  "ちびまる子ちゃん２０１５",
  "ブリッジ・オブ・スパイ",
  "人生の約束",
];

function getStyles(title: string, selectedTitle: string[], theme: Theme) {
  return {
    fontWeight:
      selectedTitle.indexOf(title) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MovieTitleForm() {
  const theme = useTheme();
  const [selectedTitle, setSelectedTitle] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTitle>) => {
    const {
      target: { value },
    } = event;
    setSelectedTitle(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Fragment>
      <Typography variant="h5">
        作品選択
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row">
            <Button variant='contained' onClick={() => setSelectedTitle(titles)}>全て選択</Button>
            <Button variant='outlined' onClick={() => setSelectedTitle([])}>選択解除</Button>
          </Stack>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="title-select-label">作品</InputLabel>
            <Select
              labelId='title-select-label'
              id='title-select'
              multiple
              value={selectedTitle}
              onChange={handleChange}
              input={<OutlinedInput label="作品" />}
              MenuProps={MenuProps}
            >
              {titles.map((title) => (
                <MenuItem
                  key={title}
                  value={title}
                  style={getStyles(title, selectedTitle, theme)}
                >
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  )
}
