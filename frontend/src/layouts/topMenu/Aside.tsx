import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Aside = styled(Box)(({ theme }) => ({
  minWidth: '300px',
  padding: 16,
  boxSizing: 'border-box',
  [theme.breakpoints.down('md')]: {
    paddingBottom: 56+16
  }
}));

export default Aside;
