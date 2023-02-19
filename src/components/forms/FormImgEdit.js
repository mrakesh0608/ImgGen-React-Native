import { Text, TextInput, View } from 'react-native';
import { Formik } from "formik";
import * as yup from 'yup';

import FormContainer from './FormContainer';
import MyButton from '../MyButton';
import useUploadImg from '../../hooks/useUploadImg';

import formStyles from '../../styles/formStyles';

const validationSchema = yup.object({
    prompt: yup.string().required(),
    numImg: yup.number().min(1).max(5).required(),
})

export default function FormImgEdit({ generating, error, onSubmit, disabled }) {

    const { uploadImg, UploadImgComp } = useUploadImg();

    const initialValues = { prompt: '', numImg: 2 }
    return (
        <FormContainer>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(val, actions) => {
                    // actions.resetForm();
                    onSubmit({ ...val, uploadImg });
                }}
            >
                {props =>
                    <View style={{}}>
                        <UploadImgComp />

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

                        <MyButton title={generating ? 'Generating ...' : 'Generate'} onPress={props.handleSubmit} disabled={true} />
                        {/* !props.isValid || generating */}

                        {!generating && error &&
                            <Text style={formStyles.error}>{error}</Text>
                        }
                    </View>
                }
            </Formik>
        </FormContainer>
    );
}