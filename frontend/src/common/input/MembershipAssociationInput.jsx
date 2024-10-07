import React, { useEffect } from "react";
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
import { useFormContext } from 'react-hook-form';

// We need to redeclare a container component here to set the initial value of the relationship in the form
const ReferenceInputForm = ({ children, scopedSource, reference, source }) => {
  const form = useFormContext();
  const membershipAssociation = useRecordContext();
  const value = membershipAssociation?.[scopedSource];

  useEffect(() => {
    if (value) {
      form.setValue(source, value);
    }
  }, [form, source, value]);

  return (
    <ReferenceInput reference={reference} source={source}>
      {children}
    </ReferenceInput>
  );
};

const MembershipAssociationInput = (props) => {
  const { source, referenceInputProps, label } = props;
  const record = useRecordContext();

  const toArray = (v) => Array.isArray(v) ? v : [v];

  const { data: membershipAssociations } = useGetMany("MembershipAssociation", {
    ids: toArray(record?.[source] || []),
  });

  if (!membershipAssociations) return null;

  return (
    <ArrayInput source={source}>
      <SimpleFormIterator inline>
        <FormDataConsumer>
          {({ scopedFormData, getSource }) => {
            const membershipAssociation = membershipAssociations?.find((r) => r.id === scopedFormData);

            return (
              <RecordContextProvider value={membershipAssociation}>
                <ReferenceInputForm
                  reference={referenceInputProps.reference}
                  scopedSource={referenceInputProps.source}
                  source={getSource(referenceInputProps.source)}
                >
                  <AutocompleteInput
                    source={getSource(referenceInputProps.source)}
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
                </ReferenceInputForm>
                <ReferenceInputForm
                  reference="MembershipRole"
                  scopedSource={'pair:membershipRole'}
                  source={getSource("pair:membershipRole")}
                >
                  <SelectInput
                    source={getSource("pair:membershipRole")}
                    label="Rôle"
                  />
                </ReferenceInputForm>
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
