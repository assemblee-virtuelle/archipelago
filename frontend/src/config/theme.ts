import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Components {
    RaToolbar?: unknown;
    RaListToolbar?: unknown;
    RaSingleFieldList?: unknown;
    RaAutocompleteArrayInput?: unknown;
    RaMenuItemLink?: unknown;
    RaCreateButton?: unknown;
  }

  interface Palette {
    inputBackgroundColor: Palette['primary'];
  }
  interface PaletteOptions {
    inputBackgroundColor?: PaletteOptions['primary'];
  }
}

const colorTheme = createTheme({
  palette: {
    inputBackgroundColor: { main: '#efefef' },
  },
});

const theme = createTheme(colorTheme, {
  components: {
    RaToolbar: {
      styleOverrides: {
        root: {
          [`&.RaToolbar-mobileToolbar`]: {
            position: 'static',
          },
        },
      },
    },
    RaListToolbar: {
      styleOverrides: {
        toolbar: {
          paddingLeft: '0 !important',
        },
      },
    },
    RaSingleFieldList: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
        },
      },
    },
    RaAutocompleteArrayInput: {
      styleOverrides: {
        chipContainerFilled: {
          '& .serverName': {
            display: 'none',
          },
        },
      },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          '&.RaMenuItemLink-active': {
            borderLeft: `3px solid ${colorTheme.palette.primary.main}`,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minWidth: 160,
        },
        labelIcon: {
          paddingTop: 0,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colorTheme.palette.inputBackgroundColor.main,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          paddingTop: 12,
          paddingBottom: 5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '@media print': {
            boxShadow: 'none !important',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: {
          [theme.breakpoints.up('md')]: {
            overscrollBehaviorY: 'none',
          },
        },
      }),
    },
    RaCreateButton: {
      styleOverrides: {
        root: {
          '.MuiToolbar-root &.RaCreateButton-floating': {
            display: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      },
    },
  },
});

export default theme;
