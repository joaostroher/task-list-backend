import mongoose from 'mongoose';

import configDatabase from '~/config/database';

const connection = mongoose.connect(configDatabase.url, configDatabase.options);

export default connection;
