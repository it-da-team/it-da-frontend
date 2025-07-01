import React from 'react';

const InstitutionInfoInput = ({ institutionName, setInstitutionName, institutionAddress, setInstitutionAddress }) => (
  <>
    <div className="form-group">
      <label htmlFor="institution-address">기관 주소</label>
      <input
        type="text"
        id="institution-address"
        value={institutionAddress}
        onChange={e => setInstitutionAddress(e.target.value)}
        placeholder="기관의 주소를 입력해주세요."
      />
    </div>
    <div className="form-group">
      <label htmlFor="institution-name">기관명</label>
      <input
        type="text"
        id="institution-name"
        value={institutionName}
        onChange={e => setInstitutionName(e.target.value)}
        placeholder="소속된 기관의 정확한 명칭을 입력해주세요."
      />
    </div>
  </>
);

export default InstitutionInfoInput; 