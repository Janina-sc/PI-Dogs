const { Router } = require('express');
const axios = require("axios");
const server =require('../app');
const router = Router();
const {Dog, Temperament,temp_dog } = require('../db');
const {API_KEY}= process.env;
const URL = `https://api.thedogapi.com/v1/breeds?${API_KEY}`;
// const DogRoutes = require('./DogRoutes.js');
// const TemperamentRoutes=require('./TemperamentRoutes.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);YO: .use es método de express para trabajar con middleware.Ej:router.use(0/0, function(req, res, next){
//     console.log("hicieron un request");
//     noExtendLeft();
// })
// router.use('/dog', DogRoutes)
// router.use('/temperament', TemperamentRoutes)



//ruta get/dogs y ruta get/dogs/?name=...
const getApiData = async()=> {
    const apiUrl = await axios.get(URL);
    console.log("me devuelve la api")
    const apiData = await apiUrl.data.map(elem => {
        
        return {
            id: elem.id,
            image: elem.image.url,
            name: elem.name,
            temperament:  [elem.temperament].join().split(",").map((elem)=>elem.trim()),
            weight_min:elem.weight.metric.split(" -")[0],
            weight_max:elem.weight.metric.split("- ")[1],
            height_min:elem.height.metric.split(" -")[0],
            height_max:elem.height.metric.split("- ")[1],
            life_span_min: elem.life_span.split(" -")[0],
            life_span_max: elem.life_span.split("- " )[1],
            

        };
    });
      console.log("funciona")
    return apiData;
}
     
    const getDbData = async()=> {
         return  await Dog.findAll({
             include:{
             model: Temperament,//sino lo incluyo cuando quiera crear algo no me los va a tener en cuenta
             attributes: ["name"],
             through:{ // trae los atributos- sólo name
                 attributes:[],
             },
             }
         })    
     }

     const getAllDogs = async()=> {
         const apiData = await getApiData();
         const dbData= await getDbData();
         //console.log(dbData)
         const dataTotal =apiData.concat(dbData)
      return dataTotal;
     }
    

     router.get('/dogs', async(req, res)=>{
         const name= req.query.name;
         
         let totalDogs= await getAllDogs();
         console.log(totalDogs)
         if(name){
             let dogName= await totalDogs.filter(elem=>elem.name.toLowerCase().includes(name.toLowerCase()));
         dogName.length ?
         res.status(200).send(dogName):
         res.status(404).send("Dog not found");
            } else{//si no hay un query
            res.status(200).send(totalDogs)
       
            }
      })
    //   router.get('/dogs/:name', async(req, res)=>{ //pulir esta ruta, no está andando y no está pedida en el readme


    //       const {name}=req.params;
    //       let totalDogs= await getAllDogs();
    //       if(name){
    //           let dogName=await totalDogs.filter(elem=>elem.name.toLowerCase().includes(name.toLocaleLowerCase()))
    //           dogName.length ?
    //           res.status(200).send(dogName) :
    //           res.status(404).send("Dog not found");
    //       } else{
    //           res.status(200).send(totalDogs)
    //       }
    //   })
     
      


//ruta get/dogs/{idRaza}:

 router.get('/dog/:id', async (req, res)=>{//si fuera un id creado en la bd sería uuid

 const id=req.params.id;
 
 const allTheDogs= await getAllDogs()
 if(id){
let dogId = await allTheDogs.filter(elem=>elem.id==id);
     dogId.length ?
  res.status(200).json(dogId):

  res.status(404).send('DogId not found')
 }
})

// // //Ruta (get/temperament)




     router.get('/temperament', async (req, res) => {
        const temperametApi = await axios.get(URL);
        const temperament = temperametApi.data.map(elem => elem.temperament)
        let mapedTemperaments = temperament.toString().trim().split(/\s*,\s*/);
        let splitedTemperaments = mapedTemperaments.filter(temp => temp.length > 0);
        splitedTemperaments.forEach(elem => {
            Temperament.findOrCreate({
                where: {name: elem}
            })
            //console.log(splitedTemperaments)
        });
        const allTemperaments = await Temperament.findAll();
        res.send(allTemperaments);
    })
     

    

 //Ruta (post/dog), publica algo en la base de datos
router.post('/dog', async (req,res)=>{
    let {name,  height_min, height_max, weight_min,weight_max, life_span_min, life_span_max,  temperament,createdInDb}= req.body;
    const dogCreated= await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        createdInDb
    });
    //console.log(dogCreated)manejar error
    // console.log(temperament, 'temperamentos')
      let temperamentDb = await Temperament.findAll({
        where:{name : temperament}
    });
    
    console.log(temperamentDb, ' db found')
    await dogCreated.addTemperament(temperamentDb);//trae desde la tabla Temperament lo que le paso
    res.status(200).send('Dog successfully created');
});

 




module.exports = router;