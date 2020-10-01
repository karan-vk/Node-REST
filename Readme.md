# E-commerce RESTful api BY [KARAN]("http://thebigk.ml")

## Steps to use

1. use a nodemon.json to set the environment variables `MONGO_ATLAS_PW` & `JWT_KEY`

   ```
   {
   "env": {
   "MONGO_ATLAS_PW": "YOUR_PASSWORD",
   "JWT_KEY": "YOUR_SECRET"
   }
   }
   ```

2. Change the MongoDB uri in [app.js](app.js)

```
6 mongoose.connect(
7   "mongodb+srv://user:" +
8     process.env.MONGO_ATLAS_PW +
9     "@cluster0.odxd9.gcp.mongodb.net/RestMax?retryWrites=true&w=majority",
10   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
11 );

```

3. Create a new folder named `upload` in the root directory

4. Run
   ```
   npm i
   npm start
   ```
   The app will start in http://localhost:3000
