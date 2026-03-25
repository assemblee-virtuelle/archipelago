import React, { PropsWithChildren } from 'react';
import {
  EditBase,
  EditProps,
  SimpleForm,
  SimpleFormProps,
  useCreatePath,
  useNavigate,
  useParams,
  useResourceContext,
} from 'react-admin';
import { EditActionsWithPermissions, EditToolbarWithPermissions } from '@semapps/auth-provider';
import { EditView } from '../index';
import { Container } from '@mui/material';
import useShortId from '../../useShortId';
import config from '../../../config';

const Edit = ({
  title,
  children,
  toolbar,
  ...rest
}: PropsWithChildren<EditProps> & Pick<SimpleFormProps, 'toolbar'>) => {
  const params = useParams();
  const navigate = useNavigate();
  const getShortId = useShortId();
  const resource = useResourceContext();
  const createPath = useCreatePath();

  const { id: routeId } = params;
  const { loading, shortId, fullId } = getShortId(routeId || '');

  if (config.useShortId && routeId === fullId && shortId) {
    navigate(createPath({ resource, type: 'edit', id: shortId }), { replace: true });
    return;
  }

  if (loading) return;

  return (
    <EditBase mutationMode="pessimistic" id={fullId} redirect="show" {...rest}>
      <Container disableGutters>
        <EditView title={title} actions={<EditActionsWithPermissions />}>
          <SimpleForm
            spacing={2}
            useFlexGap
            toolbar={toolbar || <EditToolbarWithPermissions />}
            mode="onBlur"
            reValidateMode="onBlur"
          >
            {children}
          </SimpleForm>
        </EditView>
      </Container>
    </EditBase>
  );
};

export default Edit;
