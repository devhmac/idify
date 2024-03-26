# ID-ify - MovEd GovTech Hackathon sumbission 

### Automatically fillup government forms with your id card.

Our submission for the MovEd GovTech Hackathon.The topic was improving Government processes & services with technology, so we thought we'd attempt to solve the ever tedious process of manually filling out the same information on long government forms.

In one we built ID-ify, a one click button which could be imbedded into a form, enabling users to take a photo of their document/information (our example was an ID), parse the image-to-text data via an optical character recognition model, and then automatically fill in the related form fields.

Project took a few different iterations, 
- First try being a client only approach with Tesseract.js, but it proved to be unable to accurately read from our mediocre webcam image data.
![image](https://github.com/devhmac/idify/assets/52307383/cfb2ca49-15aa-415b-9417-b730f8f37835)

- Needing bigger guns we spun up a python server, and tested multiple models from Huggingface, but landed on a combo of Azure Doc Intelligence and OpenAI Api.
![architecture](https://prod-files-secure.s3.us-west-2.amazonaws.com/560f65cd-4536-42eb-980d-a610e2ee0b44/a68ec78f-229d-412d-b7ab-17d985c8dd06/Untitled.png)

### Tech Stack 
- React
- Python
- FastAPI

https://github.com/linhub15/idify/assets/10420994/b7139360-8af7-472d-a5e5-718f577fb5f5


## local frontend server (Node)

```
# npm (default)
npm run --prefix frontend dev
# or pnpm
pnpm run --prefix frontend dev
```

## Form fields

```
family_name: string
given_name: string
address: string
date_of_birth: string (ISO 8601)
license_number: NNNNNN-NNN
sex: "M" | "F" | "X"
```

## OCR API

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/upload-image/' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/Users/habib/Documents/idify/pysrc/img/high_contrast.jpeg;type=image/jpeg'  
```

Sample Response:

```json
{
  "message": "Image received and processed!",
  "data": {
    "license_number": "",
    "first_name": "",
    "last_name": "",
    "street_address": "",
    "post_code": "",
    "city": "",
    "province": "",
    "country": "",
    "issue_date": "",
    "date_of_birth": "",
    "sex": "",
    "eye_color": "",
    "hair_color": "",
    "height": "",
    "weight": ""
  }
}
```
