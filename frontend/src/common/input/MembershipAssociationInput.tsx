import React, { useEffect } from 'react';
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
  useTranslate,
  CommonInputProps,
  ReferenceInputProps,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { BaseRecord } from '../../resources';

const toArray = <T,>(v: T | T[]) => (Array.isArray(v) ? v : [v]);

// We need to redeclare a container component here to set the initial value of the relationship in the form
const ReferenceInputForm = ({ children, scopedSource, reference, source }: ReferenceInputProps) => {
  const form = useFormContext();
  const finalSource = useWrappedSource(source);
  const membershipAssociation = useRecordContext();
  const value = membershipAssociation?.[scopedSource as string] as string;

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

type Props = CommonInputProps & {
  referenceInputProps: ReferenceInputProps;
};

const MembershipAssociationInput = (props: Props) => {
  const { source, referenceInputProps } = props;
  const record = useRecordContext();
  const translate = useTranslate();

  const { data: membershipAssociations } = useGetMany<BaseRecord>('MembershipAssociation', {
    ids: toArray(record?.[source] || []),
  });

  if (!membershipAssociations) return null;

  return (
    <ArrayInput source={source}>
      <SimpleFormIterator inline disableReordering>
        <FormDataConsumer>
          {({ scopedFormData }) => {
            const membershipAssociation = membershipAssociations?.find((r) => r.id === (scopedFormData as unknown as string));

            return (
              <RecordContextProvider value={membershipAssociation}>
                <ReferenceInputForm
                  reference={referenceInputProps.reference}
                  scopedSource={referenceInputProps.source}
                  source={referenceInputProps.source}
                >
                  <AutocompleteInput
                    source={referenceInputProps.source}
                    label={translate('resources.Organization.fields.pair:membershipActor')}
                    size="small"
                    sx={{
                      mt: 1,
                      mb: '4px',
                      minWidth: 300,
                    }}
                    shouldRenderSuggestions={(value: string) => value && value.length > 1}
                    noOptionsText="Veuillez saisir au moins deux lettres pour afficher les suggestions"
                  />
                </ReferenceInputForm>
                <ReferenceInputForm
                  reference="MembershipRole"
                  scopedSource={'pair:membershipRole'}
                  source={'pair:membershipRole'}
                >
                  <SelectInput
                    source={'pair:membershipRole'}
                    label={translate('resources.Organization.fields.pair:membershipRole')}
                  />
                </ReferenceInputForm>
                <TextInput source={'type'} defaultValue={'pair:MembershipAssociation'} sx={{ display: 'none' }} />
              </RecordContextProvider>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
};

export default MembershipAssociationInput;
