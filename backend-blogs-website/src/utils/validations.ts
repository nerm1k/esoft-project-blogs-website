const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidNewUser(username: string, email: string, password: string): boolean {
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

export function isValidLogin(username: string, password: string) {
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

export function isValidFeedback(topic: string, email: string, description: string) {
    if (!topic || !description || !email) {
        return false;
    }

    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
};

export function isUsernameValid(username: string) {
    if (username.length < 6 || username.length > 32) {
        return false
    };

    return true;
}

export function isEmailValid(email: string) {
    if (!emailRegex.test(email)) {
        return false;
    };

    if (email.length < 6 || email.length > 64) {
        return false
    };

    return true;
}

export function isPasswordValid(password: string) {
    if (password.length < 6 || password.length > 32) {
        return false;
    }

    return true;
}

export function isEditProfileValid(firstName?: string, lastName?: string, surname?: string, dateOfBirth?: string) {
    if (firstName) {
        if (firstName.length < 1 || firstName.length > 32) {
            return false;
        };
    };

    if (lastName) {
        if (lastName.length < 1 || lastName.length > 32) {
            return false;
        };
    };

    if (surname) {
        if (surname.length < 1 || surname.length > 32) {
            return false;
        };
    };

    if (dateOfBirth) {
        if (Date.parse(dateOfBirth) > Date.now()) {
            return false;
        };
    };

    return true;
}

export function isNewPostValid(userID: number, title: string, category: number, content: string, image?: string) {
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
    };

    if (image) {
        const extension = image.split('.').pop()?.toLocaleLowerCase();

        if (extension != 'png' && extension != 'jpg' && extension != 'jpeg') {
            return false;
        };
    };

    return true;
}