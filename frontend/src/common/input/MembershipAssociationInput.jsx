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
  useWrappedSource,
} from "react-admin";
import { useFormContext } from 'react-hook-form';

// We need to redeclare a container component here to set the initial value of the relationship in the form
const ReferenceInputForm = ({ children, scopedSource, reference, source }) => {
  const form = useFormContext();
  const finalSource = useWrappedSource(source);
  const membershipAssociation = useRecordContext();
  const value = membershipAssociation?.[scopedSource];

  useEffect(() => {
    if (value) {
      form.setValue(finalSource, value);
    }
  }, [form, finalSource, value]);

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
          {({ scopedFormData }) => {
            const membershipAssociation = membershipAssociations?.find((r) => r.id === scopedFormData);

            return (
              <RecordContextProvider value={membershipAssociation}>
                <ReferenceInputForm
                  reference={referenceInputProps.reference}
                  scopedSource={referenceInputProps.source}
                  source={referenceInputProps.source}
                >
                  <AutocompleteInput
                    source={referenceInputProps.source}
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
                    noOptionsText="Veuillez saisir au moins deux lettres pour afficher les suggestions"
                  />
                </ReferenceInputForm>
                <ReferenceInputForm
                  reference="MembershipRole"
                  scopedSource={'pair:membershipRole'}
                  source={"pair:membershipRole"}
                >
                  <SelectInput
                    source={"pair:membershipRole"}
                    label="Rôle"
                  />
                </ReferenceInputForm>
                <TextInput
                  source={"type"}
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
