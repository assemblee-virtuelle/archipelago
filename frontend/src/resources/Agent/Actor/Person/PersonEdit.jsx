import React from 'react';
import { ImageField, TabbedForm, TextInput, FormTab, SaveButton, Toolbar as RaToolbar, useGetIdentity, required, useRedirect, useLogout } from 'react-admin';
import { MarkdownInput } from '@semapps/markdown-components';
import { ImageInput } from '@semapps/input-components';
import { DeleteButtonWithPermissions } from '@semapps/auth-provider';
import { ActivitiesInput, LocationInput, SkillsInput, ThemesInput } from '../../../../common/input';
import { Edit } from '../../../../common/layout';
import MembershipAssociationInput from '../../../../common/input/MembershipAssociationInput';

export const PersonEdit = (props) => {
  const redirect = useRedirect();
  const { data: identityData, refetch: refetchIdentity } = useGetIdentity();
  const logout = useLogout();

  return (
    <Edit
      mutationOptions={{
        onSuccess: (record) => {
          refetchIdentity();
          redirect('show', 'Person', record.id);
        }
      }}
      transform={data => ({ ...data, 'pair:label': `${data['pair:firstName']} ${(data['pair:lastName'] || '')?.toUpperCase()}` })}
      {...props}
    >
      <TabbedForm syncWithLocation={false} toolbar={
        <RaToolbar sx={{ justifyContent: 'space-between' }}>
          <SaveButton />
          <DeleteButtonWithPermissions
            confirmTitle="Suppression du compte utilisateur"
            confirmContent={<div>
              <p>Êtes-vous sûr·e de vouloir supprimer ce compte utilisateur ?</p>
              <p><strong>Cette action est irréversible.</strong></p>
            </div>}
            mutationOptions={{
              onSuccess: (deletedRecord) => {
                if (identityData?.id === deletedRecord?.id) {
                  logout();
                } else {
                  redirect('list', 'Person');
                }
              }
            }}
          />
        </RaToolbar>
      }>
        <FormTab label="Données">
          <TextInput source="pair:firstName" fullWidth validate={[required()]} size="small" />
          <TextInput source="pair:lastName" fullWidth />
          <TextInput source="pair:comment" fullWidth />
          <MarkdownInput source="pair:description" fullWidth />
          <LocationInput source="pair:hasLocation" fullWidth />
          <ImageInput source="image" accept={{ 'image/*': ['.png', '.jpg'] }}>
            <ImageField source="src" />
          </ImageInput>
        </FormTab>
        <FormTab label="Rôles">
          <MembershipAssociationInput
            source="pair:actorOfMembership"
            referenceInputProps={{
              reference: "Organization",
              source: "pair:membershipOrganization"
            }}
            label="Organisation"
          />
        </FormTab>
        <FormTab label="Relations">
          <ActivitiesInput source="pair:involvedIn" />
          <SkillsInput source="pair:offers" />
          <ThemesInput source="pair:hasTopic" />
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default PersonEdit;
