import React from "react";
import frLocale from "date-fns/locale/fr";
import { DateTimeInput as SemAppsDateTimeInput } from '@semapps/date-components';
import { frFR } from "@mui/x-date-pickers/locales";

const DateTimeInput = props => (
  <SemAppsDateTimeInput
    locale={frLocale}
    translations={frFR}
    {...props}
  />
);

export default DateTimeInput;
