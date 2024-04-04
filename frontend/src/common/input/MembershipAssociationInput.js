import React from "react";
import {
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  AutocompleteInput,
  useRecordContext,
  useGetMany,
  ReferenceInput,
  FormDataConsumer,
  RecordContextProvider,
  SelectInput,
} from "react-admin";

const MembershipAssociationInput = (props) => {
  const { source, referenceInputProps, label } = props;
  const record = useRecordContext();

  const { data } = useGetMany("MembershipAssociation", {
    ids: record?.[source] || [],
  });

  if (!data) return null;

  return (
    <ArrayInput source={source}>
      <SimpleFormIterator inline>
        <FormDataConsumer>
          {({ scopedFormData, getSource }) => {
            const relationRecord = data?.find((r) => r.id === scopedFormData);

            return (
              <RecordContextProvider value={relationRecord}>
                <ReferenceInput {...referenceInputProps}>
                  <AutocompleteInput
                    name={getSource(referenceInputProps.source)}
                    label={label}
                    size="small"
                    sx={{
                      mt: 1,
                      mb: "4px",
                      minWidth: 300,
                    }}
                    shouldRenderSuggestions={(value) =>
                      value && value.length > 1
                    }
                  />
                </ReferenceInput>
                <ReferenceInput
                  reference="MembershipRole"
                  source="pair:membershipRole"
                >
                  <SelectInput
                    name={getSource("pair:membershipRole")}
                    label="Rôle"
                  />
                </ReferenceInput>
                <TextInput
                  source={getSource("type")}
                  defaultValue={"pair:MembershipAssociation"}
                  sx={{ display: "none" }}
                />
              </RecordContextProvider>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export default MembershipAssociationInput;
