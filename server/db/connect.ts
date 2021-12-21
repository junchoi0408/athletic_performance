import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connect() {
    const CONNECTION_URL = process.env.MONGOOSE_URI || 'mongodb://localhost:27017/workout';

    return mongoose.connect(CONNECTION_URL)
        .then(() => {
            console.log(`Database successfully connected`);
        })
        .catch((error) => {
            console.log(error.message);
            process.exit(1);
        });
}


export default connect;