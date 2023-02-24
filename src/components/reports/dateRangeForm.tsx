
import { Fragment, ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DatePicker from '../atoms/datePicker';

export default function DateRangeForm() {
  const defaultType = "range";
  const [type, setType] = useState(defaultType);
  const onChange = (_e: ChangeEvent<HTMLInputElement>, value: string) => {
    setType(value);
  };

  const [from, setFrom] = useState<Date | null>(null);
  const handleFromChange = (newValue: Date | null) => {
    setFrom(newValue);
  };

  const [to, setTo] = useState<Date | null>(new Date());
  const handleToChange = (newValue: Date | null) => {
    setTo(newValue);
  };

  return (
    <Fragment>
      <Typography variant="h5">
        期間選択
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel id="date-range-type">区分</FormLabel>
            <RadioGroup
              aria-labelledby="date-range-type"
              name="date-range-type"
              defaultValue={defaultType}
              value={type}
              onChange={onChange}
            >
              <FormControlLabel value="range" control={<Radio />} label="期間指定検索" />
              <FormControlLabel value="rakuzitu" control={<Radio />} label="楽日検索" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>期間</FormLabel>
            <FormGroup row sx={{ alignItems: "center" }}>
              <DatePicker
                label="From"
                value={from}
                onChange={handleFromChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <Box sx={{ mx: 2 }}> ～ </Box>
              <DatePicker
                label="To"
                value={to}
                onChange={handleToChange}
                renderInput={(params) => <TextField required {...params} />}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Fragment>
  )
};
