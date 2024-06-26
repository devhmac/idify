import base64
from openai import OpenAI
import instructor
import requests
from pydantic.main import BaseModel
from pysrc.load_env import openai_api_key
from pysrc.UserDetails import UserDetail
from pysrc.azure_gen_layout import analyze_general_documents

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def extract_user_details(file_name):
  # image_path = "/Users/habib/Documents/idify/pysrc/img/sample_lin_id.jpeg"
  # image_path = "/Users/habib/Documents/idify/pysrc/img/sample_health_card.jpeg"
  # image_path = "/Users/habib/Documents/idify/pysrc/img/hubert_lin_id.jpeg"
  # base64_image = encode_image(image_path)

  # headers = {
  #     "Content-Type": "application/json",
  #     "Authorization": f"Bearer {openai_api_key}"
  # }
  # payload = {
  #     "model": "gpt-4-vision-preview",
  #     "messages": [
  #       {
  #         "role": "user",
  #         "content": [
  #           {
  #             "type": "text",
  #             "text": "What are the text on this photo?"
  #           },
  #           {
  #             "type": "image_url",
  #             "image_url": {
  #               "url": f"data:image/jpeg;base64,{base64_image}"
  #             }
  #           }
  #         ]
  #       }
  #     ],
  #     "max_tokens": 300
  # }
  # response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)


  client = instructor.patch(OpenAI())
      
  # response_json = response.json()

  # print("Response JSON:", response_json)

  # content = response_json['choices'][0]['message']['content']
  
  # extact content using azure_gen_document.py
  content = analyze_general_documents(file_name)
  
  # content = 'Alberta IDENTIFICATION CARD CANADA No 0005-04440 Exp 05 JUN 2023 SAMPLE, Sally 12345 Somewhere Street SPECIMEN Anywhere AB T5N 2F5 DOB 05 JUN 1988 Sex F Eyes Blu Hair Bro 05 JUN 1988 SALL Ht 157 cm wt54 kg Os o caso ally Sample Iss 17 MAY 2018 JUN 88 0005-04440 DONOR'

  user_detail = client.chat.completions.create(
      model="gpt-4",
      response_model=UserDetail,
      messages=[
          {"role": "user", "content": "Extract driver\'s first name, last name, street address, post code, city, province, country, license number, birthdate, sex, eye color, hair color, height, and weight the following ID description json:" + content},
      ]
  )

  json_user_detail = user_detail.dict()
  # print(json_user_detail)
  return json_user_detail


