import { createTheme, adaptV4Theme } from '@mui/material/styles';

// Allow to use breakpoints
const defaultTheme = createTheme();

const theme = createTheme(adaptV4Theme({
  palette: {
    primary: { main: '#28ccfb', contrastText: '#fff' },
    secondary: { main: '#bcef5b' },
    grey: { main: '#e0e0e0' }
  },
  typography: {
    details: {
      fontSize: 8
    }
  },
  overrides: {
    RaChipField: {
      chip: {
        marginLeft: 0,
        marginTop: 0,
        marginRight: 8,
        marginBottom: 8
      }
    },
    RaShow: {
      card: {
        padding: 25,
        [defaultTheme.breakpoints.down('sm')]: {
          padding: 15
        }
      }
    },
    RaList: {
      content: {
        padding: 25,
        [defaultTheme.breakpoints.down('sm')]: {
          padding: 15,
          paddingTop: 0,
          marginTop: -8
        }
      }
    },
    RaListToolbar: {
      toolbar: {
        paddingLeft: '0 !important'
      }
    },
    RaSingleFieldList: {
      root: {
        marginTop: 0,
        marginBottom: 0
      }
    },
    RaAutocompleteArrayInput: {
      chipContainerFilled: {
        '& .serverName': {
          display: 'none'
        }
      }
    },
    MuiTab: {
      root: {
        minWidth: 160
      },
      labelIcon: {
        paddingTop: 0
        // minHeight: 0
      }
      // wrapper: {
      //   alignItems: null,
      //   flexDirection: null
      // }
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: '#efefef',
      },
      input: {
        paddingTop: 12
      }
    },
    MuiAutocomplete: {
      inputRoot: {
        paddingTop: 12,
        paddingBottom: 5
      }
    },
    MuiCard: {
      root: {
        '@media print': {
          boxShadow: 'none !important'
        }
      }
    }
  }
}));

export default theme;
