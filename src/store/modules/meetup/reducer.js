// import produce from 'immer';

const INITIAL_STATE = {
    meetups: [],
    meetup: null,
};

export default function auth(state = INITIAL_STATE, action) {
    return state;
    /* return produce(state, draft => {
        switch (action.type) {
            default:
        }
    }); */
}
