import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS} from '../../utils/theme';
const CheckoutForm = ({handleSubmit}) => {
  const formValidationSchema = Yup.object().shape({
    email: Yup.string().email('must valid email').required('Required'),
    firstName: Yup.string().min(4, 'minimum 4 characters').required('Required'),
    lastName: Yup.string().min(2, 'minimum 2 character').required('Required'),
    phone: Yup.string().required('Phone number is required'),
    address1: Yup.string().min(6).required('Required'),
    address2: Yup.string().min(6).required('Required'),
    pincode: Yup.string().min(5).required('Required'),
    city: Yup.string().min(4).required('Required'),
  });
  return (
    <View>
      <Formik
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          address1: '',
          address2: '',
          pincode: '',
          city: '',
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={formValidationSchema}>
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          } = props;

          return (
            <>
              <View mb={3} style={{flexDirection:'row',flexWrap:'wrap',marginHorizontal:10}}>
                
                  <Input
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    containerStyle={{width:'50%'}}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    labelStyle={{color: COLORS.fontColor}}
                    errorStyle={styles.errorText}
                    renderErrorMessage={
                      errors.firstName && touched.firstName && errors.firstName
                    }
                    errorMessage={errors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    containerStyle={{width:'50%'}}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastname')}
                    labelStyle={{color: COLORS.fontColor}}
                    errorStyle={styles.errorText}
                    renderErrorMessage={
                      errors.lastName && touched.lastName && errors.lastName
                    }
                    errorMessage={errors.lastName}
                  />
         
                <Input
                  label="Email"
                  name="email"
                  containerStyle={{width:'50%'}}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.email && touched.email && errors.email
                  }
                  errorMessage={errors.email}
                />

                <Input
                  label="Phone"
                  name="phone"
                  type="integer"
                  value={values.phone}
                  containerStyle={{width:'50%'}}
                  onChangeText={handleChange('phone')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.phone && touched.phone && errors.phone
                  }
                  errorMessage={errors.phone}
                />

                <Input
                  label="Address:Street"
                  name="address1"
                  value={values.address1}
                  onChangeText={handleChange('address1')}
                  containerStyle={{width:'50%'}}
                  onBlur={handleBlur('address1')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.address1 && touched.address1 && errors.address1
                  }
                  errorMessage={errors.address1}
                />

                <Input
                  label="Address:Building Name"
                  name="address2"
                  containerStyle={{width:'50%'}}
                  value={values.address2}
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.address2 && touched.address2 && errors.address2
                  }
                  errorMessage={errors.address2}
                />

                <Input
                  label="Pincode"
                  name="pincode"
                  containerStyle={{width:'50%'}}
                  value={values.pincode}
                  onChangeText={handleChange('pincode')}
                  onBlur={handleBlur('pincode')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.pincode && touched.pincode && errors.pincode
                  }
                  errorMessage={errors.pincode}
                />

                <Input
                  label="City"
                  name="city"
                  containerStyle={{width:'50%'}}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  labelStyle={{color: COLORS.fontColor}}
                  errorStyle={styles.errorText}
                  renderErrorMessage={
                    errors.city && touched.city && errors.city
                  }
                  errorMessage={errors.city}
                />
              </View>
              <Button
                onPress={handleSubmit}
              //  disabled={!isValid||!dirty}
                variant="contained"
                color="secondary">
                Add
              </Button>
            </>
          );
        }}
      </Formik>
    </View>
  );
};
export default CheckoutForm;
const styles = StyleSheet.create({
  errorText: {fontSize: 14, color: 'red', marginLeft: 10},
});
