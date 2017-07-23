# Nodepop

Es una API para venta de articulos de segunda mano.

La url para probar el deploy esta en la url: http://ec2-54-225-21-127.compute-1.amazonaws.com/apiv1/

Imagen de prueba: http://ec2-54-225-21-127.compute-1.amazonaws.com/images/ads/iphone.png

## Requisitos

- MongoDB
- Node
- npm
- nodemon

## Comenzar con el Proyecto

```
#Clonamos el repositorio
> git clone https://github.com/JoseAntpr/nodepop.git

#Accedemos a la carpeta
> cd nodepop

#Instalamos todas las dependencias con npm
> npm install
```

Una vez tengamos todas las dependencias del proyecto y tengamos descargados
todos los requisitos técnicos necesarios procedemos a iniciar el proyecto por
primera vez, en primer lugar iniciamos mondoDB.

Hemos realizado un script para inicializar la base de datos e introducir unos
datos iniciales.

```
#Inicializar la base de datos
> npm run installDB

# Ejecutar nodemon
> Nodemon
```

## API de usuarios.
 
 Un usuario esta formado por los siguientes datos:
 
 - Nombre
 - Email
 - Clave
 
 Nuestra API esta protegida con JSON WEB TOKEN aunque las peticiones al api de
 usuarios son abiertas porque son para la autenticación para obtener un token 
 y una para crear usuarios, por lo que no es necesario el token para acceder 
 a ellas.
 
 ### Crear usuarios
 
 Petición POST: 
 
 Enviamos nombre, email y clave como parámetro en el formulario.
 
 - Peticion:
 
 ```
http://localhost:3000/apiv1/users/
 ```
 
 - Respuesta:
 ```
 {
    "success": true,
    "result": {
    "__v": 0,
    "email": "jose@gmail.com",
    "clave": "4Xyq3htDPorzTQFCsymnLPPDai65TVO2S2HU1w0SMeY=",
    "_id": "59260d4cca2f732bfdc87331"
    }
 }

 ```
 
 ### Autenticación de usuarios
 
 Petición POST: 
  
  Enviamos email y clave  como parámetro en el formulario.
  
  - Peticion:
  
  ```
 http://localhost:3000/apiv1/users/autheticate
  ```
  
  - Respuesta:
  ```
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTkyNjBkNGNjYTJmNzMyYmZkYzg3MzMxIiwiaWF0IjoxNDk1NjY2MTAxLCJleHAiOjE0OTU4Mzg5MDF9.oZuSfWgEjPC0nlEdHJAdc8PS4_9rg0qZpRXw7gxyBhA"
  }
 
  ```
  
  ## API de anuncios
  
  Para el uso de esta parte del API si es estrictamente necesario estar authenticado
  y haber obtenido tu token.
  
  ### Lista de anuncios
  
  PETICION GET: 
  
  - Peticion:
  
  ```
  http://localhost:3000/apiv1/ads?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTkyNjBkNGNjYTJmNzMyYmZkYzg3MzMxIiwiaWF0IjoxNDk1NjY2MTAxLCJleHAiOjE0OTU4Mzg5MDF9.oZuSfWgEjPC0nlEdHJAdc8PS4_9rg0qZpRXw7gxyBhA
  ```
  - Respuesta: 
  ```
  {
    "success": true,
      "result": [
            {
              "_id": "59261129f2ec092cbd4e2636",
              "name": "Bicicleta",
              "sale": true,
              "price": 230.15,
              "imageURL": "http://localhost:3000/images/ads/bici.jpg",
              "__v": 0,
              "tags": [
                "lifestyle",
                "motor"
              ],
            },
            {
             "_id": "59261129f2ec092cbd4e2637",
              "name": "iPhone 3GS",
              "sale": false,
              "price": 50,
              "imageURL": "http://localhost:3000/images/ads/iphone.png",
              "__v": 0,
              "tags": [
                "lifestyle",
                "mobile"
              ],
            }
      ],
  }
  ```
  
  Este API soporta varios filtros que se deben pasar como Query params en la peticón 
  
  ```
  #Example
  http://localhost:3000/apiv1/ads?price=50-&limit=1&sale=true
  &token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTkyNjBkNGNjYTJmNzMyYmZkYzg3MzMxIiwiaWF0IjoxNDk1NjY2MTAxLCJleHAiOjE0OTU4Mzg5MDF9.oZuSfWgEjPC0nlEdHJAdc8PS4_9rg0qZpRXw7gxyBhA
  ```
  
  - Buscar por tags: tag=mobile o si son varios tag=mobile,motor
  - Por precio: Rango de precio min y precio max price=50-100, price=20-  o price=-250
  - Por venta o compra sale=true o sale=false
  - Por paginación skip=1 o skip=2 si hubiese varias páginas.
  - Limit para limitar el número de datos a mostrar limit=2
  - name que nos permite buscar por una cadena que empiece de manera similar name=ipho
  
  ### Lista de Tags
  
  Peticion GET
  
  - Peticion:
  ```
  http://localhost:3000/apiv1/ads/tags?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTkyNjBkNGNjYTJmNzMyYmZkYzg3MzMxIiwiaWF0IjoxNDk1NjY2MTAxLCJleHAiOjE0OTU4Mzg5MDF9.oZuSfWgEjPC0nlEdHJAdc8PS4_9rg0qZpRXw7gxyBhA
  ```
  
  - Respuesta:
  
  ```
  {
    "success": true,
    "result": [
        "lifestyle",
        "motor",
        "mobile"
    ],
  }
  ```
  
 

