export default {
  SET_USER: (state, payload)=> {
    state.user = payload;
    window.localStorage.setItem('userName',payload.name);
    window.localStorage.setItem('id',payload.id);
    window.localStorage.setItem('avatar',payload.avatar);
  },
  GET_USER:(state,payload)=>{
    state.user = payload;
  }
}
