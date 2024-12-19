export async function submitAudioFiles(blob: Blob, transcriptStyle: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `audio_${timestamp}.wav`;

    // Create FormData and append audio file and transcriptStyle
    const formData = new FormData();
    formData.append('file', blob, filename);
    formData.append('transcriptStyle', transcriptStyle); 

    const url = "https://salad-api-v2-rocketprose.onrender.com/rocketprose_transcribe";

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
        }

        const responseData = await response.json();
        console.log("final response", responseData);
        return responseData;

    } catch (error) {
        console.error('Error submitting audio files:', error);
    }
}
