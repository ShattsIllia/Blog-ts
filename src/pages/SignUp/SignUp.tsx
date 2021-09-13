import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper } from '@material-ui/core';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { mixed, object, string } from 'yup';
import { withLayout } from '../../components/layout/Layout';
import { createNewUser } from '../../redux/user/userActions';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router";

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

const  SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
  return (
    <Card>
      <CardContent>
        <FormikStepper
          initialValues={{
                name: '',
                password: '',
                email: '',
                details: '',
                skills: ''
          }}
          onSubmit={async (values) => {
            await sleep(2000);
            dispatch(createNewUser(values, {history}));
          }}
        >
          <FormikStep 
            label="Name and Password" 
            validationSchema={object({
                name: string()
                    .max(25, 'Must be 25 characters or less')
                    .min(5, 'Must be 5 characters or more')
                    .required('Required'),
                password: string()
                    .max(10, 'Must be 10 characters or less' )
                    .min(5, 'Must be 5 characters or more')
                    .required('Required')}
            )}>
            <Box paddingBottom={2}>
              <Field fullWidth name="name" component={TextField} label="Enter Your Name" />
            </Box>
            <Box paddingBottom={2}>
              <Field fullWidth name="password" component={TextField} label="Enter Your Password" />
            </Box>
          </FormikStep>
          <FormikStep
            label="Email"
            validationSchema={object({
                email: mixed().when('password', {
                is: true,
                then: string()
                .required(),
                otherwise: string().email().required(),
              }),
            })}
          >
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="email"
                type="text"
                component={TextField}
                label="Write Your Email"
              />
            </Box>
          </FormikStep>
          <FormikStep label="Details and Skills">
            <Box paddingBottom={2}>
              <Field fullWidth name="details" component={TextField} label="details" />
              <Field fullWidth name="skills" component={TextField} label="skills" />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }:any) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={child.props.label} completed={step > index || completed}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default withLayout(SignUp);