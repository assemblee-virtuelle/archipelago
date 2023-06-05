import { createTheme } from '@mui/material/styles';

// Allow to use breakpoints
const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: { main: '#28ccfb', contrastText: '#ffffff' },
    secondary: { main: '#bcef5b' },
    grey: { main: '#e0e0e0' }
  },
  typography: {
    details: {
      fontSize: 8
    }
  },
  components: {
    RaChipField: {
      styleOverrides: {
        chip: {
          marginLeft: 0,
          marginTop: 0,
          marginRight: 8,
          marginBottom: 8
        }
      }
    },
    RaShow: {
      styleOverrides: {
        card: {
          padding: 25,
          [defaultTheme.breakpoints.down('sm')]: {
            padding: 15
          }
        }
      }
    },
    RaList: {
      styleOverrides: {
        content: {
          padding: 25,
          [defaultTheme.breakpoints.down('sm')]: {
            padding: 15,
            paddingTop: 0,
            marginTop: -8
          }
        }
      }
    },
    RaListToolbar: {
      styleOverrides: {
        toolbar: {
          paddingLeft: '0 !important'
        }
      }
    },
    RaSingleFieldList: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0
        }
      }
    },
    RaAutocompleteArrayInput: {
      styleOverrides: {
        chipContainerFilled: {
          '& .serverName': {
            display: 'none'
          }
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 160
        },
        labelIcon: {
          paddingTop: 0
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#efefef',
        },
        input: {
          paddingTop: 12
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          paddingTop: 12,
          paddingBottom: 5
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '@media print': {
            boxShadow: 'none !important'
          }
        }
      }
    }
  }
});

export default theme;
