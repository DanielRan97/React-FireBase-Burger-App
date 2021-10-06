export const authErrorFix = (err) => {

    let errorFixed = err;

    switch (err) {

        case 'INVALID_EMAIL': return errorFixed = 'Yor email is invalid';
        
        case 'EMAIL_NOT_FOUND': return errorFixed = 'Your email not found';
            
        case 'INVALID_PASSWORD': return errorFixed = 'Your password should be at least 6 characters';

        case 'USER_DISABLED': return errorFixed = 'The user account has been disabled by an administrator';
        
        case 'EMAIL_EXISTS': return errorFixed = 'The email address is already in use by another account';

        case 'OPERATION_NOT_ALLOWED': return errorFixed = 'Password sign-in is disabled for this project';

        case 'TOO_MANY_ATTEMPTS_TRY_LATER': return errorFixed = 'We have blocked all requests from this device due to unusual activity. Try again later';
            
        default: return errorFixed;
    };

};

export default authErrorFix;