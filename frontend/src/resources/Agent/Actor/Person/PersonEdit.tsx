import React from 'react';
import {
  useGetIdentity,
  useRedirect,
  SaveButton,
  Toolbar as RaToolbar,
  useLogout,
  useTranslate,
} from 'react-admin';
import { Edit } from '../../../../common/layout';
import PersonForm from './PersonForm';
import { PairPersonRecord } from '.';
import { DeleteButtonWithPermissions } from '@semapps/auth-provider';

export const PersonEdit = () => {
  const translate = useTranslate();
  const redirect = useRedirect();
  const { data: identityData, refetch: refetchIdentity } = useGetIdentity();
  const logout = useLogout();

  const warningMessage = translate('resources.Person.deletePopup.warningMessage', { _: '' });

  return (
    <Edit
      mutationOptions={{
        onSuccess: (record: PairPersonRecord) => {
          void refetchIdentity();
          redirect('show', 'Person', record.id);
        },
      }}
      transform={(data: PairPersonRecord) => ({
        ...data,
        'pair:label': `${data['pair:firstName']} ${(data['pair:lastName'] || '')?.toUpperCase()}`,
      })}
      toolbar={
        <RaToolbar sx={{ justifyContent: 'space-between' }}>
          <SaveButton />
          <DeleteButtonWithPermissions
            confirmTitle={translate('resources.Person.deletePopup.title')}
            confirmContent={
              <div>
                <p>{translate('resources.Person.deletePopup.content')}</p>
                {warningMessage !== '' && (
                  <p>
                    <strong>{warningMessage}</strong>
                  </p>
                )}
              </div>
            }
            mutationOptions={{
              onSuccess: (deletedRecord: PairPersonRecord) => {
                if (identityData?.id === deletedRecord?.id) {
                  void logout();
                } else {
                  redirect('list', 'Person');
                }
              },
            }}
          />
        </RaToolbar>
      }
    >
      <PersonForm />
    </Edit>
  );
};

export default PersonEdit;
