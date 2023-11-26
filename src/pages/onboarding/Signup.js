
import React, { useEffect, useState } from 'react'
import Logo from '../../assets/img/logo.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import TextField from '../../components/elements/form/TextField';
import RadioGroup from '../../components/elements/form/RadioGroup';
import FormButton from '../../components/elements/form/FormButton';
import SelectField from '../../components/elements/form/SelectField';
import DateField from '../../components/elements/form/DateField';
import ArrowIcon from '../../components/elements/icons/ArrowIcon';
import FileUpload from '../../components/elements/form/FileUpload';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ERROR } from '../../store/types';
import Preloader from '../../components/elements/Preloader';
import Checkbox from '../../components/elements/form/Checkbox';
import ReadDocument from '../../components/partials/documents/ReadDocument';
import ModalLayout from '../../components/layout/ModalLayout';

const Signup = () => {
    const [onboardPayload, setOnboardPayload] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
	const [activeStep, setActiveStep] = useState(1);
	const navigate = useNavigate();
	const { invitationCode } = useParams()
	const dispatch = useDispatch()
	const [invitation, setstate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [invitationDetails, setInvitationDetails] = useState(null);

	useEffect(() => {
		const getInvitation = async () => {
			try {
				
				const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees/invitations/${invitationCode}?expand=requiredDocumentSignings`, {  })
				setInvitationDetails(response.data.data)
				setLoading(false)
			} catch (error) {
			  dispatch({
				type: ERROR,
				error: error
			  })
			  setLoading(false)
			}
		  }
	
		  getInvitation()
		return () => {
			
		};
	}, [dispatch, invitationCode]);
	
	const validateStep1Form = () => {
        let errors = {}

        if (!password || password === '') {
            errors.password = true
        }

        setValidationErrors(errors)
        return errors
    }

	const completeStep1 = () => {
		if (Object.values(validateStep1Form()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
		setActiveStep(2)
	}

	const [password, setPassword] = useState('');
	const educationTypes = [
		{
			label: "Select certification/type",
			value: ""
		},
		{
			label: "Bachelors Degree",
			value: "Bachelors Degree"
		},
		{
			label: "Masters Degree",
			value: "Masters Degree"
		},
		{
			label: "Doctorate Degree",
			value: "Doctorate Degree"
		},
	]

	const educationItem = [
		{
			type: '',
			institution: '',
			course: '',
			startDate: '',
			endDate: ''
		}
	]

	const [education, setEducation] = useState([educationItem]);

	const addEducation = () => {
		let tempEducation = [...education]
		tempEducation.push(education)
		setEducation(tempEducation)
	}

	const updateEducation = (index, field, value) => {
		let tempEducation = [...education]
		tempEducation[index][field] = value
		setEducation(tempEducation)
	}

	const validateStep2Form = () => {
        let errors = {}
		education.forEach((item, itemIndex)=>{
			if (!item.type || item.type === '') {
				errors[`type-${itemIndex}`] = true
			}
			if (!item.institution || item.institution === '') {
				errors[`institution-${itemIndex}`] = true
			}
			if (!item.startDate || item.startDate === '') {
				errors[`startDate-${itemIndex}`] = true
			}
			if (!item.endDate || item.endDate === '') {
				errors[`endDate-${itemIndex}`] = true
			}
			// if (!item.course || item.course === '') {
			// 	errors[`course-${itemIndex}`] = true
			// }
		})

        setValidationErrors(errors)
        return errors
    }

	const completeStep2 = () => {
		if (Object.values(validateStep2Form()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
		setActiveStep(3)
	}

	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);

	const addFile = (docId, file) => {
		let tempFiles = [...files]
		tempFiles.push({
			docId: docId,
			file: file
		})
	}
  
	const handleUpload = async (file) => {
	  console.log(file)
	  setUploading(true)   
	  var formData = new FormData()
	  formData.append('file', file.file )
	  // dispatch(uploadTransactionReceipt(id, formdata))
	  const headers = new Headers();
	//   headers.append("Authorization", authHeader().Authorization);
	  try {
  
		  const doUpload = await fetch(`${process.env.REACT_APP_API_URL}/files/new`, {
			  method: "POST",
			  headers,
			  body: formData,
		  });
		  const response = await doUpload.json();
  
		 return response
	  } catch (error) {
		  dispatch({
			  type: ERROR,
			  error,
		  });
	  }
  	}
	const [requiredDocs, setRequiredDocs] = useState(null);

	const completeStep3 = () => {
		if(!invitationDetails.requiredDocumentUploads || invitationDetails.requiredDocumentUploads.length === 0) {
			setActiveStep(4)
			return
		}
		if (Object.values(validateStep2Form()).includes(true)) {
            dispatch({
                type: ERROR,
                error: {response: {data: {
                    message: 'Please check the highlighted fields'
                }}}
            });
            return
        }
		setActiveStep(4)
	}

	const [documentSignings, setDocumentSignings] = useState([]);

	const updateDocumentSigning = (document, signature) => {
		let signings = [...documentSignings]
		const newDocSigns = {
			acknowledged: true,
			document: document,
			signature: signature
		}
		signings.push(newDocSigns)
		setDocumentSignings(signings)

	}
	const [activeDocument, setActiveDocument] = useState(null);
	const [readingDocument, setReadingDocument] = useState(false);

	const readDocument = (document) => {
		setActiveDocument(document)
		setTimeout(() => {
			setReadingDocument(true)
		}, 100);
	}

	const completeOnboarding = () => {
		const payload = {
			password,
			documentSignings,
			requiredDocs
		}

		console.log(payload)
		// navigate('/')
	}

	return (
		<>
			<div className="relative">
				<div className="w-10/12 xl:w-8/12 2xl:w-4/12 p-10 rounded border border-gray-10 mx-auto mt-24">
					<Link to="/">
						<span className="flex items-center gap-x-2">
							<img src={Logo} alt="logo" /><p className="tracking-[0.2em] font-medium mt-[10px]">HRMS</p>
						</span>
					</Link>

					<h3 className='font-montserrat text-lg font-medium dark:text-white mt-8'>Welcome aboard</h3>
					<p className='mt-2 dark:text-gray-500 text-sm'>You&apos;ve gotten here because you have been enrolled on the Verovian HRMS Platform by and administrator.</p>
					<p className='mt-4 dark:text-gray-500 text-sm'>Please provide your details in the following steps to complete your onboarding</p>
					
					{loading === true ? 
					<Preloader preloadingText={'Loading your invitation... '} />
					: 
					<>
						{activeStep === 1 && <>
							<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 1:</span> Personal Information</p>
							<div className='mt-3 w-full'>
								<TextField
									inputLabel="First name" 
									inputPlaceholder="Your given name" 
									fieldId="first-name" 
									inputType="first-name" 
									disabled={true}
									preloadValue={invitationDetails.firstName || ''}
									hasError={validationErrors.firstName} 
									returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{firstName: value}})}}
								/>
							</div>
							
							<div className='mt-6 w-full'>
								<TextField
									inputLabel="Middle name" 
									inputPlaceholder="Middle name" 
									fieldId="middle-name" 
									inputType="text" 
									hasError={validationErrors.middleName} 
									disabled={true}
									preloadValue={invitationDetails.middleName || ''}
									returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{middleName: value}})}}
								/>
							</div>
							
							<div className='mt-6 w-full'>
								<TextField
									inputLabel="Last name" 
									inputPlaceholder="Your surname" 
									fieldId="last-name" 
									inputType="text" 
									hasError={validationErrors.lastName} 
									disabled={true}
									preloadValue={invitationDetails.lastName || ''}
									returnFieldValue={(value)=>{setOnboardPayload({...onboardPayload, ...{lastName: value}})}}
								/>
							</div>

							<div className='mt-6 w-full'>
								<RadioGroup
									inputLabel="Gender"
									items={[
										{label: 'Female'},
										{label: 'Male'},
									]} 
									hasError={validationErrors.gender} 
									disabled={true}
									preloadValue={invitationDetails.gender || ''}
									returnSelected={(value)=>{setOnboardPayload({...onboardPayload, ...{gender: value.label}})}}
								/>
							</div>

							<p className='mt-4 dark:text-gray-500 text-sm mb-2'>Create your password to use and access this platform. please choose a strong password</p>
							<div className='mb-4 w-full'>
								<TextField
									inputLabel="Password" 
									inputPlaceholder="Your password" 
									fieldId="password" 
									inputType="password" 
									hasError={validationErrors.password} 
									returnFieldValue={(value)=>{setPassword(value)}}
								/>
							</div>

							<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
								<FormButton 
									buttonLabel={<span className='flex items-center gap-x-2 text-sm'>Continue <ArrowIcon className={`-4 h-4 transform -rotate-90`} /></span>} 
									buttonAction={()=>{completeStep1()}} />
								{/* <Link to="/admin" className='block w-full p-4 bg-black text-white text-center text-md rounded-md transition duration-200 hover:bg-allawee-ink-navy'>Login to your account</Link> */}
							</div>
						</>}
						
						{activeStep === 2 && <>
							<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 2:</span> Education</p>
							{education.map((item, itemIndex)=>(<div key={itemIndex} className='w-full border rounded p-3 mb-5'>
								<div className='mt-3 w-full'>
									<SelectField
										selectOptions={educationTypes}
										inputLabel="Select education type"
										titleField="label"
										displayImage={false}
										imageField=""
										preSelected=''
										fieldId="account"
										hasError={validationErrors[`type-${itemIndex}`]}
										// return id of accounts of the selected option
										returnFieldValue={(value) => {updateEducation(itemIndex, 'type', value.value)}}
									/>
								</div>
								
								<div className='mt-6 w-full'>
									<TextField
										inputLabel="Institution" 
										inputPlaceholder="Name of institution" 
										fieldId="institution-name" 
										inputType="text" 
										hasError={validationErrors[`institution-${itemIndex}`]} 
										returnFieldValue={(value) => {updateEducation(itemIndex, 'institution', value)}}
									/>
								</div>
								
								<div className='mt-6 w-full'>
									<TextField
										inputLabel="Course" 
										inputPlaceholder="Which course did you study here?" 
										fieldId="middle-name" 
										inputType="text" 
										hasError={validationErrors[`course-${itemIndex}`]} 
										returnFieldValue={(value) => {updateEducation(itemIndex, 'course', value.label)}}
									/>
								</div>

								<div className='mt-6 w-full flex items-center justify-between gap-x-6'>
									<div className='w-full'>
										<DateField
											inputLabel="Start date" 
											inputPlaceholder="" 
											fieldId="education-start-date" 
											inputType="date" 
											hasError={validationErrors[`startDate-${itemIndex}`]} 
											returnFieldValue={(value) => {updateEducation(itemIndex, 'startDate', value)}}
										/>
									</div>
									<div className='w-full'>
										<DateField
											inputLabel="End date" 
											inputPlaceholder="" 
											fieldId="education-end-date" 
											inputType="date" 
											hasError={validationErrors[`endDate-${itemIndex}`]} 
											returnFieldValue={(value) => {updateEducation(itemIndex, 'endDate', value)}}
										/>
									</div>
								</div>
							</div>))}

							<button className='rounded bg-verovian-light-purple p-3 text-verovian-purple text-sm' onClick={()=>{addEducation()}}>Add Education</button>

							<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full'>
								<FormButton 
									buttonLabel={<span className='flex items-center gap-x-2 text-sm'>Continue <ArrowIcon className={`-4 h-4 transform -rotate-90`} /></span>} 
									buttonAction={()=>{completeStep2()}} />
								
							</div>
						</>}
						
						{activeStep === 3 && <>
							<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 2:</span> Documentation</p>
							<p className='mt-3 dark:text-gray-500 text-sm'>Please upload the following required document(s)</p>
							
							{invitationDetails.requiredDocumentUploads.map((doc, docIndex)=>(
								<div key={docIndex} className='mt-3 w-full'>
									<FileUpload
										hasError={false}
										fieldLabel={doc.documentName}
										returnFileDetails={(details)=>{
											addFile(details)
										}}
										acceptedFormats={['pdf', 'jpeg', 'jpg', 'png']}
									/>
									<label className='block mt-3 text-xs text-gray-400'>{doc.description}</label>
								</div>
							))}

							<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full flex items-center gap-x-4 justify-between'>
								<div className='w-4/12'>
									<button onClick={()=>{setActiveStep(activeStep - 1)}} className='flex items-center justify-center gap-x-3 text-gray-500 text-sm'>
										<ArrowIcon className={`w-4 h-4 transform rotate-90`} /> Go back
									</button>
								</div>
								<div className='w-8/12'>
									<FormButton 
										buttonLabel={<span className='flex items-center gap-x-2 text-sm'>Continue <ArrowIcon className={`-4 h-4 transform -rotate-90`} /></span>} 
										buttonAction={()=>{completeStep3()}} />
								</div>
							</div>
						</>}
						
						{activeStep === 4 && <>
							<p className='text-sm text-gray-500 mt-6'><span className='text-black fon-medium'>STEP 4:</span> Acceptance</p>
							<p className='mt-3 dark:text-gray-500 text-sm'>Please sign off the following on-boarding document(s) to complete your onboarding</p>
							
							{invitationDetails.requiredDocumentSignings.map((doc, docIndex)=>(
								<div key={docIndex} className='mt-3 w-full bg-gray-100 bg-opacity-40 p-5 rounded '>
									<p className='font-medium text-verovian-purple mb-2'>{doc.name}</p>
									<p className='text-md text-gray-600 mb-4 text-sm'>{doc.description}</p>

									<button onClick={()=>{readDocument(doc)}} className='mb-3 font-medium text-verovian-purple text-sm underline'>Click to read document</button>
									<Checkbox 
										checkboxToggleFunction={()=>{updateDocumentSigning(doc._id, !doc.acknowledged)}}
										checkboxLabel='I acknowledge that i have read and understood the provisions of this document'
									/>
									<div className='mt-3 w-full'>
										<TextField
											inputLabel="Your full name" 
											inputPlaceholder="Sign your full name" 
											fieldId="full-name" 
											inputType="full-name" 
											disabled={true}
											preloadValue={''}
											hasError={validationErrors.firstName} 
											returnFieldValue={(value)=>{updateDocumentSigning(doc._id, value)}}
										/>
									</div>
									<label className='block mt-3 text-xs text-gray-400'>Sign this document by writing your full name above</label>
								</div>
							))}

							<div className='animate__animated animate__fadeIn mb-4 mt-8 w-full flex items-center gap-x-4 justify-between'>
								<div className='w-4/12'>
									<button onClick={()=>{setActiveStep(activeStep - 1)}} className='flex items-center justify-center gap-x-3 text-gray-500 text-sm'>
										<ArrowIcon className={`w-4 h-4 transform rotate-90`} /> Go back
									</button>
								</div>
								<div className='w-8/12'>
									<FormButton buttonLabel={<span className='text-sm'>Complete onboarding</span>} buttonAction={()=>{completeOnboarding()}} />
								</div>
							</div>
						</>}
					</>
					}
					
				</div>
			</div>

			{activeDocument && <ModalLayout
				isOpen={readingDocument} 
				closeModal={()=>{setReadingDocument(false)}} 
				actionFunction={()=>{}} 
				actionFunctionLabel='Create department' 
				dialogTitle={activeDocument.name}
				maxWidthClass='max-w-4xl'
			>
				<ReadDocument documentId={activeDocument._id} employeeId={invitationDetails.employee._id} />
			</ModalLayout>}

		</>
	);
}

export default Signup