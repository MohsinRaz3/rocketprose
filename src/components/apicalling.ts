export async function submitAudioFileAndGetAudioTranscription(blob: Blob) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `audio_${timestamp}.wav`;

    // Create FormData and append audio file and transcriptStyle
    const formData = new FormData();
    formData.append('file', blob, filename);
    // formData.append('transcriptStyle', transcriptStyle); 

    const url = "https://salad-api-v2-zrui.onrender.com/rocketprose_transcribe";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);

            console.log("error occured while submitAudioFileAndGetAudioTranscription ",response)
            return "Error"        
        }

        const responseData = await response.json();
        console.log("final response", responseData);
        return responseData;

    } catch (error) {
        console.error('Error submitting audio files:', error);
    }
}


export async function GenerateProse(AudioTranscription: {transcript:string},transcriptionStyle: string |undefined) {

    const url = "https://salad-api-v2-zrui.onrender.com/rocketprose_openaiapi";
console.log("transcriptionStyle #api",transcriptionStyle)
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                proseData:{ 
                    transcribed_value :AudioTranscription.transcript,
                    text: transcriptionStyle 
                }
            })
        });

        if (!response.ok) {
            console.log("error occured while generation prose ",response)
            return "Error"
        }

        const responseData = await response.json();
        return responseData.transcribed_text ?responseData.transcribed_text:"";

    } catch (error) {
        console.error('Error submitting audio files:', error);
    }
}
