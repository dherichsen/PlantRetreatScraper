/**
 * Example works for Node.js 7 and newer.
 */

const Dotenv = require("dotenv");
const { config, getJson } = require("serpapi");

Dotenv.config();
const apiKey = process.env.API_KEY;

const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const run = async () => {
  
  const coordinate_queries = ["@-16.4090474,-71.5374509999999,8z",
  "@-13.4216848,-71.8482387999999,8z",
  "@31.3011855,-110.9381047,8z",
  "@-6.4824784,-76.3726891,8z",
  "@9.351045,-83.9783946,8z",
  "@37.295612,-8.773227,8z",
  "@52.3675734,4.9041389,8z",
  "@20.8478084,-86.8755341999999,8z",
  "@-3.5000136,-73.0508582,8z",
  "@-8.3928622,-74.5826166,8z",
  "@-4.5053588,-73.5809867999999,8z",
  "@41.6039431,2.6244208,8z",
  "@10.037829,-84.5527879999999,8z",
  "@38.7222524,-9.1393366,8z",
  "@37.0164626,-7.9351983,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@-1.7968915,-80.7591075,8z",
  "@22.1520892,-100.9733024,8z",
  "@38.7222524,-9.1393366,8z",
  "@21.1046856,-86.9665097,8z",
  "@52.3130182,4.7724709,8z",
  "@51.9421257,5.216835,8z",
  "@1.1477941,-76.6481283999999,8z",
  "@-6.24646169999999,39.5339189,8z",
  "@20.8644,-86.9087289,8z",
  "@19.1950964,-100.1326725,8z",
  "@20.6295586,-87.0738851,8z",
  "@-16.3988325,-71.5537559999999,8z",
  "@-3.7891165,-73.2997467,8z",
  "@-0.3465761,-78.3868756999999,8z",
  "@38.6221057,-0.1266861,8z",
  "@9.9312697,-84.1820735,8z",
  "@14.7222514,-91.2500441,8z",
  "@37.8674077,-77.7091915,8z",
  "@42.2045186,-122.7196194,8z",
  "@45.515232,-122.6783853,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@18.2683058,-78.3472424,8z",
  "@52.3554754,4.815245300000001,8z",
  "@36.382093,-105.559233,8z",
  "@20.6366016,-87.067599,8z",
  "@20.6565177,-105.211358,8z",
  "@41.6039431,2.6244208,8z",
  "@18.4402096,-77.8936243,8z",
  "@9.6374091,-82.6888438,8z",
  "@42.1227137,-122.4641792,8z",
  "@9.3565708,-83.8916809,8z",
  "@38.4099406,-105.5838217,8z",
  "@-2.9001285,-79.0058964999999,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@51.6509792,5.5684723,8z",
  "@46.2043907,6.1431577,8z",
  "@45.515232,-122.6783853,8z",
  "@9.3058979,-83.7778929999999,8z",
  "@20.2174027,-87.4545027,8z",
  "@39.5509478,2.6959016,8z",
  "@-6.4575859,-76.3511506,8z",
  "@21.1046856,-86.9665097,8z",
  "@32.3661011,-117.0617553,8z",
  "@52.3675734,4.9041389,8z",
  "@-16.4090474,-71.5374509999999,8z",
  "@20.6105373,-105.2337062,8z",
  "@-3.5000136,-73.0508582,8z",
  "@9.920695,-84.1461518999999,8z",
  "@18.4402096,-77.8936243,8z",
  "@38.7222524,-9.1393366,8z",
  "@20.6295586,-87.0738851,8z",
  "@38.8338816,-104.8213634,8z",
  "@-3.7891165,-73.2997467,8z",
  "@38.6221057,-0.1266861,8z",
  "@-6.4824784,-76.3726891,8z",
  "@-7.84761199999999,-74.9914929999999,8z",
  "@38.4099406,-105.5838217,8z",
  "@10.037829,-84.5527879999999,8z",
  "@36.9187716,-3.4795035,8z",
  "@41.3873974,2.168568,8z",
  "@-9.2976466,-76.0000202,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@-13.3645964,-71.9208678999999,8z",
  "@-0.3465761,-78.3868756999999,8z",
  "@20.2455879,-87.476773,8z",
  "@-13.2299025,-70.7538883,8z",
  "@42.2045186,-122.7196194,8z",
  "@49.73173730000001,9.2175911,8z",
  "@-13.301573,-72.1198469,8z",
  "@52.3675734,4.9041389,8z",
  "@51.2439415,5.7142222,8z",
  "@41.6039431,2.6244208,8z",
  "@41.6039431,2.6244208,8z",
  "@37.8674077,-77.7091915,8z",
  "@6.057265,-75.185598,8z",
  "@20.2114185,-87.4653501999999,8z",
  "@-3.7437644,-73.2515532,8z",
  "@52.259836,4.573337,8z",
  "@24.9815919,-77.4655169,8z",
  "@18.9788888,-99.0363888,8z",
  "@9.2860179,-83.8014182,8z",
  "@41.6039431,2.6244208,8z"];

  const center_queries = ["Novalis in PERU",
  "Guest House Pisac Inca in PERU",
  "Sacred Heart Sonora in MEXICO",
  "New Earth Integration in PERU",
  "Ikara Retreat in COSTA RICA",
  "Ancestral Retreats in PORTUGAL",
  "Nagomi retreat in NETHERLANDS",
  "Aloee Wellness in MEXICO",
  "Kawsay Ayahuasca Retreat in PERU",
  "Casa De La Madre Ayahuasca Healing Center in PERU",
  "Psychonauta Foundation in PERU",
  "Ayahuasca Ayayni in SPAIN",
  "Awaken Your Soul Iboga in COSTA RICA",
  "Friends of the Vine Retreats in PORTUGAL",
  "Spirit quest Retreats in PORTUGAL",
  "Ascension Journeyz - Marketplace in MEXICO",
  "Vikara Healing Center in ECUADOR",
  "Natalie Eidi in MEXICO",
  "Prana Verein in PORTUGAL",
  "La Hacienda Cancun in MEXICO",
  "Krakti.  in NETHERLANDS",
  "MindTravellers in NETHERLANDS",
  "Wanay Community in COLOMBIA",
  "Ananda Retreat Zanzibar in TANZANIA",
  "Awaken Retreat  in MEXICO",
  "Eleusinia Retreat in MEXICO",
  "Sadhana Experience in MEXICO",
  "Tiwaz Awakening  in PERU",
  "Ayahuasca Temple in PERU",
  "Alma Healing Center in ECUADOR",
  "A New Day Retreats in SPAIN",
  "Healing Ceremonies Costa Rica in COSTA RICA",
  "Forest Path in GUATEMALA",
  "Pathway Creations in UNITED STATES",
  "Oregon Wellness Retreat in UNITED STATES",
  "Tree of Life Facilitation Services in UNITED STATES",
  "Arcadia Healing Sanctum in MEXICO",
  "Mr. and Mrs. Shrooms in JAMAICA",
  "Heart & Mind Liberation Center in NETHERLANDS",
  "Keta-Breath Retreat in UNITED STATES",
  "Transcend with Iboga in MEXICO",
  "Iluminar Healing in MEXICO",
  "Escuela Floresiendo in SPAIN",
  "Rastafari Indigenous Village in JAMAICA",
  "Shamanic place in COSTA RICA",
  "Confluence Retreats in UNITED STATES",
  "The Now Is You in COSTA RICA",
  "White Rabbit Collective in UNITED STATES",
  "Gaia Sagrada in ECUADOR",
  "Arcadia Healing Sanctum in MEXICO",
  "State of Mind Retreats in NETHERLANDS",
  "Co-inspired  in SWITZERLAND",
  "Tree of Life Facilitation Services in UNITED STATES",
  "Mushroom Awakening in COSTA RICA",
  "Sadhana Experience in MEXICO",
  "Shamanic Sacred Inner Journey in SPAIN",
  "La Musa Verde in PERU",
  "La Hacienda Cancun in MEXICO",
  "Natural Reset in MEXICO",
  "HERO's JOURNEY in NETHERLANDS",
  "Novalis in PERU",
  "Chakrana PV in MEXICO",
  "Kawsay Ayahuasca Retreat in PERU",
  "Healing Ceremonies Costa Rica in COSTA RICA",
  "Rastafari Indigenous Village in JAMAICA",
  "Friends of the Vine Retreats in PORTUGAL",
  "Life Synergy Retreat in MEXICO",
  "Finally Detached in UNITED STATES",
  "Ayahuasca Temple in PERU",
  "A New Day Retreats in SPAIN",
  "New Earth Integration in PERU",
  "Epicenter Ayahuasca in PERU",
  "White Rabbit Collective in UNITED STATES",
  "Awaken Your Soul Iboga in COSTA RICA",
  "Amoraleza in SPAIN",
  "Exploring the Inner Mysteries in SPAIN",
  "Amazonia Moyano Ayahuasca Healing Center in PERU",
  "Compassion Retreats in MEXICO",
  "Sacred Heart Sonora in MEXICO",
  "Puma Retreats in PERU",
  "Alma Healing Center in ECUADOR",
  "Samskara Ayahuasca Retreat in MEXICO",
  "Wandari Plant Master Boutique Retreat in PERU",
  "Oregon Wellness Retreat in UNITED STATES",
  "Divine Temple of Light in GERMANY",
  "Casa Galactica in PERU",
  "Rejuvyn in NETHERLANDS",
  "Tim Cools in NETHERLANDS",
  "Ayahuasca Ayayni in SPAIN",
  "Escuela Floresiendo in SPAIN",
  "Pathway Creations in UNITED STATES",
  "Azulita House Sacred Medicines in COLOMBIA",
  "Cluster Dave  in MEXICO",
  "Biri Benxo in PERU",
  "Ascention Ceremonies in NETHERLANDS",
  "Psilocybin Therapy Bahamas in THE BAHAMAS",
  "Medicina Trascendental in MEXICO",
  "Casa Madreveda Holistic in COSTA RICA",
  "Escuela Floresiendo in SPAIN"];

  const center_queries_broad = ["Novalis in Arequipa, PERU",
  "Guest House Pisac Inca in Pisac, PERU",
  "Sacred Heart Sonora in Nogales, MEXICO",
  "New Earth Integration in Tarapoto, PERU",
  "Ikara Retreat in Savegre, COSTA RICA",
  "Ancestral Retreats in Aljezur, PORTUGAL",
  "Nagomi retreat in Amsterdam, NETHERLANDS",
  "Aloee Wellness in Puerto Morelos, MEXICO",
  "Kawsay Ayahuasca Retreat in Indiana, PERU",
  "Casa De La Madre Ayahuasca Healing Center in Pucallpa, PERU",
  "Psychonauta Foundation in Nauta, PERU",
  "Ayahuasca Ayayni in Sant Pol de Mar, SPAIN",
  "Awaken Your Soul Iboga in Cambronero, COSTA RICA",
  "Friends of the Vine Retreats in Lisbon, PORTUGAL",
  "Spirit quest Retreats in Faro, PORTUGAL",
  "Ascension Journeyz - Marketplace in Tulum, MEXICO",
  "Vikara Healing Center in Olon, ECUADOR",
  "Natalie Eidi in San Luis Potos√≠, MEXICO",
  "Prana Verein in Lisbon, PORTUGAL",
  "La Hacienda Cancun in Canc√∫n, MEXICO",
  "Krakti.  in Schiphol, NETHERLANDS",
  "MindTravellers in Culemborg, NETHERLANDS",
  "Wanay Community in Mocoa, COLOMBIA",
  "Ananda Retreat Zanzibar in Bwejuu, TANZANIA",
  "Awaken Retreat  in Puerto Morelos, MEXICO",
  "Eleusinia Retreat in Valle de Bravo, MEXICO",
  "Sadhana Experience in Playa del Carmen, MEXICO",
  "Tiwaz Awakening  in Yanahuara, PERU",
  "Ayahuasca Temple in Iquitos, PERU",
  "Alma Healing Center in Quito, ECUADOR",
  "A New Day Retreats in Barony of Polop, SPAIN",
  "Healing Ceremonies Costa Rica in Santa Ana, COSTA RICA",
  "Forest Path in Pasajcap, GUATEMALA",
  "Pathway Creations in Montpelier, UNITED STATES",
  "Oregon Wellness Retreat in Ashland, UNITED STATES",
  "Tree of Life Facilitation Services in Portland, UNITED STATES",
  "Arcadia Healing Sanctum in Tulum, MEXICO",
  "Mr. and Mrs. Shrooms in Negril, JAMAICA",
  "Heart & Mind Liberation Center in Amsterdam, NETHERLANDS",
  "Keta-Breath Retreat in Taos, UNITED STATES",
  "Transcend with Iboga in Playa del Carmen, MEXICO",
  "Iluminar Healing in Puerto Vallarta, MEXICO",
  "Escuela Floresiendo in Sant Pol de Mar, SPAIN",
  "Rastafari Indigenous Village in Montego Bay, JAMAICA",
  "Shamanic place in Punta Uva, COSTA RICA",
  "Confluence Retreats in Ashland, UNITED STATES",
  "The Now Is You in Savegre de Aguirre, COSTA RICA",
  "White Rabbit Collective in Texas Creek, UNITED STATES",
  "Gaia Sagrada in Cuenca, ECUADOR",
  "Arcadia Healing Sanctum in Tulum, MEXICO",
  "State of Mind Retreats in Vorstenbosch, NETHERLANDS",
  "Co-inspired  in Geneva, SWITZERLAND",
  "Tree of Life Facilitation Services in Portland, UNITED STATES",
  "Mushroom Awakening in Tinamaste, COSTA RICA",
  "Sadhana Experience in Tulum, MEXICO",
  "Shamanic Sacred Inner Journey in Palma, SPAIN",
  "La Musa Verde in Tarapoto, PERU",
  "La Hacienda Cancun in Canc√∫n, MEXICO",
  "Natural Reset in Rosarito, MEXICO",
  "HERO's JOURNEY in Amsterdam, NETHERLANDS",
  "Novalis in Arequipa, PERU",
  "Chakrana PV in Puerto Vallarta, MEXICO",
  "Kawsay Ayahuasca Retreat in Indiana, PERU",
  "Healing Ceremonies Costa Rica in Escazu, COSTA RICA",
  "Rastafari Indigenous Village in Montego Bay, JAMAICA",
  "Friends of the Vine Retreats in Lisbon, PORTUGAL",
  "Life Synergy Retreat in Playa del Carmen, MEXICO",
  "Finally Detached in Colorado Springs, UNITED STATES",
  "Ayahuasca Temple in Iquitos, PERU",
  "A New Day Retreats in Barony of Polop, SPAIN",
  "New Earth Integration in Tarapoto, PERU",
  "Epicenter Ayahuasca in Pahoyan, PERU",
  "White Rabbit Collective in Texas Creek, UNITED STATES",
  "Awaken Your Soul Iboga in Cambronero, COSTA RICA",
  "Amoraleza in Lanjar√≥n, SPAIN",
  "Exploring the Inner Mysteries in Barcelona, SPAIN",
  "Amazonia Moyano Ayahuasca Healing Center in Tingo Mar√≠a, PERU",
  "Compassion Retreats in Tulum, MEXICO",
  "Sacred Heart Sonora in Tulum, MEXICO",
  "Puma Retreats in Lamay, PERU",
  "Alma Healing Center in Quito, ECUADOR",
  "Samskara Ayahuasca Retreat in Tulum, MEXICO",
  "Wandari Plant Master Boutique Retreat in Quince Mil, PERU",
  "Oregon Wellness Retreat in Ashland, UNITED STATES",
  "Divine Temple of Light in Gro√üheubach, GERMANY",
  "Casa Galactica in Urubamba, PERU",
  "Rejuvyn in Amsterdam, NETHERLANDS",
  "Tim Cools in Weert, NETHERLANDS",
  "Ayahuasca Ayayni in Sant Pol de Mar, SPAIN",
  "Escuela Floresiendo in Sant Pol de Mar, SPAIN",
  "Pathway Creations in Montpelier, UNITED STATES",
  "Azulita House Sacred Medicines in Cocorn√°, COLOMBIA",
  "Cluster Dave  in Tulum, MEXICO",
  "Biri Benxo in Iquitos, PERU",
  "Ascention Ceremonies in Lisserbroek, NETHERLANDS",
  "Psilocybin Therapy Bahamas in Nassau, THE BAHAMAS",
  "Medicina Trascendental in Amatl√°n de Quetzalc√≥atl, MEXICO",
  "Casa Madreveda Holistic in Platanillo, COSTA RICA",
  "Escuela Floresiendo in Sant Pol de Mar, SPAIN",];

  // const coordinate_queries = ["@-16.4090474,-71.5374509999999,10z",
  // "@-13.4216848,-71.8482387999999,10z",
  // "@31.3011855,-110.9381047,10z"];

  // const center_queries = ["Novalis in Arequipa, PERU",
  // "Guest House Pisac Inca in Pisac, PERU",
  // "Sacred Heart Sonora in Nogales, MEXICO",
  // "New Earth Integration in Tarapoto, PERU"
  
  const results = [];


  for (const element of center_queries_broad) {
    let params = {
      engine: "google_maps",
      q: element,
      type: "search",
      api_key: apiKey,
    };

    try {
      const response1 = await getJson(params);
      console.log(response1);
      const localResults = response1["local_results"];
      console.log(localResults);
      console.log('hi');
      console.log(response1.place_results);
      if(response1.place_results != undefined){
        console.log('place results not undefined');
        results.push({
            name: response1.place_results.title,
            type: 'Retreat Center',
            phone_number: response1.place_results.phone,
            website: response1.place_results.website,
            types: 'Retreat Center',
            gps_coordinates: `${response1.place_results.gps_coordinates.latitude}, ${response1.place_results.gps_coordinates.longitude}`,
            address: response1.place_results.address
            
        });
      }else{
        console.log('place results undefined');
        localResults.forEach(result => {
          results.push({
            name: result.title,
            type: result.type,
            phone_number: result.phone,
            website: result.website,
            types: result.types,
            gps_coordinates: `${result.gps_coordinates.latitude}, ${result.gps_coordinates.longitude}`,
            address: result.address
          });
        });
      }           
    } catch (error) {
      console.error("Error fetching data for", element, error);
    }
  }

  for (const element of center_queries) {
    let params = {
      engine: "google_maps",
      q: element,
      type: "search",
      api_key: apiKey,
    };

    try {
      const response1 = await getJson(params);
      // console.log(response1);
      const localResults = response1["local_results"];
      // console.log(localResults);
      // console.log('hi');
      // console.log(response1.place_results);
      if(response1.place_results != undefined){
        results.push({
            name: response1.place_results.title,
            type: 'Retreat Center',
            phone_number: response1.place_results.phone,
            website: response1.place_results.website,
            types: 'Retreat Center',
            gps_coordinates: `${response1.place_results.gps_coordinates.latitude}, ${response1.place_results.gps_coordinates.longitude}`,
            address: response1.place_results.address
            
        });
      }else{
        localResults.forEach(result => {
          results.push({
            name: result.title,
            type: result.type,
            phone_number: result.phone,
            website: result.website,
            types: result.types,
            gps_coordinates: `${result.gps_coordinates.latitude}, ${result.gps_coordinates.longitude}`,
            address: result.address
          });
        });
      }           
    } catch (error) {
      console.error("Error fetching data for", element, error);
    }
  }

  for (const element of coordinate_queries) {
    let params = {
      engine: "google_maps",
      q: "Plant Medicine Retreat Centers",
      ll: element,
      type: "search",
      api_key: apiKey,
    };
    try {
      const response1 = await getJson(params);
      // console.log(response1);
      const localResults = response1["local_results"];
      // console.log(localResults);
      // console.log('hi');
      // console.log(response1.place_results);
      if(response1.place_results != undefined){
        results.push({
            name: response1.place_results.title,
            type: 'Retreat Center',
            phone_number: response1.place_results.phone,
            website: response1.place_results.website,
            types: 'Retreat Center',
            gps_coordinates: `${response1.place_results.gps_coordinates.latitude}, ${response1.place_results.gps_coordinates.longitude}`,
            address: response1.place_results.address
            
        });
      }else{
        localResults.forEach(result => {
          results.push({
            name: result.title,
            type: result.type,
            phone_number: result.phone,
            website: result.website,
            types: result.types,
            gps_coordinates: `${result.gps_coordinates.latitude}, ${result.gps_coordinates.longitude}`,
            address: result.address
          });
        });
      }           
    } catch (error) {
      console.error("Error fetching data for", element, error);
    }
  }

  const csvWriter = createCsvWriter({
    path: 'retreat_centers.csv',
    header: [
      { id: 'name', title: 'Name' },
      { id: 'type', title: 'Type' },
      { id: 'phone_number', title: 'Phone Number' },
      { id: 'website', title: 'Website' },
      { id: 'types', title: 'Types' },
      { id: 'gps_coordinates', title: 'GPS Coordinates' },
      { id: 'address', title: 'Address' }
    ]
  });

  csvWriter.writeRecords(results)
    .then(() => {
      console.log('CSV file was written successfully');
    })
    .catch(err => {
      console.error('Error writing CSV file', err);
    });
};

run();
