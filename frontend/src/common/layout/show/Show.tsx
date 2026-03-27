import React from 'react';
import { ShowBase, ShowProps, useCreatePath, useNavigate, useParams, useResourceContext } from 'react-admin';
import { ShowActionsWithPermissions } from '@semapps/auth-provider';
import { ShowView } from '../index';
import useShortId from '../../useShortId';
import config from '../../../config';

const Show = ({ title, children, ...rest }: ShowProps) => {

  const params = useParams();
  const navigate = useNavigate();
  const getShortId = useShortId();
  const resource = useResourceContext();
  const createPath = useCreatePath();

  const { id: routeId } = params;
  const { loading, shortId, fullId } = getShortId(routeId || '');

  if (config.useShortId && routeId === fullId && shortId) {
    navigate(createPath({ resource, type: 'show', id: shortId }), { replace: true });
    return;
  }

  if (loading) return;

  return (
    <ShowBase id={fullId} {...rest}>
      <ShowView title={title} actions={<ShowActionsWithPermissions />}>
        {children}
      </ShowView>
    </ShowBase>
  );
};

export default Show;
