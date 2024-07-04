const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidFeedbackForm(topic: string, email: string, description: string) {
    if (!topic || !description || !email) {
        return false;
    }

    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
};

export function isValidSignUpForm(username: string, email: string, password: string) {
    if (!username || !email || !password) {
        return false;
    }

    if (!emailRegex.test(email)) {
        return false;
    }

    if (username.length < 6 || username.length > 32) {
        return false
    }

    if (email.length < 6 || email.length > 64) {
        return false
    }

    if (password.length < 6 || password.length > 32) {
        return false
    }
    
    return true;
};

export function isValidLoginForm(username: string, password: string) {
    if (!username || !password) {
        return false;
    }

    if (username.length < 6 || username.length > 32) {
        return false
    }

    if (password.length < 6 || password.length > 32) {
        return false
    }
    
    return true;
};

export function isNewPostFormValid(userID: number, title: string, category: number, content: string, image?: File) {
    if (userID < 1) {
        return false;
    };

    if (title.length < 1){
        return false;
    };

    if (category < 1) {
        return false;
    };

    if (content.length < 1) {
        return false;
    }

    if (image) {
        const extension = image.name.split('.').pop()?.toLocaleLowerCase();

        if (extension != 'png' && extension != 'jpg' && extension != 'jpeg') {
            return false;
        }
    }

    return true;
}