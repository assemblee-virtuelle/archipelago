import { PairResourceCreate } from '../../../pair';
import ThemeEdit from './ThemeEdit';
import ThemeList from './ThemeList';
import ThemeShow from './ThemeShow';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export default {
  config: {
    list: ThemeList,
    show: ThemeShow,
    create: PairResourceCreate,
    edit: ThemeEdit,
    icon: LocalOfferIcon,
    options: {
      label: 'Thèmes',
      parent: 'Concept'
    }
  },
  dataModel: {
    types: ['pair:Theme'],
    fieldsMapping: {
      title: 'pair:label'
    }
  },
  translations: {
    fr: {
      name: 'Thème |||| Thèmes',
      fields: {
        'pair:label': 'Titre',
        'pair:comment': 'Courte description',
        'pair:description': 'Longue description',
        'pair:topicOf': 'Sujet de'
      }
    }
  }
};
