import i18n from '@/i18n';
import * as yup from "yup";

const t = i18n.global.t;

const MIN_LENGTH_VALUE = 6;
const MAX_LENGTH_VALUE = 45;
const PHONE_MAX_LENGTH_VALUE = 15;
const MIN_MSG = `${t('generic.validations.minLength')} ${MIN_LENGTH_VALUE}`;
const MAX_MSG = `${t('generic.validations.maxLength')} ${MAX_LENGTH_VALUE}`;
const PHONE_MAX_MSG = `${t('generic.validations.maxLength')} ${PHONE_MAX_LENGTH_VALUE}`;
const REQUIRED = t('generic.validations.required');
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;


export const registerSchema = yup.object().shape({
  userName: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  name: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  lastName: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  email: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).email(t('generic.validations.invalidEmail')).required(REQUIRED),
  password: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED),
  repeteadPassword: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).required(REQUIRED)
    .oneOf([yup.ref("password")], t('generic.validations.unmatchPasswords')),
});

export const addStoreSchema = yup.object().shape({
  name: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  email: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).email(t('generic.validations.invalidEmail')).required(REQUIRED),
  phone: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(PHONE_MAX_LENGTH_VALUE, PHONE_MAX_MSG).required(REQUIRED),
  cif: yup.string().matches(CIF_REGEX, t('generic.validations.invalidCif')).required(REQUIRED)
});

export const itemSchema = yup.object().shape({
  name: yup.string().min(MIN_LENGTH_VALUE, MIN_MSG).max(MAX_LENGTH_VALUE, MAX_MSG).required(REQUIRED),
  imageURL: yup.lazy(url => !url ? yup.string() : yup.string().matches(URL_REGEX, t('generic.validations.invalidURL'))),
  description: yup.string(),
  price: yup.number().typeError(t('generic.validations.noPriceValueError'))
    .positive(t('generic.validations.minPriceValue')).required(REQUIRED)
});
