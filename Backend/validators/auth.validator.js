import * as Yup from 'yup'

export const signupSchema = Yup.object({
    name: Yup.string().required('Name is required'), 
    email: Yup.string().email().required('Email is required'), 
    password: Yup.string().min(6).required('Password is required and min of 6 characters'), 
    country: Yup.string().required('Country is required')
})

export const loginSchema = Yup.object({
    email: Yup.string().email().required('Email is required'), 
    password: Yup.string().required('Password is required')
})