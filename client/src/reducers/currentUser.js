const User={
    username: null
}

export const currentUser=(state=User,action)=>{
  // console.log(action.payload);
  switch(action.type){
      case 'User':{return {...action.payload}};
      default: return state;
  }
}
