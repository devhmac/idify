# idify

Automatically fillup government forms with your id card.

- Site https://idify-govtech.pages.dev/
- `Api` https://idify-63022b8d6788.herokuapp.com/upload-image/



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
