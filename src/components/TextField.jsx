import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';
import { useState } from 'react';


const TextField = ({ label, profile, editIcon, ...props }) => {
  const [field, meta] = useField(props);
  const [showEdit, setShowEdit] = useState(false)


  return (
    <div className="mb-3">
      <Label htmlFor={field.name}>{label}</Label>
      <div className='flex items-center gap-1 -mb-1'>
        <Input
          profile={showEdit === true ? profile : undefined}
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
          {...field} {...props}
          autoComplete="on"
          autoCapitalize="words"
        />
        <p className='cursor-pointer' onClick={() => setShowEdit(!showEdit)}>{editIcon}</p>
      </div>
      <ErrorMessage component="p" name={field.name} className="error" />
    </div>
  )

};

const Label = styled.label`
   font-size: 14px;
   display:block;
   color: #96A0AE;
   font-weight: 400;
   margin-bottom: 4px;

   @media screen and (max-width: 480px) {
     margin-bottom:0 ;
   }
`
const Input = styled.input`
  background:${({ profile }) => (!profile ? '' : '#E2E6ED')};
  border: ${({ profile }) => (!profile ? '1px solid transparent' : '1px solid #d8dbe0;')};
  /* text-transform: ${({ capitalize }) => (capitalize ? 'none' : 'capitalize')};  */
  /* border: 2px solid; */
  color: #646F81;
  /* font-size:${({ profile }) => (profile ? '16px' : '18px')}; */
  padding: 6px 7px;
  -webkit-appearance: none;
  border-radius: 5px;
  width: 100%;
  outline: none;
  margin-bottom: 6px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`

export default TextField;