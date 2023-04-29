function populatedb (){
        var Apartement= require("./models/apartement")
        var Apartementaddress= require("./models/apartementaddress")
        var Caretaker= require("./models/caretaker")
        var Landlord= require("./models/landlord")
        var Unit= require("./models/unit")
        var Apartementimages= require("./models/apartementimages")
        var Unitimages= require("./models/unitsimages")
        


    const mongoose= require("mongoose")
    const async= require("async")

    db_url="mongodb://localhost:27017/pmsdatabase"

    mongoose.connect(db_url, {useNewUrlParser:true})

    var db=mongoose.connection

    db.on("error", (error) =>{console.error(error)})
    db.on("open", ()=>{console.log("Populate MongoDB database has begun in local host Mongoose Database")})

    var apartements=[]
    var apartementsimages=[]
    var apartementaddresses=[]
    var caretakers=[]
    var units=[]
    var unitsimages=[]
    var landlords=[]
    
    
    /* 
    */
    apartements.splice(0, apartements.length)


    apartementaddresses.splice(0, apartementaddresses.length)


    apartementsimages.splice(0, apartementsimages.length)


    units.splice(0, units.length)


    unitsimages.splice(0, unitsimages.length)


    landlords.splice(0, landlords.length)


    caretakers.splice(0, caretakers.length)


    //Create a new apartements code for async parallel craeating of apartements
    function createApartement(apartement_first_name, apartement_last_name, landlord, caretaker, apartement_address, units, unitsimages, cb){
        
        var apartementdetails= {
            apartement_first_name:apartement_first_name,
            apartement_last_name:apartement_last_name,
            landlord:{
             landlord
            },
            caretaker:{
                caretaker
            },
            apartement_address:{
                apartement_address
            },
            units: units,
            unitsimages: unitsimages
        }

        var apartement= new Apartement(apartementdetails);
        apartement.save(function(err){
            if(err){
                cb(err, null)

            }else{
                console.log("New apartement has been created in the populated DB"+ apartement)
                apartements.push(apartement)
                cb(null, apartement)
             
             }
        })

    }



    //Create a new Unit code for async parallel craeating of units
    function createUnit(apartement_name,tenant_first_name, tenant_last_name, tenant_phone_number, tenant_email, unit_pictures, cb){
        var unitdetails= {
            apartement_name:apartement_name,
            tenant_first_name:tenant_first_name,
            tenant_last_name:tenant_last_name,
            tenant_phone_number:tenant_phone_number,
            tenant_email:tenant_email,
            unit_pictures:unit_pictures,
        }

        var unit= new Unit(unitdetails);
     

        unit.save(function(err){
            if(err){
                cb(err, null)
  
 
            }else{
                console.log("New unit has been created in the populated DB"+ unit)
                units.push(unit)
                cb(null, unit)
             
             }
        })

    }



    //Create a new apartements" Images code for async parallel craeating of apartements'Images
    function createApartementImages(apartement_name,front_view, right_side, back_view, left_side,cb){
        var apartementImagesDetails={
            apartement_name:apartement_name,
            front_view:front_view,
            right_side:right_side,
            back_view:back_view,
            left_side:left_side,
        }
        var apartementimages= new Apartementimages(apartementImagesDetails);
        apartementimages.save(function(err){
            if(err){
                cb(err,null)
                return
            } else{
                console.log("New ApartementsImages Added"+ apartementimages)
                apartementsimages.push(apartementimages)
                cb(null, apartementimages)
            }
        })
    }


    //Create a new units' images  code for async parallel craeating Units'images
        function createUnitImages(apartement_name, livingroom, kitchen, bedroom, washroom,cb){
            var unitImagesDetails={
                apartement_name:apartement_name,
                livingroom: livingroom,
                kitchen:kitchen,
                bedroom: bedroom,
                washroom: washroom,
            }
            var unitimages= new Unitimages(unitImagesDetails);
            unitimages.save(function(err){
                if(err){
                  //(err,null)
                  //console.log(err)  
                  return
                } else{
                    console.log("New UnitImages Added"+ unitimages)
                    unitsimages.push(unitimages)
                    cb(null, unitimages)
                }
            })
        }
        

    //Create a caretaker  code for async parallel craeating caretaker
            function createCareTaker(first_name, last_name, phone_number, email_address,cb){
                var caretakerdetails={
                    first_name:first_name,
                    last_name:last_name,
                    phone_number:phone_number,
                    email_address:email_address,
                }
                var caretaker= new Caretaker(caretakerdetails);
                caretaker.save(function(err){
                    if(err){
                        cb(err,null)
                        return
                    } else{
                        console.log("New Caretaker Added"+ caretaker)
                        caretakers.push(caretaker)
                        cb(null, caretaker)
                    }
                })

    }



    //Create a new landlords  code for async parallel craeating landlords
        function createLandLord(first_name, last_name, phone_number, email_address,cb){
            var landlorddetails={
                first_name:first_name,
                last_name:last_name,
                phone_number:phone_number,
                email_address:email_address,
            }
            var landlord= new Landlord(landlorddetails);
            landlord.save(function(err){
                if(err){
                    cb(err,null)
                    return
                } else{
                    console.log("New landlord Added"+ landlord)
                    landlords.push(landlord)
                    cb(null, landlord)
                }
            })

        }


        //Create new addresses  code for async parallel craeating apartement's address
    function createApartementAddress(country, state, city, street, zip_code,cb){
            var addressdetails={
            
                country:country,
                state:state,
                city:city,
                street:street,
                zip_code:zip_code,
            }
            var apartementaddress= new Apartementaddress(addressdetails);
            apartementaddress.save(function(err){
                if(err){
                    cb(err,null)
                    return
                } else{
                    console.log("New Adress Added"+ apartementaddress)
                    apartementaddresses.push(apartementaddress)
                    cb(null, apartementaddress)
                }
            })

    }


    //create apartements using async
    function createApartements(cb){
        async.parallel([
            function(callback){
                createApartement("blumenheights", "", landlords[0], caretakers[0], apartementaddresses[0], [units[0],units[1]], unitsimages[0], callback)
            },
            function(callback){
                createApartement("gluckheights", "", landlords[1], caretakers[1], apartementaddresses[1], [units[2],units[3]], unitsimages[1], callback)
            },
            function(callback){
                createApartement("traurigheights", "", landlords[2], caretakers[2], apartementaddresses[2], [units[4],units[5]], unitsimages[2], callback)
            },
            function(callback){
                createApartement("erfolgights", "", landlords[3], caretakers[3], apartementaddresses[3], [units[6],units[7]], unitsimages[3], callback)
            },
            function(callback){
                createApartement("bestimmtheights", "", landlords[4], caretakers[4], apartementaddresses[4], [units[8],units[9]], unitsimages[4], callback)
            },

        ],
        //optional callback
        cb
        )
    }


    //create units using async
    function createUnits(cb){
        async.parallel([
            function(callback){
                createUnit("blumenheights","Karomo", "kellner", "+2690980986", "karomo@gmail.com", unitsimages[0], callback)
            },
            function(callback){
                createUnit("blumenheights","Eroenng", "Svenictiz", "+3737980986", "eroenng@gmail.com", unitsimages[1], callback)
            },
            function(callback){
                createUnit("gluckheights","Schuld", "Sebastian", "+9440980986", "shuld@gmail.com", unitsimages[2], callback)
            },
            function(callback){
                createUnit("guckheights","Ayliva", "Allein", "+4090980986", "aylivagmail.com", unitsimages[3], callback)
            },
            function(callback){
                createUnit("taurigheights","Allerdein", "Gellogrio", "+58790980986", "allerdein@gmail.com", unitsimages[4], callback)
            },
            function(callback){
                createUnit("taurigheights","Fuhler", "Kuhl", "+2690980986", "kuhl@gmail.com", unitsimages[5], callback)
            },
            function(callback){
                createUnit("erflogheights","Lorvenna", "Junli", "+49890980986", "lorvenna@gmail.com", unitsimages[6], callback)
            },
            function(callback){
                createUnit("erfolgheights","knellner", "Schapper", "+9890980986", "schwarz@gmail.com", unitsimages[7], callback)
            },
            function(callback){
                createUnit("bestimmtheights","Ellergine", "Grundern", "+09790980986", "ellergine@gmail.com", unitsimages[8], callback)
            },
            function(callback){
                createUnit("bestimmtheights","Pfereder", "schtrock", "+25190980986", "schtrock@gmail.com", unitsimages[9], callback)
            },


        ],
        //optional callback
        cb
        )
    }

    //create apartements'images using async
    function createApartementsImages(cb){
        async.parallel([
            function(callback){
                createApartementImages("blumenheights", "blumeheightsfrontview", "blumenheightsrightview", "blumenheightsbackview", "blumenheightsleftview", callback)
            },
            function(callback){
                createApartementImages("gluckheights","gluckheightsfrontview", "gluckheightsrightview", "gluckheightsbackview", "gluckheightsleftview", callback)
            },
            function(callback){
                createApartementImages("traurigheights","traurigheightsfrontview", "traurigheightsrightview", "traurigheightsbackview", "traurigheightsleftview", callback)
            },
            function(callback){
                createApartementImages("erfolgheights","erfolgheightsfrontview", "erfolgheightsrightview", "erfolgheightsbackview", "erfolgheightsleftview", callback)
            },
            function(callback){
                createApartementImages("bestimmtheights","bestimmtheightsfrontview", "bestimmtheightsrightview", "bestimmtheightsbackview", "bestimmtleftview", callback)
            },


        ],
        //optional callback
        cb
        )
    }

    //create Units' Images using async
    function createUnitsImages(cb){
        async.parallel([
            function(callback){
                createUnitImages("blumenheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
            },
            function(callback){
                createUnitImages("blumenheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
            },
            function(callback){
                createUnitImages("gluckheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
            },
            function(callback){
                createUnitImages("gluckheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom", callback)
            },
            function(callback){
                createUnitImages("traurigheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
            },
            function(callback){
                createUnitImages("traurigheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
            },
            function(callback){
                createUnitImages("erfolgheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
            },
            function(callback){
                createUnitImages("erfolgheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
            },
            function(callback){
                createUnitImages("bestimmtheights", "unit1livingroom", "unit1kitchen", "unit1bedroom", "unit1washroom",callback)
            },
            function(callback){
                createUnitImages("bestimmtheights", "unit2livingroom", "unit2kitchen", "unit2bedroom", "unit2washroom",callback)
            },
    
        ],
        //optional callback
        cb
        )
    }


    //create apartements' Addresses using async
    function createApartementAddresses(cb){
        async.parallel([
            function(callback){
                createApartementAddress("deutsch", "muchen", "mundel", "meinliebestrasse", "23323", callback)
            },
            function(callback){
                createApartementAddress("schweiz", "berne", "fraufeld", "schneiderstrasse", "7432", callback)
            },
            function(callback){
                createApartementAddress("frankreich", "paris", "germain", "wissensteinstrasse", "90314", callback)
            },
            function(callback){
                createApartementAddress("leichtenstein", "schaan", "vaduz", "vaduzliebestrasse", "39892", callback)
            },
            function(callback){
                createApartementAddress("austria", "Wienstaat", "wien", "meinliebestrasse", "59814", callback)
            }

        ],
        //optional callback
        cb
        )
    }

    //create caretaker using async
    function createCareTakers(cb){
        async.parallel([
            function(callback){
                createCareTaker("Joel", "brandenstein", "678903", "joel@gmail.com",callback)
            },
            function(callback){
                createCareTaker("Namika", "singerin", "+293678903", "namika@gmail.com",callback)
            },
            function(callback){
                createCareTaker("Meitre", "bGims", "+297378903", "Meitre@gmail.com",callback)
            },
            function(callback){
                createCareTaker("Frenkrik", "bSchneider", "+349678903", "frankreik@gmail.com",callback)
            },
            function(callback){
                createCareTaker("Nico", "Neuman", "+4799678903", "Nico@gmail.com",callback)
            },
        ],
        //optional callback
        cb
        )
    }


    //create landlords using async
    function createLandLords(cb){
        async.parallel([
            function(callback){
                createLandLord("Marriane", "Berge", "+4799678903", "marianne@gmail.com",callback)
            },
            function(callback){
                createLandLord("Lea", "kaufman", "+4499678903", "lea@gmail.com",callback)
            },
            function(callback){
                createLandLord("Willium", "Frenzish", "+5099678903", "willium@gmail.com",callback)
            },
            function(callback){
                createLandLord("Steigen", "Nerdman", "+4899678903", "steigen@gmail.com",callback)
            },
            function(callback){
                createLandLord("Freidrich", "nietsche", "+4199678903", "freidrich@gmail.com",callback)
            },

        ],
        //optional callback
        cb
        )
    }
    
    
    //Call the parallel asyncronous function in series
    async.series([

        createApartementAddresses,
        createCareTakers,
        createLandLords,
        createUnitsImages,
        createApartementsImages,
        createUnits,
        createApartements,
        
                
    ],
            
    //optional call back function
    function(err,result){
        if(err){
            console.log("There was"+ err+ "in populating the datebase")
        }
        else{
             console.log("The Local MonogoDB database has successfully been populated");
    }
        
    //disconnect from database becasause it has already been poplulated
    mongoose.connection.close();
            
        })
    


}
module.exports=populatedb;

 
