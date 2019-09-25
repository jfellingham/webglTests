const https = require('https');
const fs = require('fs');
const request = require('request');
process.env.GOOGLE_APPLICATION_CREDENTIALS = "Vexecute-c30a9533b030.json";
const options = {
  // Private Key
  key: fs.readFileSync('./ssl/server.key'),

  // SSL Certficate
  cert: fs.readFileSync('./ssl/server.crt'),

  // Make sure an error is not emitted on connection when the server certificate verification against the list of supplied CAs fails.
  rejectUnauthorized: false
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const qs = require('qs');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 9745;

const server = https.createServer(options, app).listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());
app.use(cors());

app.use('/', express.static(__dirname));

app.get('/authresponse', (req, res) => {
  res.redirect(301, `/?${qs.stringify(req.query)}`);
});

//app.post('/audio', upload.single('data'), (req, res) => {
//  res.json(req.file);
//});

app.post('/audio', function (req, res) {
    
//   console.log(req.file); // see what got uploaded
    console.log(`Working`);
  let uploadLocation = __dirname + '/public/uploads/' + 'test';// where to save the file to. make sure the incoming name has a .wav extension

//  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok

});
app.use(express.static('public'));;

app.get('/parse-m3u', (req, res) => {
  const m3uUrl = req.query.url;
  console.log(m3uUrl)

  if (!m3uUrl) {
    return res.json([]);
  }

  const urls = [];

  request(m3uUrl, function(error, response, bodyResponse) {
    console.log(bodyResponse, m3uUrl)
    if (bodyResponse) {
      urls.push(bodyResponse);
    }

    res.json(urls);
  });
});
//const convertText = document.getElementById('getText'); 
//convertText.addEventListener('click', main);
// Imports the Google Cloud client library
//       async function main() {
////const fs = require('fs');
//const speech = require('@google-cloud/speech');
//
//// Creates a client
//const client = new speech.SpeechClient();
//
///**
// * TODO(developer): Uncomment the following lines before running the sample.
// */
//
//console.log('Here');
//const filename = 'mp3/test.wav';
//const encoding = 'LINEAR16';
//const sampleRateHertz = 16000;
//const languageCode = 'en-US';
//
//const config = {
//  encoding: encoding,
//  sampleRateHertz: sampleRateHertz,
//  languageCode: languageCode, 
//  channels:'1', 
//    bits:'16',
//    endian:'little',
//};
//const audio = {
//  content: fs.readFileSync(filename).toString('base64'),
//};
//
//const request = {
//  config: config,
//  audio: audio,
//};
//
//// Detects speech in the audio file
//const [response] = await client.recognize(request);
//           
//           console.log([response]);
//const transcription = response.results
//  .map(result => result.alternatives[0].transcript)
//  .join('\n');
//console.log(`Transcription: `, transcription);
//
//       }main().catch(console.error);
