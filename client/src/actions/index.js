
export const  loginChanges=(name,value)=>{
    return {
        type:name,
        payload:value
    }
}
export const signupChanges=(name,value)=>{
    return {
        type:name,
        payload:value
    }
}
export const setUser=(user)=>{

    return {
        type:'User',
        payload:user
    }
}
