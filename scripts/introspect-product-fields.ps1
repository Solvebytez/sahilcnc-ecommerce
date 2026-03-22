$json = Get-Content -Raw -Path "D:\sahilCNC-ecomerce\scripts\graphql-introspect-queryfields.json"
$res = Invoke-RestMethod -Uri "http://localhost:1337/graphql" -Method Post -ContentType "application/json" -Body $json
$fields = $res.data.__type.fields.name | Where-Object { $_ -match "Product" } | Sort-Object
$fields | ForEach-Object { $_ }

