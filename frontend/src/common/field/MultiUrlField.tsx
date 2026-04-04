import React from 'react';
import { FieldProps, useRecordContext } from 'react-admin';
import { Chip } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { BaseRecord } from '../../resources';

type DomainMapping = {
  label: string;
  icon: JSX.Element;
  color?: string;
  contrastText?: string;
};

const defaultdomainMapping: Record<string, DomainMapping> = {
  'facebook.com': {
    label: 'Facebook',
    icon: <FacebookIcon />,
    color: '#4267B2',
    contrastText: 'white'
  },
  'instagram.com': {
    label: 'Instagram',
    icon: <InstagramIcon />,
    color: '#8a3ab9',
    contrastText: 'white'
  },
  'youtube.com': {
    label: 'YouTube',
    icon: <YouTubeIcon />,
    color: '#FF0000',
    contrastText: 'white'
  }
};

const useStyles = makeStyles()(() => ({
  link: {
    textDecoration: 'unset',
    '& :hover': {
      cursor: 'pointer'
    }
  },
  chip: {
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 5,
    marginBottom: 5
  },
  label: {
    marginTop: -1
  }
}));

type Props = FieldProps & {
  domainMapping?: Record<string, DomainMapping>;
};

const MultiUrlField = ({ source, domainMapping }: Props) => {
  const newDomainMapping = { ...defaultdomainMapping, ...domainMapping };
  const record = useRecordContext<BaseRecord & { [source: string]: string | string[] }>();
  const { classes } = useStyles();

  const urlArray = record?.[source] ? (Array.isArray(record[source]) ? record[source] : [record[source]]) : [];

  return urlArray.map((url, index) => {
    if (!url.startsWith('http')) url = `https://${url}`;

    let parsedUrl = null;
    try {
      parsedUrl = new URL(url);
    } catch (e) {
      return null;
    }

    const chip: DomainMapping = newDomainMapping[parsedUrl.hostname] || {
      label: parsedUrl.toString(),
      icon: <LanguageIcon />,
    };

    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={classes.link} key={index}>
        <Chip
          component="span"
          icon={React.cloneElement(chip.icon, { style: { color: chip.contrastText, width: 18, height: 18 } })}
          size="small"
          label={chip.label}
          classes={{ root: classes.chip, label: classes.label }}
          style={{ color: chip.contrastText, backgroundColor: chip.color }}
        />
      </a>
    );
  });
};

export default MultiUrlField;
