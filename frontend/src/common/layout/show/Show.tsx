import React from 'react';
import { ShowBase, ShowProps, useCreatePath, useNavigate, useParams, useResourceContext } from 'react-admin';
import { ShowActionsWithPermissions } from '@semapps/auth-provider';
import { ShowView } from '../index';
import useShortId from '../../useShortId';
import config from '../../../config';
import { Helmet } from 'react-helmet';

const Show = ({ title, children, ...rest }: ShowProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const getShortId = useShortId();
  const resource = useResourceContext();
  const createPath = useCreatePath();

  const { id: routeId } = params;
  const { loading, shortId, fullId } = getShortId(routeId || '');
  let canonicalUrl = createPath({ resource, type: 'show', id: fullId || '' });

  if (config.useShortId && routeId === fullId && shortId) {
    canonicalUrl = createPath({ resource, type: 'show', id: shortId });
    navigate(canonicalUrl, { replace: true });
    return;
  }

  if (loading) return;

  return (
    <ShowBase id={fullId} {...rest}>
      <Helmet>
        <link rel="canonical" href={window.location.origin + canonicalUrl} />
        <meta property="og:url" content={window.location.origin + canonicalUrl} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <ShowView title={title} actions={<ShowActionsWithPermissions />}>
        {children}
      </ShowView>
    </ShowBase>
  );
};

export default Show;
