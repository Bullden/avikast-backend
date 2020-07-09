# Files

###### Upload

curl --location --request POST 'localhost:3080/api/files' \
--header 'App: Client' \
--header 'Platform: Web' \
--form 'originalname=111' \
--form 'mimetypeimage/=image/png' \
--form 'file=@/Users/maximzhemerenko/Downloads/Fill 33.png'

###### Get uploaded file

curl --location --request GET 'localhost:3080/api/files/5f074c6d9f9a0021fcc6a4e9' \
--header 'App: Client' \
--header 'Platform: Web'
