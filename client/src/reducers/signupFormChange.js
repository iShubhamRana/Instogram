
const initialUser={
    semail:'',
    sname:'',
    susername:'',
    spassword:''
}
export const signupFormChange=(state=initialUser,action)=>{
    switch(action.type){
        case "semail":{ return {...state,semail:action.payload}};
        case "sname" :{ return {...state,sname:action.payload}}
        case "susername":{  return {...state,susername:action.payload}}
        case "spassword":{  return {...state,spassword:action.payload}}
        default: return state;
    }
}
//handles the form inputs in signup page