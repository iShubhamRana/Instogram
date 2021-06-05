const initialLoginUser={
    email:'',
    password:''
};
export const changeLoginForm=(state=initialLoginUser,action)=>{
    switch(action.type){
        case 'username': { return {...state,username:action.payload} }
        case 'password':{ return {...state,password:action.payload}; }
        default: return state;
    }
}

//handles the form inputs in login page