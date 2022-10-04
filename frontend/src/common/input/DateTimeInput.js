import React from "react";
import frLocale from "date-fns/locale/fr";
import { DateTimeInput as SemAppsDateTimeInput } from "@semapps/date-components";

const DateTimeInput = props => (
  <SemAppsDateTimeInput
    options={{
      format: 'dd/MM/yyyy à HH:mm',
      ampm: false
    }}
    providerOptions={{
      locale: frLocale
    }}
    fullWidth
    {...props}
  />
);

export default DateTimeInput;
