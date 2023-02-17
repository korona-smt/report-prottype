import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Layout from '../components/layouts/admin/layout';
import DateRangeForm from '../components/reports/dateRangeForm';
import MovieTitleForm from '../components/reports/movieTitleForm';
import ShopForm from '../components/reports/shopForm';
import Confirm from '../components/reports/confirm';

const steps = ['期間選択', '作品選択', '店舗選択', '確認'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <DateRangeForm />
    case 1:
      return <MovieTitleForm />;
    case 2:
      return <ShopForm />;
    case 3:
      return <Confirm />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Report() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Layout title="Reports" current="reports">
      <Paper variant="outlined" sx={{ my: 6, p: 3 }}>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && (
            <Button
              onClick={handleBack}
              sx={{ mt: 3, ml: 1 }}
            >
              戻る
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
            >
              ダウンロード
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              次へ
            </Button>
          )}
        </Box>
      </Paper>
    </Layout>
  );
}