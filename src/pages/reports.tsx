import React, { FC, ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Layout from '../components/layouts/admin/layout';
import DateRangeForm from '../components/reports/dateRangeForm';
import MovieTitleForm from '../components/reports/movieTitleForm';
import ShopForm from '../components/reports/shopForm';
import Confirm from '../components/reports/confirm';
import Button from '../components/atoms/button';
import type { Data } from './api/reports';

type Step = {
  name: string;
  content: ReactNode;
}

const steps: Map<number, Step> = new Map([
  [0, { name: "期間選択", content: <DateRangeForm />}],
  [1, { name: "作品選択", content: <MovieTitleForm />}],
  [2, { name: "店舗選択", content: <ShopForm />}],
  [3, { name: "確認", content: <Confirm />}],
]);

function getStepContent(no: number): ReactNode {
  const step = steps.get(no);
  if (step === undefined) {
    throw new Error('Unknown step');
  }
  return step.content;
}

export default function Report() {
  const [activeStep, setActiveStep] = useState(0);

  const downloadReport = async () => {
    await fetch("/api/reports")
      .then(data => data.json())
      .then((data: Data) => window.open(`/download?filename=` + data.filename));
  }

  return (
    <Layout title="Reports" current="reports">
      <Paper variant="outlined" sx={{ my: 6, p: 3 }}>
        <Stepper labels={Array.from(steps).map(([_no, step]) => step.name)} activeStep={activeStep} />
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {activeStep !== 0 && (
            <ButtonBack toBackActiveStep={() => setActiveStep(activeStep - 1)} />
          )}
          {activeStep === steps.size - 1 ? (
            <ButtonDonwload downloadReport={downloadReport} />
          ) : (
            <ButtonNext toNextActiveStep={() => setActiveStep(activeStep + 1)} />
          )}
        </Box>
      </Paper>
    </Layout>
  );
}

const Stepper: FC<{ labels: string[], activeStep: number }> = ({ labels, activeStep }) => {
  return (
    <MuiStepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
      {labels.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  )
}

const ButtonNext: FC<{ toNextActiveStep: () => void }> = ({ toNextActiveStep }) => {
  return (
    <Button
      variant="contained"
      onClick={() => toNextActiveStep()}
    >
      次へ
    </Button>
  )
}

const ButtonBack: FC<{ toBackActiveStep: () => void }> = ({ toBackActiveStep }) => {
  return (
    <Button onClick={() => toBackActiveStep()} >
      戻る
    </Button>
  )
}

const ButtonDonwload: FC<{ downloadReport: () => Promise<void> }> = ({ downloadReport }) => {
  const [donwloading, setDonwloading] = useState(false);

  const handleClick = async () => {
    setDonwloading(true);
    await downloadReport();
    setDonwloading(false);
  }

  return (
    <Button
      disabled={donwloading}
      variant="contained"
      onClick={handleClick}
    >
      {donwloading ? "ダウンロード中" : "ダウンロード"}
    </Button>
  )
}
