import {extendObservable} from 'mobx';

/**
 * UserStore
 */

 //Store information about loggin status
class UserStore{
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            email: ''
        })
    }
}

export default new UserStore();