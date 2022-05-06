import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { ContentContainer, ContentWrapper } from "../../assets/css/GlobalStyled";
import TextField from '../../components/TextField';
import { Formik, Form } from 'formik';
import { validate } from '../../utils/validateForm';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { HandPointing } from "phosphor-react";
import ImageUpload from '../../components/ImageUpload';



const Profile = ({ user, setUser, setError, error }) => {
  const history = useHistory()

  return error ? (
    <span className="error-message">{error} <Link to="/login">Login</Link></span>
  ) : (
    <ContentWrapper>
      <ContentContainer>
        <ProfileBox>


          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dob: user.dob,
              gender: user.gender,
              phone: user.phone,
              address: user.address,
              soo: user.soo,

            }}
            validationSchema={validate}
            onSubmit={async (values) => {

              const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };

              try {
                await axios.post("http://localhost:4000/private/profile", { ...values, user }, config);
                const { data } = await axios.get("http://localhost:4000/private/user", config);
                alert('user has been updatd')
                setUser(data)
              } catch (error) {
                console.log(error)
              }
            }}
          >
            {formik => (
              <div>
                <h1 className="profile-header">My Profile</h1>
                <UpdateProfile>
                  <div>

                    <Form>
                      <div className='flex items-center justify-between'>
                        <ImageUpload user={user} setUser={setUser} />
                        <button type='submit'>Update</button>
                      </div>
                      <FieldsWrapper>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'First Name'} name={'firstName'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Last Name'} name={'lastName'} type={'text'} />
                        </div>
                        <div>
                          <TextField label={'Email'} editIcon={<HandPointing className='invisible' size={20} color="#08546d" />} name={'email'} type={'email'} disabled />
                        </div>
                        <div>
                          <TextField label={'Gender'} editIcon={<HandPointing className='invisible' size={20} color="#08546d" />} name={'gender'} type={'text'} disabled />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Phone Number'} name={'phone'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Date OF Birth'} name={'dob'} type={'date'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'State OF Origin'} name={'soo'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Address'} name={'address'} type={'text'} />
                        </div>
                      </FieldsWrapper>
                      {/* <ButtonHolder className='w-100 mx-auto text-right border'>
                        <Button type='submit' text={'Update Profile'} color={'text-white'} padding={'py-2'} width={'w-4/12'} />
                      </ButtonHolder> */}
                    </Form>
                  </div>
                </UpdateProfile>
              </div>
            )}
          </Formik>
        </ProfileBox>
      </ContentContainer>
    </ContentWrapper>
  )
}

const ProfileBox = styled.div`
  /* padding:12px; */
  /* height: 400px; */
`

const UpdateProfile = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   margin: 0 auto;

   & > div { width: 60%; 
    @media screen and (max-width: 1024px){
      width: 100%;
    }
   }
`
const FieldsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 30px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
    background-color: #fff;
    padding:26px 20px;
    border-radius: 6px;
    & > div:nth-child(7)  { grid-column: span 1 / span 2; }

    @media screen and (max-width: 480px){
      display:block ;
      padding:12px;
      margin-bottom: 10px ;
    }

`

export default Profile;