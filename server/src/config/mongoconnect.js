import mongoose from 'mongoose';
import ENV from './env';

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connection Established');
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Connection Disconnected');
});

mongoose.connection.on('close', () => {
    console.log('MongoDB Connection Closed');
});

mongoose.connection.on('error', error => {
    console.log('MongoDB ERROR: ' + error);
    // process.exit(1);
});

const connectMongo = async () => {
    const dbOptions = {
        useNewUrlParser: true, // Avoid deprecation warning
        useUnifiedTopology: true, // Avoid deprecation warning
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
    };

    try {
        await mongoose.connect(ENV.databasesUri, dbOptions, undefined);
    } catch (error) {
        console.log(`DATABASE - Error:${error}`);
    }
};

export default connectMongo;
