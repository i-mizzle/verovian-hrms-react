import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import TwoWayChevronIcon from '../icons/TwoWayChevronIcon';
import { UseOutsideClickCloser } from '../UseOutsideClickCloser';

const SelectField = ({disabled, selectOptions, inputPlaceholder, inputLabel, displayImage, imageField, titleField, hasError, returnFieldValue, preSelected, preSelectedLabel}) => {
    const [activeValue, setActiveValue] = useState(preSelected || selectOptions[0]?.label || '')
    const [visibleOptions] = useState(selectOptions)
    const [optionsOpen, setOptionsOpen] = useState(false)


    
    useEffect(() => {
        const preSelect = () => {
            if((!preSelected || preSelected === undefined) && preSelected !== 0) {
                return
            }
    
            selectOptions.forEach((option) => {
                if (option[preSelectedLabel] && option[preSelectedLabel] === preSelected) {
                    setActiveValue(option[titleField])
                }
            })
        }
        preSelect()
    
    }, [preSelected, preSelectedLabel, selectOptions, titleField])
    

    const openOptions = () => {
        if(disabled && disabled === true) {
            return
        }
        setOptionsOpen(true)
    }

    const closeOptions = () => {
        setOptionsOpen(false)
    }

    const changeActiveValue = (value, object) => {
        setActiveValue(value)
        returnFieldValue(object)
        closeOptions()
    }

    const wrapperRef = useRef(null);
    UseOutsideClickCloser(wrapperRef, closeOptions);

    return (
        // <div className='w-full relative'>
        <div ref={wrapperRef} className='relative w-full'>

            <label 
            className={`cursor-text bg-transparent text-xs z-10 font-outfit font-medium transition duration-200  
            ${hasError ? 'text-red-600 dark:text-red-400' : 'text-gray-500'}`}>
                {inputLabel}
            </label>

            
            {/* Text input */}
            <input 
                type={"text"} 
                className={`mt-2 text-sm outline-none bg-transparent w-full cursor-text border p-3 rounded relative z-0 border-gray-400 placeholder:text-gray-400 placeholder:text-sm focus:border-black ${hasError && 'border-red-600'}`}
                disabled={disabled}
                onClick={()=>{openOptions()}} 
                onChange={()=>{}}
                placeholder={inputPlaceholder || ''}
                value={activeValue} 
            />
                <button onClick={()=>{openOptions()}} className='absolute top-[50px] right-3'>
                    <TwoWayChevronIcon className="w-5 h-5 text-black" />
                </button>

            {/* Options */}
            {optionsOpen && !disabled &&
                <div className='absolute top-24 w-full left-0 py-2 px-2 border rounded-md border-gray-300 bg-white scrollbar-hidden overflow-y-scroll pt-10 z-40' style={{maxHeight: '550px', paddingBottom:'25px'}}>
                    <button className='absolute top-3 right-3 text-gray-600 hover:text-gray-400 transition duration-200' onClick={()=>{closeOptions()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {visibleOptions.map((option, optionIndex) => (
                        <button key={optionIndex} className='w-full px-2 py-3 flex flex-row gap-x-3 text-sm text-gray-500 transition duration-200 hover:bg-gray-100' onClick={()=>{changeActiveValue(titleField !== '' ? option[titleField] : option, option)}}>
                            {displayImage && 
                                <img alt="" src={option[imageField]} className='w-12' />
                            }
                            {option[titleField]}
                        </button>
                    ))}
                </div>
            }
        </div>
    )
}

SelectField.propTypes = {
    selectOptions: PropTypes.array.isRequired,
    inputLabel: PropTypes.string.isRequired,
    titleField: PropTypes.string.isRequired,
    displayImage: PropTypes.bool.isRequired,
    imageField: PropTypes.string,
    fieldId: PropTypes.string.isRequired,
    hasError: PropTypes.bool,
    returnFieldValue: PropTypes.func.isRequired
};

export default SelectField
