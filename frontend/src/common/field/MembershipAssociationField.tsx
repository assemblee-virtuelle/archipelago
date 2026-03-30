import React from 'react';
import { RecordContextProvider, ReferenceField, ReferenceFieldProps, useGetMany, useRecordContext } from 'react-admin';
import { Box, Grid, Typography } from '@mui/material';
import AvatarChipField from './AvatarChipField';
import { PairMembershipAssociationRecord } from '../../resources/Concept/MembershipAssociation';
import { PairMembershipRoleRecord } from '../../resources/Concept/MembershipRole';

const toArray = <T,>(v: T | T[]) => (Array.isArray(v) ? v : v ? [v] : []);

type Props = {
  source: string;
  referenceFieldProps: ReferenceFieldProps;
};

const MembershipAssociationField = (props: Props) => {
  const { source, referenceFieldProps } = props;
  const record = useRecordContext();

  const { data: membershipData } = useGetMany<PairMembershipAssociationRecord>('MembershipAssociation', {
    ids: toArray(record?.[source] || []),
  });

  const { data: roleData } = useGetMany<PairMembershipRoleRecord>('MembershipRole', {
    ids: [...new Set(membershipData?.map((d) => d['pair:membershipRole']))],
  });

  return (
    <div>
      {roleData?.map((role) => {
        const memberships = membershipData?.filter((m) => m['pair:membershipRole'] === role.id);

        return (
          <Box key={role.id}>
            <Typography mb={1} variant="subtitle1" color="grey.600">
              {role['pair:label']}
            </Typography>
            <Box mb={4}>
              <Grid container spacing={1}>
                {memberships?.map((membership) => (
                  <Grid item key={membership.id} xs={6}>
                    <RecordContextProvider value={membership}>
                      <ReferenceField {...referenceFieldProps}>
                        <AvatarChipField label="pair:label" image="image" />
                      </ReferenceField>
                    </RecordContextProvider>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        );
      })}
    </div>
  );
};

export default MembershipAssociationField;
