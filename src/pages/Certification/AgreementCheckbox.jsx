import React from 'react';

const AgreementCheckbox = ({ isAgreed, setIsAgreed }) => (
  <div className="form-group-checkbox">
    <input
      type="checkbox"
      id="privacy-consent"
      checked={isAgreed}
      onChange={e => setIsAgreed(e.target.checked)}
    />
    <label htmlFor="privacy-consent">개인정보 수집 및 이메일 전송에 동의합니다.</label>
  </div>
);

export default AgreementCheckbox; 