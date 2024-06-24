export function isValidFeedbackForm(topic: string, email: string, description: string) {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!topic || !description || !email) {
        return false;
    }

    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}