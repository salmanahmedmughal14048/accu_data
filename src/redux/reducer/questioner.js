const initialState = {
    current: 0,
    finished: false,
    answers: {}, // <-- NEW: track answers here
};

const questionerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CURRENT':
            return { ...state, current: action.payload };
        case 'SET_FINISHED':
            return { ...state, finished: action.payload };
        case 'SET_ANSWER':
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.payload.questionIndex]: action.payload.answer
                }
            };
        default:
            return state;
    }
};

export const setCurrent = (val) => ({ type: 'SET_CURRENT', payload: val });
export const setFinished = (val) => ({ type: 'SET_FINISHED', payload: val });
export const setAnswer = (questionIndex, answer) => ({
    type: 'SET_ANSWER',
    payload: { questionIndex, answer }
});

export default questionerReducer;
