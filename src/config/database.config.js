import { connect, set } from "mongoose";

set('strictQuery', true);

export const dbconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.log(error);
    }
}