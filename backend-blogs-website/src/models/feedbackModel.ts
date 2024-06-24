import knex from "knex";

const pool = knex(require('../../knexfile'));

export default class FeedbackModel {
    async createFeedback(topic: string, email: string, description: string) {
        const feedback = await pool('feedbacks')
                                .insert({sender_email: email, topic: topic, description: description});
        return feedback;
    }
}