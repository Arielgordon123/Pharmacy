// Connection URL
const connect = MongoClient => {
  const url = process.env.dbUrl;

  // Database Name
  const dbName = process.env.dbName;
    console.log('url :', url);
  // Use connect method to connect to the server
  return MongoClient.connect(url, (err, client)=> {
    console.log("Connected successfully to server");
    if(!err){
    const db = client.db(dbName);

    return db;
    }else{
        console.log('err :', err);
    }
  },);
};

module.exports ={
    connect
}
