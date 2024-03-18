import React from "react";
import { useGetList, useRecordContext } from "react-admin";
import { FilterHandler } from "@semapps/semantic-data-provider";

const GroupedReferenceHandler = ({
    children,
    groupReference,
    groupLabel,
    groupHeader,
    filterProperty,
    ...otherProps
  }) => {
    const record = useRecordContext();
    const { data } = useGetList(groupReference);
  
    return (
      <>
        {data?.map((data, index) => {
          let filter = {};
          filter[filterProperty] = data.id;
  
          return (
            <div key={index}>
              {groupHeader && groupHeader({ ...otherProps, group: data })}
              <FilterHandler {...otherProps} record={record} filter={filter} label={data[groupLabel]}>
                {children}
              </FilterHandler>
            </div>
          );
        })}
      </>
    );
  };
  
export default GroupedReferenceHandler;  