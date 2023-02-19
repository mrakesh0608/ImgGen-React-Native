import { Text, TextInput, View } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormContainer from './FormContainer';
import MyButton from '../MyButton';

import formStyles from '../../styles/formStyles';

const validationSchema = yup.object({
    prompt: yup.string().required().min(2),
    numImg: yup.number().min(1).max(5).required(),
})

export default function FormImgGen({ generating, error, onSubmit }) {

    const initialValues = { prompt: '', numImg: 2 }

    return (
        <FormContainer>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnMount={true}
                onSubmit={(val, actions) => {
                    // actions.resetForm();
                    onSubmit({ ...val });
                }}
            >
                {props =>
                    <View style={{}}>
                        <TextInput
                            placeholder='Text that describes images'
                            onChangeText={props.handleChange('prompt')}
                            value={props.values.prompt}

                            style={formStyles.input}
                            onBlur={props.handleBlur('prompt')}

                            multiline
                        />
                        {props.touched.prompt &&
                            <Text style={formStyles.errorText}>{props.errors.prompt}</Text>}

                        <TextInput
                            placeholder='Number of Images to be retrieved (2)'
                            onChangeText={val =>
                                props.setFieldValue('numImg', parseInt(val ? val : initialValues.numImg))
                            }
                            value={props.values.numImg}

                            style={formStyles.input}
                            onBlur={props.handleBlur('numImg')}

                            keyboardType='numeric'
                            maxLength={1}

                        />
                        {props.touched.numImg &&
                            <Text style={formStyles.errorText}>{props.errors.numImg}</Text>
                        }

                        <MyButton title={generating ? 'Generating ...' : 'Generate'} onPress={props.handleSubmit} disabled={!props.isValid || generating} />

                        {!generating && error &&
                            <Text style={formStyles.error}>{error}</Text>
                        }
                    </View>
                }
            </Formik>
        </FormContainer>
    );
}