const saveData = require('./utils');

function alert(req, res) {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = "";
  
    if (text === "") {
      response = `CON Welcome to Roadry Emergency Unit
          1. Report accident   
      `;

    } else if (text === "1") {

      response = `CON Enter location longitude `;

    }else{
        const actionPositions = text.split('*');
        if(actionPositions[0] == 1){
            if(actionPositions.length === 3){
                // User is to enter latitude
                const latitude = actionPositions[2];
                if(!latitude || isNaN(latitude)){
                    response = `END Invalid latitude provided`
                }else{

                    saveData('latitude', sessionId, latitude);
                    // Get accident severity
                    response = `CON Select the severity of the accident
                        1. Low (No casualty)
                        2. Moderate (Casualty, No death)
                        3. High (Death and Casualties)
                    `;
                }

            }else if(actionPositions.length === 4){
                let severityLevel = Number(actionPositions[3]);
                if(![1, 2, 3].includes(severityLevel)){
                    response = `END Invalid input`;
                }else{
                    severityLevel = ['low', 'moderate', 'high'][severityLevel-1];
                    saveData('severity', sessionId, severityLevel); 
                    // Get nature of accident
                    response = `CON Kindly enter nature of accident`;
                }

            }else if(actionPositions.length === 5){
                let description = actionPositions[4];
                saveData('description', sessionId, description);
                // BACKEND API: At this point should fire geocoding request.
                response = `END Your report has been received! You will receive a response shortly.`

            }else{
                 // User is to enter logitude
                const longitude = actionPositions[1];
                if(!longitude || isNaN(longitude)){
                    response = `END Invalid logitude provided`
                }else{
                    const phone_number = phoneNumber;
                    saveData('longitude', sessionId, longitude, phone_number);
                    // Get latitude
                    response = `CON Enter location latitude`;
                }
                
            }
        
        }else{
                response = `END Invalid input`;
            }
         
        
    }
    // Send response to USSD API GATEWAY.
    res.set("Content-Type: text/plain");
    res.send(response);
    
}

module.exports = alert;