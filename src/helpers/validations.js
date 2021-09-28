import i18n  from '@/i18n';
import * as Yup from "yup";

const t = i18n.global.t;

const MIN_LENGTH_VALUE = 6;
const MAX_LENGTH_VALUE = 45;
const PHONE_MAX_LENGTH_VALUE = 15;
const MIN_MSG = `${t('generic.validations.minLength')} ${MIN_LENGTH_VALUE}`;
const MAX_MSG = `${t('generic.validations.maxLength')} ${MAX_LENGTH_VALUE}`;
const PHONE_MAX_MSG = `${t('generic.validations.maxLength')} ${PHONE_MAX_LENGTH_VALUE}`;
const REQUIRED = t('generic.validations.required');
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;


export const registerSchema = Yup.object().shape({
  userName: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  name: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  lastName: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  email: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).email(t('generic.validations.invalidEmail')).required(REQUIRED),
  password: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED),
  repeteadPassword: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED)
    .oneOf([Yup.ref("password")], t('generic.validations.unmatchPasswords')),
});

export const addStoreSchema = Yup.object().shape({
  name: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  email: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).email(t('generic.validations.invalidEmail')).required(REQUIRED),
  phone: Yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(PHONE_MAX_LENGTH_VALUE, PHONE_MAX_MSG).required(REQUIRED),
  cif: Yup.string().matches(CIF_REGEX, t('generic.validations.invalidCif')).required(REQUIRED)
});



      