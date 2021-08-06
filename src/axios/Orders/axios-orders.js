import axsios from 'axios';


const instance = axsios.create({
    baseURL: `${process.env.REACT_APP_BURGER_API}`,
})



export default instance;