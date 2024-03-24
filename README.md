# idify

Automatically fillup government forms with your id card.

- Coms https://discord.gg/ZCH3z8bk
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
    "license_number": "134711-320",
    "first_name": "Sam",
    "last_name": "SAMPLE",
    "street_address": "24 My Place Street",
    "post_code": "T5J 2M6",
    "city": "Anywhere",
    "province": "Alberta",
    "country": "Canada",
    "issue_date": "17 MAY 2018",
    "date_of_birth": "20 NOV 1971",
    "sex": "M",
    "eye_color": "Brown",
    "hair_color": "Brown",
    "height": "182 cm",
    "weight": "83 kg"
  }
}
```
