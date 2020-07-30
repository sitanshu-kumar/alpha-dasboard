import React from 'react';
import {useForm, useStep} from 'react-hooks-helper';
import ChangePasswordFrom from './change-password';
import Email2faVerfication from './Email2faVerificationForm';
import {changePasswordAPI} from './ChangePasswordAPI';
const steps = [{id: 'changePasswordForm'}, {id: 'Email2faVerificationForm'}];

var defaultData = {
  old_password: ' ',
  password: '',
  password_confirmation: '',
  token_2fa: '',
  token: '',
};

let setPasswordValue = (value) => {
  defaultData.old_password = value.old_password;
  defaultData.password = value.password;
  defaultData.password_confirmation = value.password_confirmation;
};

let setSecurtyValue = (value) => {
  defaultData.token_2fa = value.faCode;
  defaultData.token = value.emailCode;
};

const onDataSubmit = () => {
  changePasswordAPI.changePassword(defaultData);
};
const ChangePassword = () => {
  const {step, navigation} = useStep({initialStep: 0, steps});
  const {id} = step;

  const props = {navigation, onDataSubmit};

  switch (id) {
    case 'changePasswordForm':
      return (
        <ChangePasswordFrom
          {...props}
          getPasswordValue={(value) => {
            setPasswordValue(value);
          }}
        />
      );
    case 'Email2faVerificationForm':
      return (
        <Email2faVerfication
          getSecurtyValue={(value) => {
            setSecurtyValue(value);
          }}
          {...props}
        />
      );

    default:
      return null;
  }
};

export default ChangePassword;
