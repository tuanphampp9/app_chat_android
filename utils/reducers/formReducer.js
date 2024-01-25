export const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_INPUT':
            const { inputId, errorMessage, values } = action.payload
            const updateValidates = {
                ...state.inputValidities,
                [inputId]: errorMessage === null
            }
            const updateInputValues = {
                ...state.inputValues,
                [inputId]: values
            }
            const checkFormIsValid = Object.values(updateValidates).includes(false)
            return {
                inputValidities: updateValidates,
                formIsValid: checkFormIsValid,
                inputValues: updateInputValues,
                errorMessage: {
                    ...state.errorMessage,
                    [inputId]: errorMessage
                }
            }
    }
}