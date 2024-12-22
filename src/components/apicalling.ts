import { WaveFile } from 'wavefile';
import axios from 'axios';

export async function submitAudioFileAndGetAudioTranscription(blob: File) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  try {
    //@ts-ignore
    const audioContext = new (window.AudioContext || window.webkitAudioContext )();
    const arrayBuffer = await blob.arrayBuffer();
    const decodedAudio = await audioContext.decodeAudioData(arrayBuffer);

    const pcmData = decodedAudio.getChannelData(0); // Mono channel
    const int16Array = new Int16Array(pcmData.length);
    for (let i = 0; i < pcmData.length; i++) {
      int16Array[i] = pcmData[i] * 0x7FFF;
    }

    const wav = new WaveFile();
    //@ts-ignore
    wav.fromScratch(1, decodedAudio.sampleRate, 16, int16Array);
    const wavBuffer = wav.toBuffer();

    const wavFile = new File([wavBuffer], `${timestamp}.wav`, { type: 'audio/wav' });

    const downloadUrl = URL.createObjectURL(wavFile); 
    const downloadLink = document.createElement('a'); 
    downloadLink.href = downloadUrl;
    downloadLink.download = `${timestamp}.wav`; 
    downloadLink.click(); 

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

    const formData = new FormData();
    formData.append('file', wavFile);

    const url = "https://salad-api-v2-zrui.onrender.com/rocketprose_transcribe";
    const response = await axios.post(url, formData);

    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    //@ts-ignore
    console.error("Error:", error.message);
    return "Error";
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
