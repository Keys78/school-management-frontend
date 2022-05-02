import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { ContentContainer, ContentWrapper } from "../../assets/css/GlobalStyled";
import TextField from '../../components/TextField';
import { Formik, Form } from 'formik';
import { validate } from '../../utils/validateForm';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import { HandPointing } from "phosphor-react";
import { useGetUserQuery } from '../../redux/usersApi';



const Profile = ({ user, setUser, setError, error }) => {
  const history = useHistory()
  //   const [singleFile, setSingleFile] = useState('');
  //   const [singleProgress, setSingleProgress] = useState(0);

  //   const SingleFileChange = (e) => {
  //     setSingleFile(e.target.files[0]);
  //     setSingleProgress(0);
  // }

  // const singleFileOptions = {
  //   onUploadProgress: (progressEvent) => {
  //       const {loaded, total} = progressEvent;
  //       const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
  //       setSingleProgress(percentage);
  //   }
  // }

  // const uploadSingleFile = async () => {
  //   const formData = new FormData();
  //   formData.append('file', singleFile);
  //   // await singleFileUpload(formData, singleFileOptions);
  //   // props.getsingle();
  // }

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
                setUser([user, data])
              } catch (error) {
                console.log(error)
              }
            }}
          >
            {formik => (
              <div>
                <h1 className="profile-header">My Profile</h1>
                {/* <Divide /> */}
                <UpdateProfile>
                  <div>
                    {/* <section className='flex items-center justify-between sm:mb-6 mb-2'>
                      <div className='flex flex-col items-center'>
                        <img className='rounded-full s:w-28 w-20' src={user.profileImg} />
                        <input type="file" onChange={(e) => SingleFileChange(e)} />
                        <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                      </div>
                      <button >Update</button>
                    </section> */}
                    <Form>
                      <section className='flex items-center justify-between sm:mb-6 mb-2'>
                        <div className='flex flex-col items-center'>
                          <img className='rounded-full s:w-28 w-20' src={user.pic} />
                          {/* <img className='rounded-full s:w-28 w-20' src={'public/uploads/2022-05-02T18-21-45.860Z-e-logo-school.png'} /> */}
                          {/* <input type="file" onChange={(e) => SingleFileChange(e)} /> */}
                          {/* <button type="button" className="btn btn-danger" onClick={() => uploadSingleFile()} >Upload</button> */}
                        </div>
                        <button >Update</button>
                      </section>
                      <FieldsWrapper>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'First Name'} name={'firstName'} type={'text'} />
                        </div>
                        <div>
                          <TextField profile editIcon={<HandPointing size={20} color="#08546d" />} label={'Last Name'} name={'lastName'} type={'text'} />
                        </div>
                        <div>
                          <TextField label={'Email'} name={'email'} type={'email'} disabled />
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
    & > div:nth-child(7)  { grid-column: span 2 / span 2; }

    @media screen and (max-width: 480px){
      display:block ;
      padding:12px;
      margin-bottom: 10px ;
    }

`

// const Divide = styled.hr`
//   margin: 6px 0 12px 0;
//   padding:3px;
// `


export default Profile;