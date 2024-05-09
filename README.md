# ID-ify - MovEd GovTech Hackathon sumbission 

### Automatically fill government forms with your id card.

Our 24-ish hour submission for the MovEd GovTech Hackathon.
The topic was improving Government processes & services with technology, so we thought we'd attempt to solve the ever tedious process of manually filling out the same information on long government forms.
Shoutout to the team [Hubert](https://github.com/linhub15), [Habib](https://github.com/habibrahmanbd), [Ian](https://github.com/ianrbaguio) & Ricky

We built ID-ify, a one click button which could be imbedded into a form, enabling users to take a photo of their document/information (our example was an ID), parse the image-to-text data via an optical character recognition model, and then automatically fill in the related form fields.

### Watch a quick demo here
https://github.com/linhub15/idify/assets/10420994/b7139360-8af7-472d-a5e5-718f577fb5f5

### Or our more in depth hackathon project video
https://www.youtube.com/watch?v=Zp26eeCPK5Y

### The Project took a few different iterations 
- First try being a client only approach with Tesseract.js, but it proved to be unable to accurately read from our mediocre webcam image data.
![image](https://github.com/devhmac/idify/assets/52307383/cfb2ca49-15aa-415b-9417-b730f8f37835)

- Needing bigger guns we spun up a python server, and tested multiple models from Huggingface, but landed on a combo of Azure Doc Intelligence and OpenAI Api.
![image](https://github.com/devhmac/idify/assets/52307383/07869e74-8bc9-4b0a-899e-bfe02a519fe0)

### Tech Stack 
- React
- Python
- FastAPI



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
