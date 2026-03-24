import React from "react";
import frLocale from "date-fns/locale/fr";
import { DateTimeInput as SemAppsDateTimeInput } from '@semapps/date-components';
import { frFR } from "@mui/x-date-pickers/locales";
import { CommonInputProps } from "react-admin";

type Props = CommonInputProps & {
  disablePast?: boolean;
  minDateTime?: Date;
}

const DateTimeInput = ({source, disablePast, minDateTime, ...props}: Props) => (
  <SemAppsDateTimeInput
    source={source}
    locale={frLocale}
    translations={frFR}
    disablePast={disablePast}
    minDateTime={minDateTime}
    {...props}
  />
);

export default DateTimeInput;
