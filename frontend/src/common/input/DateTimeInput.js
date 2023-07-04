import React from "react";
import frLocale from "date-fns/locale/fr";
import { DateTimeInput as SemAppsDateTimeInput } from "@semapps/date-components";

const DateTimeInput = props => (
  <SemAppsDateTimeInput
    locale={frLocale}
    {...props}
  />
);

export default DateTimeInput;
