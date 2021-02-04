import axsios from 'axios';

const instance = axsios.create({
    baseURL: 'https://burger-order-24691-default-rtdb.firebaseio.com/'
})

export default instance;