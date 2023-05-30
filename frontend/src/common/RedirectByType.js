import { useNavigate } from 'react-router';
import { useCreatePath, useShowContext } from "react-admin";

const RedirectByType = ({ typesMap }) => {
  const { record } = useShowContext();
  const navigate = useNavigate();
  const createPath = useCreatePath();
  if (record) {
    if (!Array.isArray(record.type)) record.type = [record.type];
    const matchingResource = Object.keys(typesMap).find(resource => record.type.includes(typesMap[resource]));
    if (matchingResource) {
      return navigate(createPath({ resource: matchingResource, id: record.id, type: 'show' }));
    }
  }
  return null;
};

export default RedirectByType;
