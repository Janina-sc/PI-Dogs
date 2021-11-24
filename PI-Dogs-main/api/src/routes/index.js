const { Router } = require('express');
const axios = require("axios");
const server = require('../app');
const {Dog, Temperament} = require('../db')

const {API_KEY, ALL_DOGS}= process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//ruta get/dogs y ruta get/dogs/?name=...
const getApiData= async()=>{
    const apiUrl= await axios.get(`${ALL_DOGS}?key=${API_KEY}`);
       

    const apiData= await apiUrl.data.map(elem=>{
        return {
            id: elem.id,
            image:elem.image.url,//es lo que pide en la ruta principal
            name: elem.name,
            //temperament:elem.temperament,
            height: elem.height,
            weight: elem.weight,
            life_span: elem.life_span,
        };
    });
    return apiData;
};
     const getDbData = async()=> {
         return await Dog.findAll({
             include:{
             model: Temperament,
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
         const dataTotal =apiData.concat(dbData)
      return dataTotal;
     }
     router.get('/dogs', async(req, res)=>{
         const name= req.query.name
         const totalDogs= await getAllDogs()
         if(name){//puedo dejarlo así o armar la ruta('/dogs?name=)
             let dogName= await totalDogs.filter(elem=>elem.name.toLowerCase().includes(name.toLocaleLowerCase()))
         dogName.length ?
         res.status(200).send(dogName):
         res.status(400).send("Breed not found")
            } else{//si no hay un query
               res.status(200).send(totalDogs)
            }
      })
     
//       


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

//Ruta (get/temperament)


    //  router.get('/temperament', async(req, res)=>{
    //      const temperamentApi = await axios.get(`${ALL_DOGS}?key=${API_KEY}`);
    //      const temps= temperamentApi.data.map(elem=> elem.temperament);
    //      const tempsObj= Object.values(temps);
    //      console.log(tempsObj)
    //      for(let i=0; i<tempsObj.length;i++) {
    //         const tempsRepeated= new Set(tempsObj);
        
    //         console.log(tempsRepeated)
    //         const tempsNoRepeated=[...tempsRepeated];
    //      }
    //          Temperament.findOrCreate({
    //             where:{temperament:elem}
    //         });
        
    //          const temperaments=await Temperament.findAll();
    //          res.send(temperaments);
 
        
    //  });

     router.get('/temperament', async (req, res) => {
        const temperametApi = await axios.get(`${ALL_DOGS}?key=${API_KEY}`);
        const temperament = temperametApi.data.map(elem => elem.temperament)
        let mapedTemperaments = temperament.toString().trim().split(/\s*,\s*/);
        let splitedTemperaments = mapedTemperaments.filter(word => word.length > 0);
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
    let {name, height, weight, life_span, temperament,createdInDb}= req.body;
    const dogCreated= await Dog.create({
        name,
        height,
        weight,
        life_span,
        createdInDb
    });
    
      let temperamentDb= await Temperament.findAll({
        where:{name : temperament}
    });
    dogCreated.addTemperament(temperamentDb);//trae desde la tabla Temperament lo que le paso
    res.send('Dog successfully created');
});


module.exports = router;
