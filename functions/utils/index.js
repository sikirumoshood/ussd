const request = require('request');
const config = require('../config');

const saveData = ( type, sessionId, value, phone_number = null) => {
    let data = {
        ussd_session_id: sessionId,
        phone_number
    };

    data[type] = value;
    
    data = JSON.stringify(data);

    request(
        {
            method: 'POST',
            uri: `${config.ROADRY_API_URL}${type}`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        },
        (error, httpResponse, body) => {
            if (error) {
                console.error(`Unable to send ${type} to roadry backend api`);
            } else {
                console.log(`${type} sent to roadry backend API successfully`);
            }
        }
    );
};

module.exports = saveData;