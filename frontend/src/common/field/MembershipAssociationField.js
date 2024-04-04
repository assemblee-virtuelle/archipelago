import React from "react";
import {
  RecordContextProvider,
  ReferenceField,
  useGetMany,
  useRecordContext,
} from "react-admin";
import RightLabel from "../list/SideList/RightLabel";
import { Box, Grid } from "@mui/material";
import { AvatarWithLabelField } from "@semapps/field-components";

const MembershipAssociationField = (props) => {
  const { source, referenceFieldProps } = props;
  const record = useRecordContext();

  const { data: membershipData } = useGetMany("MembershipAssociation", {
    ids: record?.[source] || [],
  });
  const { data: roleData } = useGetMany("MembershipRole", {
    ids: [...new Set(membershipData?.map((d) => d["pair:membershipRole"]))],
  });

  return (
    <div>
      {roleData?.map((role) => {
        const memberships = membershipData?.filter(m => m['pair:membershipRole'] === role.id);

        return (
          <Box key={role.id}>
            <RightLabel label={role['pair:label']} source={source} />
            <Box mb={4}>
              <Grid container spacing={3}>
                {memberships?.map((membership) => (
                  <Grid item key={membership.id} xs={6}>
                    <RecordContextProvider value={membership}>
                      <ReferenceField {...referenceFieldProps}>
                        <AvatarWithLabelField label="pair:label" image="image" />
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
