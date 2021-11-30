const { Router } = require('express');
const axios = require("axios");
const server =require('../app');
const router = Router();


const {Dog, Temperament} = require('../db');

const {API_KEY}= process.env;
const URL = `https://api.thedogapi.com/v1/breeds?337a1d9f-e6af-4c5a-962a-0e3af3e721ef`;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//ruta get/dogs y ruta get/dogs/?name=...
const getApiData = async()=> {
    const apiUrl = await axios.get(URL);
    console.log("me devuelve la api")
    const apiData = await apiUrl.data.map(elem => {
        
        return {
            
            id: elem.id,
            image: elem.image.url,
            name: elem.name,
             temperament:  [elem.temperament].join().split(",").map(elem=>elem.trim()),
            // // weight_min: parseInt(elem.weight.metric.slice(0, 2).trim()),
            // // weight_max: parseInt(elem.weight.metric.slice(4).trim()),
            // // height_min: parseInt(elem.height.metric.slice(0, 2).trim()),
            // // height_max: parseInt(elem.height.metric.slice(4).trim()),
             weight:elem.weight,
             height:elem.height,
             life_span: elem.life_span,
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
         console.log(dbData)
         const dataTotal =apiData.concat(dbData)
      return dataTotal;
     }
     router.get ('/', async (req, res) => {
        const data = await getAllDogs();
        res.json(data);
        });

     router.get('/dogs', async(req, res)=>{
         const name= req.query.name;
         
         let totalDogs= await getApiData();
         if(name){
             let dogName= await totalDogs.filter(elem=>elem.name.toLowerCase().includes(name.toLowerCase()));
         dogName.length ?
         res.status(200).send(dogName):
         res.status(404).send("Breed not found");
            } else{//si no hay un query
            res.status(200).json(totalDogs)
       
            }
      })
     
      


//ruta get/dogs/{idRaza}:

router.get('/dogs/:id', async (req, res)=>{//si fuera un id creado en la bd sería uuid

 const id=req.params.id;
 const detail= await getAllDogs()
 if(id){
let details = await detail.filter(elem=> elem.id == id)
     details.length?
 res.status(200).json(details):
  res.status(404).send('Results not found')
 };
});

// // //Ruta (get/temperament)


// //     //  router.get('/temperament', async(req, res)=>{
// //     //      const temperamentApi = await axios.get(`${ALL_DOGS}?key=${API_KEY}`);
// //     //      const temps= temperamentApi.data.map(elem=> elem.temperament);
// //     //      const tempsObj= Object.values(temps);
// //     //      console.log(tempsObj)
// //     //      for(let i=0; i<tempsObj.length;i++) {
// //     //         const tempsRepeated= new Set(tempsObj);
        
// //     //         console.log(tempsRepeated)
// //     //         const tempsNoRepeated=[...tempsRepeated];
// //     //      }
// //     //          Temperament.findOrCreate({
// //     //             where:{temperament:elem}
// //     //         });
        
// //     //          const temperaments=await Temperament.findAll();
// //     //          res.send(temperaments);
 
        
// //     //  });

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
     

    

 //Ruta (post/dog)
router.post('/dog', async (req,res)=>{
    let {name, height,weight, life_span, temperament,createdInDb}= req.body;
    const dogCreated= await Dog.create({
        name,
        height,
        weight,
        // height_min,
        // height_max,
        // weight_min,
        // weight_max,
        life_span,
        createdInDb
    });
    
      let temperamentDb= await Temperament.findAll({
        where:{name : temperament}
    });
    dogCreated.addTemperament(temperamentDb);//trae desde la tabla Temperament lo que le paso
    res.status(200).send('Dog successfully created');
});


module.exports = router;