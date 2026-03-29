import { BaseRecord, ForeignId } from "../..";

export type PairMembershipAssociationRecord = BaseRecord & {
  type: 'pair:MembershipAssociation';
  'pair:membershipRole': ForeignId;
};

export default {
  dataModel: {
    types: ['pair:MembershipAssociation'],
  },
};
