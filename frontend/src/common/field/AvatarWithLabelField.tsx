import React from 'react';
import { useRecordContext } from 'react-admin';
import { Box, Avatar, Chip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LaunchIcon from '@mui/icons-material/Launch';

const useStyles = makeStyles(() => ({
  parent: {
    position: 'relative',
  },
  square: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    // backgroundColor: theme.palette.primary.main,
    '& svg': {
      width: '55%',
      height: '55%',
    },
  },
  chip: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 10,
    cursor: 'pointer',
  },
  launchIcon: {
    width: 14,
  },
}));

const handleClick = () => {};

type AvatarRecord = Record<string, unknown>;

type Props = {
  label: string | ((record?: AvatarRecord) => string);
  defaultLabel: string;
  image: string | ((record?: AvatarRecord) => string);
  fallback: string | ((record?: AvatarRecord) => string);
  externalLink: boolean;
  labelColor: 'default' | 'secondary' | 'primary' | 'error' | 'info' | 'success' | 'warning';
};

const AvatarWithLabelField = ({
  label,
  defaultLabel,
  image,
  fallback,
  externalLink = false,
  labelColor = 'secondary',
  ...rest
}: Props) => {
  const classes = useStyles();
  const record = useRecordContext<Record<string, string>>();

  const computedLabel = (typeof label === 'function' ? label(record) : record?.[label]) || defaultLabel;
  const computedImage = typeof image === 'function' ? image(record) : record?.[image];
  const computedFallback = typeof fallback === 'function' ? fallback(record) : fallback;

  return (
    <Box className={classes.parent}>
      <div className={classes.square}>
        <Avatar src={computedImage || computedFallback} alt={computedLabel} className={classes.avatar} {...rest} />
      </div>
      {!computedLabel ? null : externalLink ? (
        <Chip
          color={labelColor}
          className={classes.chip}
          size="small"
          label={computedLabel}
          deleteIcon={<LaunchIcon className={classes.launchIcon} />}
          onDelete={handleClick}
        />
      ) : (
        <Chip color={labelColor} className={classes.chip} size="small" label={computedLabel} />
      )}
    </Box>
  );
};

export default AvatarWithLabelField;
