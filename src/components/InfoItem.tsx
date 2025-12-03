import { Typography } from '@mui/material';

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
}

export default function InfoItem({ label, value }: InfoItemProps) {
  return (
    <Typography>
      <Typography component="span" fontWeight="bold">{label}:</Typography> {value}
    </Typography>
  );
}
