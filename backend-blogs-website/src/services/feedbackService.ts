import FeedbackModel from "../models/feedbackModel";

export default class FeedbackService {
    feedbackModel: FeedbackModel;

    constructor(articleModel: FeedbackModel) {
        this.feedbackModel = articleModel;
    }

    async createFeedback(topic: string, email: string, description: string) {
        const feedback = await this.feedbackModel.createFeedback(topic, email, description);
        return feedback;
    }


    // async sendEmail(topic: string, email: string, description: string) {
    //     try {
    //         email = email.trim();
    //         const res = await fetch(`https://api.unisender.com/ru/api/sendEmail?format=json&api_key=61gqcbkiq88cndnt5o6f9451owbtfkxtuqs3exky&email=${email}&sender_name=Support&sender_email=nerm1k@mail.ru&subject=Sample+Subject&body=Ваше+обращение+получено+и+скоро+будет+рассмотренно`)
    //         return res.json();
    //     } catch (error: any) {
    //         return false;
    //     }
    // }
}